describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    // cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user_1 = {
      username: 'tomas',
      name: 'tomas',
      password: 'tomas'
    }
    const user_2 = {
      username: 'tmshts',
      name: 'tmshts',
      password: 'tmshts'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user_1)
    cy.request('POST', 'http://localhost:3003/api/users/', user_2)
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
      cy.get('.delete_btn').should('have.css', 'color', 'rgb(255, 255, 255)')
    })

    it('Users can like a particular blog', function() {
      cy.createBlog({ title: 'title 1', author: 'author 1', url: 'url 1' })
      cy.createBlog({ title: 'title 2', author: 'author 2', url: 'url 2' })
      cy.createBlog({ title: 'title 3', author: 'author 3', url: 'url 3' })
      cy.contains('title 2 author 2').parent().as('particular_div')
      cy.get('@particular_div').find('.view_btn').click()
      cy.get('@particular_div').find('.likes_number').should('contain', 0)
      cy.get('@particular_div').find('.like_btn').click()
      cy.get('@particular_div').find('.likes_number').should('contain', 1)
    })

    it('User who created a blog can delete it.', function() {
      cy.createBlog({ title: 'title 2', author: 'author 2', url: 'url 2' })
      cy.contains('title 2 author 2').parent().as('particular_div')
      cy.get('@particular_div').find('.view_btn').click()
      cy.get('@particular_div').find('.delete_btn').click()
    })

    it('Only the creator can see the delete button of a blog, not anyone else.', function() {
      cy.createBlog({ title: 'title 1', author: 'author 1', url: 'url 1' })
      cy.createBlog({ title: 'title 2', author: 'author 2', url: 'url 2' })
      cy.createBlog({ title: 'title 3', author: 'author 3', url: 'url 3' })
      cy.contains('title 2 author 2').parent().as('particular_div')
      cy.get('@particular_div').find('.view_btn').click()
      cy.get('@particular_div').should('contain', 'delete')
      //cy.get('@particular_div').find('.delete_btn')
      cy.get('.log_out').click()

      cy.login({ username: 'tmshts', password: 'tmshts' })
      cy.get('@particular_div').find('.view_btn').click()
      cy.get('@particular_div').should('not.contain', 'delete')
    })

    it('Blogs are ordered according to likes with the blog with the most likes being first.', function() {
      cy.createBlog({ title: 'title 1', author: 'author 1', url: 'url 1' })
      cy.createBlog({ title: 'title 2', author: 'author 2', url: 'url 2' })
      cy.createBlog({ title: 'title 3', author: 'author 3', url: 'url 3' })
      cy.contains('title 1 author 1').parent().as('div_1')
      cy.contains('title 2 author 2').parent().as('div_2')
      cy.contains('title 3 author 3').parent().as('div_3')

      cy.get('@div_1').find('.view_btn').click()
      cy.get('@div_2').find('.view_btn').click()
      cy.get('@div_3').find('.view_btn').click()

      cy.get('@div_2').find('.likes_number').should('contain', 0)
      cy.get('@div_2').find('.like_btn').click()
      cy.wait(200)
      cy.get('@div_2').find('.likes_number').should('contain', 1)
      cy.get('@div_2').find('.like_btn').click()
      cy.wait(200)
      cy.get('@div_2').find('.likes_number').should('contain', 2)


      cy.get('@div_3').find('.likes_number').should('contain', 0)
      cy.get('@div_3').find('.like_btn').click()
      cy.wait(200)
      cy.get('@div_3').find('.likes_number').should('contain', 1)

      cy.get('.blog').eq(0).should('contain', 'title 2 author 2')
      cy.get('.blog').eq(1).should('contain', 'title 3 author 3')
      cy.get('.blog').eq(2).should('contain', 'title 1 author 1')
    })
  })
})