describe('Login Flow', () => {
  beforeEach(() => {
    cy.visit('/login')
  })

  it('should display the login form with email and password fields', () => {
    cy.contains('h2', 'Inicio de sesion').should('be.visible')
    cy.get('#email').should('be.visible')
    cy.get('#password').should('be.visible')
  })

  it('should show error message on invalid credentials', () => {
    cy.get('#email').type('invalid-user@test.com')
    cy.get('#password').type('wrong-password')
    cy.get('button[type="submit"]').click()
    
    // Check that we are still on the login page
    cy.url().should('include', '/login')
  })

  it('should login successfully with admin credentials and redirect to products', () => {
    cy.get('#email').type('admin@ecommerce.com')
    cy.get('#password').type('adminpassword')
    cy.get('button[type="submit"]').click()

    // Assert redirection to the catalog page
    cy.url().should('include', '/products')
  })
})
