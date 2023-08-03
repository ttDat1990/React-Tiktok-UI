import axios from 'axios';

const httpRequest = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL, //Cấu hình url gốc của api, đã cấu hình file env nên đưa obj process.env vào, có props tên là NODE_ENV chứa thông tin đang ở môi trường nào
});

export default httpRequest;

export const get = async (path, options = {}) => {
    // hàm async bất đồng bộ trả về 1 promise
    const response = await httpRequest.get(path, options);
    return response.data;
};
