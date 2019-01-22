import React, { Component } from 'react';
import { View, Image, TouchableOpacity, Linking, Dimensions } from 'react-native';
import LinkPreview from 'react-native-link-preview';
import { Text, Card, CardItem, Left, Body } from 'native-base';

class LinkPreviewComponent extends Component {

    state = {
        imageUrl: '',
        imageDesciption: '',
    }

    componentDidMount() {
        LinkPreview.getPreview(this.props.link)
            .then(response => { this.setState({imageUrl: response.images[0], imageDesciption: response.title})
        console.log(response.images[0])});
    }

    render() {
        return (
                this.state.imageUrl !== '' ? (
                        <View style={{flex: 1}}>
                            <View>
                                <Image 
                                    style={{
                                        resizeMode: 'contain',
                                        width: null,
                                        height: 200,
                                        flex: 1
                                    }}
                                    source={{ uri: this.state.imageUrl }}
                                />
                            </View>
                            <CardItem style={{ backgroundColor: '#edefef', flexDirection: 'column'}}>
                                <Body>
                                    <Text>{this.state.imageDesciption}</Text>
                                    <Text note>{this.props.link}</Text>
                                </Body>
                            </CardItem>
                        </View>
                ) : (
                    <View></View>
                )
        );
    }
}

export default LinkPreviewComponent;
