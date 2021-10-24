import * as React from 'react'
import {
  fetchPokemon,
  PokemonForm,
  PokemonInfoFallback,
  PokemonDataView,
} from '../pokemon'

function PokemonInfo({pokemonName}) {
  const [state, setState] = React.useState({
    status: 'idle',
    pokemon: null,
    error: '',
  })

  React.useEffect(() => {
    if (pokemonName) {
      setState(prev => {
        return {...prev, status: 'pending'}
      })

      fetchPokemon(pokemonName)
        .then(pokemonData => {
          setState(prev => {
            return {...prev, status: 'resolved', pokemon: pokemonData}
          })
        })
        .catch(error => {
          setState(prev => {
            return {...prev, status: 'rejected', error: error}
          })
        })
    }
  }, [pokemonName])

  const {status, pokemon, error} = state

  if (status === 'idle') {
    return <div>Submit a Pokemon</div>
  }

  if (status === 'pending') {
    return <PokemonInfoFallback name={pokemonName} />
  }

  if (status === 'resolved') {
    return <PokemonDataView pokemon={pokemon} />
  }

  if (status === 'rejected') {
    return (
      <div role="alert">
        There was an error:{' '}
        <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
      </div>
    )
  }
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <PokemonInfo pokemonName={pokemonName} />
      </div>
    </div>
  )
}

export default App
