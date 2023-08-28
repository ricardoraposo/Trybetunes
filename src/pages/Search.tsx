import { useState } from 'react';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../components/Loading';
import AlbumCardList from '../components/AlbumCardList';
import type { AlbumType } from '../types';

function Search() {
  const [artistInput, setArtistInput] = useState('');
  const [artistName, setArtistName] = useState('');
  const [albumList, setAlbumList] = useState<AlbumType[]>([]);
  const [searched, setSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validLength = artistInput.length >= 2;

  const fetchAlbuns = async () => {
    setIsLoading(true);
    setArtistName(artistInput);

    const albuns = await searchAlbumsAPI(artistInput);

    setArtistInput('');
    setAlbumList(albuns);
    setIsLoading(false);
    setSearched(true);
  };

  return (
    <>
      <div
        className="bg-gradient-to-br from-blue-900 via-blue-500 to-sky-200 h-72
        flex justify-center items-center shadow-sm gap-2"
      >
        <input
          data-testid="search-artist-input"
          type="text"
          value={ artistInput }
          onChange={ (e) => setArtistInput(e.target.value) }
          placeholder="Digite a sua pesquisa"
          className="w-2/5 py-4 px-8 rounded-full bg-white/20 text-xl text-white
          placeholder-white/50 border-none focus:outline-none"
        />
        <button
          data-testid="search-artist-button"
          disabled={ !validLength }
          onClick={ fetchAlbuns }
          className="py-4 px-8 rounded-full bg-teal-400 text-xl text-white cursor-pointer"
        >
          Procurar
        </button>
      </div>
      {isLoading && <Loading />}
      {searched && !isLoading && albumList.length > 0 ? (
        <AlbumCardList artistName={ artistName } albumList={ albumList } />
      ) : searched && !isLoading && albumList.length === 0 && (
        <h2>Nenhum álbum foi encontrado</h2>
      )}
    </>
  );
}

export default Search;
