import axios from 'axios';

const endPointBaseUrl = '/api/login';

const login = async credentials => {
    const response = await axios.post(endPointBaseUrl, credentials);
    return response.data;
};

export default { login };
