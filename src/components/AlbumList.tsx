import { AlbumType } from '../types';

type AlbumListProps = {
  albumList: AlbumType[];
  clicked: boolean;
};

function AlbumList({ clicked, albumList }: AlbumListProps) {
}

export default AlbumList;
