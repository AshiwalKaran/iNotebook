import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {

  //Navigate Hook to redirect
  let navigate=useNavigate();

    const [credentials,setCredentials]=useState({email:'',password:''});
  
    const handleSubmit=async(event)=>{
        event.preventDefault();
        const url=`http://localhost:5000/api/auth/login`;
        const response=await fetch(url,{
          method:'POST',
          headers:{
            'Content-Type':'application/json'
          },
          body:JSON.stringify({email:credentials.email,password:credentials.password})
        });
        const json=await response.json();
        console.log(json);

        if(json.success){
          //Save the authtoken and redirect
          localStorage.setItem('token',json.authtoken); 
          navigate('/');
        }
        else{
          
        }
    }
    const onChange=(event)=>{
      setCredentials({...credentials,[event.target.name]:event.target.value});
    }


  return (
    <div>
    <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" value={credentials.email} name="email" id="email" aria-describedby="emailHelp" onChange={onChange}/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" value={credentials.password} name="password" id="password" onChange={onChange}/>
  </div>
  <button type="submit" className="btn btn-primary" >Submit</button>
</form>
    </div>
  )
}

export default Login