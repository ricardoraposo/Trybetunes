import { useEffect, useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { AiOutlineStar, AiOutlineSearch } from 'react-icons/ai';
import { CgProfile } from 'react-icons/cg';
import { getUser } from '../services/userAPI';
import type { UserType } from '../types';
import trybeTunesLogo from '../images/trybetunes_logo.svg';

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
    <div className="flex h-screen overflow-hidden">
      <header
        data-testid="header-component"
        className="text-lg flex flex-col w-1/5 bg-transparent
        justify-between items-center px-12 shadow-lg"
      >
        <div className="mt-3">
          <img src={ trybeTunesLogo } alt="trybetunes logo" className="h-32" />
        </div>
        <nav className="flex flex-col gap-6">
          <NavLink
            data-testid="link-to-search"
            to="/search"
            className="flex text-3xl items-center gap-2 text-gray-400"
          >
            <AiOutlineSearch />
            {' '}
            <span>Pesquisar</span>
          </NavLink>
          <NavLink
            data-testid="link-to-favorites"
            to="/favorites"
            className="flex text-3xl items-center gap-2 text-gray-400"
          >
            <AiOutlineStar />
            {' '}
            <span>Favoritos</span>
          </NavLink>
          <NavLink
            data-testid="link-to-profile"
            to="/profile"
            className="flex text-3xl items-center gap-2 text-gray-400"
          >
            <CgProfile />
            {' '}
            <span>Perfil</span>
          </NavLink>
        </nav>
        <div>
          {isLoading ? (
            <p className="flex text-2xl items-center mb-6">Carregando...</p>
          ) : (
            <div className="flex my-auto  mb-6 gap-2">
              {userInfo?.image && (
                <img
                  src={ userInfo.image }
                  alt="small face of the user"
                  className="w-12 h-12 rounded-full"
                />
              )}
              <p
                data-testid="header-user-name"
                className="flex text-2xl items-center"
              >
                {userInfo?.name}
              </p>
            </div>
          )}
        </div>
      </header>
      <div className="overflow-y-auto w-full">
        <Outlet />
      </div>
    </div>
  );
}

export default Header;
