import React from 'react'

const Notification =  ({ error }) => {

  return (
    <div style={{color: 'red'}}>
      {error}
    </div>
  )
}

export default Notification