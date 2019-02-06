import React, { Component } from 'react';
import { View } from 'react-native';
import { Icon, Button, Text } from 'native-base';

class NoClass extends Component {
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Icon type='FontAwesome' name='list' style={{ fontSize: 100, color: '#CECDD2'}} />
                <Text style={{ color: '#CECDD2'}}>You have no upcoming classes</Text>
                <View style={{marginTop: 10}}>
                    <Button style={{ backgroundColor: '#928150' }} onPress={() => this.props.onSignupButtonPress()}>
                        <Text>Sign Up for a Class</Text>
                    </Button>
                </View>
            </View>
        );
    }
}

export default NoClass;
