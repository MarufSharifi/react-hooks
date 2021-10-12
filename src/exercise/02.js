import * as React from 'react'

function useLocalStorageState(
  key,
  defaultValue,
  {serialize = JSON.stringify, deserialize = JSON.parse} = {},
) {
  const [state, setState] = React.useState(() =>
    deserialize(window.localStorage.getItem(key)) ||
    typeof defaultValue === 'function'
      ? defaultValue()
      : defaultValue,
  )

  const previousKey = React.useRef(key)

  React.useEffect(() => {
    if (key !== previousKey.current) {
      window.localStorage.removeItem(previousKey)
    }
    previousKey.current = key
    window.localStorage.setItem(key, serialize(state))
  }, [state, serialize, key])

  return [state, setState]
}

function Greeting({initialName = ''}) {
  const [name, setName] = useLocalStorageState('name', initialName)

  function handleChange(event) {
    setName(event.target.value)
  }
  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting />
}

export default App
