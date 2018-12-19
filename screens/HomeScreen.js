import React, { Component } from 'react';
import { View, StyleSheet, Image, StatusBar, TouchableOpacity } from 'react-native';
import { Container, Content, Card, CardItem, Text, Thumbnail, Body, Button, Header, Footer, FooterTab, Icon } from 'native-base';
import HomeTab from '../components/HomeTab';
import ClassesTab from '../components/ClassesTab';
import ProfileTab from '../components/ProfileTab';
import NitroTab from '../components/NitroTab';

class HomeScreen extends Component {
    state = {
        selectedTab: 0,
    }
    static navigationOptions = { headerLeft: null, title: 'Home', gesturesEnabled: false }

    render() {
        let activeTab;
        switch(this.state.selectedTab) {
            case 0:
                activeTab = <HomeTab />
                break;
            case 1:
                activeTab = <ClassesTab navigation={this.props.navigation} />
                break;
            case 2:
                activeTab = <NitroTab />
                break;
            case 3:
                activeTab = <ProfileTab />
                break;
            default:
                activeTab = <HomeTab />
        }
        return (
            <Container style={styles.container}>
                <StatusBar barStyle='dark-content' />
                {activeTab}
                <Footer>
                    <FooterTab>
                        <Button vertical onPress={() => this.setState({ selectedTab: 0 })} style={(this.state.selectedTab === 0) ? styles.selectedTab : {}}>
                            <Icon type='FontAwesome' name='home' style={(this.state.selectedTab === 0) ? styles.selectedText : {}} />
                            <Text style={(this.state.selectedTab === 0) ? styles.selectedText : {}}>Home</Text>
                        </Button>
                        <Button vertical onPress={() => this.setState({ selectedTab: 1 })} style={(this.state.selectedTab === 1) ? styles.selectedTab : {}}>
                            <Icon type='FontAwesome' name='calendar' style={(this.state.selectedTab === 1) ? styles.selectedText : {}} />
                            <Text style={(this.state.selectedTab === 1) ? styles.selectedText : {}}>Classes</Text>
                        </Button>
                        <Button vertical onPress={() => this.setState({ selectedTab: 2 })} style={(this.state.selectedTab === 2) ? styles.selectedTab : {}}>
                            <Icon type='FontAwesome' name='info' style={(this.state.selectedTab === 2) ? styles.selectedText : {}} />
                            <Text style={(this.state.selectedTab === 2) ? styles.selectedText : {}}>Nitro</Text>
                        </Button>
                        <Button vertical onPress={() => this.setState({ selectedTab: 3 })} style={(this.state.selectedTab === 3) ? styles.selectedTab : {}}>
                            <Icon type='FontAwesome' name='user' style={(this.state.selectedTab === 3) ? styles.selectedText : {}} />
                            <Text style={(this.state.selectedTab === 3) ? styles.selectedText : {}}>Profile</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1A1A1A',
    },
    selectedTab: {
        backgroundColor: '#928150',
        borderRadius: 0,
    },
    selectedText: {
        color: 'white'
    }
});

export default HomeScreen;
