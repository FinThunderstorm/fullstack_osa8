import React, { useState, useEffect } from 'react'

import { useQuery, useMutation } from '@apollo/client'

import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS)
  const [ changeBorn, bornResult ] = useMutation(EDIT_AUTHOR, { refetchQueries: [ { query: ALL_AUTHORS}], onError: (error) => {
    props.setError(error.graphQLErrors[0].message)
  }})
  const [ name, setName ] = useState('')
  const [ born, setBorn ] = useState('')

  useEffect(() => {
    if(bornResult.data && bornResult.data.editAuthor === null) {
      props.setError('author not found')
    }
  }, [bornResult.data]) // eslint-disable-line

  if(result.loading){
    return null
  }

  

  const authors = result.data.allAuthors

  const handleBorn = async (event) => {
    event.preventDefault()

    changeBorn({ variables: { name: name, setBornTo: Number(born) } })

    setName('')
    setBorn('')
  }

  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      
      <h2>Set birthyear</h2>
      <form onSubmit={handleBorn}>
        <div>
          <input value={name} onChange={(event) => setName(event.target.value)} />
        </div>
        <div>
          born
          <input type='number' value={born} onChange={(event) => setBorn(event.target.value)}/>
        </div>
        <div>
          <button type='submit'>set</button>
        </div>
      </form>
      
    </div>
  )
}

export default Authors