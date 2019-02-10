import React, { Component } from 'react';
import { View, AsyncStorage, Alert, TouchableOpacity } from 'react-native';
import { Content, Text, Thumbnail, Button, Body, List, ListItem } from 'native-base';
import ImagePicker from 'react-native-image-picker';
import { StackActions, NavigationActions } from 'react-navigation';
import { getProfileInfo } from '../api';

const options = {
    title: 'Select Avatar',
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
};

class ProfileTab extends Component {

    state = {
        profilePhotoUri: '',
        userInfo: null,
    }

    componentDidMount() {
        AsyncStorage.getItem('profilePhotoUri')
        .then(uri => {
            if (uri !== null) {
                this.setState({ profilePhotoUri: uri });
            }
        });

        AsyncStorage.getItem('userToken')
        .then(token => {
            getProfileInfo(token)
            .then(response => {
                if (response.status === 200) {
                    this.setState({ userInfo: response.data.data.attributes });
                } else if (response.status == 401) {
                    AsyncStorage.removeItem('userToken')
                    this.props.navigation.dispatch(StackActions.reset({
                        index: 0,
                        actions: [NavigationActions.navigate({ routeName: 'Login' })],
                    }));
                } else {
                    alert('An error occured');
                }
            }
        );

        }
    )}

    render() {
        return (
            <Content contentContainerStyle={{flex: 1}} style={{backgroundColor: 'white'}}>
                <Body style={{flex: 1, justifyContent: 'center', alignSelf: 'center', marginTop: 20}}>
                    <TouchableOpacity onPress={() => this.handleChangeProfilePicture()}>
                        <Thumbnail style={{width: 120, height: 120, borderRadius: 60}} source={this.state.profilePhotoUri === '' ? require('../assets/img/bootcamp.jpg') : {uri: this.state.profilePhotoUri}}  />
                    </TouchableOpacity>
                    <Body style={{marginTop: 10}}>
                        <Text note>{this.state.userInfo !== null ? this.state.userInfo.email : ''}</Text>
                        <Text style={{ fontSize: 22, marginTop: 10 }}>Member Until: {this.state.userInfo !== null ? this.state.userInfo.membership_renewal_date : ''}</Text>
                    </Body>
                </Body>
                <View style={{flex: 2}}>
                    <List style={{ backgroundColor: '#f1f1f1' }}>
                        <ListItem onPress={() => this.props.navigation.navigate('ChangePassword')}>
                            <Text style={{ marginTop: 10, marginBottom: 10 }}>Change Password</Text>
                        </ListItem>
                    </List>
                    <Button style={{ position: 'absolute', bottom: 0, width: '100%' }} danger full onPress={() =>  this.handleLogout()}>
                        <Text>Logout</Text>
                    </Button>
                </View>
            </Content>
        );
    }

    handleChangeProfilePicture() {
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                const source = { uri: response.uri };

                // You can also display the image using data:
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };

                AsyncStorage.setItem('profilePhotoUri', source.uri);
                this.setState({ profilePhotoUri: source.uri });
            }
        });
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
