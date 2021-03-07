import React, { useCallback } from 'react';
import { Container, Header } from './styles';
import ChatBox from '@components/ChatBox';
import ChatList from '@components/ChatList';
import useInput from '@hooks/useInput';

const Channel = () => {
  const [chat, onChangeChat] = useInput('');

  const onSubmitForm = useCallback((e) => {
    console.log('submit');
    e.preventDefault();
  }, []);

  return (
    <Container>
      <Header>채널!</Header>
      {/* <ChatList /> */}
      <ChatBox chat={chat} onChangeChat={onChangeChat} onSubmitForm={onSubmitForm} />
    </Container>
  );
};

export default Channel;
