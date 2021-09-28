import axios from 'axios';

const baseUrl = '/api/users';

const get = (id) => {
    const request = axios.get(`${baseUrl}/${id}`);
    return request.then(response => response.data);
};

export default { get };
