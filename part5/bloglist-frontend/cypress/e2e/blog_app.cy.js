describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    // cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      username: 'tomas',
      name: 'tomas',
      password: 'tomas'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    // baseUrl for the application is defined in the Cypress pre-generated configuration file cypress.config.js
    cy.visit('')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
    cy.contains('username')
    cy.get('#username').type('tomas')
    cy.contains('password')
    cy.get('#password').type('tomas')
    cy.contains('login')
    cy.get('#login_btn')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('tomas')
      cy.get('#password').type('tomas')
      cy.get('#login_btn').click()
      cy.contains('tomas logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('tomas')
      cy.get('#password').type('tmshts')
      cy.get('#login_btn').click()
      cy.get('.error_message')
        .should('contain', 'Wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')
        .and('not.have.css', 'display', 'none')
      // cy.get('.error_message').should('contain', 'Wrong username or password')
      // cy.get('.error_message').should('have.css', 'color', 'rgb(255, 0, 0)')
      // cy.get('.error_message').should('have.css', 'border-style', 'solid')
      // cy.get('.error_message').should('not.have.css', 'display', 'none')

    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'tomas', password: 'tomas' })
    })

    it('A blog can be created', function() {
      cy.createBlog({ title: 'new title', author: 'new author', url: 'new url' })
      cy.contains('new title new author')
      cy.get('.view_btn').click()
      cy.get('.url_and_likes_div')
        .should('contain', 'new url')
        .should('contain', 'likes')
        .should('contain', 0)
        .get('.like_btn').click()
      cy.contains(1)
      cy.get('.delete_btn').should('have.css', 'color', 'rgb(255, 255, 255)')
    })
  })

})