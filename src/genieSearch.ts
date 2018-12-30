import axios from 'axios';
import { JSDOM } from 'jsdom';

export default async function (query: string): Promise<number> {
    const { data } = await axios.get('http://www.genie.co.kr/search/searchSong', {
        params: { query },
    });

    const dom = new JSDOM(data);
    const tr = dom.window.document.querySelector('tr.list');

    if (!tr) {
        console.warn(`검색 결과가 없습니다: ${ query }`);
        return null;
    }

    return +tr.getAttribute('songid');
}
