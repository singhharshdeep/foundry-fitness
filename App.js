import { createStackNavigator, createAppContainer, createSwitchNavigator } from 'react-navigation';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import ShowScreen from './screens/ShowScreen';
import AuthLoadingScreen from './screens/AuthLoadingScreen';
import ChangePasswordScreen from './screens/ChangePasswordScreen';import ShowPageScreen from './screens/ShowPageScreen';
;

const Auth = createStackNavigator({
  Login: { screen: LoginScreen },
});

const App = createStackNavigator({
  Home: { screen: HomeScreen },
  Show: { screen: ShowScreen },
  ChangePassword: { screen: ChangePasswordScreen },
  ShowPage: { screen: ShowPageScreen },
});

export default createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: App,
    Auth: Auth
  },
  {
    initialRouteName: 'AuthLoading'  
  }
));