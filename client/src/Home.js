import React, {useState, useEffect} from 'react'
import axios from 'axios'

const Home = (props) => {
    //const[user, setUser] = useState(null)
    const[name, setName] = useState(null)
    const getUser = async () => {
        const res = await axios.get('https://secret-crag-15800.herokuapp.com/auth', {
            headers:{
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
           
        })
        //setUser(res.data)
        setName(res.data.name)
        //console.log(res.data)
    }

    useEffect(() => {
       getUser();
    })
    const logout = () => {
        localStorage.removeItem("token")
        props.history.push('/login')
    }
    return (
        <div className="m-5">
        <div className="jumbotron">
          <p className="lead">Welcome {name}</p>
          <button className="btn btn-danger" onClick={logout}>
            Logout
          </button>
        </div>
      </div>
    )
}

export default Home
