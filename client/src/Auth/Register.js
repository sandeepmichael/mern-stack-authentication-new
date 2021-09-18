import React, {useState} from 'react'
import './register.css'
import axios from 'axios'
import {Link} from 'react-router-dom'
import Success from '../Success'

const Register = () => {
   const [name, setName] = useState('')
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const [success, setSuccess] = useState(false)
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    const user = {
      name,
      email,
      password
    }
    try {

      const res = await axios.post('http://localhost:5000/auth/register', user)
      console.log(res.data)
      setSuccess(true)
     // window.location.href='/login'
      
    } catch (error) {
      console.log(error)
    }
  
  }

    return (
      <div className="signup-form">
        {success ? (<Success message='Registration successful you can login now'/>) : null}
    <form>
		<h2>Sign Up</h2>
		<p>Please fill in this form to create an account!</p>
        <div className="form-group">
			<div className="input-group">
				<div className="input-group-prepend">
					<span className="input-group-text">
						<span className="fa fa-user"></span>
					</span>                    
				</div>
				<input type="name" className="form-control" name="name" value={name} 
        onChange={(e)=>setName(e.target.value)} placeholder="Username" required="required" />
			</div>
        </div>
        <div className="form-group">
			<div className="input-group">
				<div className="input-group-prepend">
					<span className="input-group-text">
						<i className="fa fa-paper-plane"></i>
					</span>                    
				</div>
				<input type="email" className="form-control" name="email" value ={email} 
        onChange={(e)=>setEmail(e.target.value)}placeholder="Email Address" required="required" />
			</div>
        </div>
		<div className="form-group">
			<div className="input-group">
				<div className="input-group-prepend">
					<span className="input-group-text">
						<i className="fa fa-lock"></i>
					</span>                    
				</div>
				<input type="password" className="form-control" name="password" value={password}
         onChange={(e)=>setPassword(e.target.value)} placeholder="Password" required="required" />
			</div>
        </div>
		<div className="form-group">
			<div className="input-group">
				<div className="input-group-prepend">
			                 
        </div>
			</div>
      </div>
		<div className="form-group">
            <button type="submit" className="btn btn-primary btn-lg" onClick={handleSubmit}>Register</button>
        </div>
    </form>
	<div className="text-center">Already have an account? <Link to ='/login'>Login here</Link></div>
</div>
)
 
 }
      
       

export default Register;

