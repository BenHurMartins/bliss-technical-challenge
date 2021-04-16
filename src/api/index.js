import axios from 'axios';

const baseURLApi = 'https://private-bbbe9-blissrecruitmentapi.apiary-mock.com/';

export const api = axios.create({baseURL: baseURLApi});
