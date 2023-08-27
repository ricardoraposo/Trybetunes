import { useState } from 'react';
import { SongType } from '../types';
import checkedheart from '../images/checked_heart.png';
import emptyHeart from '../images/empty_heart.png';

type MusicCardProps = {
  song: SongType;
};

function MusicCard({ song }: MusicCardProps) {
  const [favorited, setFavorited] = useState(false);
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
          htmlFor={`favorited-${song.trackId}`}
        >
          {
            favorited
              ? (<img src={ checkedheart } alt="favorite" />)
              : (<img src={ emptyHeart } alt="favorite" />)
          }
        </label>
        <input
          id={ `favorited-${song.trackId}` }
          checked={ favorited }
          onChange={ () => {
            setFavorited(!favorited);
            console.log(favorited);
          } }
          type="checkbox"
        />
      </div>
    </div>
  );
}

export default MusicCard;
