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
                elements.push(<Text style={{ backgroundColor: '#000000', color: '#FFF', paddingBottom: 10, fontSize: 16, fontWeight: 'bold',paddingTop: 10, paddingStart: 10 }}>{date}</Text>);
                obj[date].map((gymClass, index) => {
                    elements.push(<View>
                    <SwipeRow
                        style={{backgroundColor: '#f1f1f1'}}
                        key={index}
                        leftOpenValue={75}
                        left={
                            <Button danger onPress={() => this.handleCancel(gymClass.id)}>
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
            elements.push(<NoClass />);
        }
        return (
            <Content contentContainerStyle={{flex: 1, backgroundColor: 'white'}}>
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
