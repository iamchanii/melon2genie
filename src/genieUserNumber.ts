import axios from 'axios';
import { JSDOM, VirtualConsole } from 'jsdom';

export default async function (cookies: string[]): Promise<number> {
    const { data } = await axios.get('http://www.genie.co.kr', {
        headers: {
            'Cookie': cookies.map(cookie => cookie.split(';')[0]).join('; '),
        },
    });

    const virtualConsole = new VirtualConsole();
    virtualConsole.on('error', () => void 0);

    const dom = new JSDOM(data, {
        runScripts: 'dangerously',
        virtualConsole,
    });

    return +dom.window['iMemUno'];
}
