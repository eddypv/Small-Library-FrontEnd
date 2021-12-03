  
import React from 'react'
import {useQuery, gql} from '@apollo/client' 
import UpdateBorn from './UpdateBorn'
const ALL_AUTHORS =gql `
query allAuthors{
    allAuthors {
      id
      born
      bookCount
      name
    }
}
`


const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS)
  if (!props.show) {
    return null
  }
  if(result.loading)
    return <h1>Loading ....</h1>

  const authors = result.data.allAuthors

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
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <UpdateBorn authors={authors}/>
    </div>
  )
}

export default Authors
