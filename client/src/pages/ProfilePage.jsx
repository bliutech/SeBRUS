import { useState } from "react";
import { useCookies } from "react-cookie";

function ProfilePage() {
  document.title = "Account";
  const [cookies, setCookie, removeCookie] = useCookies("");
  const [auth, setAuth] = useState(false);
  if (true) {
    setCookie("name", "cy");
  }

  return <p></p>;
}

export default ProfilePage;

// **** PLEASE ADD A BUTTON TO SIGN UP ****
