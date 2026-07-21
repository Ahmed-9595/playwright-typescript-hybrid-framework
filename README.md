🚀 Playwright Hybrid Automation Framework
A scalable, maintainable, and robust Hybrid Test Automation Framework built with Playwright, TypeScript, and Page Object Model (POM) pattern.

This framework is designed to handle UI Testing, API Testing, and Hybrid Testing (combining API setup/teardown with UI execution) for high-performance end-to-end quality assurance.

✨ Key Features
Hybrid Testing Capabilities: Supports standalone UI tests, isolated API tests, and hybrid workflows.

Page Object Model (POM): Clean separation between page elements/actions and test scripts.

Custom Fixtures (fixtures/Fixture.ts): Streamlined object dependency injection and test setup.

Multi-Environment Configuration: Support for environment-based runs (.env.dev, .env.live).

Data-Driven Testing: Decoupled test data using JSON files (data/UI/*.json) and Builder patterns (builder).

Authentication State Reuse: Built-in global setup (auth.setup.ts) to manage and persist login sessions.

CI/CD Ready: Includes GitHub Actions workflow configurations (.github).

🏗 Framework Architecture & Project Structure
Plaintext
SURE-TASK-BY-PLAYWRIGHT/
│
├── .github/              # GitHub Actions CI/CD pipelines
├── API+UI/               # Core framework modules for API & UI engine
│   ├── constant/         # System constants and global variables
│   ├── data/             # Test data & payloads
│   │   ├── API/          # API-specific test payloads
│   │   └── UI/           # UI JSON data (e.g., JobDetails.json, loginData.json)
│   │       └── builder/  # Dynamic test data builders
│   ├── fixtures/         # Playwright custom fixtures (Fixture.ts)
│   ├── pages/            # Page Object Model classes
│   ├── services/         # API Service wrappers / HTTP Clients
│   ├── types/            # TypeScript interfaces & custom type definitions
│   └── utils/            # Helper functions (e.g., date formatters, random generators)
│
├── files/                # Uploadable test assets & attachments
├── tests/                # Test suites directory
│   ├── APITest/          # Backend API test cases (.spec.ts)
│   ├── hybridTest/       # Integrated API + UI test scenarios
│   ├── UITest/           # Frontend UI test cases (.spec.ts)
│   ├── auth.setup.ts     # Global authentication setup
│   └── example.spec.ts   # Starter / Template test specs
│
├── .env.dev              # Staging / Development environment configuration
├── .env.live             # Production / Live environment configuration
├── playwright.config.ts  # Playwright runner & environment configuration
├── tsconfig.json         # TypeScript compiler configurations
└── package.json          # Project dependencies & scripts
🛠 Prerequisites
Make sure you have the following installed on your machine:

Node.js (v18 or higher recommended)

npm or yarn

🚀 Installation & Setup
Clone the repository:

Bash
git clone https://github.com/Ahmed-9595/playwright-typescript-hybrid-framework.git
Install project dependencies:

Bash
npm install
Install Playwright Browsers:

Bash
npx playwright install
🧪 Running Tests
1. Run All Tests
Bash
npx playwright test
2. Run Specific Test Suites
UI Tests only:

Bash
npx playwright test tests/UITest
API Tests only:

Bash
npx playwright test tests/APITest
Hybrid Tests only:

Bash
npx playwright test tests/hybridTest
3. Run Tests in Headed Mode
Bash
npx playwright test --headed
4. Run Tests against Specific Environment
Bash
# Executing tests targeting dev environment
NODE_ENV=dev npx playwright test
📊 Test Reporting
To open and view the HTML execution report generated after a test run:

Bash
npx playwright show-report
