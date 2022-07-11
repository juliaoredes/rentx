import axios from 'axios';

const api = axios.create({
    //baseURL: 'http://192.168.1.99:3333',
    //baseURL: 'http://192.168.170.168:3333',
    // baseURL: 'http://192.168.1.111:3333',
    baseURL: 'http://192.168.71.168:3333',

});

export {api};