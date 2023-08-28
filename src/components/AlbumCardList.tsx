import { AlbumType } from '../types';
import AlbumCard from './AlbumCard';

type AlbumListProps = {
  albumList: AlbumType[];
  artistName: string;
};

function AlbumCardList({ albumList, artistName }: AlbumListProps) {
  return (
    <div className="flex flex-col items-center bg-gray-100 h-full">
      <h2
        className="text-3xl my-12 text-blue-500 italic"
      >
        {`Resultado de álbuns de: ${artistName}`}

      </h2>
      <div className="w-11/12 flex flex-wrap justify-center gap-10">
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
