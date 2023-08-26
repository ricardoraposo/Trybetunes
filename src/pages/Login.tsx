import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../services/userAPI';
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
    <div>
      <input
        data-testid="login-name-input"
        type="text"
        value={ nameInput }
        onChange={ (e) => setNameInput(e.target.value) }
      />
      <button
        data-testid="login-submit-button"
        disabled={ !validLength }
        onClick={ handleClick }
      >
        Entrar
      </button>
    </div>
  );
}

export default Login;
