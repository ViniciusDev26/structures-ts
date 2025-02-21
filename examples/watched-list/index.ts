import { WatchedList } from "../../lib";

interface Music {
	name: string;
}

function main() {
	const music1: Music = { name: "Music 1" };
	const music2: Music = { name: "Music 2" };
	const music3: Music = { name: "Music 3" };

	const playlist = WatchedList<Music>({
		initialItems: [music1, music2],
		compareItems: (a, b) => a.name === b.name,
	});

	playlist.add(music3);
	playlist.remove(music2);

	console.log({
		// {added: [{name: "Music 3"}], removed: [{name: "Music 2"}], current: [{name: "Music 1"}, {name: "Music 3"}]}
		added: playlist.getNewItems(),
		removed: playlist.getRemovedItems(),
		current: playlist.getItems(),
	});
}
main();
