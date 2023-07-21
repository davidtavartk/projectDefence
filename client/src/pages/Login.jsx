import { useNavigate } from 'react-router-dom';
import SignForm from '../Components/SignForm';
import { loginUser } from '../api';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { notify } from '../utilities/notify';
import routePaths from '../routes/routePaths';



function Login() {

  const navigate = useNavigate();
  const login = async (e, usernameLog, passwordLog) => {
    try {
      e.preventDefault();

      console.log("Working")
      const response = await loginUser(usernameLog, passwordLog);

      console.log(response);

      if (response.data) {
        localStorage.setItem('token', response.data);
        navigate(routePaths.Home);
      }
    } catch (error) {
      notify(error, "Invalid username or password!")
      console.log(error)
    }
  };

  return (
    <>
      <ToastContainer
        autoClose={10000}
        theme="colored"
      />
      <SignForm formType='login' handleClick={login} />

    </>
  );
}

export default Login;