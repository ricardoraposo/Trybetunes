import { useState } from 'react';
import checkedheart from '../images/checked_heart.png';
import emptyHeart from '../images/empty_heart.png';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import type { SongType } from '../types';

type MusicCardProps = {
  song: SongType;
  initFav: boolean;
};

function MusicCard({ song, initFav }: MusicCardProps) {
  const [favorited, setFavorited] = useState(initFav);

  const handleChange = (songItem: SongType) => {
    setFavorited(!favorited);
    if (favorited) {
      removeSong(songItem);
    } else {
      addSong(songItem);
    }
  };

  return (
    <div key={ song.trackId }>
      <p>{song.trackName}</p>
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
        />
      </div>
    </div>
  );
}

export default MusicCard;
