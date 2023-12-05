import React from 'react'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import '@testing-library/jest-dom/extend-expect'
import App from '../src/App'


// const pokemonList = [{
//   url: 'https://pokeapi.co/api/v2/pokemon/1/',
//   name: 'bulbasaur',
//   id: 1
// }, {
//   url: 'https://pokeapi.co/api/v2/pokemon/133/',
//   name: 'eevee',
//   id: 133
// }]

describe('<App />', () => {
  it('should render items', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    )
    expect(screen.getByText('Phonebook')).toBeVisible()
    expect(screen.getByText('Numbers')).toBeVisible()
  })
})
