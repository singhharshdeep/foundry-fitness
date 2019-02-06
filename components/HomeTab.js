import React, { Component } from 'react';
import { View, Text, AsyncStorage, Alert } from 'react-native';
import { Content, SwipeRow, Button, Thumbnail, Icon, Right } from 'native-base';
import { signedUpClasses, cancelClass } from '../api';
import { StackActions, NavigationActions } from 'react-navigation';
import NoClass from './NoClass';

class HomeTab extends Component {
    state = {
        token: '',
        classes: []
    }

    componentDidMount() {
        AsyncStorage.getItem('userToken').then(token => {
            this.setState({token: token});
            signedUpClasses(token).then(response => {
                if (response.status === 200) {
                    this.setState({ classes: response.data })
                } else if (response.status === 401) {
                    AsyncStorage.removeItem('userToken')
                    this.props.navigation.dispatch(StackActions.reset({
                        index: 0,
                        actions: [NavigationActions.navigate({ routeName: 'Login' })],
                    }));
                } else {
                    alert('An error occured');
                }
            })
        });
    }

    render() {
        elements = [];
        if (this.state.classes.length > 0) {
            this.state.classes.forEach(obj => {
                date = Object.keys(obj)[0];
                elements.push(<Text style={{ backgroundColor: '#000000', color: '#FFF', paddingBottom: 10, fontSize: 16, fontWeight: 'bold',paddingTop: 10, paddingStart: 10 }}>{date}</Text>);
                obj[date].map((gymClass, index) => {
                    elements.push(<View>
                    <SwipeRow
                        style={{backgroundColor: '#f1f1f1'}}
                        key={index}
                        leftOpenValue={75}
                        left={
                            <Button danger onPress={() => this.handleCancel(gymClass.id, date, gymClass.start_time)}>
                                <Icon active name="trash" />
                            </Button>
                        }
                        body={
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <Thumbnail style={{ paddingStart: 10, marginLeft: 5 }} source={{ uri: gymClass.gym_class.image_url }} />
                                <View style={{ flex: 1, marginStart: 10, justifyContent: 'center' }}>
                                    <Text style={{ fontSize: 17, fontWeight: 'bold', color: '#000' }}>{gymClass.gym_class.name}</Text>
                                </View>
                                <Right>
                                    <Text style={{ fontWeight: 'bold', color: '#928150', fontSize: 20, textAlign: 'center' }}>{gymClass.start_time}</Text>
                                </Right>
                            </View>
                        }
                        /></View>);
                })
            });
        } else {
            elements.push(<NoClass onSignupButtonPress={this.props.onSignupButtonPress} />);
        }
        return (
            <Content contentContainerStyle={{flex: 1, backgroundColor: 'white'}}>
                {elements}
            </Content>
        );
    }

    handleCancel(signUpId, date, startTime) {
        let classTime = new Date(date.substring(date.indexOf(',') + 2) + ' ' + startTime);
        let currentTime = new Date();
        let difference = Math.floor(Math.abs(classTime - currentTime) / 36e5);
        token = this.state.token;
        let displayMessage = 'Are you sure you want to cancel your sign up?';
        displayMessage += (difference <= 8 ? ' You will be fined $5' : '');
        Alert.alert('Cancel Class', 
        displayMessage,
        [
            { text: 'Cancel', style: 'cancel' },
            {
                text: 'Yes', onPress: () => {
                    cancelClass(token, signUpId, difference <= 8)
                    .then(response => {
                        alert('Sign up cancelled');
                        this.props.navigation.dispatch(StackActions.reset({
                            index: 0,
                            actions: [NavigationActions.navigate({ routeName: 'Home' })],
                        }));
                    }).catch(err => {
                        alert('There was a problem cancelling your signup');
                    })
                }
            }
        ])
    }
}

export default HomeTab;
