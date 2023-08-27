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

  useEffect(() => {
    fetchFavoriteMovies();
  }, [toggleFavorite]);

  if (isLoading) return <Loading />;

  return (
    <div>
      {
        favoriteSongs.length > 0 && (
          favoriteSongs.map((song) => (
            <MusicCard
              key={ song.trackId }
              song={ song }
              toggleFavorite={ setToggleFavorite }
              didFavorite={ toggleFavorite }
              initFav
            />
          ))
        )
      }
    </div>
  );
}

export default Favorites;
