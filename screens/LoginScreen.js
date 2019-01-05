import React, { Component } from 'react';
import { View, StyleSheet, Image, TextInput, AsyncStorage } from 'react-native';
import getTheme from '../native-base-theme/components';
import commonColor from '../native-base-theme/variables/commonColor';
import { Container, Header, Text, Button, StyleProvider, Content } from 'native-base';
import { getUserToken } from '../api';

class LoginScreen extends Component {
    state = {
        emailEntered: '',
        passwordEntered: '',
    }

    static navigationOptions = { header: null };
    render() {
        return (
            <StyleProvider style={getTheme(commonColor)}>
                <Container style={styles.container}>
                    <Header transparent iosBarStyle='light-content' />
                    <Content bounces={false} contentContainerStyle={{ flex: 1 }}>
                        <View style={{ flex: 1, alignItems: 'center' }}>
                            <Image style={{ height: 200, width: 200 }} source={require('../assets/img/nitro-logo.png')} />
                        </View>
                        <View style={{ flex: 1, marginHorizontal: 40 }}>
                            <Text style={{ color: '#928150', fontSize: 16 }}>EMAIL</Text>
                            <TextInput onChangeText={(email) => this.setState({ email })}
                                style={{ color: '#928150', height: 50, borderColor: '#928150', borderWidth: 1 }}
                            />
                            <View style={{ marginTop: 10 }}>
                                <Text style={{ color: '#928150', fontSize: 16 }}>PASSWORD</Text>
                                <TextInput secureTextEntry onChangeText={(password) => this.setState({ password })}
                                    style={{ color: '#928150', height: 50, borderColor: '#928150', borderWidth: 1 }}
                                />
                            </View>
                            <View style={{ marginTop: 30 }}>
                                <Button onPress={() => this.handleLogin()} full style={{ backgroundColor: '#928150', height: 50 }}>
                                    <Text>LOGIN</Text>
                                </Button>
                            </View>
                        </View>
                    </Content>
                </Container>
            </StyleProvider>
        );
    }

    handleLogin() {
        if (this.state.email === '' || this.state.password === '') {
            alert('Please fill your email and password');
        } else {
            getUserToken(this.state.email, this.state.password)
            .then(response => AsyncStorage.setItem('userToken', response.data.jwt).then(() => this.props.navigation.navigate('App')))
            .catch(error => {
                alert("Invalid email/password");
            });
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1A1A1A',
    },
});

export default LoginScreen;
