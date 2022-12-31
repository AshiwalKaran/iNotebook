import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {

  const [credentials,setCredentials]=useState({name:'',email:'',password:'',cpassword:''});

  let navigate=useNavigate();

  const handleSubmit=async(event)=>{
    event.preventDefault();
    const url=`http://localhost:5000/api/auth/createUser`;
    const response=await fetch(url,{
      method:'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name:credentials.name, email: credentials.email, password: credentials.password })
    });
    const json=await response.json();
    console.log(json.success);
    if(json.success===true){
      //Save the authtoken and redirect
      localStorage.setItem('token',json.authtoken);
      props.showAlert('Account Created Successfully','success');
      navigate('/');
    }
    else if(json.success===false){
      props.showAlert('Invalid Credentials','danger');
    }
  }

  const onChange=(event)=>{
    setCredentials({...credentials,[event.target.name]:event.target.value});
  }

  return (
    <div className='container'>
      <form onSubmit={handleSubmit}>
      <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" value={credentials.name} name="name" className="form-control" id="name" aria-describedby="emailHelp" onChange={onChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" value={credentials.email} name="email" className="form-control" id="email" aria-describedby="emailHelp" onChange={onChange}/>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" value={credentials.password} name="password" id="password" onChange={onChange} minLength={5} required/>
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input type="password" value={credentials.cpassword} name="cpassword" className="form-control" id="cpassword" onChange={onChange} minLength={5} required/>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Signup