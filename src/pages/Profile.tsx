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
      {userInfo && (
        <>
          <img data-testid="profile-image" src={ userInfo.image } alt="user profile" />
          <p>{userInfo.name}</p>
          <p>{userInfo.email}</p>
          <p>{userInfo.description}</p>
          <Link to="/profile/edit">Editar perfil</Link>
        </>
      )}
    </div>
  );
}

export default Profile;
