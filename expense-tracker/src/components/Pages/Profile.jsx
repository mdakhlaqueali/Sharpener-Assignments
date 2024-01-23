import axios from "axios";
import { useEffect, useRef, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {useSelector} from "react-redux";

const Profile = () => {
    const displayNameRef = useRef();
    const photoUrlRef = useRef();
    const navigate = useNavigate();
    const [userData, setUserData] = useState({});
    const token = useSelector((state)=>state.auth.token);
  
    const updateProfileHandler = async (event) => {
      event.preventDefault();
  
      // const idToken = localStorage.getItem('token');
      const idToken = token;
      const displayName = displayNameRef.current.value;
      const photoUrl = photoUrlRef.current.value;
  
      const url =
        'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBiEoVyC6pTrqMH33q1rNiN1-Ck8F40X8M';
  
      try {
        const updateData = {
          idToken: idToken,
          displayName: displayName,
          photoUrl: photoUrl,
          returnSecureToken: true,
        };
  
        const response = await axios.post(url, updateData);

        if (response.status === 200) {
            navigate('/')
          } else {
            // Handle error responses (e.g., invalid token)
            console.error("Profile update failed:", response.data.error);
          }
  
        // The response should contain user data or an error message
        console.log(response.data);
  
      } catch (error) {
        console.error('Profile update failed:', error);
        // Handle update failure, show an error message, etc.
      }
    };

    const fetchUserData = useCallback(async () => {
        // const idToken = localStorage.getItem('token');
        const idToken = token;
  
        if (idToken) {
          const url = `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyBiEoVyC6pTrqMH33q1rNiN1-Ck8F40X8M`;
  
          try {
            const response = await axios.post(url, { idToken:idToken });
            if (response.status === 200) {
              const user = response.data.users[0];
              setUserData(user);
              displayNameRef.current.value = user.displayName || '';
              photoUrlRef.current.value = user.photoUrl || '';
            } else {
              // Handle error responses
              console.error("Failed to fetch user data:", response.data.error);
            }
          } catch (error) {
            console.error('Failed to fetch user data:', error);
          }
        }
      },[token]);

      useEffect(()=>{
        fetchUserData();
      }, [fetchUserData]);

      const verifyEmailHandler = async () => {
        const mytoken = token;
        const url = "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBiEoVyC6pTrqMH33q1rNiN1-Ck8F40X8M";
        try{
            const response = await axios.post(url, {
                requestType: "VERIFY_EMAIL",
                idToken:mytoken
            });

            if(response.status === 200) {
                console.log(response);
            }
            else{
                console.log('Email not sent');
            }
        } catch(error){
            console.log(error);
        }
    }

  return(
    <>
    <form onSubmit={updateProfileHandler}>
      <h2>Update Profile</h2>
      <input type="text" placeholder="Display Name" ref={displayNameRef} />
      <input type="text" placeholder="Photo URL" ref={photoUrlRef} />
      <button type="submit">Update Profile</button>
    </form>
    <div>
    <button style={{marginTop:"10px"}} onClick={verifyEmailHandler}>Verify Email</button>
    </div>
    </>
  );
};
export default Profile;
