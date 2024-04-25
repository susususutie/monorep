import { Button } from 'antd'
import { useState } from 'react'
import { MyButton } from '../lib'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Button type='primary' onClick={() => setCount((count) => count + 1)}>
        count is {count}
      </Button>
      <MyButton type='primary' onClick={() => setCount((count) => count + 1)}>
        count is {count}
      </MyButton>
    </>
  )
}

export default App
