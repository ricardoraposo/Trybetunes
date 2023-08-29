import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserType } from '../types';
import { getUser } from '../services/userAPI';
import Loading from '../components/Loading';

function Profile() {
  const [userInfo, setUserInfo] = useState<UserType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUserInfo = async () => {
    const user = await getUser();
    setUserInfo(user);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  if (isLoading) return <Loading />;

  return (
    <div>
      <div
        className="bg-gradient-to-br from-blue-900 via-blue-500 to-sky-200 h-72
        flex justify-center items-center shadow-sm"
      />
      {userInfo && (
        <div className="flex mx-auto w-3/4">
          <div className="flex justify-center gap-6">
            <img
              data-testid="profile-image"
              src={ userInfo.image }
              alt="user profile"
              className="h-80 w-80 rounded-full shadow-2xl drop-shadow-2xl
              -translate-y-1/2"
            />
            <div className="flex flex-col gap-6 translate-y-8">
              <div>
                <p className="text-2xl font-bold text-gray-600">Nome</p>
                <p className="text-base">{userInfo.name}</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-600">E-mail</p>
                <p className="text-base">{userInfo.email}</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-600">Descrição</p>
                <p className="text-base">{userInfo.description}</p>
              </div>
              <Link
                to="/profile/edit"
                className="w-fit px-8 py-2 bg-blue-700 text-white font-bold text-xl
                rounded-full hover:bg-blue-900 transition"
              >
                Editar perfil
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
