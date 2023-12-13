import {useEffect, useRef, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Intro from '../screen/Intro';
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import {AppState, Button} from 'react-native';
import React from 'react';
import StackNavigator from './StackNavigator';
import {useThemeContext} from '../../providers/ThemeProvider';

const Stack = createNativeStackNavigator();

let timerRef: any = null;
let initialized = false;

export const AppCtx: any = React.createContext({});

function RootNavigator(): React.ReactElement {
  const {theme} = useThemeContext();

  const [tracking, setTracking] = useState<any>({});
  const [timer, setTimer] = useState(0);
  const [navReady, setNavReady] = useState(false);

  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  const navigationRef: any = useNavigationContainerRef();
  const routeNameRef: any = useRef();

  const startTimer = () => {
    timerRef = setInterval(() => {
      setTimer((prev: any) => {
        return prev + 1;
      });
    }, 1000);
  };

  useEffect(() => {
    setTracking((prev: any) => {
      return {
        ...prev,
        [navigationRef.getCurrentRoute().name]: timer,
      };
    });
  }, [timer]);

  const clearTimer = (prevTimer: any) => {
    if (timerRef) {
      clearInterval(timerRef);
      setTimer(prevTimer ?? 0);
    }
  };

  const trackTime = (data: any) => {
    fetch(
      `https://vopa-time-tracing-default-rtdb.asia-southeast1.firebasedatabase.app/sessions.json`,
      {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log('Err', err.message));
  };

  useEffect(() => {
    if (appStateVisible === 'background' || !initialized) {
      trackTime(tracking);
      initialized = true;
    }
  }, [appStateVisible]);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        console.log('App has come to the foreground!');
      }

      appState.current = nextAppState;
      setAppStateVisible(appState.current);
      console.log('AppState', appState.current);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <AppCtx.Provider
      value={{
        name: navReady ? navigationRef.getCurrentRoute().name : '',
        tracking: tracking,
      }}>
      <NavigationContainer
        ref={navigationRef}
        onReady={() => {
          setNavReady(true);
          routeNameRef.current = navigationRef.getCurrentRoute().name;
          startTimer();
        }}
        onStateChange={async () => {
          const previousRouteName = routeNameRef.current;
          const currentRouteName = navigationRef.getCurrentRoute().name;
          clearTimer(tracking[currentRouteName]);
          const trackScreenView = (name: any) => {
            startTimer();
          };

          if (previousRouteName !== currentRouteName) {
            routeNameRef.current = currentRouteName;
            await trackScreenView(currentRouteName);
          }
        }}>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            headerStyle: {
              backgroundColor: theme.background,
            },
            headerTitleStyle: {color: theme.fontColor},
            headerTintColor: theme.tintColor,
          }}>
          <Stack.Screen name="Home">
            {(props) => {
              const name = navReady
                ? navigationRef?.getCurrentRoute()?.name
                : '';
              return <Intro {...props} extraData={tracking} name={name} />;
            }}
          </Stack.Screen>
          <Stack.Screen name="StackNavigator" component={StackNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
    </AppCtx.Provider>
  );
}

export default RootNavigator;
