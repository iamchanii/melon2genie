import inquirer, { Questions } from 'inquirer';

interface IPromptResult {
    melonPlaylistId: number;
    genieId: string;
    geniePw: string;
}

export default function (): Promise<IPromptResult> {
    const questions: Questions = [
        {
            type: 'input',
            name: 'melonPlaylistId',
            message: '멜론 플레이리스트 id를 입력하세요:',
            validate(input: any): boolean | string {
                if (!/^\d*$/.test(input)) {
                    return '숫자만 입력 해 주세요.';
                }

                return !!input;
            },
        },
        {
            type: 'input',
            name: 'genieId',
            message: '지니 id를 입력하세요:',
            validate(input: any): boolean | string {
                return !!input;
            },
        },
        {
            type: 'password',
            name: 'geniePw',
            message: '지니 pw를 입력하세요:',
            validate(input: any): boolean | string {
                return !!input;
            },
        },
    ];

    return inquirer.prompt(questions) as Promise<IPromptResult>;
}
