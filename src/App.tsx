import { Route, Routes } from 'react-router-dom';
import { Login, Search, Album, Favorites, Profile, EditProfile } from './pages';
import Header from './components/Header';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Login /> } />
      <Route element={ <Header /> }>
        <Route path="/search" element={ <Search /> } />
        <Route path="/album/:id" element={ <Album /> } />
        <Route path="/favorites" element={ <Favorites /> } />
        <Route path="/profile" element={ <Profile /> } />
        <Route path="/profile/edit" element={ <EditProfile /> } />
      </Route>
    </Routes>
  );
}

export default App;
