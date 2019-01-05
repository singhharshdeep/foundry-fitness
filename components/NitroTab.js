import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Linking, TouchableOpacity } from 'react-native';
import { Content } from 'native-base';

class NitroTab extends Component {
    render() {
        return (
            <Content>
                <TouchableOpacity onPress={() => Linking.canOpenURL('https://nitrolifestyle.ca/nitro-diet/').then(supported => {
                    if (supported) {
                        Linking.openURL('https://nitrolifestyle.ca/nitro-diet/');
                    } else {
                        // console.log("Don't know how to open URI: " + this.props.url);
                    }
                })}>
                    <Image source={require('../assets/img/nitro-diet.jpg')} />
                </TouchableOpacity>
            </Content>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
});

export default NitroTab;
