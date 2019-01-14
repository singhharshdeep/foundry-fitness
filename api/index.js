import axios from 'axios';

// const url = 'http://nitrolifestyle.herokuapp.com/api/v1';
const url = 'http://localhost:3000/api/v1';

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

export const getGymClass = (token, id) => {
    return axios.get(url + '/classes/' + id, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    });
}

export const getLocations = (token) => {
    return axios.get(url + '/schedules/locations', {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
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

export const showDates = (token, id, locationId) => {
    return axios.get(url + '/classes' + id + '/schedules?location_id=' + locationId, {
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
                'Authorization': 'Bearer ' + token
            }
        });
}

export const cancelClass = (token, signUpId) => {
    return axios.post(url + '/sign_ups/' + signUpId + '/cancel', {
        headers: {
            'Authorization': 'Bearer ' + token,
        }
    });
}

export const getProfileInfo = (token) => {
    return axios.get(url + '/profile', { 
        headers: {
            'Authorization': 'Bearer ' + token,
        }
    });
}

export const changeUserPassword = (token, oldPassword, newPassword) => {
    return axios.post(url + '/users/update_password', {
            old_password: oldPassword,
            new_password: newPassword,
        }, {
        headers: {
            'Authorization': 'Bearer ' + token,
        }
    });
}

export const getPages = (token) => {
    return axios.get(url + '/pages', {
        headers: {
            'Authorization': 'Bearer ' + token,
        }
    });
}

export const getPage = (token, id) => {
    return axios.get(url + '/pages/' + id, {
        headers: {
            'Authorization': 'Bearer ' + token,
        }
    });
}