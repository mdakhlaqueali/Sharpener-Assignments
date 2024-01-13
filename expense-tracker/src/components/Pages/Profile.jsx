import axios from "axios";
import { useRef } from "react";

const Profile = () => {
    const displayNameRef = useRef();
    const photoUrlRef = useRef();
  
    const updateProfileHandler = async (event) => {
      event.preventDefault();
  
      const idToken = localStorage.getItem('token');
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
  
        // The response should contain user data or an error message
        console.log(response.data);
  
      } catch (error) {
        console.error('Profile update failed:', error);
        // Handle update failure, show an error message, etc.
      }
    }
  return (
    <form onSubmit={updateProfileHandler}>
      <h2>Update Profile</h2>
      <input type="text" placeholder="Display Name" ref={displayNameRef} />
      <input type="text" placeholder="Photo URL" ref={photoUrlRef} />
      <button type="submit">Update Profile</button>
    </form>
  );
};
export default Profile;
