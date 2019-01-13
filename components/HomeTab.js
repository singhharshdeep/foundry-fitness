import React, { Component } from 'react';
import { View, Text, StyleSheet, AsyncStorage, Alert } from 'react-native';
import { Content, Separator, SwipeRow, Button, Thumbnail, Icon, Right } from 'native-base';
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
                this.setState({ classes: response.data })
            })
        });
    }

    render() {
        elements = [];
        if (this.state.classes.length > 0) {
            this.state.classes.forEach(obj => {
                date = Object.keys(obj)[0];
                elements.push(<Text style={{ color: '#5F7787', fontSize: 16, fontWeight: 'bold',paddingTop: 10, paddingStart: 10 }}>{date}</Text>);
                elements.push(<Separator style={{ height: 1, marginTop: 10 }} />);
                obj[date].map((gymClass, index) => {
                    elements.push(<View>
                    <SwipeRow
                        key={index}
                        leftOpenValue={75}
                        left={
                            <Button danger onPress={() => this.handleCancel(gymClass.id)}>
                                <Icon active name="trash" />
                            </Button>
                        }
                        body={
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <Thumbnail square style={{ paddingStart: 10 }} source={require('../assets/img/bootcamp-body.jpg')} />
                                <View style={{ flex: 1, marginStart: 10 }}>
                                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#928150' }}>{gymClass.gym_class.name}</Text>
                                    <Text note style={{ color: '#B6B6B6' }}>{gymClass.gym_class.description}</Text>
                                </View>
                                <Right>
                                    <Text style={{ fontWeight: 'bold', color: '#928150' }}>{gymClass.start_time}</Text>
                                </Right>
                            </View>
                        }
                        /></View>);
                })
            });
        } else {
            elements.push(<NoClass />);
        }
        return (
            <Content contentContainerStyle={{flex: 1, backgroundColor: 'white', alignItems: 'center'}}>
                <View>
                    {elements}
                </View>
            </Content>
        );
    }

    handleCancel(signUpId) {
        token = this.state.token
        Alert.alert('Cancel Class', 
        'Are you sure you want to cancel your sign up?',
        [
            { text: 'Cancel', style: 'cancel' },
            {
                text: 'Yes', onPress: () => {
                    cancelClass(token, signUpId)
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
