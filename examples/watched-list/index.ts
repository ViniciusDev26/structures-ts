import { WatchedList } from "../../lib";

class Music {
  constructor(
    public name: string,
  ) {}
}

class MusicList extends WatchedList<Music> {
  compareItems(a: Music, b: Music): boolean {
    return a.name === b.name;
  }
}

class Playlist {
  constructor(
    public name: string,
    public musics: MusicList
  ) {}
}


function main() {
  const music1 = new Music("Music 1");
  const music2 = new Music("Music 2");
  const music3 = new Music("Music 3");

  const playlist = new Playlist("Playlist", new MusicList([music1, music2]));

  playlist.musics.add(music3);
  playlist.musics.remove(music2);

  console.log({
    added: playlist.musics.getNewItems(),
    removed: playlist.musics.getRemovedItems(),
    current: playlist.musics.getItems(),
  });
}
main();