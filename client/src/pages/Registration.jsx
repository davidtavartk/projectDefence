import { ToastContainer } from 'react-toastify';
import SignForm from '../Components/SignForm';
import { registerUser } from '../api';
import { notify } from '../utilities/notify';
import { useNavigate } from 'react-router-dom';
import routePaths from '../routes/routePaths';

function Registration() {

  const navigate = useNavigate();

  const register = async (e, usernameReg, passwordReg, emailReg) => {
    try {
      e.preventDefault();
      console.log("Registration is Working")

      const response = await registerUser(usernameReg, passwordReg, emailReg);
      console.log(response);

      if(response.data) {
        console.log('Respone.Data: ', response.data);
        localStorage.setItem('token', JSON.stringify(response.data.accessToken));
        navigate(routePaths.Home);
      }

    } catch (error) {
      notify(error, "Username or Email Alreay in Use");
      console.log(error)
    }
  };


  return (
    <>
      <ToastContainer
        autoClose={10000}
        theme="colored"
      />
      <SignForm formType='registration' handleClick={register} />
    </>
  );
}

export default Registration;