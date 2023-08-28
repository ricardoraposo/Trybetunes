import { useState } from 'react';
import checkedheart from '../images/checked_heart.png';
import emptyHeart from '../images/empty_heart.png';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import type { SongType } from '../types';

type MusicCardProps = {
  song: SongType;
  initFav: boolean;
  toggleFavorite?: (() => void) | null;
};

function MusicCard({ song, initFav, toggleFavorite = null }: MusicCardProps) {
  const [favorited, setFavorited] = useState(initFav);

  const handleChange = (songItem: SongType) => {
    if (toggleFavorite) toggleFavorite();
    setFavorited(!favorited);
    if (favorited) {
      removeSong(songItem);
    } else {
      addSong(songItem);
    }
  };

  return (
    <div className="flex flex-col text-lg">
      <div className="w-full flex justify-between items-center gap-2">
        <p className="w-56">{song.trackName}</p>
        <audio data-testid="audio-component" src={ song.previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
          .
        </audio>
        <div>
          <label
            data-testid={ `checkbox-music-${song.trackId}` }
            htmlFor={ `favorited-${song.trackId}` }
          >
            {
              favorited
                ? (<img src={ checkedheart } alt="favorite" />)
                : (<img src={ emptyHeart } alt="favorite" />)
            }
          </label>
          <input
            type="checkbox"
            id={ `favorited-${song.trackId}` }
            checked={ favorited }
            onChange={ () => handleChange(song) }
            className="hidden"
          />
        </div>
      </div>
      <div className="w-full border-t-2 mx-auto my-6" />
    </div>
  );
}

export default MusicCard;
