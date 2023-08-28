import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Login, Search, Album, Favorites, Profile, EditProfile } from './pages';
import Header from './components/Header';
import type { UserType } from './types';

function App() {
  const [userInfo, setUserInfo] = useState<UserType>({
    name: '',
    email: '',
    image: '',
    description: '',
  });

  return (
    <Routes>
      <Route path="/" element={ <Login /> } />
      <Route element={ <Header userInfo={ userInfo } setUserInfo={ setUserInfo } /> }>
        <Route path="/search" element={ <Search /> } />
        <Route path="/album/:id" element={ <Album /> } />
        <Route path="/favorites" element={ <Favorites /> } />
        <Route path="/profile" element={ <Profile /> } />
        <Route
          path="/profile/edit"
          element={ <EditProfile userInfo={ userInfo } setUserInfo={ setUserInfo } /> }
        />
      </Route>
    </Routes>
  );
}

export default App;
