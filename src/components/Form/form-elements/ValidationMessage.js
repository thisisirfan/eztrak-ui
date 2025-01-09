import React from 'react'
import "./ValidationMessage.scss";
const ValidationMessage = ({children,...props}) => {
  return (
      <div {...props}>{children}</div>
  )
}

export default ValidationMessage