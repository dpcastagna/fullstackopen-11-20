describe('Phonebook', function() {
  it('front page can be opened', function() {
    cy.visit('http://localhost:3001')
    cy.contains('Phonebook')
    cy.contains('Numbers')
  })
  it('/info returns ok', function() {
    cy.visit('http://localhost:3001/info')
    cy.contains('has info for')
  })
  it('new person can be added', function() {
    const getRandomPhoneNumber = () => {
      let start = Math.floor(Math.random() * 1000).toString().padStart(3, '0')
      let end =  Math.floor(Math.random() * 100000000).toString().padStart(8, '0')
      return `${start}-${end}`
    }
    const newUser = 'Maija' + Math.floor(Math.random() * 1000000000)
    const newNumber = getRandomPhoneNumber()

    cy.visit('http://localhost:3001')
    cy.get('#nameInput').type(newUser)
    cy.get('#numberInput').type(newNumber)
    cy.get('#addButton').click()
    cy.contains(newUser)
  })
})