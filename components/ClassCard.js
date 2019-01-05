import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Card, CardItem, Thumbnail, Body, Text, Image, H3 } from 'native-base';

export default class ClassCard extends Component {

    render() {
        return (
            <TouchableOpacity onPress={this.props.onCardPress}>
                <Card>
                    <CardItem header bordered>
                        <Thumbnail source={require('../assets/img/bootcamp.jpg')} />
                        <Body style={{ marginStart: 10, marginTop: 5 }}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>this.props.gymClass.attributes.name</Text>
                            <Text note>this.props.gymClass.attributes.description</Text>
                        </Body>
                    </CardItem>
                    <CardItem cardBody>
                        <Image source={require('../assets/img/bootcamp-body.jpg')} style={{ height: 200, width: null, flex: 1 }} />
                    </CardItem>
                    <CardItem cardBody>
                        <View style={{ flex: 1, width: undefined, margin: 0 }}>
                            <View full style={{ backgroundColor: '#928150', height: 60, justifyContent: 'center', alignItems: 'center' }}>
                                <H3 style={{ color: '#fff' }}>SIGN UP</H3>
                            </View>
                        </View>
                    </CardItem>
                </Card>
            </TouchableOpacity>
        );
    }
}