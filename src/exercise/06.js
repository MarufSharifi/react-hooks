import * as React from 'react'
import {
  fetchPokemon,
  PokemonForm,
  PokemonInfoFallback,
  PokemonDataView,
} from '../pokemon'

function PokemonInfo({pokemonName}) {
  const [pokemon, setPokemon] = React.useState(null)
  const [error, setError] = React.useState('')

  React.useEffect(() => {
    if (pokemonName) {
      setPokemon(null)
      setError('')
      fetchPokemon(pokemonName)
        .then(pokemonData => {
          setPokemon(pokemonData)
        })
        .catch(error => {
          setError(error)
        })
    }
  }, [pokemonName])

  return (
    <div>
      {pokemonName ? (
        pokemon ? (
          <PokemonDataView pokemon={pokemon} />
        ) : (
          <PokemonInfoFallback name={pokemonName} />
        )
      ) : (
        'Submit a pokemon'
      )}
      {error ? (
        <div role="alert">
          There was an error:{' '}
          <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
        </div>
      ) : null}
    </div>
  )
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
