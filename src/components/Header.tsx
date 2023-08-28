import { useEffect, useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { AiOutlineStar, AiOutlineSearch } from 'react-icons/ai';
import { CgProfile } from 'react-icons/cg';
import { getUser } from '../services/userAPI';
import type { UserType } from '../types';

function Header() {
  const [userInfo, setUserInfo] = useState<UserType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUserData = async () => {
    const user = await getUser();
    setUserInfo(user);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <>
      <header
        data-testid="header-component"
        className="bg-red-500 text-3xl"
      >
        <div>
          <NavLink
            data-testid="link-to-search"
            to="/search"
          >
            <AiOutlineSearch />
            {' '}
            <span>Pesquisar</span>
          </NavLink>
          <NavLink
            data-testid="link-to-favorites"
            to="/favorites"
          >
            <AiOutlineStar />
            {' '}
            <span>Favoritos</span>
          </NavLink>
          <NavLink
            data-testid="link-to-profile"
            to="/profile"
          >
            <CgProfile />
            {' '}
            <span>Perfil</span>
          </NavLink>
        </div>
        <div>
          {isLoading ? (<p>Carregando...</p>) : (
            <p data-testid="header-user-name">{userInfo?.name}</p>
          )}
        </div>
      </header>
      <div>
        <Outlet />
      </div>
    </>
  );
}

export default Header;
