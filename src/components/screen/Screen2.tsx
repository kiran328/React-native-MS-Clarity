import React, {useContext} from 'react';
import type {ReactElement} from 'react';
import styled from 'styled-components/native';
import {Text} from 'react-native';

import {AppCtx} from '../navigation/SwitchNavigator';

const Container = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const StyledText = styled.Text`
  font-size: 16px;
  color: blue;
  margin-bottom: 8px;
`;

function Page(props: any): ReactElement {
  const ctx: any = useContext(AppCtx);

  return (
    <Container>
      <StyledText testID="myText">{ctx.name}</StyledText>
      <Text style={{fontSize: 33}}>{ctx.tracking[ctx.name]}</Text>
      <Text style={{fontSize: 17}}>{JSON.stringify(ctx.tracking)}</Text>
    </Container>
  );
}

export default Page;
