import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Notification from './components/Notification'





const App = () => {
  const [page, setPage] = useState('authors')
  const [error, setError] = useState(null)
  
  const handleError = (message) => {
    setError(message)
    setTimeout(() => {
      setError(null)
    }, 5000)
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

      <Notification error={error} />

      <Authors
        show={page === 'authors'}
        setError={handleError}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'}
        setError={handleError}
      />

    </div>
  )
}

export default App