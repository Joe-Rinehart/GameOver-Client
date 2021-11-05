import React, { useState, useEffect } from 'react';
import Auth from './Auth/Auth'
import Sitebar from './Sitebar/Sitebar';
import GameIndex from './Game/GameIndex';
import './App.css';


function App() {
  const [sessionToken, setSessionToken] = useState('');
  useEffect(() => {
    if (localStorage.getItem('token')){
      setSessionToken(localStorage.getItem('token'));
    }
  }, [])
  const updateToken = (newToken) => {
    localStorage.setItem('token', newToken);
    setSessionToken(newToken);
    console.log(sessionToken);
  }
  const clearToken = () => {
    localStorage.clear();
    setSessionToken('');
  }
  const protectedViews = () => {
    return (sessionToken === localStorage.getItem('token') ? <GameIndex token={sessionToken}/> : <Auth updateToken={updateToken}/>)
  }
  return (
    <div>
      <Sitebar clickLogout={clearToken} />
      {protectedViews()}
    </div>
  );
}
export default App;
