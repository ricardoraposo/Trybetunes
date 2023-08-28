import { useEffect, useState } from 'react';
import { SongType } from '../types';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';

function Favorites() {
  const [favoriteSongs, setFavoriteSongs] = useState<SongType[]>([]);
  const [toggleFavorite, setToggleFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchFavoriteMovies = async () => {
    setIsLoading(true);
    const favorites = await getFavoriteSongs();
    setFavoriteSongs(favorites);
    setIsLoading(false);
  };

  const handleToggle = () => {
    setToggleFavorite(!toggleFavorite);
  };

  useEffect(() => {
    fetchFavoriteMovies();
  }, [toggleFavorite]);

  if (isLoading) return <Loading />;

  return (
    <div>
      <div
        className="bg-gradient-to-br from-blue-900 via-blue-500 to-sky-200 h-72
        flex justify-center items-center shadow-sm text-white text-3xl font-bold mb-24"
      >
        Músicas Favoritas
      </div>
      <div className="flex flex-col justify-center items-center">
        <div className=" w-1/2">
          {
            favoriteSongs.length > 0 && (
              favoriteSongs.map((song) => (
                <MusicCard
                  key={ song.trackId }
                  song={ song }
                  toggleFavorite={ handleToggle }
                  initFav
                />
              ))
            )
          }
        </div>
      </div>
    </div>
  );
}

export default Favorites;
