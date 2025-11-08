export class LoginPage {
  elements = {
    username: () => cy.get('input[name="username"]'),
    password: () => cy.get('input[name="password"]'),
    loginBtn: () => cy.get('button[type="submit"]'),
    errorToast: () => cy.contains(/Invalid credentials/i),
    errorField: () => cy.contains(/Required/i)
  };

  visit() {
    cy.visit('/web/index.php/auth/login');
  }

  fillUsername(value) {
    this.elements.username().clear();
    if (value) {
      this.elements.username().type(value, { log: false });
    }
  }

  fillPassword(value) {
    this.elements.password().clear();
    if (value) {
      this.elements.password().type(value, { log: false });
    }
  }

  submit() {
    this.elements.loginBtn().click();
  }

  login(username, password) {
    this.fillUsername(username);
    this.fillPassword(password);
    this.submit();
  }
}
