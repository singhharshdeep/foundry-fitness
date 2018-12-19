import { createStackNavigator, createAppContainer } from 'react-navigation';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import ShowScreen from './screens/ShowScreen';

const App = createStackNavigator({
  Login: { screen: LoginScreen },
  Home: { screen: HomeScreen },
  Show: { screen: ShowScreen }
}, {
    initialRouteName: 'Login'
  });

export default createAppContainer(App);