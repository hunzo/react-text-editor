import { useState } from 'react'
import './CustomButton.css'

interface Props {
  onMouseDown: (e: any) => void
}

export const CustomButton: React.FC<Props> = ({ children }) => {
  const [toggle, setToggle] = useState(true)
  return (
    <span
      className={toggle ? 'myButton' : 'activeButton'}
      onClick={() => setToggle(!toggle)}
    >
      {children}
    </span>
  )
}
