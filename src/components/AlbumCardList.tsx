import { AlbumType } from '../types';
import AlbumCard from './AlbumCard';

type AlbumListProps = {
  albumList: AlbumType[];
  artistName: string;
};

function AlbumCardList({ albumList, artistName }: AlbumListProps) {
  return (
    <div>
      <h2>{`Resultado de álbuns de: ${artistName}`}</h2>
      <div>
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
