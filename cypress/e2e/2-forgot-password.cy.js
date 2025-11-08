import { ForgotPasswordPage } from '../support/pages/ForgotPassword';

describe('OrangeHRM - Forgot Password Suite', () => {
  const fp = new ForgotPasswordPage();
  let data;

  before(() => {
    cy.fixture('forgot-data.json').then((d) => data = d);
  });

  beforeEach(() => {
    fp.open();
    fp.interceptFPRequest();
  });

  it('TC-FP-001 (P) Navigasi dari halaman Login ke halaman Forgot Password', () => {
    fp.elements.forgotPasswordHeader();
  });

  it('TC-FP-002 (P) Request reset untuk Username valid', () => {
    fp.requestReset(data.valid_email.username_or_email);
    cy.contains(/(link|email)/i).should('exist'); 
  });

  it('TC-FP-003 (N) Request reset untuk Username tidak terdaftar', () => {
    fp.requestReset(data.unknown_user.username_or_email);
    cy.contains(/Invalid|Unable|Not Found/i).should('exist');
  });

  it('TC-FP-004 (N) Request reset dengan Field kosong', () => {
    fp.requestReset(data.blank_field.username_or_email);
    cy.get('.oxd-input-field-error-message').should('be.visible');
  });

  it('TC-FP-005 (N) Request reset dengan String berlebihan (256+ char)', () => {
    fp.requestReset('a'.repeat(300));
    cy.contains(/Invalid|Unable|Too long/i).should('exist');
  });

  it('TC-FP-006 (N) Request reset dengan SQL Injection payload', () => {
    fp.requestReset(data.sql_injection.username_or_email);
    cy.contains(/Invalid|Unable/i).should('exist');
  });

  it('TC-FP-007 (N) Request reset dengan XSS payload', () => {
    fp.requestReset(data.xss_attempt.username_or_email);
    cy.contains(/Invalid|Unable/i).should('exist');
  });

  it('TC-FP-008 (P) Request reset dengan Auto-trim spasi di input', () => {
    fp.requestReset(data.trim_spaces.username_or_email);
    fp.elements.interceptForgotPassword().should('eq', 304);
    cy.contains(/(link|email)/i).should('exist');
  });

  it('TC-FP-009 (P) Case-insensitive username', () => {
    fp.requestReset(data.mixed_case.username_or_email);
    fp.elements.interceptForgotPassword().should('eq', 304);
    cy.contains(/(link|email)/i).should('exist');
  });
});
