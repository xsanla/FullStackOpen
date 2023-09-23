describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:5173')
  })

  it('Login form is shown', function () {
    cy.contains("log in to application")
  })

  describe('Login', function () {
    beforeEach(function () {
      const user = {
        name: "tester",
        username: "megaTest",
        password: "1234"
      }
      cy.request('POST', 'http://localhost:3003/api/users', user)
      cy.visit('http://localhost:5173')

    })
    it('succeeds with correct credentials', function () {
      cy.get('#username').type("megaTest")
      cy.get("#password").type("1234")
      cy.get("#loginButton").click()

      cy.contains("tester logged in")
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type("gigaTest")
      cy.get("#password").type("1234")
      cy.get("#loginButton").click()

      cy.get(".message").contains("Request failed with status code 401")
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      const user = {
        name: "tester",
        username: "megaTest",
        password: "1234"
      }
      cy.request('POST', 'http://localhost:3003/api/users', user)
      cy.request('POST', 'http://localhost:3003/api/login', {
        username: "megaTest", password: "1234"
      }).then(response => {
        localStorage.setItem('loggedBlogappUser', JSON.stringify(response.body))
        cy.visit('http://localhost:5173')
      })

    })

    it('A blog can be created', function () {
      cy.get(".toggleButton").click()
      cy.get(".title").type("testTitle")
      cy.get(".author").type("testAuthor")
      cy.get(".url").type("testUrl")

      cy.get(".createButton").click()
      cy.contains("testTitle testAuthor")
    })

    it('A blog can be liked', function () {
      cy.get(".toggleButton").click()
      cy.get(".title").type("testTitle")
      cy.get(".author").type("testAuthor")
      cy.get(".url").type("testUrl")

      cy.get(".createButton").click()


      cy.contains("testTitle testAuthor")
        .contains('view').click()

      cy.get(".details")
        .contains("like").click()
      cy.get(".details")
        .contains("Likes: 1")

    })
    it('A blog can be removed by the user who created it', function () {
      cy.get(".toggleButton").click()
      cy.get(".title").type("testTitle")
      cy.get(".author").type("testAuthor")
      cy.get(".url").type("testUrl")
      cy.get(".createButton").click()

      cy.contains("testTitle testAuthor")
        .contains('view').click()

      cy.get(".details")
        .contains("remove")
        .click()
      cy.on('window:confirm', () => true)
      cy.visit("http://localhost:5173")
      cy.get('html').should('not.contain', 'testTitle testAuthor')
    })

    it('A remove button is only visible to the user who created blog', function () {
      cy.get(".toggleButton").click()
      cy.get(".title").type("testTitle")
      cy.get(".author").type("testAuthor")
      cy.get(".url").type("testUrl")
      cy.get(".createButton").click()

      cy.contains("testTitle testAuthor")
        .contains('view').click()
      cy.get(".details")
        .contains("remove")

      cy.get("#logout").click()

      const user = {
        name: "tester1",
        username: "megaTest1",
        password: "1234"
      }
      cy.request('POST', 'http://localhost:3003/api/users', user)
      cy.request('POST', 'http://localhost:3003/api/login', {
        username: "megaTest1", password: "1234"
      }).then(response => {
        localStorage.setItem('loggedBlogappUser', JSON.stringify(response.body))
        cy.visit('http://localhost:5173')
      })

      cy.contains("testTitle testAuthor")
        .contains('view').click()
      cy.get(".details")
        .should("not.contain", "remove")
    })

    it("Blogs are displayed in the order of most likes", function () {
      cy.get(".toggleButton").click()
      cy.get(".title").type("testTitle")
      cy.get(".author").type("testAuthor")
      cy.get(".url").type("testUrl")

      cy.get(".createButton").click()

      cy.get(".toggleButton").click()
      cy.get(".title").type("testTitle1")
      cy.get(".author").type("testAuthor1")
      cy.get(".url").type("testUrl")

      cy.get(".createButton").click()

      cy.contains("testTitle1 testAuthor1")
        .contains('view').click()
      cy.contains("testTitle1 testAuthor1")
        .contains("like").click()
      cy.contains("testTitle1 testAuthor1")
        .contains("like").click()

      cy.visit("http://localhost:5173")
      cy.get('.blog').eq(0).should('contain', 'testTitle1 testAuthor1')
      cy.get('.blog').eq(1).should('contain', 'testTitle testAuthor')
    })
  })
})