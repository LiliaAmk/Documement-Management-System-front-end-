describe('SignIn Page (Real Backend)', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/login');
  });

  it('logs in as admin@dms.com and redirects to admin dashboard', () => {
    cy.get('input[type="email"]').type('admin@dms.com', { delay: 100 });
    cy.get('input[type="password"]').type('admin', { delay: 100 });
    cy.wait(500);
    cy.get('button[type="submit"]').click();

    // Debug print before asserting
    cy.window().then(win => {
      console.log('ADMIN - Current URL:', win.location.href);
      console.log('ADMIN - Token:', win.localStorage.getItem('token'));
    });

    cy.url({ timeout: 10000 }).should('eq', 'http://localhost:3000/admin/dashboard');
    cy.window().then(win => {
      expect(win.localStorage.getItem('userType')).to.eq('ROLE_ADMIN');
      expect(win.localStorage.getItem('userEmail')).to.eq('admin@dms.com');
      expect(win.localStorage.getItem('token')).to.exist;
    });
  });

  it('logs in as uu1@ensia.dz and redirects to user files', () => {
    cy.get('input[type="email"]').type('uu1@ensia.dz', { delay: 100 });
    cy.get('input[type="password"]').type('user1', { delay: 100 });
    cy.wait(500);
    cy.get('button[type="submit"]').click();

    cy.window().then(win => {
      console.log('USER - Current URL:', win.location.href);
      console.log('USER - Token:', win.localStorage.getItem('token'));
    });

    cy.url({ timeout: 10000 }).should('eq', 'http://localhost:3000/files');
    cy.window().then(win => {
      expect(win.localStorage.getItem('userType')).to.eq('ROLE_USER');
      expect(win.localStorage.getItem('userEmail')).to.eq('uu1@ensia.dz');
      expect(win.localStorage.getItem('token')).to.exist;
    });
  });

  it('shows error on wrong password', () => {
  cy.get('input[type="email"]').type('admin@dms.com', { delay: 100 });
  cy.get('input[type="password"]').type('wrongpassword', { delay: 100 });
  cy.wait(500);
  cy.get('button[type="submit"]').click();

  // Wait a bit more for error to show
  cy.wait(1500);

  cy.window().then(win => {
    console.log('ERROR CASE - Current URL:', win.location.href);
    console.log('ERROR CASE - Token:', win.localStorage.getItem('token'));
  });

  // Wait up to 5 seconds for error message
  cy.contains('Authentication failed.', { timeout: 5000 }).should('be.visible');
  cy.url().should('eq', 'http://localhost:3000/login');
});

});