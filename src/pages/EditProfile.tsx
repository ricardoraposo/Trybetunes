import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUser, updateUser } from '../services/userAPI';
import { UserType } from '../types';
import Loading from '../components/Loading';

type HeaderProps = {
  userInfo: UserType;
  setUserInfo: (user: UserType) => void;
};

function EditProfile({ userInfo, setUserInfo }: HeaderProps) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    await updateUser(userInfo);
    navigate('/profile');
  };

  const validateFields = (): boolean => {
    const fields = [userInfo.name, userInfo.email, userInfo.image, userInfo.description];
    return !fields.every((field) => field.length > 0);
  };

  const valid = validateFields();

  useEffect(() => {
    const fetchUserInfo = async () => {
      const user = await getUser();
      setUserInfo(user);
      setIsLoading(false);
    };

    fetchUserInfo();
  }, [setUserInfo]);

  if (isLoading) return <Loading />;

  return (

    <form onSubmit={ (e) => e.preventDefault }>
      <label htmlFor="name-info">Nome</label>
      <input
        name="name"
        id="name-info"
        value={ userInfo.name }
        data-testid="edit-input-name"
        onChange={ handleChange }
        type="text"
      />
      <label htmlFor="email-info">email</label>
      <input
        name="email"
        id="email-info"
        value={ userInfo.email }
        data-testid="edit-input-email"
        onChange={ handleChange }
        type="email"
      />
      <label htmlFor="description-info">Descricão</label>
      <input
        name="description"
        id="description-info"
        value={ userInfo.description }
        data-testid="edit-input-description"
        onChange={ handleChange }
        type="text"
      />
      <label htmlFor="image-info">Foto de perfil</label>
      <input
        name="image"
        id="image-info"
        value={ userInfo.image }
        data-testid="edit-input-image"
        onChange={ handleChange }
        type="text"
      />
      <button
        type="button"
        disabled={ valid }
        data-testid="edit-button-save"
        onClick={ handleSubmit }
      >
        Salvar
      </button>
    </form>
  );
}

export default EditProfile;
