import './commands';

// Supress error app bawaan agar test tidak gagal karena error JS di app
Cypress.on('uncaught:exception', (err) => {
  console.warn('App error suppressed:', err.message);
  return false; 
});