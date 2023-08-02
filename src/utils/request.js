import axios from 'axios';

const request = axios.create({
    baseURL: 'https://tiktok.fullstack.edu.vn/api/', //Cấu hình url gốc của api
});

export default request;

export const get = async (path, options = {}) => {
    // hàm async bất đồng bộ trả về 1 promise
    const response = await request.get(path, options);
    return response.data;
};
