import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { Content, Text, List, ListItem, InputGroup, Input, Button } from 'native-base';
import { changeUserPassword } from '../api';

class ChangePasswordScreen extends Component {

    static navigationOptions = {
        title: 'Change Password',
    }

    state = {
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
    }

    render() {
        return (
            <Content contentContainerStyle={{flex: 1, alignItems: 'center'}} padder>
                        <InputGroup>
                            <Input secureTextEntry onChangeText={oldPassword => this.setState({ oldPassword })} placeholder='Old Password' />
                        </InputGroup>
                        <InputGroup>
                            <Input secureTextEntry onChangeText={newPassword => this.setState({ newPassword })} placeholder='New Password' />
                        </InputGroup>
                        <InputGroup>
                            <Input secureTextEntry onChangeText={confirmPassword => this.setState({ confirmPassword })} placeholder='Confirm New Password' />
                        </InputGroup>
                        <Button onPress={() => this.handlChangePassword()} style={{marginTop: 20}} full primary>
                            <Text>Change Password</Text>
                        </Button>
            </Content>
        );
    }

    handlChangePassword() {
        if (this.state.oldPassword === '' || this.state.newPassword === '' || this.state.confirmPassword === '' ) {
            alert('Please input all the fields');
        } else if (this.state.newPassword !== this.state.confirmPassword) {
            alert('Passwords do not match');
        } else {
            AsyncStorage.getItem('userToken')
            .then(token => changeUserPassword(token, this.state.oldPassword, this.state.newPassword, this.state.confirmPassword)
                            .then(response => { 
                                if (response.status == 200) {
                                    alert('Your password has been changed successfully'); 
                                    this.props.navigation.pop();
                                } else {
                                    alert('There was a problem changing your password');
                                }
                            })
            );
        }
    }
}

export default ChangePasswordScreen;
