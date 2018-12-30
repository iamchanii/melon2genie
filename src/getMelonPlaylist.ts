import axios from 'axios';
import { JSDOM } from 'jsdom';

const getMelonPlaylistURL = (melonPlaylistId: number): string =>
    `https://www.melon.com/mymusic/playlist/mymusicplaylistview_listPagingSong.htm?pageSize=1000&plylstSeq=${ melonPlaylistId }`;

interface ISong {
    title: string;
    artist: string;
}

const replaceHTMLEntity = (text: string) => text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&apos;/g, '\'')
    .replace(/&quot;/g, '"')
    .replace(/&nbsp;/g, '"');

export default async function (melonPlaylistId: number) {
    const url = getMelonPlaylistURL(melonPlaylistId);
    const { data } = await axios.get(url);
    const dom = new JSDOM(data);

    const checkNoData = !!dom.window.document.querySelector('div.no_data');

    if (checkNoData) {
        throw new Error('멜론 플레이리스트 오류. 목록이 없습니다.');
    }

    dom.window.document.querySelectorAll('tbody tr');

    const result: ISong[] = [];

    dom.window.document.querySelectorAll('tbody tr').forEach((node, key) => {
        const title = node.querySelector('td:nth-child(3) .btn_icon_detail span.odd_span').innerHTML.trim();
        const artist = node.querySelector('#artistName').textContent.trim();

        result.push({
            title: replaceHTMLEntity(title),
            artist: replaceHTMLEntity(artist),
        });
    });

    return result;
}
