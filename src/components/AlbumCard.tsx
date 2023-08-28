import { Link } from 'react-router-dom';
import { AlbumType } from '../types';

type AlbumPropsType = {
  album: AlbumType;
};

function AlbumCard({ album }: AlbumPropsType) {
  return (
    <div className="w-72 h-72 my-12 flex flex-col">
      <img
        src={ album.artworkUrl100 }
        alt="album cover"
        className="w-72 h-72 rounded-xl mb-6"
      />
      <Link
        to={ `/album/${album.collectionId}` }
        data-testid={ `link-to-album-${album.collectionId}` }
        className="text-lg font-bold"
      >
        {album.collectionName}
      </Link>
      <p className="text-sm text-gray-500">{album.artistName}</p>
    </div>
  );
}

export default AlbumCard;
