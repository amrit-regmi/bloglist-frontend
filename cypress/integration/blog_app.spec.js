describe('Blog app', () => {
  beforeEach(function(){
    cy.request('POST','http://localhost:3000/api/tests/reset')
    const user = {
      'name': 'Test User',
      'username': 'testuser',
      'password': 'testPassword'
    }
    cy.createUser(user)
    cy.visit('http://localhost:3000')
  })

  it('LoginForm is shown on Start', () => {
    cy.contains('Login to Application')
  })

  describe('Login', function(){
    it('succeds with valid credentials', function(){
      cy.get('#username').type('testuser')
      cy.get('#password').type('testPassword')
      cy.get('#submit').click()
    })

    it('fails with invalid credentials and noification color is red', function(){
      cy.get('#username').type('changedtestuser')
      cy.get('#password').type('testPassword')
      cy.get('#submit').click()
      cy.get('.error').should('have.css', 'color','rgb(255, 0, 0)')
    })

  })

  describe.only('When logged in', function() {
    beforeEach(function() {
      cy.login({ username:'testuser',password:'testPassword' })
    })

    it('A blog can be created', function() {
      cy.contains('Add new Entry').click()
      cy.get('[name = "title"]').type('test title')
      cy.get('[name = "author"]').type('test author')
      cy.get('[name = "url"]').type('test url')
      cy.get('#btn_create').click()
      cy.contains('test title by test author')
    })

    it('A blog can be liked',function(){
      cy.createBlog({ title:'test title',author:'test author',url:'testurl' })
      cy.get('#btn_showDetail').click()
      cy.get('#btn_like').click()
      cy.contains('Likes: 1')
    })

    it('A blog can be deleted by user who created it',function(){
      cy.createBlog({ title:'test title',author:'test author',url:'testurl' })
      cy.get('#btn_showDetail').click()
      cy.get('#btn_delete').click()
      cy.get('.success').should('exist')
      cy.get('.blog').should('not.exist')

    })

    it('A blog cannot be deleted by other user',function(){
      cy.login({ username:'testuser',password:'testPassword' })
      cy.createBlog({ title:'test title',author:'test author',url:'testurl' })

      const user = {
        'name': 'Test User',
        'username': 'newuser',
        'password': 'testPassword'
      }
      cy.createUser(user)
      cy.login({ username:'newuser',password:'testPassword' })
      cy.get('#btn_showDetail').click()
      cy.get('#btn_delete').should('not.exist')
    })

    it('Bloglist should be sorted according to likes', function(){
      cy.createBlog({ title:'test title 1',author:'test author 1',url:'testurl 1', likes:6 })
      cy.createBlog({ title:'test title 2',author:'test author 2',url:'testurl 2', likes:10 })
      cy.createBlog({ title:'test title 3',author:'test author 3',url:'testurl 3',likes:1 })
      cy.get('.likes').then( function(likes) {
        return likes.map(function(index,like){
          return (Cypress.$(like).text())
        }).get()
      }).should('deep.eq',['10','6','1'])
    })

  })

})