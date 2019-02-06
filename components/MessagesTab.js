import React, { Component } from 'react';
import { View, AsyncStorage, Linking } from 'react-native';
import { Text, Content, Card, CardItem, Body, Icon, Spinner, Image } from 'native-base';
import { getMessages } from '../api';
import { StackActions, NavigationActions } from 'react-navigation';
import LinkPreviewComponent from './LinkPreviewComponent';


class MessagesTab extends Component {

    state = {
        messages: [],
        loading: false
    }

    componentDidMount() {
        this.setState({ loading: true });
        AsyncStorage.getItem('userToken')
        .then(token => getMessages(token)
                        .then(response => {
                            if (response.status === 200) {
                                this.setState({ messages: response.data.data, loading: false })
                            } else if (response.status === 401) {
                                AsyncStorage.removeItem('userToken')
                                this.props.navigation.dispatch(StackActions.reset({
                                    index: 0,
                                    actions: [NavigationActions.navigate({ routeName: 'Login' })],
                                }));
                            } else {
                                alert('An error occured');
                            }
                    })
        );
    }

    render() {
        return (
            <Content>
                {
                    this.state.loading ? <Spinner color='#928150' /> : this.state.messages.map(data => 
                        <Card key={data.id}>
                            <CardItem style={{ paddingLeft: 0, paddingRight: 0, paddingBottom: 0, }}>
                                <Body>
                                    <Text style={{paddingHorizontal: 10}}>{data.attributes.message}</Text>
                                    <CardItem style={{ paddingLeft: 0, borderWidth: 0.5, borderColor: '#edefef', marginTop: 10}} onPress={() => this.openLink(data.attributes.link)} cardBody button>
                                        <LinkPreviewComponent key={data.id} link={data.attributes.link} />
                                    </CardItem>
                                </Body>
                            </CardItem>
                        </Card>
                    )
                }
            </Content>
        );
    }

    openLink(link) {
        Linking.openURL(link).catch(err => console.error('An error occurred', err));
    }
}
export default MessagesTab;
