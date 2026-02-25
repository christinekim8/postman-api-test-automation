/**
 * Simple Order Management System API
 * ---------------------------------------------------------
 * Purpose: Professional SQA Portfolio for API Testing & Automation
 * Features: Authentication (JWT), CRUD for Orders, Stock Management
 * Author: Christine Kim
 */

const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;
const SECRET_KEY = "australia-sqa-portfolio-key";

app.use(bodyParser.json());

/**
 * IN-MEMORY DATA STORE
 * Note: Data resets when the server restarts.
 */
let users = [];
let orders = [];
let nextOrderId = 1;

const products = [
    { id: 1, name: "Australian Macadamias (250g)", price: 25.00, stock: 10 },
    { id: 2, name: "Premium Manuka Honey (MGO 500+)", price: 55.00, stock: 5 },
    { id: 3, name: "Organic Herbal Tea Selection", price: 30.00, stock: 0 },
    { id: 4, name: "Vegemite Original (220g)", price: 6.50, stock: 50 },
    { id: 5, name: "Tim Tam Double Coat (200g)", price: 5.00, stock: 20 },
    { id: 6, name: "Lucas' Paw Paw Ointment (25g)", price: 7.50, stock: 100 },
    { id: 7, name: "Eucalyptus Oil (100ml)", price: 12.00, stock: 15 },
    { id: 8, name: "Kangaroo Jerky (100g)", price: 18.00, stock: 8 },
    { id: 9, name: "Merino Wool Socks (Grey)", price: 22.00, stock: 3 },
    { id: 10, name: "Zinc Sunscreen SPF 50+ (200ml)", price: 19.50, stock: 40 }
];

/**
 * AUTHENTICATION MIDDLEWARE
 * Verifies JWT token and attaches user info to the request.
 */
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ message: "Access denied. Token missing." });

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.status(403).json({ message: "Invalid or expired token." });
        req.user = user;
        next();
    });
};

// --- [1] AUTH: User Registration (POST /signup) ---
app.post('/signup', (req, res) => {
    const { username, password } = req.body;

    // Username length check (3-15 characters)
    if (!username || username.length < 3 || username.length > 15) {
        return res.status(400).json({
            message: "Username must be between 3 and 15 characters."
        });
    }

    // Password length check (At least 8 characters)
    if (!password || password.length < 8) {
        return res.status(400).json({
            message: "Password must be at least 8 characters long."
        });
    }
    // 1. Check if the user already exists
    const userExists = users.find(u => u.username === username);

    if (userExists) {
        // 2. If exists, return 409 Conflict (Standard for duplicate resources)
        return res.status(409).json({ message: "User already exists." });
    }

    // 3. If not, create a new user
    users.push({ username, password });
    res.status(201).json({ message: "User registered successfully." });
});

// --- [2] AUTH: User Login (POST /login) ---
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);

    if (!user) {
        return res.status(401).json({ message: "Authentication failed. Invalid credentials." });
    }

    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
});

// --- [3] PRODUCTS: Get All Products (GET /products) ---
app.get('/products', (req, res) => {
    res.json(products);
});

// --- [4] ORDERS: Create New Order (POST /orders) ---
app.post('/orders', authenticateToken, (req, res) => {
    try {
        const { productId, quantity } = req.body;

        const pid = Number(productId);
        const qty = Number(quantity);

        const product = products.find(p => p.id === pid);

        if (!product) {
            return res.status(404).json({ message: "Product not found." });
        }

        console.log(`[Order Attempt] Stock: ${product.stock}, Requested: ${qty}`);

        if (product.stock < qty) {
            console.log("❌ Insufficient stock! Rejecting order.");
            return res.status(400).json({ message: "Insufficient stock levels." });
        }

        const newOrder = {
            orderId: orders.length + 1,
            productId: pid,
            productName: product.name,
            quantity: qty,
            username: req.user.username
        };

        orders.push(newOrder);
        console.log("✅ Order success!");

        res.status(201).json({
            message: "Order placed successfully.",
            order: newOrder
        });
    } catch (error) {
        console.error("Critical Server Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// --- [5] ORDERS: Get All My Orders (GET /orders) ---
app.get('/orders', authenticateToken, (req, res) => {
    const myOrders = orders.filter(o => o.username === req.user.username);
    res.json(myOrders);
});

// --- [6] ORDERS: Get Single Order Detail (GET /orders/:id) ---
app.get('/orders/:id', authenticateToken, (req, res) => {
    const orderId = parseInt(req.params.id);
    const order = orders.find(o => o.orderId === orderId);

    if (!order) {
        return res.status(404).json({ message: "Order not found." });
    }

    if (order.username !== req.user.username) {
        return res.status(403).json({ message: "Access denied." });
    }

    res.json(order);
});

// --- [7] ORDERS: Update Order (PUT /orders/:id) ---
app.put('/orders/:id', authenticateToken, (req, res) => {
    // Extract ID from parameters and quantity from request body
    const id = parseInt(req.params.id);
    const { quantity } = req.body; 
    
    // Find the order index in the memory array
    const orderIndex = orders.findIndex(o => o.orderId === id);

    // Return 404 if the order does not exist
    if (orderIndex === -1) {
        return res.status(404).json({ message: "Order not found." });
    }

    // Security Check: Ensure the user only updates their own orders
    if (orders[orderIndex].username !== req.user.username) {
        return res.status(403).json({ message: "Permission denied for this update." });
    }

    // Validate the requested quantity
    const newQty = parseInt(quantity);

    // Check for null, undefined, non-numeric values, or non-positive integers
    // This handles both Data-Driven Testing (DDT) edge cases and invalid JSON strings
    if (quantity === null || quantity === undefined || isNaN(newQty) || newQty <= 0) {
        return res.status(400).json({ message: "Invalid quantity provided." });
    }

    // Check for product availability and handle stock adjustments
    const product = products.find(p => p.id === orders[orderIndex].productId);
    const quantityDiff = newQty - orders[orderIndex].quantity;

    // Reject the update if the requested increase exceeds available stock
    if (product.stock < quantityDiff) {
        return res.status(400).json({ message: "Update failed due to stock limitations." });
    }

    // Update the stock and order details
    product.stock -= quantityDiff;
    orders[orderIndex].quantity = newQty;

    // Log the transaction for server-side monitoring
    console.log(`[Update] Order ${id} updated to ${newQty}. Remaining stock: ${product.stock}`);

    // Return the successful update response
    res.json({ 
        message: "Order updated successfully.", 
        order: orders[orderIndex] 
    });
});

// --- [8] ORDERS: Delete Order (DELETE /orders/:id) ---
app.delete('/orders/:id', authenticateToken, (req, res) => {
    const id = parseInt(req.params.id);
    const orderIndex = orders.findIndex(o => o.orderId === id);

    if (orderIndex === -1) return res.status(404).json({ message: "Order not found." });
    if (orders[orderIndex].username !== req.user.username) {
        return res.status(403).json({ message: "Permission denied to delete this order." });
    }

    // Restore product stock
    const product = products.find(p => p.id === orders[orderIndex].productId);
    product.stock += orders[orderIndex].quantity;

    orders.splice(orderIndex, 1);
    res.json({ message: "Order deleted successfully." });
});

app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
    console.log(`API Portfolio ready for Min Kyung!`);
});