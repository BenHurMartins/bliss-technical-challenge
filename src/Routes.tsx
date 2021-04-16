import React, {useEffect, useState} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {api} from './api/index';
import {Text} from 'react-native-elements';
import {Linking} from 'react-native';
import Toast from 'react-native-toast-message';
import {Colors} from './constants/';
import NetInfo, {useNetInfo} from '@react-native-community/netinfo';

//Modals
import RetryAction from './modals/RetryAction';
import NoConnection from './modals/NoConnection';

//Navigation
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

//Screens
import QuestionsListScreen from './screens/QuestionsListScreen';
import DetailScreen from './screens/DetailScreen';
import {View} from 'react-native';

const toastConfig = {
  success: ({text1, props, ...rest}) => (
    <View
      style={{
        height: 60,
        width: '90%',
        backgroundColor: Colors.secondaryColor,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        opacity: 0.9,
      }}>
      <Text style={{color: Colors.white}}>{text1}</Text>
    </View>
  ),
};

const Routes = (props) => {
  const Stack = createStackNavigator();
  // const netInfo = useNetInfo();
  const [apiHealth, setApiHealth] = useState('OK');
  const [isOffline, setOfflineStatus] = useState(false);

  useEffect(() => {
    const removeNetInfoSubscription = NetInfo.addEventListener((state) => {
      const offline = !state.isConnected;
      setOfflineStatus(offline);
    });
    return () => removeNetInfoSubscription();
  }, []);

  const checkServerHealth = () => {
    api
      .get('/health')
      .then((response) => {
        if (response.status == 200) {
          const {status} = response.data;
          setApiHealth(status);
          SplashScreen.hide();
        }
      })
      .catch((err) => {
        console.log(err);
        SplashScreen.hide();
      });
  };

  //first call to check the server health
  useEffect(() => {
    checkServerHealth();
  }, []);

  //The function bellow will check the server health every 10 seconds
  useEffect(() => {
    setInterval(() => {
      checkServerHealth();
    }, 10000);
  }, []);

  const mainStack = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="QuestionsListScreen"
          component={QuestionsListScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="DetailScreen"
          component={DetailScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    );
  };

  return (
    <>
      <RetryAction showModal={apiHealth != 'OK'} action={checkServerHealth} />
      {/* <NoConnection showModal={!netInfo.isConnected} /> */}
      <NoConnection showModal={isOffline} />
      <NavigationContainer>
        <>{mainStack()}</>
        <Toast config={toastConfig} ref={(ref) => Toast.setRef(ref)} />
      </NavigationContainer>
    </>
  );
};

export default Routes;
