import React from 'react'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import '@testing-library/jest-dom/extend-expect'
import App from '../src/App'

// const getRandomPhoneNumber = () => {
//   let start = Math.floor(Math.random() * 1000).toString().padStart(3, '0')
//   let end =  Math.floor(Math.random() * 100000000).toString().padStart(8, '0')
//   return `${start}-${end}`
// }

describe('<App />', () => {

  it('should render headings', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    )
    expect(screen.getByText('Phonebook')).toBeVisible()
    expect(screen.getByText('Numbers')).toBeVisible()
    expect(screen.getByText('add')).toBeVisible()
  })

  // it('new personform works', async () => {
  //   // const user = userEvent.setup()
  //   const newUser = 'Maija' + Math.floor(Math.random() * 1000000000)
  //   const newNumber = getRandomPhoneNumber()
  //   const addPerson = jest.fn()

  //   render(
  //     <BrowserRouter>
  //       <PersonForm submit={addPerson} />
  //     </BrowserRouter>
  //   )
  //   // const user = userEvent.setup()

  //   const inputName = screen.getByPlaceholderText('new person')
  //   const inputNumber = screen.getByPlaceholderText('new number')
  //   const sendButton = screen.getByText('add')

  //   await userEvent.type(inputName, newUser)
  //   await userEvent.type(inputNumber, newNumber)
  //   screen.debug()
  //   await userEvent.click(sendButton)

  //   expect(addPerson.mock.calls).toHaveLength(1)
  //   // expect(screen.getByText(newUser)).toBeVisible()
  //   // expect(screen.getByText(newNumber)).toBeVisible()
  // })
})
