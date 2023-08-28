import { Link } from 'react-router-dom';
import { AlbumType } from '../types';

type AlbumPropsType = {
  album: AlbumType;
};

function AlbumCard({ album }: AlbumPropsType) {
  return (
    <div className="album">
      <img
        src={ album.artworkUrl100 }
        alt="album cover"
        height={ 200 }
        width={ 200 }
      />
      <Link
        to={ `/album/${album.collectionId}` }
        data-testid={ `link-to-album-${album.collectionId}` }
      >
        {album.collectionName}
      </Link>
    </div>
  );
}

export default AlbumCard;
