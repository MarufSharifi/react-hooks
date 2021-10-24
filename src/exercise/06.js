import * as React from 'react'
import {
  fetchPokemon,
  PokemonForm,
  PokemonInfoFallback,
  PokemonDataView,
} from '../pokemon'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      Error: '',
    }
  }

  static getDerivedStateFromError(error) {
    return {Error: error}
  }

  componentDidCatch(error, errorInfo) {
    console.log('error is: ', error)
  }

  render() {
    if (this.state.Error) {
      return (
        <div role="alert">
          There was an error:{' '}
          <pre style={{whiteSpace: 'normal'}}>{this.state.Error.message}</pre>
        </div>
      )
    }

    return this.props.children
  }
}

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
    throw new Error('api was rejected')
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
        <ErrorBoundary>
          <PokemonInfo pokemonName={pokemonName} />
        </ErrorBoundary>
      </div>
    </div>
  )
}

export default App
