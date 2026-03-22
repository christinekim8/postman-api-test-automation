# 🚀 Postman API Test Automation Portfolio

[![Build Status](https://img.shields.io/github/actions/workflow/status/christinekim8/postman-api-test-automation/main.yml?style=for-the-badge&logo=github-actions&label=Build)](https://github.com/christinekim8/postman-api-test-automation/actions)
[![Allure Report](https://img.shields.io/badge/Allure%20Report-Live%20Dashboard-yellowgreen?style=for-the-badge&logo=allure)](https://christinekim8.github.io/postman-api-test-automation/)
[![API Testing](https://img.shields.io/badge/API%20Testing-Postman%20%2F%20Newman-orange?style=for-the-badge&logo=postman)](https://github.com/christinekim8/postman-api-test-automation)

## 📋 Project Overview: Advanced API Automation & AI-Augmented Quality Engineering

This portfolio demonstrates a production-grade **End-to-End API Test Automation Pipeline** built around a custom Node.js/Express commerce API. 
This project also demonstrates the ability to effectively integrate AI into the QA process — utilizing **Claude** and **Postman Agent Mode** in a **Human-in-the-Loop** workflow to accelerate script scaffolding and architectural decisions while maintaining full engineering ownership at every stage.

The entire test lifecycle — from environment provisioning to report publishing — is fully automated via Docker Compose and GitHub Actions, with results surfaced as an interactive Allure Report on GitHub Pages.

## 🛠️ Tech Stack
| Layer | Technology |
|---|---|
| API Server | Node.js, Express |
| Test Client | Postman, Newman 5.x |
| Reporting | Allure Report, GitHub Pages |
| Containerization | Docker, Docker Compose |
| CI/CD | GitHub Actions |
| Data-Driven Testing | JSON data files |

## 💡 Key Engineering Decisions

* **Custom API Server** — Built from scratch using Node.js and Express to enable granular control over state management, stock logic, and error handling. This allows edge cases (e.g., concurrent stock depletion, JWT expiry) to be tested reliably without depending on a third-party mock service.

* **Strategic Test Coverage** — Comprehensive scenarios including Positive, Negative, and Edge Cases for Authentication and Order Management, with Data-Driven Testing (DDT) using JSON data files to validate boundary values and complex error states.

* **Advanced Postman Scripting** — Dynamic test scripts using environment variables and custom assertions to verify status codes, response bodies, and security tokens. Backend validation handles invalid payloads and authentication failures gracefully.

* **Docker Compose Orchestration** — Both the API server and the Newman test runner are containerized and networked together, ensuring a fully reproducible test environment across local machines and CI runners with zero configuration drift.

* **Newman Version Pinning** — `newman@5.3.2` and `newman-reporter-allure@1.0.7` are explicitly pinned in `Dockerfile.tester` after identifying a silent compatibility break in `newman@6.x` that caused the Allure reporter to produce no output without any error.

* **AI-Augmented Workflow (Human-in-the-Loop)** — **Claude** and **Postman Agent Mode** were used as strategic collaborators to accelerate script scaffolding, test case generation, and architectural decisions, while maintaining full engineering ownership at every stage. This workflow reduced engineering lead time by an estimated **70%**.

## ⚙️ CI/CD Pipeline

Every push to `main` triggers the following workflow:

1. **Checkout** source code
2. **Docker Compose** provisions `api-server` and `api-tester` containers
3. `api-tester` runs all three Newman test suites and writes Allure results to `reports/allure-results`
4. **Allure CLI** generates a static report from the results
5. Report is **deployed to GitHub Pages** automatically

**Live report**: [christinekim8.github.io/postman-api-test-automation](https://christinekim8.github.io/postman-api-test-automation/)

## 🏃 How to Run Locally

### Prerequisites
- Docker Desktop
- Git

### Steps

```bash
# 1. Clone the repository
git clone https://github.com/christinekim8/postman-api-test-automation.git
cd postman-api-test-automation

# 2. Run the full test suite
docker compose up --build --exit-code-from api-tester

# 3. Generate and open the Allure Report
allure generate reports/allure-results --clean -o reports/allure-report
allure open reports/allure-report
```

> Allure CLI is required for local report generation.
> Install via: `npm install -g allure-commandline`

## ✅ Test Coverage

### Authentication
| Scenario | Type |
|---|---|
| Sign up with valid credentials | Positive |
| Sign up with duplicate username | Negative |
| Sign up with invalid input (DDT) | Negative / Edge |
| Login with valid credentials | Positive |
| Login with wrong password | Negative |

### Products
| Scenario | Type |
|---|---|
| Retrieve all products | Positive |
| Schema and data integrity validation | Positive |

### Orders (CRUD)
| Scenario | Type |
|---|---|
| Create order with valid product | Positive |
| Retrieve all orders | Positive |
| Retrieve single order | Positive |
| Retrieve non-existent order | Negative |
| Update order quantity | Positive |
| Update order with invalid quantity (DDT) | Negative / Edge |
| Cancel order | Positive |


## 🔭 Future Improvements

While the current version covers core functionalities and critical paths, I plan to expand the project with the following enhancements:

* **Comprehensive Test Coverage**: Implement all possible test scenarios to achieve full coverage, focusing heavily on complex **Negative** and **Edge Cases** (e.g., race conditions in stock updates).
* **Performance Testing**: Integrate K6 or JMeter to evaluate server stability under high-load scenarios. 

## ✍️ Contact & Author
### Minkyung (Christine) Kim - QA Lead / Senior Quality Engineer
#### LinkedIn: https://www.linkedin.com/in/testninja/
#### GitHub: https://github.com/christinekim8