import axios from 'axios';

const api = axios.create({
    baseURL: 'http://192.168.43.168:3333',

});

export {api};