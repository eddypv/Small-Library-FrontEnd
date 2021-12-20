import React, {useEffect, useState} from 'react'
import {useQuery, useLazyQuery, gql} from '@apollo/client'

export const ALL_BOOKS = gql`
query allBooks($genre: String){
  allBooks(genre: $genre) {
    id
    title
    published
    author{
      name
      id
    }
  }
}
`
const genres = [
  {"value":"refacturing", "title":"Refacturing"},
  {"value":"agile", "title":"agile"},
  {"value":"patterns", "title":"Patterns"},
  {"value":"design", "title":"Design"},
  {"value":"crime", "title":"Crime"},
  {"value":"classic", "title":"Classic"},
  {"value":"", "title":"All Genres"}
]
const Books = (props) => {
  const [getBooks, result] = useLazyQuery(ALL_BOOKS)
  const [books, setBooks] = useState([])
  /*useEffect(()=>{
    getBooks({variables:{genre:""}})
    // eslint-disable-next-line
  }, [])*/
  useEffect(()=>{
    if(result.data){
      setBooks(result.data.allBooks)
    }
     
  },[result])

  if (!props.show) {
    return null
  }
  const filterByGenre = (genre) =>{
    getBooks({variables:{genre}})
  }

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
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      <div>
        {
          genres.map(element=><button  key={element.title} onClick={()=>filterByGenre(element.value)}>{element.title}</button>)
        }
      </div>
    </div>
  )
}

export default Books