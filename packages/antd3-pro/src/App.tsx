import  { useState } from 'react'
import './App.css'
import { MyButton } from '../lib'
import { Button } from 'antd'
import 'antd/dist/antd.css'

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
