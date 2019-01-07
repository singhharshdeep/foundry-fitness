import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Icon } from 'native-base';

class NoClass extends Component {
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Icon type='FontAwesome' name='list' style={{ fontSize: 100, color: '#CECDD2'}} />
                <Text style={{ color: '#CECDD2'}}>You have no upcoming classes</Text>
            </View>
        );
    }
}

export default NoClass;
