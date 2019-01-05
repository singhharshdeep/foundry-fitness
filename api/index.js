import axios from 'axios';

const url = 'http://www.nitrolifestyle.herokuapp.com/api/v1';

export const getUserToken = (email, password) => {
    return axios.post(url + '/user_token', {
        auth: {
            email: email,
            password: password
        }
    }, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    });
}

export const showClasses = (token) => {
    return axios.get(url + '/classes', {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    });
}

export const showClass = (token, id) => {
    return axios.get(url + '/classes/' + id, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    });
}

export const signUp = (token, start_date, time_range, schedule_id) => {
    return axios.post(url + '/sign_ups', {
        start_date: start_date,
        time_range: time_range,
        schedule_id: schedule_id
    },
    {
        headers: {
            Authorization: 'Bearer ' + token
        }
    });
}

export const signedUpClasses = (token) => {
    return axios.get(url + '/users/classes', {
            headers: {
                Authorization: 'Bearer ' + token
            }
        });
}

export const cancelClass = (token, signUpId) => {
    return axios.post(url + '/sign_ups/' + signUpId + '/cancel', {
        headers: {
            Authorization: 'Bearer ' + token
        }
    });
}