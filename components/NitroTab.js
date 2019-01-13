import React, { Component } from 'react';
import { View, StyleSheet, Image, Linking, TouchableOpacity } from 'react-native';
import { Content, Card, CardItem, Thumbnail, Body, Text, H3 } from 'native-base';

class NitroTab extends Component {
    render() {
        return (
            <Content>
                <TouchableOpacity>
                    <Card>
                        <CardItem header bordered>
                            <Thumbnail source={require('../assets/img/bootcamp-body.jpg')} />
                            <Body style={{ marginStart: 10, marginTop: 5 }}>
                                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Name</Text>
                                <Text note>description</Text>
                            </Body>
                        </CardItem>
                        <CardItem cardBody>
                            <Image source={require('../assets/img/bootcamp-body.jpg')} style={{ height: 200, width: null, flex: 1 }} />
                        </CardItem>
                    </Card>
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
