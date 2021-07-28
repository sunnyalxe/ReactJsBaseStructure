import React, { useState } from 'react';
import {checkLogin} from './Helpers/Session';

import Layout from './pages/LoginRequired/Layout/Layout';
import Login from './pages/LoginNotRequired/Auth/Login';

function App() {
  const [userProfile,setUserProfile] = useState(checkLogin());
  if(userProfile && parseInt(userProfile.admin_id) > 0 )
  {
    return (
      <div className="AppWrapper">
        <Layout userProfile={userProfile} />
      </div>
    );
  }
  else
  {
    return (
      <Login setUserProfile={setUserProfile}/>
    );
  }
  
}

export default App;
