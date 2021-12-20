import React, { useEffect, useState } from 'react'
import  { gql, useLazyQuery, useQuery} from '@apollo/client'
import { ALL_BOOKS } from './Books'
const ME = gql`
query me{
  me {
    id
    username
    favoriteGenre
  }
}
`
export const BOOKS_RECOMMED = gql`
query booksRecommed($genre:String){
  allBooks(genre: $genre) {
    id
    genres
    published
    author{
      name
    }
    title
  }
}  
`
export const Recommend = (props) =>{
  const result= useQuery(ME);
  const [filterBooks, resultBooks] = useLazyQuery(BOOKS_RECOMMED)
  const [books, setBooks] = useState([])
  
  useEffect(()=>{
    if(resultBooks.data){
      setBooks(resultBooks.data.allBooks)
    }
  }, [resultBooks.data])
  useEffect(()=>{
    if(result.data){
      filterBooks({variables:{genre:result.data.me.favoriteGenre}})
    }
      
    // eslint-disable-next-line
  }, [ result.data])
  if(!props.show)
    return null;

  if(result.loading){
    return (<h3>Loading...</h3>)
  }
  
  
  
  return(
  <div>
    <h2>recommendations</h2>
    <p>Books in your favorite genre <b>{result.data.me.favoriteGenre}</b></p>
    <table>
      <thead>
        <tr>
            <td> </td>
            <td><b>author</b></td>
            <td><b>published</b></td>
        </tr>
      </thead>
      <tbody>
      {books.map((element)=>{
        return <tr key={element.id}>
          <td>{element.title}</td>
          <td>{element.author.name}</td>
          <td>{element.published}</td>
        </tr>
      })}
      </tbody>
    </table>
  </div>) 
}

