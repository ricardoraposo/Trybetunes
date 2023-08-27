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
    <div>
      <input
        data-testid="search-artist-input"
        type="text"
        value={ artistInput }
        onChange={ (e) => setArtistInput(e.target.value) }
      />
      <button
        data-testid="search-artist-button"
        disabled={ !validLength }
        onClick={ fetchAlbuns }
      >
        Procurar
      </button>
      {isLoading && <Loading />}
      {searched && !isLoading && albumList.length > 0 ? (
        <AlbumCardList artistName={ artistName } albumList={ albumList } />
      ) : searched && !isLoading && albumList.length === 0 && (
        <h2>Nenhum álbum foi encontrado</h2>
      )}
    </div>
  );
}

export default Search;
