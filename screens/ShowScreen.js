import React, { Component } from 'react';
import { View, Image, StatusBar, Alert, ImageBackground, TouchableOpacity, AsyncStorage } from 'react-native';
import { Text, Content, Form, Item, Input, Button, Picker, H1, H3, Icon } from 'native-base';
import { NavigationActions, StackActions, NavigationAction } from "react-navigation";
import { showClass, signUp } from '../api';

class ShowScreen extends Component {
    state = {
        token: '',
        classes: [],
        selectedDate: '',
        selectedTime: '',
        loading: false,
    }

    static navigationOptions = { header: null };

    componentDidMount() {
        this.setState({ loading: true });
        let id = this.props.navigation.state.params.classId;
        AsyncStorage.getItem('userToken').then(token => {
            this.setState({ token : token })
            showClass(token, id)
                .then(response => this.setState({ classes: response.data.dates }));
        });
    }

    render() {
        let timePicker;
        let datePicker;
        if (Object.keys(this.state.classes).length > 0) {
            datePicker = Object.keys(this.state.classes).map((date, index) => 
                <Picker.Item key={index} label={date} value={date} /> 
            );
        } else {
            datePicker = (<Picker.Item label='No schedule available' value='' />);
        }
        if (this.state.selectedDate !== '') {
            timeObject = this.state.classes[this.state.selectedDate];
            timePicker = timeObject.map((time, index) => <Picker.Item key={index} label={time.time_range} value={time.schedule_id} />);
        }
        return (
            <View style={{ flex: 1 }}>
                <StatusBar barStyle='light-content' />
                <View style={{ flex: 1 }}>
                    <ImageBackground resizeMode='stretch' style={{opacity: 0.8}} source={require('../assets/img/bootcamp-body.jpg')} style={{ height: null, width: null, flex: 1 }}>
                        <View style={{ flex: 1, marginStart: 10, marginTop: 20 }}>
                            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                                <Icon name='arrow-back' style={{color: 'white', fontSize: 35}} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 1, justifyContent: 'flex-end', marginStart: 30, marginBottom: 30 }}>
                            <Text style={{ color: 'white', fontSize: 40, fontWeight: 'bold', paddingBottom: 10 }}>Bootcamp</Text>
                            <H3 style={{color: 'white'}}>Some text description here</H3>
                        </View>
                    </ImageBackground>
                </View>
                <View style={{ flex: 1 }}>
                    <Content style={{marginTop: 20}} padder>
                        <Form>
                            <Item style={{ borderColor: '#928150'}} rounded>
                                    <Picker mode='dropdown' style={{ color: '#928150'}} selectedValue={this.state.selectedDate} onValueChange={this.onDateChange.bind(this)}>                                  
                                    
                                        <Picker.Item label='Select Date' value='' />
                                        {datePicker}
                                    </Picker>
                            </Item>
                            <Item style={{ borderColor: '#928150', marginTop: 10 }} rounded>
                                <Picker mode='dropdown' style={{ color: '#928150' }} selectedValue={this.state.selectedTime} onValueChange={this.onTimeChange.bind(this)}>
                                    {this.state.selectedDate !== '' ? timePicker : <Picker.Item label='Select Time' value='' />}
                                </Picker>
                            </Item>
                            <Button full style={{ marginTop: 20, backgroundColor: '#928150' }} onPress={() => this.handleClassSignUp()}>
                                <Text style={{ fontWeight: 'bold' }}>Sign Up</Text>
                            </Button>
                        </Form>
                    </Content>
                </View>
            </View>
        );
    }

    onDateChange(value) {
        this.setState({ selectedDate: value });
    } 

    onTimeChange(value) {
        this.setState({ selectedTime: value });
    }

    handleClassSignUp() {
        if (this.state.selectedDate === '' || this.state.selectedTime === '') {
            alert('Select class date/time');
        } else {
            obj = this.state.classes[this.state.selectedDate].find(obj => obj.schedule_id == this.state.selectedTime);
            signUp(this.state.token, this.state.selectedDate, obj.time_range, this.state.selectedTime)
                .then(response => 
                    {
                        Alert.alert('Sign Up',
                            'Class sign up successful',
                            [
                                {
                                    text: 'OK', onPress: () => {
                                        this.props.navigation.pop();
                                    }
                                }]);
                        }
                    )
                    .catch(err => alert('There was an error'));
        }
    }
}

export default ShowScreen;
