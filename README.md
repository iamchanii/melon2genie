# melon2genie

멜론 플레이리스트를 기반으로 지니 앨범을 생성하는 앱입니다.

# Usage

## 1. 멜론 플레이리스트 id 확인

가져올 멜론 플레이리스트 id 가 필요합니다. 플레이리스트 생성 후 PC 에서 확인하면 주소창에서 확인할 수 있습니다:
```
https://www.melon.com/mymusic/playlist/mymusicplaylistview_inform.htm?plylstSeq=XXXXXXXX
```

## 2. 지니 계정은 SNS 연동이 아닌 계정으로 진행

말 그대로 카카오/페이스북 으로 로그인 해야 하는 계정이 아닌 아이디/비밀번호 로 로그인이 가능한 계정이어야 합니다.
 
## 3. 명령어 실행

```
$ yarn start
> ? 멜론 플레이리스트 id를 입력하세요: XXXXXX (위에서 확인한 플레이리스트 id)
> ? 지니 id를 입력하세요: XXXXXX
> ? 지니 pw를 입력하세요: [hidden]
> Get melon playlist...
> Genie login...
> Get genie user number...
> Search genie song id...
> Create album...
> Add songs to album...
> 앨범이 생성되었습니다: m2g_XXXXXX
```

### 유의사항
- 멜론 플레이리스트에 곡이 많을 수록 시간이 오래걸립니다.
- 멜론과 지니에 등록된 곡 제목이 다른 경우가 많아 검색되지 않는 곡이 있습니다.

# Todo

- [ ] 테스트 코드 작성
- [ ] 현재 검색중인 곡 표시
