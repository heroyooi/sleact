import { IDM } from '@typings/db';
import React, { VFC, memo, useMemo } from 'react';
import { ChatWrapper } from './styles';
import gravatar from 'gravatar';
import dayjs from 'dayjs';
import regexifyString from 'regexify-string';
import { Link, useParams } from 'react-router-dom';

interface Props {
  data: IDM;
}

const Chat: VFC<Props> = ({ data }) => {
  const { workspace } = useParams<{ workspace: string; channel: string }>();
  const user = data.Sender;

  // @[제로초1](7)
  const result = useMemo(
    () =>
      regexifyString({
        input: data.content,
        pattern: /@\[(.+?)\]\((\d+?)\)|\n/g, // 줄바꿈과 id
        decorator(match, index) {
          const arr = match.match(/@\[(.+?)\]\((\d+?)\)/)!;
          if (arr) {
            return (
              <Link key={match + index} to={`/workspace/${workspace}/dm/${arr[2]}`}>
                @{arr[1]}
              </Link>
            );
          }
          return <br key={index} />;
        },
      }),
    [data.content],
  );
  // @[제로초]12](7) 아이디가 좀 특이한 사람 경우 +만 붙이면 제로초]12 이렇게 찾게 된다.
  // +는 최대한 많이, +?는 최대한 조금

  /*
  ※ 정규표현식 상세 설명
  - //g 모두 찾기(플래그)
  - // 하나만 찾겠다.
  - \ 특수 기호들을 무력화시켜준다. (이스케이프)
  - . 모든 글짜
  - + 1개 이상(최대한 많이)
  - ? 0개 이상
  - +? 1개 이상(최대한 조금)
  - \d 숫자
  - | 또는
  - \n 줄바꿈
   */

  /*
  ※ 텍스트에서 줄바꿈만 찾아서 br 태그로 바꾸려면?
  const result = regexifyString({
    input: data.content,
    pattern: /\n/g,
    decorator(match, index) {
      return <br key={index} />;
    },
  });  
  */

  return (
    <ChatWrapper>
      <div className="chat-img">
        <img src={gravatar.url(user.email, { s: '36px', d: 'retro' })} alt={user.nickname} />
      </div>
      <div className="chat-text">
        <div className="chat-user">
          <b>{user.nickname}</b>
          <span>{dayjs(data.createdAt).format('h:mm A')}</span>
        </div>
        <p>{result}</p>
      </div>
    </ChatWrapper>
  );
};

export default memo(Chat);
