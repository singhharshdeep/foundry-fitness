import React, { Component } from 'react';
import { View, AsyncStorage, Alert } from 'react-native';
import { Content, Text, Thumbnail, Button } from 'native-base';

class ProfileTab extends Component {
    render() {
        return (
            <Content contentContainerStyle={{flex: 1}} style={{backgroundColor: 'white'}}>
                <View style={{flex: 1, justifyContent: 'center', alignSelf: 'center'}}>
                    <Thumbnail style={{width: 120, height: 120, borderRadius: 60}} source={require('../assets/img/bootcamp.jpg')} />
                    <View style={{marginTop: 10}}>
                        <Text style={{textAlign: 'center'}}>Nitro User</Text>
                        <Text note>testuser@gmail.com</Text>
                    </View>
                </View>
                <View style={{flex: 2}}>
                    <Button danger full onPress={() =>  this.handleLogout()}>
                        <Text>Logout</Text>
                    </Button>
                </View>
            </Content>
        );
    }

    handleLogout() {

        Alert.alert(
            'Log Out',
            'Are you sure you want to log out?',
            [
                { 'text': 'Cancel' },
                { 'text': 'Yes', onPress: () => {
                        AsyncStorage.removeItem('userToken')
                            .then(() => this.props.navigation.navigate('Auth'))
                    } 
                }
            ],
            { cancelable: false }
        )
    }
}

export default ProfileTab;
