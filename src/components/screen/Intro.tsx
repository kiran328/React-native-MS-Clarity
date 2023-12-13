import Button from '../shared/Button';
import type {DefaultNavigationProps} from '../../types';
import React, {useContext} from 'react';
import {View, Text} from 'react-native';
import styled from 'styled-components/native';

import {AppCtx} from '../navigation/SwitchNavigator';

const Container = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const ButtonWrapper = styled.View`
  position: absolute;
  flex-direction: column;
  bottom: 40px;
  width: 85%;
  align-self: center;
`;

const StyledText = styled.Text`
  font-size: 16px;
  color: blue;
  margin-bottom: 8px;
`;

interface Props {
  navigation: DefaultNavigationProps<'Intro'>;
}

function Intro(props: any): React.ReactElement {
  const ctx: any = useContext(AppCtx);

  return (
    <Container>
      <View style={{marginTop: 90}} />
      <StyledText testID="myText">Home</StyledText>
      <Text style={{fontSize: 33}}>{ctx.tracking[ctx.name]}</Text>
      <Text style={{fontSize: 17}}>{JSON.stringify(ctx.tracking)}</Text>
      <Button
        testID="btnStack"
        style={{
          marginTop: 66,
        }}
        onClick={(): void =>
          props.navigation.navigate('StackNavigator', {
            extra: props.extraData,
            name: props.name,
          })
        }
        text="Navigate to Profile"
      />
    </Container>
  );
}

export default Intro;
