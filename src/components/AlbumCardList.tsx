import { AlbumType } from '../types';
import AlbumCard from './AlbumCard';
import './Album.css';

type AlbumListProps = {
  albumList: AlbumType[];
};

function AlbumCardList({ albumList }: AlbumListProps) {
  return (
    <div>
      <h2>{`Resultado de álbuns de: ${albumList[0].artistName}`}</h2>
      <div className="album-list">
        {
          albumList.map((album) => (
            <AlbumCard key={ album.collectionId } album={ album } />
          ))
        }
      </div>
    </div>
  );
}

export default AlbumCardList;
