import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Content, Card, CardItem, Thumbnail, Body, Text, Button } from 'native-base';

class ClassesTab extends Component {
    render() {
        return (
            <Content padder>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Show')}>
                    <Card>
                        <CardItem header bordered>
                            <Thumbnail source={require('../assets/img/bootcamp.jpg')} />
                            <Body style={{ marginStart: 10, marginTop: 5 }}>
                                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Bootcamp</Text>
                                <Text note>Some description</Text>
                            </Body>
                        </CardItem>
                        <CardItem cardBody>
                            <Image source={require('../assets/img/bootcamp-body.jpg')} style={{ height: 200, width: null, flex: 1 }} />
                        </CardItem>
                        <CardItem cardBody>
                            <View style={{ flex: 1, width: undefined, margin: 0 }}>
                                <Button full style={{ backgroundColor: '#928150', height: 60 }}>
                                    <Text style={{ fontWeight: 'bold' }}>SIGN UP</Text>
                                </Button>
                            </View>
                        </CardItem>
                    </Card>
                </TouchableOpacity>
                <Card>
                    <CardItem header bordered>
                        <Thumbnail source={require('../assets/img/bootcamp.jpg')} />
                        <Body style={{ marginStart: 10, marginTop: 5 }}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Bootcamp</Text>
                            <Text note>Some description</Text>
                        </Body>
                    </CardItem>
                    <CardItem cardBody>
                        <Image source={require('../assets/img/bootcamp-body.jpg')} style={{ height: 200, width: null, flex: 1 }} />
                    </CardItem>
                    <CardItem cardBody>
                        <View style={{ flex: 1, width: undefined, margin: 0 }}>
                            <Button full style={{ backgroundColor: '#928150', height: 60 }}>
                                <Text style={{ fontWeight: 'bold' }}>SIGN UP</Text>
                            </Button>
                        </View>
                    </CardItem>
                </Card>
                <Card>
                    <CardItem header bordered>
                        <Thumbnail source={require('../assets/img/bootcamp.jpg')} />
                        <Body style={{ marginStart: 10, marginTop: 5 }}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Bootcamp</Text>
                            <Text note>Some description</Text>
                        </Body>
                    </CardItem>
                    <CardItem cardBody>
                        <Image source={require('../assets/img/bootcamp-body.jpg')} style={{ height: 200, width: null, flex: 1 }} />
                    </CardItem>
                    <CardItem cardBody>
                        <View style={{ flex: 1, width: undefined, margin: 0 }}>
                            <Button full style={{ backgroundColor: '#928150' }}>
                                <Text style={{ fontWeight: 'bold' }}>SIGN UP</Text>
                            </Button>
                        </View>
                    </CardItem>
                </Card>
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

export default ClassesTab;
