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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

  return (
    <div>
      <div
        className="bg-gradient-to-br from-blue-900 via-blue-500 to-sky-200 h-72
        flex justify-center items-center shadow-sm"
      />
      {
        isLoading ? (<div className="mt-32 text-3xl"><Loading /></div>) : (
          <div className="flex w-3/4 mx-auto gap-10">
            <div className="-translate-y-1/2 flex flex-col justify-center">
              <img
                src={ userInfo.image }
                alt="Profile preview"
                className="h-80 w-80 rounded-full shadow-2xl drop-shadow-2xl"
              />
              <input
                name="image"
                id="image-info"
                value={ userInfo.image }
                data-testid="edit-input-image"
                onChange={ handleChange }
                type="text"
                placeholder="Insira um link"
                className="text-center border-2 border-black mt-12 py-4"
              />
            </div>
            <form onSubmit={ (e) => e.preventDefault }>
              <div className="flex flex-col mb-2">
                <label
                  htmlFor="name-info"
                  className="text-2xl font-bold text-gray-600"
                >
                  Nome
                </label>
                <p className="mb-1">
                  Fique à vontade para usar seu nome social
                </p>
                <input
                  name="name"
                  id="name-info"
                  value={ userInfo.name }
                  data-testid="edit-input-name"
                  onChange={ handleChange }
                  type="text"
                  placeholder="Seu nome"
                  className="border-b-2 border-black w-fit py-2 px-4"
                />
              </div>
              <div className="flex flex-col mb-2">
                <label
                  htmlFor="email-info"
                  className="text-2xl font-bold text-gray-600"
                >
                  Email
                </label>
                <p className="mb-1">
                  Escolha um email que consulte diariamente
                </p>
                <input
                  name="email"
                  id="email-info"
                  value={ userInfo.email }
                  data-testid="edit-input-email"
                  onChange={ handleChange }
                  type="email"
                  placeholder="seu_nome@email.com"
                  className="border-b-2 border-black w-fit py-2 px-4"
                />
              </div>
              <div className="flex flex-col mb-2">
                <label
                  htmlFor="description-info"
                  className="text-2xl font-bold text-gray-600"
                >
                  Descrição
                </label>
                <textarea
                  name="description"
                  id="description-info"
                  value={ userInfo.description }
                  data-testid="edit-input-description"
                  onChange={ handleChange }
                  rows={ 4 }
                  cols={ 50 }
                  placeholder="Sobre mim"
                  className="border-b-2 border-black w-fit py-2 px-4"
                />
              </div>
              <button
                type="button"
                disabled={ valid }
                data-testid="edit-button-save"
                onClick={ handleSubmit }
                className="w-fit mt-8 px-8 py-2 bg-blue-700 text-white font-bold text-xl
                rounded-full hover:bg-blue-900 transition disabled:bg-blue-700/40
                disabled:text-white/40"
              >
                Salvar
              </button>
            </form>
          </div>
        )
      }
    </div>
  );
}

export default EditProfile;
