import React from 'react'
import {useQuery, gql} from '@apollo/client'

export const ALL_BOOKS = gql`
query allBooks{
  allBooks {
    id
    title
    published
    author
  }
}
`

const Books = (props) => {
  const result = useQuery(ALL_BOOKS)
  if (!props.show) {
    return null
  }
  if(result.loading)
    return <h1>Loading... </h1>

  const books = result.data.allBooks

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(a =>
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Books