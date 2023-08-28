import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import trybeTunesLogo from '../images/trybetunes_logo.svg';
import Loading from '../components/Loading';

function Login() {
  const [nameInput, setNameInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validLength = nameInput.length >= 3;

  const handleClick = async () => {
    setIsLoading(true);
    await createUser({ name: nameInput });
    navigate('/search');
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div className="flex flex-col">
        <img src={ trybeTunesLogo } alt="" className="h-48" />
        <div className="mt-10 border-red-300 flex flex-col w-full gap-5">
          <input
            data-testid="login-name-input"
            type="text"
            value={ nameInput }
            onChange={ (e) => setNameInput(e.target.value) }
            placeholder="Qual é o seu nome ?"
            className="text-center text-lg px-12 py-3 border-2 border-blue-600
            rounded-full"
          />
          <button
            data-testid="login-submit-button"
            disabled={ !validLength }
            onClick={ handleClick }
            className="p-3 bg-blue-600 text-white
            rounded-full transition hover:cursor-pointer hover:bg-blue-900"
          >
            Entrar
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
