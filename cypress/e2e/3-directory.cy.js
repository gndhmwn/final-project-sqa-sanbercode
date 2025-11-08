import { LoginPage } from '../support/pages/LoginPage';
import { DirectoryPage } from '../support/pages/DirectoryPage';
import { DashboardPage } from '../support/pages/DashboardPage';

describe('OrangeHRM - Directory Suite', () => {
  const lp = new LoginPage();
  const dp = new DirectoryPage();
  const db = new DashboardPage();

  let creds, dir;

  before(() => {
    cy.fixture('credentials.json').then(c => creds = c);
    cy.fixture('directory-data.json').then(d => dir = d);
  });

  beforeEach(() => {
    lp.visit();
    dp.interceptDirSearchRequest();
    lp.login(creds.valid.username, creds.valid.password);
    db.assertLoggedIn();
    dp.open();

  });

  it('TC-DIR-001 (P) Cari by partial name', () => {
    dp.typeAndSelectName(dir.search_name_partial.name);
    dp.search();
    dp.elements.interceptDirSearch().should('eq', 200);
    dp.elements.resultCards().should('exist');
  });

  it('TC-DIR-002 (P) Filter by Job Title', () => {
    dp.selectJobTitle(dir.search_job_title_valid.jobTitle);
    dp.search();
    dp.elements.interceptDirSearch().should('eq', 200);
    dp.elements.resultCards().should('exist');
  });

  it('TC-DIR-003 (P) Filter by Location', () => {
    dp.selectLocation(dir.search_location_valid.location);
    dp.search();
    dp.elements.interceptDirSearch().should('eq', 200);
    dp.elements.resultCards().should('exist');
  });

  it('TC-DIR-004 (N) Pencarian tidak ditemukan', () => {
    dp.typeNameOnly(dir.search_not_found.name);
    dp.search();
    dp.elements.interceptDirSearch().should('eq', 200);
    dp.elements.noRecords().should('be.visible');
  });

  it('TC-DIR-005 (N) Blank semua filter + klik Search', () => {
    dp.typeNameOnly(dir.blank_all.name);
    dp.selectJobTitle(dir.blank_all.jobTitle);
    dp.selectLocation(dir.blank_all.location);
    dp.search();
    dp.elements.interceptDirSearch().should('eq', 200);
    dp.elements.resultCards().should('exist');
  });

  it('TC-DIR-006 (P) Reset menghapus filter', () => {
    dp.typeAndSelectName(dir.search_name_partial.name);
    dp.search();
    dp.reset();
    dp.elements.interceptDirSearch().should('eq', 200);
    dp.elements.nameInput().should('have.value', '');
    dp.elements.jobTitleDropdown().should('not.contain.text');
    dp.elements.locationDropdown().should('not.contain.text');
  });
});