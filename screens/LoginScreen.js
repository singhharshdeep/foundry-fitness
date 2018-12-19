import React, { Component } from 'react';
import { View, StyleSheet, Image, TextInput } from 'react-native';
import { Container, Header, Text, Button } from 'native-base';

class LoginScreen extends Component {
    static navigationOptions = { header: null };
    render() {
        return (
            <Container style={styles.container}>
                <Header transparent iosBarStyle='light-content' />
                <View style={{ flex: 1 }}>
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <Image style={{ height: 200, width: 200 }} source={require('../assets/img/nitro-logo.png')} />
                    </View>
                    <View style={{ flex: 1, marginHorizontal: 40 }}>
                        <Text style={{ color: '#928150', fontSize: 16 }}>EMAIL</Text>
                        <TextInput
                            style={{ color: '#928150', height: 50, borderColor: '#928150', borderWidth: 1 }}
                        />
                        <View style={{ marginTop: 10 }}>
                            <Text style={{ color: '#928150', fontSize: 16 }}>PASSWORD</Text>
                            <TextInput
                                style={{ color: '#928150', height: 50, borderColor: '#928150', borderWidth: 1 }}
                            />
                        </View>
                        <View style={{ marginTop: 30 }}>
                            <Button onPress={() => this.props.navigation.navigate('Home')} full style={{ backgroundColor: '#928150', height: 50 }}>
                                <Text>LOGIN</Text>
                            </Button>
                        </View>
                    </View>
                </View>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1A1A1A',
    },
});

export default LoginScreen;
