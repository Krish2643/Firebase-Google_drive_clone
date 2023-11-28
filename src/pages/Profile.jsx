import React, { useEffect} from "react";
import Button from "react-bootstrap/Button";
import { useFirebase, firebaseAuth } from "../context/Firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";


const ProfilePage = () => {
  const firebase = useFirebase();
  const navigate = useNavigate();
  const submit = ()=>{
    signOut(firebaseAuth);
    console.log("Succcessfully logOut");
    alert("Successfully logOut...")
  }

    
  
  useEffect(() => {
    if (firebase.isLoggedIn) {
      // navigate to home
      navigate("/profile");
    }else{
      navigate("/login");
    }
  }, [firebase, navigate]);

  return (
    <div className="container mt-5">

      <Button
      onClick={submit}
      variant="primary" type="submit">
          LogOut
       </Button>

    </div>
  );
};

export default ProfilePage;
