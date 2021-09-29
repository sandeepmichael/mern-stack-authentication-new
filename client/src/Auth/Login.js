import React, { useState} from 'react'
import{Link} from 'react-router-dom'
import axios from 'axios'
import Error from '../Error'
import Google from './Google'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  
  const handleSubmit = async (e) => {
      e.preventDefault()
      const user = {
        email,
        password
      }
      try {
        const res = await axios.post('http://localhost:5000/auth/login', user)

        localStorage.setItem('token', res.data.token)
        window.location.href = '/'
        
      } catch (error) {
        console.log(error)
        setError(true)
        setEmail('')
        setPassword('')
      }
     
  }


    return (
        <div className="row">
     
        <div className="col-sm-2" />
        <div className="col-sm-8">
          <h4 className="text-muted text-center mb-5">Log into your account</h4>
          <div className="card p-5 shadow">
          {error ? (<Error error='Invalid Credentials'/>): null}
            <form>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input 
                placeholder = "Email"
                  className="form-control"
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                placeholder="password"
                  className="form-control"
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}
                />
              </div>
            
              <div className="text-center">
                <button className="btn btn-primary" onClick={handleSubmit}>
                  Login
                </button>
              </div>
              <p className="mt-3 text-center">Not a user ? <Link to='/register'>Back to Register</Link></p>
            </form>
              <Google />
          </div>
        </div>
        <div className="col-sm-2" />
      </div>
    );
    
}

export default Login
