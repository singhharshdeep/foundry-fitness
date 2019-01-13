import React, { Component } from 'react';
import { View, StyleSheet, Image, AsyncStorage } from 'react-native';
import getTheme from '../native-base-theme/components';
import commonColor from '../native-base-theme/variables/commonColor';
import { Container, Header, StyleProvider } from 'native-base';
var PushNotification = require('react-native-push-notification');

class AuthLoadingScreen extends Component {
    constructor(props) {
        super(props);
        AsyncStorage.getItem('userToken').then(userToken => 
            this.props.navigation.navigate(userToken ? 'App' : 'Auth')    
        );
    }

    componentDidMount() {
        PushNotification.configure({

            // (optional) Called when Token is generated (iOS and Android)
            onRegister: function (device) {
                console.log(device.token);
            },

            // (required) Called when a remote or local notification is opened or received
            onNotification: function (notification) {
                console.log('NOTIFICATION:', notification);

                // process the notification

                // required on iOS only (see fetchCompletionHandler docs: https://facebook.github.io/react-native/docs/pushnotificationios.html)
                notification.finish(PushNotificationIOS.FetchResult.NoData);
            },

            // ANDROID ONLY: GCM or FCM Sender ID (product_number) (optional - not required for local notifications, but is need to receive remote push notifications)
            senderID: "476240657084",

            // IOS ONLY (optional): default: all - Permissions to register.
            permissions: {
                alert: true,
                badge: true,
                sound: true
            },

            // Should the initial notification be popped automatically
            // default: true
            popInitialNotification: true,

            /**
              * (optional) default: true
              * - Specified if permissions (ios) and token (android and ios) will requested or not,
              * - if not, you must call PushNotificationsHandler.requestPermissions() later
              */
            requestPermissions: false,
        });
        PushNotification.requestPermissions("476240657084");
    }

    render() {
        setTimeout(() => console.log('delay'), 5000);
        return (
            <StyleProvider style={getTheme(commonColor)}>
                <Container style={{backgroundColor: '#1A1A1A'}}>
                    <Header transparent iosBarStyle='light-content' />
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Image style={{ height: 200, width: 200 }} source={require('../assets/img/nitro-logo.png')} />
                    </View>
                </Container>
            </StyleProvider>
        );
    }
}

export default AuthLoadingScreen;
