# 🚀 Postman API Test Automation Portfolio

![API Automation CI](https://github.com/christinekim8/postman-api-test-automation/actions/workflows/main.yml/badge.svg)

## 🚀 Project Overview: Advanced API Automation & AI-Augmented Quality Engineering

This portfolio showcases a robust **End-to-End API Testing & Automation Pipeline**, designed to simulate complex real-world commerce scenarios. Beyond traditional testing, this project demonstrates a **Human-in-the-Loop (HITL)** approach, leveraging **Gemini Pro** and **Postman agent mode** to maximize engineering efficiency and precision.

### 💡 Key Focus Areas:
* **Proactive Test Engineering & Technical Proficiency**: Built a custom REST API server from scratch using Node.js and Express to establish an independent test bed. This allowed for **granular control over backend state management and complex error-handling logic**, enabling the validation of edge cases (e.g., dynamic stock updates, authentication failures) that are often difficult to replicate in standard mock environments.
* **Strategic Testing**: Comprehensive test coverage including **Positive, Negative, and Edge Case** scenarios for Authentication and Order Management.
* **Data-Driven Automation (DDT)**: Implemented scalable testing using JSON data files to validate boundary values and complex error states.
* **Advanced Postman Scripting**: Developed dynamic test scripts using environment variables and custom assertions to verify status codes, response bodies, and security tokens.
* **Error Handling Logic**: Implemented backend validation to gracefully handle and report invalid JSON payloads and authentication failures.
* **AI-Powered Productivity**: Utilized AI as a strategic collaborator by providing high-level directions, reviewing AI-generated output, and iteratively refining prompts to achieve high-quality automation scripts in record time.
* **Continuous Integration (CI/CD)**: Fully integrated with **GitHub Actions** to automate build and test execution on every push. This ensures a "Shift-Left" testing approach where quality is verified at the earliest stage of the development lifecycle.

### 🤖 The AI + Human-in-the-Loop (HITL) Workflow:
I didn't just use AI; I **orchestrated** it. This project serves as a case study for **AI-Augmented Engineering**, where I:
1.  Set the strategic direction and architectural requirements.
2.  Directed AI to generate baseline codes and complex test scripts.
3.  Conducted rigorous "Human-in-the-loop" reviews and refactoring to ensure production-grade reliability.
4. Reduced engineering lead time by **70%** by strategically utilizing AI for rapid script scaffolding, allowing a primary focus on high-risk edge cases and system architecture.

## 🛠️ Tech Stack
* **Backend**: Node.js, Express
* **Testing**: Postman, Newman (CLI)
* **CI/CD**: GitHub Actions
* **Data Handling**: Data-Driven Testing (DDT) with JSON

## 🚦 How to Run the Tests

### 1. Prerequisites
Ensure you have the following installed on your local machine:
* **Node.js** (v18 or higher recommended)
* **Postman Desktop App**
* **Git**

### 2. Installation & Setup
Clone the repository and install the necessary dependencies:
```bash
# Clone the repository
git clone https://github.com/christinekim8/postman-api-test-automation.git

# Navigate into the project directory
cd postman-api-test-automation

# Install backend dependencies (including Newman & htmlextra reporter)
npm install
```

### 3. Running the API Server
```bash
npm start
```
Note: The server will run at http://localhost:3000. Please keep this terminal window open.

### 4. Testing with Postman (Manual)
To explore the API and run tests manually within the Postman UI:
1. Open the Postman desktop application.
2. Click the Import button (top left).
3. Import the following files located in the /tests directory:
postman_collection.json
postman_environment.json
4. (Data-Driven Testing) To run negative scenarios, use the Postman Runner and select the relevant data file from /tests/data/:
order_create_invalid_data.json (For order creation validation)
order_update_invalid_data.json (For order update validation)
signup_invalid_data.json (For registration validation)

### 5. Automated Testing & Reporting (CLI)
Execute all data-driven scenarios and generate professional HTML dashboards with a single command:
```bash
npm run test:all
```
Reports will be generated in the ./reports directory as create.html, update.html, and signup.html.
---

## 📌 Future Improvements (To-do)

While the current version covers core functionalities and critical paths, I plan to expand the project with the following enhancements:

* **Comprehensive Test Coverage**: Implement all possible test scenarios to achieve full coverage, focusing heavily on complex **Negative** and **Edge Cases** (e.g., race conditions in stock updates).
* **Performance Testing**: Integrate JMeter to evaluate server stability under high-load scenarios. 