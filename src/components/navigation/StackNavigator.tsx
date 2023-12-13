import React from 'react';
import Screen1 from '../screen/Screen1';
import Screen2 from '../screen/Screen2';
import Screen3 from '../screen/Screen3';
import Screen4 from '../screen/Screen4';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useThemeContext} from '../../providers/ThemeProvider';

const Stack = createNativeStackNavigator();

function RootNavigator(props: any): React.ReactElement {
  const {theme} = useThemeContext();



  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.background,
        },
        headerTitleStyle: {color: theme.fontColor},
        headerTintColor: theme.tintColor,
      }}>
      <Stack.Screen name="Profile">
        {(props) => <Screen1 {...props} extraData={{}} />}
      </Stack.Screen>
      <Stack.Screen name="Settings">
        {(props) => <Screen2 {...props} extraData={{}} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

export default RootNavigator;
