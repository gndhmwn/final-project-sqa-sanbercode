cypress/
│
├── e2e/
│   ├── auth/
│   │   ├── login.cy.js
│   │   └── forgot-password.cy.js
│   └── directory/
│       └── directory.cy.js
│
├── fixtures/
│   ├── credentials.json
│   ├── forgot.json
│   └── directory.json
│
├── pages/
│   ├── BasePage.js
│   ├── LoginPage.js
│   ├── ForgotPasswordPage.js
│   └── DirectoryPage.js
│
└── support/
    ├── commands.js
    └── e2e.js

.env
cypress.config.js
package.json
README.md

# Install
npm install cypress --save-dev

# Run
npx cypress run 
npx cypress open
