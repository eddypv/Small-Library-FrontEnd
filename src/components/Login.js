import React,{useState}  from "react"
import {useMutation, gql} from '@apollo/client'
const LOGIN = gql`
mutation login($username: String!, $password: String!){
  login(username: $username, password: $password) {
    value
  }
}
`
const Login = (props)=>{
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [login] = useMutation(LOGIN)
  if(!props.show)
    return null
  const handlerSubmit = async (event)=>{
    event.preventDefault()
    const result =await login({
      variables:{username, password}
    })
    if(result.data.login.value){
      props.loginHandle(result.data.login.value)
      setUserName('')
      setPassword('')
    }
  }
  return(
      <div>
        <form onSubmit={handlerSubmit}>
          <div>
            <label>Username</label>  <input name="username" type="text" value={username} onChange={(event)=> setUserName(event.target.value)}/>
          </div>
          <div>
            <label>Password</label>  <input name="password" type="text" value ={password} onChange={(event)=> setPassword(event.target.value)}/>
          </div>
          <div> 
            <button>Log In</button>
          </div>
        </form>
      </div>
  ) 
}

export default Login