import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = (props) => {

  //Navigate Hook to redirect
  let navigate = useNavigate();

  const [credentials, setCredentials] = useState({ email: '', password: '' });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const url = `http://localhost:5000/api/auth/login`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password })
    });
    const json = await response.json();
    console.log(json);

    if (json.success) {
      //Save the authtoken and redirect
      props.showAlert('Logged in Successfully','success');
      localStorage.setItem('token', json.authtoken);
      navigate('/');
    }
    else {
      props.showAlert('Invalid Credentials','danger');
    }
  }
  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  }


  return (
    <div className="mt-2">
      <h2 className="my-2">Login to use iNotebook.</h2>
      <form onSubmit={handleSubmit}>
        <div className="my-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" value={credentials.email} name="email" id="email" aria-describedby="emailHelp" onChange={onChange} />
        </div>
        <div className="my-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" value={credentials.password} name="password" id="password" onChange={onChange} />
        </div>
        <button type="submit" className="btn btn-primary" >Submit</button>
      </form>
    </div>
  )
}

export default Login