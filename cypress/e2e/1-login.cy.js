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
    lp.interceptLoginRequest();
  });

  it('TC-LGN-001 (P) Login dengan kredensial valid', () => {
    lp.login(creds.valid.username, creds.valid.password);
    lp.elements.interceptLogin().should('eq', 304);
    db.assertLoggedIn();
  });

  it('TC-LGN-002 (N) Login dengan Username invalid', () => {
    lp.login(creds.invalid_user.username, creds.invalid_user.password);
    lp.elements.interceptLogin().should('eq', 304);
    lp.elements.errorToast().should('be.visible');
  });

  it('TC-LGN-003 (N) Login dengan Password invalid', () => {
    lp.login(creds.invalid_pass.username, creds.invalid_pass.password);
    lp.elements.interceptLogin().should('eq', 304);
    lp.elements.errorToast().should('contain.text', 'Invalid credentials');
  });

  it('TC-LGN-004 (N) Login dengan Username kosong', () => {
    lp.login(creds.blank_user.username, creds.blank_user.password);
    lp.elements.errorField().should('be.visible');
  });

  it('TC-LGN-005 (N) Login dengan Password kosong', () => {
    lp.login(creds.blank_pass.username, creds.blank_pass.password);
    lp.elements.errorField().should('be.visible');
  });

  it('TC-LGN-006 (N) Login dengan Username & Password kosong', () => {
    lp.login(creds.blank_both.username, creds.blank_both.password);
    lp.elements.errorField().should('be.visible');
  });

  it('TC-LGN-007 (N) Login dengan SQL Injection payload di username', () => {
    lp.login(creds.sql_injection.username, creds.sql_injection.password);
    lp.elements.interceptLogin().should('eq', 304);
    lp.elements.errorToast().should('be.visible');
  });

  it('TC-LGN-008 (N) Login dengan XSS payload di username', () => {
    lp.login(creds.xss_attempt.username, creds.xss_attempt.password);
    lp.elements.interceptLogin().should('eq', 304);
    lp.elements.errorToast().should('be.visible');
  });
});
