import { LoginPage } from '../support/pages/LoginPage';
import { DashboardPage } from '../support/pages/DashboardPage';

describe('OrangeHRM - Login Suite', () => {
  const lp = new LoginPage();
  const db = new DashboardPage();

  let creds;

  before(() => {
    cy.fixture('credentials.json').then((c) => creds = c);
  });

  beforeEach(() => {
    lp.visit();
  });

  it('TC-LGN-001 (P) Login dengan kredensial valid', () => {
    lp.login(creds.valid.username, creds.valid.password);
    db.assertLoggedIn();
  });

  it('TC-LGN-002 (N) Username salah', () => {
    lp.login(creds.invalid_user.username, creds.invalid_user.password);
    lp.elements.errorToast().should('be.visible');
  });

  it('TC-LGN-003 (N) Password salah', () => {
    lp.login(creds.invalid_pass.username, creds.invalid_pass.password);
    lp.elements.errorToast().should('contain.text', 'Invalid credentials');
  });

  it('TC-LGN-004 (N) Username kosong', () => {
    lp.login(creds.blank_user.username, creds.blank_user.password);
    lp.elements.errorField().should('be.visible');
  });

  it('TC-LGN-005 (N) Password kosong', () => {
    lp.login(creds.blank_pass.username, creds.blank_pass.password);
    lp.elements.errorField().should('be.visible');
  });

  it('TC-LGN-006 (N) Username & Password kosong', () => {
    lp.login(creds.blank_both.username, creds.blank_both.password);
    lp.elements.errorField().should('be.visible');
  });

  it('TC-LGN-007 (N) SQL Injection payload di username', () => {
    lp.login(creds.sql_injection.username, creds.sql_injection.password);
    lp.elements.errorToast().should('be.visible');
  });

  it('TC-LGN-008 (N) XSS payload di username', () => {
    lp.login(creds.xss_attempt.username, creds.xss_attempt.password);
    lp.elements.errorToast().should('be.visible');
  });

  
});
