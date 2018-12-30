import { format } from 'date-fns';
import { addSongToAlbum, createAlbum } from './genieAlbum';
import genieLogin from './genieLogin';
import genieSearch from './genieSearch';
import genieUserNumber from './genieUserNumber';
import getMelonPlaylist from './getMelonPlaylist';
import prompt from './prompt';

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

(async () => {
    const { melonPlaylistId, genieId, geniePw } = await prompt();

    console.log('Get melon playlist...');
    const playList = await getMelonPlaylist(melonPlaylistId);

    console.log('Genie login...');
    const cookies = await genieLogin(genieId, geniePw);

    console.log('Get genie user number...');
    const userNumber = await genieUserNumber(cookies);

    console.log('Search genie song id...');
    const songs = [];
    for (let i = 0; i < playList.length; i++) {
        const { title, artist } = playList[i];
        const songId = await genieSearch(`${ artist } ${ title }`);

        if (songId) {
            songs.push(songId);
        }

        if (i !== 0) {
            await delay(50);
        }
    }

    console.log('Create album...');
    const albumName = 'm2g_' + format(new Date(), 'YYYYMMDDHHmmss');
    const albumId = await createAlbum(cookies, userNumber, albumName);

    console.log('Add songs to album...');
    await addSongToAlbum(cookies, albumId, userNumber, songs);

    console.log('앨범이 생성되었습니다:', albumName);
})();
