import axios from 'axios';

const api = axios.create({
    baseURL: 'http://10.91.214.1:3333',

});

export {api};