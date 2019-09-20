import React, {useState} from "react";
import axiosWithAuth from "../utils/axiosWithAuth";

const Login = props => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  const [credentials, setCredentials] = useState({});

    const changeHandler = e => {
      setCredentials({
        ...credentials, 
        [e.target.name]: e.target.value,
      });
    }

    const submitHandler = e => {
      e.preventDefault();
      axiosWithAuth().post('http://localhost:5000/api/login', credentials)
      .then(res => {
        localStorage.setItem('token', res.data.payload);
        props.history.push('/bubblepage');
      })
      .catch(err => {
        console.log(err)
      })
    }

  return (
    <>

      <div className='login-div'>

        <form  className='login-form' onSubmit={submitHandler}>
          <input 
          type="text" 
          name="username" 
          value={credentials.username}
          onChange={changeHandler}></input>

          <input 
          type="password" 
          name="password" 
          value={credentials.password}
          onChange={changeHandler}></input>

          <button type="submit">Log In</button>

        </form>
      </div>
    </>
  );
};

export default Login;
