import { useState } from 'react';
import { Link } from 'react-router-dom';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import { AlbumType } from '../types';
import Loading from '../components/Loading';
import Album from '../components/Album';
import '../components/Album.css';

function Search() {
  const [artistInput, setArtistInput] = useState('');
  const [albumList, setAlbumList] = useState<AlbumType[]>([]);
  const [searched, setSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const validLength = artistInput.length >= 2;

  const fetchAlbuns = async () => {
    setIsLoading(true);

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
        <div>
          <h2>{`Resultado de álbuns de: ${albumList[0].artistName}`}</h2>
          <div className="album-list">
            {
              albumList.map((album) => (
                <Album key={ album.collectionId } album={ album } />
              ))
            }
          </div>
        </div>
      ) : searched && !isLoading && albumList.length === 0 && (
        <h2>Nenhum álbum foi encontrado</h2>
      )}
    </div>
  );
}

export default Search;
