import React, { Component } from 'react';
import { View, StyleSheet, StatusBar, Platform } from 'react-native';
import { Container, Text, Button, Footer, FooterTab, Icon, StyleProvider, Header, Title } from 'native-base';
import HomeTab from '../components/HomeTab';
import ClassesTab from '../components/ClassesTab';
import ProfileTab from '../components/ProfileTab';
import NitroTab from '../components/NitroTab';
import getTheme from '../native-base-theme/components';
import commonColor from '../native-base-theme/variables/commonColor';

class HomeScreen extends Component {
    state = {
        selectedTab: 0,
    }
    static navigationOptions = { header: null }

    render() {
        let activeTab;
        let headerTitle;
        switch(this.state.selectedTab) {
            case 0:
                activeTab = <HomeTab />
                headerTitle = 'Upcoming Classes';
                break;
            case 1:
                activeTab = <ClassesTab navigation={this.props.navigation} />
                headerTitle = 'Classes';
                break;
            case 2:
                activeTab = <NitroTab />
                headerTitle = 'Nitro';
                break;
            case 3:
                activeTab = <ProfileTab navigation={this.props.navigation} />
                headerTitle = 'Profile';
                break;
            default:
                activeTab = <HomeTab />
        }
        return (
            <StyleProvider style={getTheme(commonColor)}>
                <Container style={styles.container}>
                    <StatusBar />
                    <Header style={{ justifyContent: 'center', alignItems: 'center' }} iosBarStyle='dark-content'>
                        <Title>{headerTitle}</Title>
                    </Header>
                    {activeTab}
                    <Footer>
                        <FooterTab>
                            <Button vertical onPress={() => this.setState({ selectedTab: 0 })} active={this.state.selectedTab === 0}>
                                <Icon type='FontAwesome' name='home' />
                                <Text>Home</Text>
                            </Button>
                            <Button vertical onPress={() => this.setState({ selectedTab: 1 })} active={this.state.selectedTab === 1}>
                                <Icon type='FontAwesome' name='calendar' />
                                <Text>Classes</Text>
                            </Button>
                            <Button vertical onPress={() => this.setState({ selectedTab: 2 })} active={this.state.selectedTab === 2}>
                                <Icon type='FontAwesome' name='info' />
                                <Text>Nitro</Text>
                            </Button>
                            <Button vertical onPress={() => this.setState({ selectedTab: 3 })} active={this.state.selectedTab === 3}>
                                <Icon type='FontAwesome' name='user' />
                                <Text>Profile</Text>
                            </Button>
                        </FooterTab>
                    </Footer>
                </Container>
            </StyleProvider>
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
