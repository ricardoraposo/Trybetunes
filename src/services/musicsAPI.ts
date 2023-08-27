import { AlbumType, SongType } from '../types';

export type SongHeader = {
  album: AlbumType;
  songs: SongType[];
};

const getMusics = async (id: string): Promise<SongHeader> => {
  const request = await fetch(`https://itunes.apple.com/lookup?id=${id}&entity=song`);
  const requestJson = await request.json();
  return {
    album: requestJson.results[0],
    songs: requestJson.results.splice(1),
  };
};

export default getMusics;
