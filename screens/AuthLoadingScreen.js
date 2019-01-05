import React, { Component } from 'react';
import { View, StyleSheet, Image, AsyncStorage } from 'react-native';
import getTheme from '../native-base-theme/components';
import commonColor from '../native-base-theme/variables/commonColor';
import { Container, Header, StyleProvider } from 'native-base';

class AuthLoadingScreen extends Component {
    constructor(props) {
        super(props);
        AsyncStorage.getItem('userToken').then(userToken => 
            this.props.navigation.navigate(userToken ? 'App' : 'Auth')    
        );
    }

    render() {
        return (
            <StyleProvider style={getTheme(commonColor)}>
                <Container style={styles.container}>
                    <Header transparent iosBarStyle='light-content' />
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Image style={{ height: 200, width: 200 }} source={require('../assets/img/nitro-logo.png')} />
                    </View>
                </Container>
            </StyleProvider>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
});

export default AuthLoadingScreen;
