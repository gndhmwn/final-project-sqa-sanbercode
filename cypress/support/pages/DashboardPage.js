export class DashboardPage {
  elements = {
    topbarUser: () => cy.get('.oxd-userdropdown-name'),
    dashboardHeader: () => cy.contains('h6', 'Dashboard'),
    toastSuccess: () => cy.get('.oxd-toast--success').should('be.visible')
  };

  assertLoggedIn() {
    this.elements.dashboardHeader().should('be.visible');
    this.elements.topbarUser().should('be.visible');
  }
}
