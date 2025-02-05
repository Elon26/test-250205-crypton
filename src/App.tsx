import { useState } from 'react'
import './App.css'
import Switch from 'react-switch';
import Auth from './components/auth/auth';
import Profile from './components/profile/profile';
import { checkSavedDarkMode } from './utils/checkSavedDarkMode';
import { removeLSItem, setLSItem } from './utils/localStorageHelper';
import axios from 'axios';
import {
  Card
} from "@/components/ui/card"
import Loader from './components/loader/loader';
import { UserData } from './models/UserData';
import { useQuery } from 'react-query';
import getQueryUserData from './api/getQueryUserData';

function App() {
  axios.defaults.baseURL = 'https://backend-ashen-seven-22.vercel.app';

  const [isDarkModeActive, setIsDarkModeActive] = useState(checkSavedDarkMode());
  const [isAuthFinished, setIsAuthFinished] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [querySwitcher, setQuerySwitcher] = useState(false);

  function handleSetDarkMode(newMode: boolean) {
    setIsDarkModeActive(newMode)
    setLSItem("crypton-test-darkmode", newMode.toString())
  }

  function handleLogout() {
    setUserData(null);
    removeLSItem("crypton-test-token");
  }

  const {isLoading} = useQuery(
    ['token', querySwitcher], 
    getQueryUserData,
    {
      onSuccess: (data) => {
        if (data?.data) {
          setUserData(data?.data);
        } else {
          setUserData(null);
        }
        setIsAuthFinished(true);
      },
      onError: () => {
          setUserData(null);
          setIsAuthFinished(true);
      }
    }
  )

  return (
    <div className={`relative min-w-full min-h-screen ${isDarkModeActive ? "bg-black text-white" : "bg-white text-black"} flex justify-center items-center`}>
      <label className="absolute right-8 top-4 flex items-center gap-2 z-2">
        <Switch onChange={handleSetDarkMode} checked={isDarkModeActive} />
        <span>Dark mode</span>
      </label>
      <div className="min-w-96">
      <Card className={`relative min-h-96 ${isDarkModeActive ? "bg-midnight" : "bg-silver"}`}>
        {isLoading && <Loader/>}
        {isAuthFinished &&
          <div>
            {userData ?  <Profile userData={userData} handleLogout={handleLogout}/> : <Auth authUser={() => setQuerySwitcher (prev => !prev)}/>}
          </div>
        }
      </Card>
      </div>
    </div>
  )
}

export default App
