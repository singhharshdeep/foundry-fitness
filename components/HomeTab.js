import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Container, Content, Separator, SwipeRow, Button, Thumbnail, Icon, Right } from 'native-base';

class HomeTab extends Component {
    render() {
        return (
            <Content padder style={{backgroundColor: 'white'}}>
                <Text style={{ color: '#5F7787', fontSize: 16, fontWeight: 'bold'}}>Monday, Jan 7 2018</Text>
                <Separator style={{ height: 1, marginTop: 10 }} />
                <View>
                    <SwipeRow
                        leftOpenValue={75}
                        left={
                            <Button danger onPress={() => alert('Trash')}>
                                <Icon active name="trash" />
                            </Button>
                        }
                        body={
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <Thumbnail square source={require('../assets/img/bootcamp-body.jpg')} />
                                <View style={{flex: 1, marginStart: 10}}>
                                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#928150'}}>Bootcamp</Text>
                                    <Text note style={{ color: '#B6B6B6'}}>Its time to build a difference</Text>
                                </View>
                                <Right>
                                    <Text style={{ fontWeight: 'bold', color: '#928150'}}>9:15 AM</Text>
                                </Right>
                            </View>
                        }
                    />
                    <SwipeRow
                        leftOpenValue={75}
                        left={
                            <Button danger onPress={() => alert('Trash')}>
                                <Icon active name="trash" />
                            </Button>
                        }
                        body={
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <Thumbnail square source={require('../assets/img/bootcamp-body.jpg')} />
                                <View style={{ flex: 1, marginStart: 10 }}>
                                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#928150' }}>Bootcamp</Text>
                                    <Text note style={{ color: '#B6B6B6'}}>Its time to build a difference</Text>
                                </View>
                                <Right>
                                    <Text style={{ fontWeight: 'bold', color: '#928150' }}>9:15 AM</Text>
                                </Right>
                            </View>
                        }
                    />
                </View>
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

export default HomeTab;
