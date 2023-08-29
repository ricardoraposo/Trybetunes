import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Login, Search, Album, Favorites, Profile, EditProfile } from './pages';
import Header from './components/Header';

function App() {
  const [refresh, setRefresh] = useState(true);

  const toggleRefresh = () => setRefresh(!refresh);

  return (
    <div className="font-primary">
      <Routes>
        <Route path="/" element={ <Login /> } />
        <Route element={ <Header shouldRefresh={ refresh } /> }>
          <Route path="/search" element={ <Search /> } />
          <Route path="/album/:id" element={ <Album /> } />
          <Route path="/favorites" element={ <Favorites /> } />
          <Route path="/profile" element={ <Profile /> } />
          <Route
            path="/profile/edit"
            element={ <EditProfile toggleRefresh={ toggleRefresh } /> }
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
