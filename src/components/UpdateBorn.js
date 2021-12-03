import React, {useState} from "react"
import {gql, useMutation} from '@apollo/client'

const UPDATE_BORN = gql`
mutation editAuthor($name: String!, $setBornTo: Int!){
    editAuthor(name: $name, setBornTo: $setBornTo) {
      id
      born
    }
  }
`
const UpdateBorn =({authors})=>{
    const [name, setName] = useState("")
    const [born, setBorn] = useState("")
    const [updateBorn] = useMutation(UPDATE_BORN)
    
    const onSubmit = (event) =>{
        event.preventDefault();
        const setBornTo= parseInt(born)
        updateBorn({
            variables:{name, setBornTo}
        })
    }
    return(
        <form onSubmit={onSubmit}>
            <h2>Set birthyear </h2>
            <div>
                <select name="name" placeholder="Name" value={name} onChange={(event) =>  setName(event.target.value)} >
                    {
                        authors.map(element =>{
                            return(
                                <option key={element.id} value={element.name}>{element.name}</option>
                            ) 
                        })
                    }
                </select>
            </div>
            <div>
                <input name="born" placeholder="Born" value={born} onChange={(event) =>  setBorn(event.target.value)}/>
            </div>
            <div>
                <button>Update</button>
            </div>
        </form>

    ) 
}
export default UpdateBorn