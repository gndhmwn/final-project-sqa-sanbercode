export class DirectoryPage {
  elements = {
    menuDirectory: () => cy.get('a[href*="/web/index.php/directory/viewDirectory"]'),
    nameInput: () => cy.get('input[placeholder="Type for hints..."]'),
    
    // TIPS: Selektor .eq(0) dan .eq(1) ini rapuh.
    // Akan lebih baik jika menggunakan labelnya, contoh:
    // jobTitleDropdown: () => cy.contains('.oxd-input-group', 'Job Title').find('.oxd-select-text-input'),
    // locationDropdown: () => cy.contains('.oxd-input-group', 'Location').find('.oxd-select-text-input'),
    
    jobTitleDropdown: () => cy.get('div.oxd-select-text-input').eq(0),
    locationDropdown: () => cy.get('div.oxd-select-text-input').eq(1),
    
    searchBtn: () => cy.contains('button', 'Search'),
    resetBtn: () => cy.contains('button', 'Reset'),
    resultCards: () => cy.get('.orangehrm-directory-card'), 
    noRecords: () => cy.contains('No Records Found')
  };

  open() {
    this.elements.menuDirectory().click();
    cy.url().should('include', '/directory/viewDirectory');
  }

  // --- PERBAIKAN DI SINI ---

  /**
   * Fungsi ini HANYA mengetik di input, TIDAK memilih dari dropdown.
   * Didesain untuk tes di mana Anda ingin mengetik dan klik "Search".
   * (Contoh: tes "Pencarian tidak ditemukan").
   * @param {string} value - Teks untuk diketik
   */
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
      return; // Keluar jika tidak ada value
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