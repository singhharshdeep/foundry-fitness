import React, { Component } from 'react';
import { View, Text, AsyncStorage, WebView } from 'react-native';
import { getPage } from '../api';

class ShowPageScreen extends Component {

    state = {
        page: null,
    }

    componentDidMount() {
        AsyncStorage.getItem('userToken').then(token => {
            this.setState({ token: token })
            let id = this.props.navigation.state.params.pageId;
            getPage(token, id)
                .then(response => {
                    this.setState({ page: response.data });
                })
        });
    }

    render() { 
            {
                return this.state.page !== null ? <WebView
                originWhitelist={['*']}
                source={{ html: this.state.page.context }} /> : <Text>Page</Text>
            }
        ;
    }
}

export default ShowPageScreen;
