# 🚀 Playwright Hybrid Automation Framework

A scalable, maintainable, and robust **Hybrid Test Automation Framework** built with **Playwright**, **TypeScript**, and the **Page Object Model (POM)** design pattern.

This framework supports:

- ✅ UI Testing
- ✅ API Testing
- ✅ Hybrid Testing (API setup/teardown with UI execution)

It is designed for high-performance, maintainable, and scalable end-to-end test automation.

---

# ✨ Key Features

- **Hybrid Testing**
  - Supports standalone UI tests
  - Supports standalone API tests
  - Supports Hybrid API + UI workflows

- **Page Object Model (POM)**
  - Clean separation between page actions and test logic
  - Easier maintenance and scalability

- **Custom Fixtures**
  - Centralized dependency injection
  - Simplified test initialization
  - Located in `fixtures/Fixture.ts`

- **Multi-Environment Support**
  - `.env.dev`
  - `.env.live`

- **Data-Driven Testing**
  - JSON-based test data
  - Builder pattern for dynamic data generation

- **Authentication State Reuse**
  - Global login setup
  - Persistent authentication sessions
  - Implemented using `auth.setup.ts`

- **CI/CD Ready**
  - GitHub Actions integration included

---

# 🏗 Project Structure

```text
SURE-TASK-BY-PLAYWRIGHT/
│
├── .github/
│   └── workflows/              # GitHub Actions pipelines
│
├── API+UI/
│   ├── constant/               # Global constants
│   ├── data/
│   │   ├── API/                # API payloads
│   │   └── UI/
│   │       ├── *.json          # UI test data
│   │       └── builder/        # Dynamic data builders
│   │
│   ├── fixtures/
│   │   └── Fixture.ts          # Custom Playwright fixtures
│   │
│   ├── pages/                  # Page Object Model classes
│   ├── services/               # API service layer
│   ├── types/                  # TypeScript interfaces
│   └── utils/                  # Helper utilities
│
├── files/                      # Upload files & attachments
│
├── tests/
│   ├── APITest/
│   ├── UITest/
│   ├── hybridTest/
│   ├── auth.setup.ts
│   └── example.spec.ts
│
├── .env.dev
├── .env.live
├── playwright.config.ts
├── tsconfig.json
└── package.json
```

---

# 🛠 Prerequisites

Before running the project, ensure the following are installed:

- Node.js **v18+**
- npm or Yarn
- Playwright

---

# 🚀 Installation

## Clone the Repository

```bash
git clone https://github.com/Ahmed-9595/playwright-typescript-hybrid-framework.git
```

## Install Dependencies

```bash
npm install
```

## Install Playwright Browsers

```bash
npx playwright install
```

---

# 🧪 Running Tests

## Run All Tests

```bash
npx playwright test
```

---

## Run UI Tests

```bash
npx playwright test tests/UITest
```

---

## Run API Tests

```bash
npx playwright test tests/APITest
```

---

## Run Hybrid Tests

```bash
npx playwright test tests/hybridTest
```

---

## Run Tests in Headed Mode

```bash
npx playwright test --headed
```

---

## Run Against a Specific Environment

Development environment:

```bash
NODE_ENV=dev npx playwright test
```

Production environment:

```bash
NODE_ENV=live npx playwright test
```

---

# 📊 Test Reports

Open the HTML report after execution:

```bash
npx playwright show-report
```

---

# 🏛 Framework Design

The framework follows a **Hybrid Automation Architecture** based on:

- Page Object Model (POM)
- Playwright Fixtures
- Service Layer Pattern
- Builder Pattern
- Data-Driven Testing
- Environment-Based Configuration

This architecture provides:

- High maintainability
- Better code reusability
- Cleaner test implementation
- Easy scalability
- Faster execution
- CI/CD compatibility

---

# 📂 Test Categories

| Suite | Description |
|--------|-------------|
| **UI Tests** | End-to-end user interface automation |
| **API Tests** | Backend API validation |
| **Hybrid Tests** | API setup with UI verification |

---

# 🔧 Technologies Used

- Playwright
- TypeScript
- Node.js
- Page Object Model (POM)
- Builder Pattern 
- JSON Data-Driven Testing
- GitHub Actions


---

# 👨‍💻 Author

**Ahmed Abdelaziz**

GitHub:
https://github.com/Ahmed-9595

---

# ⭐ If you find this project useful, don't forget to give it a star!
