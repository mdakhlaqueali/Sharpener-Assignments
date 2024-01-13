import axios from "axios";
import { useRef } from "react";

const ForgotPasswordPage = () => {

  const emailInputRef = useRef();

  const forgotPasswordHandler = async (event) => {
    event.preventDefault();
    const email = emailInputRef.current.value;
    const url =
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBiEoVyC6pTrqMH33q1rNiN1-Ck8F40X8M";

    try {
      const response = await axios.post(url , {
        requestType: "PASSWORD_RESET",
        email:email
      });
      if(response.status === 200) {
        alert('Please check your email');
      }else{
        console.log('error');
      }

    } catch (error) {
        console.log(error);
    }
  };

  const styles = {
    margin: '3rem auto',
    width: '95%',
    maxWidth: '30rem',
    borderRadius: '50px',
    backgroundColor: 'darkslategray',
    padding: '1rem',
    textAlign: 'center',
    color: 'white'
  };

  return (
    <form style={styles} onSubmit={forgotPasswordHandler}>
      <input placeholder="Enter Your Email" ref={emailInputRef} />
      <button>Send Link</button>
    </form>
  );
};

export default ForgotPasswordPage;