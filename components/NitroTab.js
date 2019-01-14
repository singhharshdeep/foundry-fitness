import React, { Component } from 'react';
import { StyleSheet, Image, TouchableOpacity, AsyncStorage } from 'react-native';
import { Content, Card, CardItem, Thumbnail, Body, Text, H3, Spinner } from 'native-base';
import { getPages } from '../api';

class NitroTab extends Component {

    state = {
        pages: [],
        loading: false,
    }

    componentDidMount() {
        this.setState({ loading: true });
        AsyncStorage.getItem('userToken')
        .then(token => getPages(token)
                        .then(response => this.setState({ pages: response.data.data, loading: false }))
        );
    }

    render() {
        return (
            <Content>
                {
                    this.state.loading ? <Spinner color='#928150' /> : (
                        this.state.pages.map(page => 
                            <TouchableOpacity key={page.id} onPress={() => this.props.navigation.navigate('ShowPage', { pageId: page.id })}>
                                <Card>
                                    <CardItem header bordered>
                                        <Thumbnail source={{ uri: page.attributes.image_url }} />
                                        <Body style={{ marginStart: 10, marginTop: 5, justifyContent: 'center' }}>
                                            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{page.attributes.title}</Text>
                                        </Body>
                                    </CardItem>
                                    <CardItem cardBody>
                                        <Image source={{ uri: page.attributes.image_url }} style={{ height: 200, width: null, flex: 1 }} />
                                    </CardItem>
                                </Card>
                            </TouchableOpacity>
                        )
                    )
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

export default NitroTab;
