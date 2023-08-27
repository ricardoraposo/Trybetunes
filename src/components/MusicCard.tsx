import { AlbumType, SongType } from '../types';

type MusicCardProps = {
  song: SongType;
};

function MusicCard({ song }: MusicCardProps) {
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
    </div>
  );
}

export default MusicCard;
