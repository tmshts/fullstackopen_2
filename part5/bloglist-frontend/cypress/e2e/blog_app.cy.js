describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:5173')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
    cy.contains('username')
    cy.get('#username').type('mluukkai')
    cy.contains('password')
    cy.get('#password').type('salainen')
    cy.contains('login')
    cy.get('#login_btn')
  })
})