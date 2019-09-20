import React, {useState} from "react";
import axiosWithAuth from "./axiosWithAuth";

const Login = props => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  const [credentials, setCredentials] = useState({});

  const login = () => {
    axiosWithAuth.post('http://localhost:5000/api/login', credentials)
    .then(res => {
      console.log(res.data);
      localStorage.setItem('token', res.data.token);
      props.history.push('/bubblepage');
    })
  }

    const changeHandler = e => {
      setCredentials({
        ...credentials, 
        [e.target.name]: e.target.value,
      })
    }

  return (
    <>
      <p>Built a login page here</p>

      <div>

        <form>
          <input 
          type="text" 
          name="username" 
          value={credentials.username}></input>

          <input 
          type="password" 
          name="password" 
          value={credentials.password}></input>

          <button type="submit">Log In</button>

        </form>
      </div>
    </>
  );
};

export default Login;
