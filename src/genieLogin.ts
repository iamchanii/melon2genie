import axios from 'axios';
import { URLSearchParams } from 'url';

const getLoginFormData = (id: string, pw: string) => new URLSearchParams({
    uxd: id,
    uxx: pw,
    uxglk: '0',
    rtnURL: 'http://mw.genie.co.kr/',
    gnb_uxd: id,
    gnb_uxx: pw,
});

export default async function (id: string, pw: string): Promise<string[]> {
    const params = getLoginFormData(id, pw);
    const { headers, data } = await axios.post('https://mw.genie.co.kr/login/loginConfirmJson', params);

    if (data.strMsg !== '성공') {
        throw new Error('지니 로그인 실패');
    }

    return headers['set-cookie'];
}
