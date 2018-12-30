import axios from 'axios';
import { URLSearchParams } from 'url';

export async function createAlbum(cookies: string[], unm: number, albumName: string): Promise<number> {
    const params = new URLSearchParams({
        unm: `${ unm }`,
        albumName,
    });

    const { data } = await axios.post('http://www.genie.co.kr/myMusic/jSetNewAlbum', params, {
        headers: {
            'Cookie': cookies.map(cookie => cookie.split(';')[0]).join('; '),
        },
    });

    if (data.Result.RetMsg !== '성공') {
        throw new Error('앨범 생성 실패');
    }

    return +data.DATA0.newMyAlbumResult;
}

export async function addSongToAlbum(cookies: string[], albumId: number, unm: number, songs: number[]) {
    const params = new URLSearchParams({
        mxnm: `${ albumId }`,
        xgnms: songs.join(';'),
        mxlopths: songs.map(() => 'W').join(';'),
        mxflgs: songs.map(() => '1').join(';'),
        unm: `${ unm }`,
    });

    const { data } = await axios.post('http://www.genie.co.kr/myMusic/jMyAlbumSongAdd', params, {
        headers: {
            'Cookie': cookies.map(cookie => cookie.split(';')[0]).join('; '),
        },
    });

    if (data.Result.RetMsg !== '성공') {
        throw new Error('앨범 생성 실패');
    }
}
