import React, {useEffect} from 'react';
import {initialize} from 'react-native-clarity';

import RootNavigator from './components/navigation/SwitchNavigator';
import RootProvider from './providers';

function App(): React.ReactElement {
  useEffect(() => {
    console.log('MS clarity initiated');
    initialize('k540d6vt1j');
  }, []);

  return <RootNavigator />;
}

function ProviderWrapper(): React.ReactElement {
  return (
    <RootProvider>
      <App />
    </RootProvider>
  );
}

export default ProviderWrapper;
