import { Route, Routes } from 'react-router-dom';
import { Login, Search, Album, Favorites } from './pages';
import Header from './components/Header';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Login /> } />
      <Route element={ <Header /> }>
        <Route path="/search" element={ <Search /> } />
        <Route path="/album/:id" element={ <Album /> } />
        <Route path="/favorites" element={ <Favorites /> } />
      </Route>
    </Routes>
  );
}

export default App;
