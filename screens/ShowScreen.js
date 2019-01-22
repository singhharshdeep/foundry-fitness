import React, { Component } from 'react';
import { View, Image, StatusBar, Alert, ImageBackground, TouchableOpacity, AsyncStorage } from 'react-native';
import { Text, Content, Form, Item, Input, Button, Picker, H1, H3, Icon } from 'native-base';
import { NavigationActions, StackActions, NavigationAction } from "react-navigation";
import { showClass, signUp, getLocations, showDates, getGymClass } from '../api';

class ShowScreen extends Component {
    state = {
        token: '',
        classes: [],
        locations: [],
        selectedLocation: '',
        selectedDate: '',
        selectedTime: '',
        name: '',
        description: '',
        imageUrl: '',
        loading: false,
    }

    static navigationOptions = { header: null };

    componentDidMount() {
        this.setState({ loading: true });
        AsyncStorage.getItem('userToken').then(token => {
            this.setState({ token : token })
            let id = this.props.navigation.state.params.classId;
            getGymClass(token, id)
                .then(response => {
                    // alert(Object.keys(response))
                    this.setState({ name: response.data.data.attributes.name, description: response.data.data.attributes.description, imageUrl: response.data.data.attributes.image_url })
            })
            getLocations(token)
                .then(response => { this.setState({ locations: response.data })});
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
        if (this.state.selectedDate !== '' && Object.keys(this.state.classes).length > 0) {
            timeObject = this.state.classes[this.state.selectedDate];
            timePicker = timeObject.map((time, index) => <Picker.Item key={index} label={time.time_range} value={time.schedule_id} />);
        }
        return (
            <View style={{ flex: 1 }}>
                <StatusBar barStyle='light-content' />
                <View style={{ flex: 1 }}>
                    <ImageBackground resizeMode='stretch' style={{opacity: 0.8}} source={{uri: this.state.imageUrl}} style={{ height: null, width: null, flex: 1 }}>
                        <View style={{ flex: 1, marginStart: 10, marginTop: 20 }}>
                            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                                <Icon name='arrow-back' style={{color: 'white', fontSize: 35}} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 1, justifyContent: 'flex-end', marginStart: 30, marginBottom: 30 }}>
                            <Text style={{ color: 'white', fontSize: 40, fontWeight: 'bold', paddingBottom: 10 }}>{this.state.name}</Text>
                            <H3 style={{color: 'white'}}>{this.state.description}</H3>
                        </View>
                    </ImageBackground>
                </View>
                <View style={{ flex: 1 }}>
                    <Content style={{marginTop: 20}} padder>
                        <Form>
                            <Item style={{ borderColor: '#928150' }} rounded>
                                <Picker mode='dropdown' style={{ color: '#928150' }} selectedValue={this.state.selectedLocation} onValueChange={this.onLocationChange.bind(this)}>
                                    <Picker.Item label='Location' value='' />
                                    {
                                        this.state.locations.map(location => <Picker.Item label={location[0]} value={location[1]} />)
                                    }
                                </Picker>
                            </Item>
                            {

                            this.state.selectedLocation !== '' &&
                            (<View>
                                <Item style={{ borderColor: '#928150', marginTop: 10}} rounded>
                                    <Picker mode='dropdown' style={{ color: '#928150'}} selectedValue={this.state.selectedDate} placeholder='Select Date' onValueChange={this.onDateChange.bind(this)}>
                                        {datePicker}
                                    </Picker>
                                </Item>
                                <Item style={{ borderColor: '#928150', marginTop: 10 }} rounded>
                                    <Picker mode='dropdown' style={{ color: '#928150' }} selectedValue={this.state.selectedTime} placeholder='Select Time' onValueChange={this.onTimeChange.bind(this)}>
                                        {this.state.selectedDate !== '' ? timePicker : <Picker.Item label='Select Time' value='' />}
                                    </Picker>
                                </Item>
                            </View>)
                            }
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

    onLocationChange(value) {
        this.setState({ selectedLocation: value });
        let id = this.props.navigation.state.params.classId;
        if (value !== '') {
            showDates(this.state.token, id, value)
                .then(response => {
                    this.setState({ classes: response.data.dates })
                });
        }
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
