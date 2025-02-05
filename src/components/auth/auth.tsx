import { useState } from "react";
import Register from "../register/register";
import Login from "../login/login";

interface Props {
  authUser: () => void
}

function Auth({authUser}:Props) {
  const [isRegister, setIsRegister] = useState(true);

  return (
    <>
      <div className="relative">
        <Login authUser={authUser} changeForm={() => {setIsRegister(true)}} visible={!isRegister}/>
        <Register authUser={authUser} changeForm={() => {setIsRegister(false)}} visible={isRegister}/>
      </div>
    </>
  )
}

export default Auth
