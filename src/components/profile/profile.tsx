import {
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { UserData } from "@/models/UserData"
import ProfileCard from "../profileCard/profileCard"
import { BsEnvelope } from "react-icons/bs";
import { BsKey } from "react-icons/bs";

interface Props {
  userData: UserData
  handleLogout: () => void;
}

function Profile({userData, handleLogout}:Props) {
  return (
      <div className='min-h-96 flex flex-col justify-between'>
        <CardHeader>
          <CardTitle className="text-center">Профиль</CardTitle>
        </CardHeader>
        <CardContent className="flex-auto flex flex-col gap-y-2">
          <ProfileCard label="Ваш Email" content={userData.email} icon={<BsEnvelope/>}/>
          <ProfileCard label="Ваш ID" content={userData.id} icon={<BsKey/>}/>
        </CardContent>
        <CardFooter>
          <Button className="border w-full" onClick={handleLogout}>Выйти из аккаунта</Button>
        </CardFooter>
      </div>
  )
}

export default Profile
