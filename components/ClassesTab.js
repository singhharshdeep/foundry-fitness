import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, AsyncStorage } from 'react-native';
import { Content, Card, CardItem, Thumbnail, Body, Text, H3, Spinner } from 'native-base';
import { showClasses } from '../api';

class ClassesTab extends Component {
    state = {
        classes: [],
        loading: false
    }

    componentDidMount() {
        this.setState({ loading: true });
        AsyncStorage.getItem('userToken').then(token => {
            showClasses(token)
                .then(response => this.setState({ classes: response.data.data, loading: false }))
        });
    }

    render() {
        return (
            <Content padder>
                {
                    this.state.loading ? <Spinner color='#928150' /> : (
                    this.state.classes.map(gymClass => 
                        <TouchableOpacity key={gymClass.id} onPress={() => this.props.navigation.navigate('Show', { classId: gymClass.id })}>
                            <Card>
                                <CardItem header bordered>
                                    <Thumbnail source={{ uri: gymClass.attributes.image_url }} />
                                    <Body style={{ marginStart: 10, marginTop: 5, justifyContent: 'center' }}>
                                        <Text style={{ fontSize: 17, fontWeight: 'bold' }}>{gymClass.attributes.name}</Text>
                                    </Body>
                                </CardItem>
                                <CardItem cardBody>
                                    <Image source={{uri: gymClass.attributes.image_url}} style={{ height: 200, width: null, flex: 1 }} />
                                </CardItem>
                                <CardItem cardBody>
                                    <View style={{ flex: 1, width: undefined, margin: 0 }}>
                                        <View full style={{ backgroundColor: '#928150', height: 60, justifyContent: 'center', alignItems: 'center' }}>
                                            <Text style={{ color: '#fff', margin: 0 }}>SIGN UP</Text>
                                        </View>
                                    </View>
                                </CardItem>
                            </Card>
                        </TouchableOpacity>
                    ))
                }
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
