export class ForgotPasswordPage {
  elements = {
    // linkForgot: () => cy.contains('p.oxd-text a', 'Forgot your password?'),
    linkForgot: () => cy.contains(/Forgot your password/i),
    usernameOrEmail: () => cy.get('input[name="username"]'),
    resetBtn: () => cy.contains('button', 'Reset Password'),
    forgotPasswordHeader: () => cy.get('h6.oxd-text.oxd-text--h6.orangehrm-forgot-password-title').should('be.visible').and('have.text', 'Reset Password'),
    interceptForgotPassword: () =>     cy.wait('@forgotRequest').its('response.statusCode'),
    successPanel: () => cy.contains('p', 'Reset password link sent successfully').parent(),
    errorToast: () => cy.get('.oxd-alert-content-text'),
    errorField: () => cy.contains(/Required/i)
  };

  open() {
    cy.visit('/web/index.php/auth/login');
    this.elements.linkForgot().click();
    cy.url().should('include', '/requestPasswordResetCode');
  }

  interceptFPRequest() {
    cy.intercept('GET', '**/core/i18n/messages').as('forgotRequest');
  }

  requestReset(value) {
    // this.elements.usernameOrEmail().clear().type(value);
    this.elements.usernameOrEmail().clear();
    if (value) {
      this.elements.usernameOrEmail().type(value, { log: false });
    }
    this.elements.resetBtn().click();
  }
}
