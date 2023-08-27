import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import getMusics from '../services/musicsAPI';
import { AlbumType, SongType } from '../types';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';

function Album() {
  const [albumInfo, setAlbumInfo] = useState<AlbumType>({
    artistId: 0,
    artistName: '',
    collectionId: 0,
    collectionName: '',
    collectionPrice: 0,
    artworkUrl100: '',
    releaseDate: '',
    trackCount: 0,
  });
  const [albumSongs, setAlbumSongs] = useState<SongType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchSongs = async () => {
      if (id) {
        const songs = await getMusics(id);
        setAlbumInfo(songs.album);
        setAlbumSongs(songs.songs);
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
      {albumSongs && (
        <div>
          <h1 data-testid="artist-name">{albumInfo.artistName}</h1>
          <h1 data-testid="album-name">{albumInfo.collectionName}</h1>
          <div>
            {albumSongs.map((song) => (
              <MusicCard key={ song.trackId } song={ song } />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Album;
