import { useState } from 'react'
import { api, registerUser } from './api';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';



function App() {

  const [usernameReg, setUsernameReg] = useState('');
  const [passwordReg, setPasswordReg] = useState('');
  const [emailReg, setEmailReg] = useState('');

  const register = () => {
    registerUser(usernameReg, passwordReg, emailReg)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };


  return (
    <div className='App container'>
      <div className='row'>
        <div className="registration col">
          <h1>Registration</h1>
          <div className='form-group'>
            <label>Username</label>
            <input
              type="text"
              className='form-control'
              onChange={(e) => {
                setUsernameReg(e.target.value);
              }}
            />
          </div>
          <div className='form-group'>
            <label>Password</label>
            <input
              type="text"
              className='form-control'
              onChange={(e) => {
                setPasswordReg(e.target.value);
              }}
            />
          </div>
          <button
            onClick={register}
            className='btn btn-primary'> Register </button>
        </div>
      </div>
    </div>
  );
}

export default App;