import { LoginPage } from '../pages/LoginPage';

Cypress.Commands.add('loginAs', (username, password) => {
  const lp = new LoginPage();
  lp.visit();
  lp.login(username, password);
});
