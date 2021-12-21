
import React, { useEffect, useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import Login from './components/Login'
import NewBook from './components/NewBook'
import {Recommend}  from './components/Recommed'
import { useApolloClient, useSubscription,gql } from '@apollo/client'
const BOOK_ADDED = gql`
  subscription{
    bookAdded {
      id
      genres
      published
      title
      author {
        id
        name
        born
      }
    }
  }
`
const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState("")
  const client = useApolloClient()
  useSubscription(BOOK_ADDED, {
    onSubscriptionData:({subscriptionData})=>{
      const {data} = subscriptionData
      console.log(data)
      if(data.bookAdded){
        window.alert(`New book creaated :${data.bookAdded.title}`)
        console.log('Subscription',data.bookAdded)
      }
      
    }
  })
  // get token
  useEffect(()=>{
    const tokenSaved = localStorage.getItem("library-token");
    setToken(tokenSaved)

  },[])

  const loginHandle = (newToken)=> {
    localStorage.setItem("library-token", newToken)
    setToken(newToken)
    // setPage("books")
  }
  const logoutHandle = ()=>{
    localStorage.removeItem("library-token")
    setToken("")
    setPage("login")
    client.resetStore()
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {
          token 
            ? <>
                <button onClick={() => setPage('add')}>add book</button>
                <button onClick={() => setPage('recommend')}>Recommend</button>
                <button onClick={logoutHandle}>Logout</button>
              </>
            : <button onClick={() => setPage('login')}>Login</button>
        }
        
      </div>

      <Authors
        show={page === 'authors'}
      />

      <Books
        show={page === 'books'}
      />
      {
        token 
        ?
        <>
          <NewBook show={page === 'add'} />
          <Recommend show={page === 'recommend'}  />
        </>
        : null
      }
      
      <Login 
        show={page === 'login'}
        loginHandle={loginHandle}
      />

    </div>
  )
}

export default App