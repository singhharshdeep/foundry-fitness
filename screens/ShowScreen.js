import React, { Component } from 'react';
import { View, StyleSheet, Image, StatusBar } from 'react-native';
import { Text, Content, Form, Item, Input, Button } from 'native-base';

class ShowScreen extends Component {
    static navigationOptions = { header: null };
    render() {
        return (
            <View style={{ flex: 1 }}>
                <StatusBar barStyle='light-content' />
                <View style={{ flex: 1 }}>
                        <Image source={require('../assets/img/bootcamp-body.jpg')} style={{ height: null, width: null, flex: 1 }} />
                </View>
                <View style={{ flex: 1 }}>
                    <Content style={{marginTop: 20}} padder>
                        <Form>
                            <Item style={{ borderColor: '#928150'}} rounded>
                                <Input style={{ fontWeight: 'bold', color: '#928150'}} placeholder='Select Date' placeholderTextColor='#928150' />
                            </Item>
                            <Item style={{ borderColor: '#928150', marginTop: 10 }} rounded>
                                <Input style={{ fontWeight: 'bold', color: '#928150' }} placeholder='Select Time' placeholderTextColor='#928150' />
                            </Item>
                            <Button full style={{ marginTop: 20, backgroundColor: '#928150' }}>
                                <Text style={{ fontWeight: 'bold' }}>Sign Up</Text>
                            </Button>
                        </Form>
                    </Content>
                </View>
            </View>
        );
    }
}

export default ShowScreen;
