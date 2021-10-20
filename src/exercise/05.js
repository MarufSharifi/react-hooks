import * as React from 'react'
import VanillaTilt from 'vanilla-tilt'

function Tilt({children}) {
  const elementRef = React.useRef()

  React.useEffect(() => {
    const tiltNode = elementRef.current
    VanillaTilt.init(tiltNode, {
      max: 25,
      speed: 400,
      glare: true,
      'max-glare': 0.5,
    })

    return () => tiltNode.VanillaTilt.destroy()
  }, [])

  return (
    <div className="tilt-root" ref={elementRef}>
      <div className="tilt-child">{children}</div>
    </div>
  )
}

function App() {
  return (
    <Tilt>
      <div className="totally-centered">vanilla-tilt.js</div>
    </Tilt>
  )
}

export default App
