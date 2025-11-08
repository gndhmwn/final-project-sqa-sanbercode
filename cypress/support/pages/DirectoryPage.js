export class DirectoryPage {
  elements = {
    menuDirectory: () => cy.get('a[href*="/web/index.php/directory/viewDirectory"]'),
    nameInput: () => cy.get('input[placeholder="Type for hints..."]'),
    jobTitleDropdown: () => cy.get('div.oxd-select-text-input').eq(0),
    locationDropdown: () => cy.get('div.oxd-select-text-input').eq(1),
    searchBtn: () => cy.contains('button', 'Search'),
    resetBtn: () => cy.contains('button', 'Reset'),
    interceptDirSearch: () => cy.wait('@directorySearch').its('response.statusCode'),
    resultCards: () => cy.get('.orangehrm-directory-card'), 
    // noRecords: () => cy.contains('No Records Found')
    noRecords: () => cy.contains('Invalid')
  };

  open() {
    this.elements.menuDirectory().click();
    cy.url().should('include', '/directory/viewDirectory');
  }

  interceptDirSearchRequest() {
    cy.intercept('GET', '**/api/v2/directory/employees?limit=14&offset=0').as('directorySearch');
  }

  typeNameOnly(value) {
    const input = this.elements.nameInput();
    input.clear();

    if (value && value.trim() !== '') {
      input.type(value.trim());
      input.type('{esc}'); 
    }
  }

  typeAndSelectName(value) {
    const input = this.elements.nameInput();
    input.clear();
  
    if (!value || value.trim() === '') {
      return;
    }

    input.type(value);

    cy.get('[role="listbox"]')
      .should('be.visible')
      .find('[role="option"]')
      .contains(value) 
      .click();
  }

  selectJobTitle(visibleText) {
    if (!visibleText) return;
    this.elements.jobTitleDropdown().click();
    cy.contains('.oxd-select-dropdown .oxd-select-option', visibleText).click();
  }

  selectLocation(visibleText) {
    if (!visibleText) return;
    this.elements.locationDropdown().click();
    cy.contains('.oxd-select-dropdown .oxd-select-option', visibleText).click();
  }

  search() {
    this.elements.searchBtn().click();
  }

  reset() {
    this.elements.resetBtn().click();
  }
}