import * as React from 'react'
import {
  fetchPokemon,
  PokemonForm,
  PokemonInfoFallback,
  PokemonDataView,
} from '../pokemon'

function PokemonInfo({pokemonName}) {
  const [pokemon, setPokemon] = React.useState(null)
  const [status, setStatus] = React.useState('idle')
  const [error, setError] = React.useState('')

  React.useEffect(() => {
    if (pokemonName) {
      setStatus('pending')
      setPokemon(null)
      setError('')
      fetchPokemon(pokemonName)
        .then(pokemonData => {
          setPokemon(pokemonData)
          setStatus('resolved')
        })
        .catch(error => {
          setStatus('rejected')
          setError(error)
        })
    }
  }, [pokemonName])

  console.log('status: ', status)
  console.log('render: ', pokemon)

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
