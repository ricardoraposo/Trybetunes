import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import getMusics from '../services/musicsAPI';
import { AlbumType, SongType } from '../types';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

function Album() {
  const [albumInfo, setAlbumInfo] = useState<AlbumType | undefined>(undefined);
  const [albumSongs, setAlbumSongs] = useState<SongType[]>([]);
  const [favoritedSongs, setFavoritedSongs] = useState<SongType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchSongs = async () => {
      if (id) {
        const songs = await getMusics(id);
        const favorited = await getFavoriteSongs();
        setAlbumInfo(songs[0]);
        setAlbumSongs([...songs.slice(1)] as SongType[]);
        setFavoritedSongs(favorited);
        setIsLoading(false);
      }
    };
    fetchSongs();
  }, [id]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      {albumSongs.length > 0 ? (
        <div>
          <h1 data-testid="artist-name">{albumInfo?.artistName}</h1>
          <h1 data-testid="album-name">{albumInfo?.collectionName}</h1>
          <div>
            {albumSongs.map((song) => (
              <MusicCard
                key={ song.trackId }
                song={ song }
                initFav={ favoritedSongs.some((fav) => song.trackId === fav.trackId) }
              />
            ))}
          </div>
        </div>
      ) : (
        <div>
          <h1 data-testid="artist-name">Artista inexistente</h1>
          <h1 data-testid="album-name">Album inexistente</h1>
        </div>
      )}
    </div>
  );
}

export default Album;
