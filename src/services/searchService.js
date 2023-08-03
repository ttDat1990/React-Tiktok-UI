import * as httpRequest from '~/utils/httpRequest'; // import tất cả export lẻ cho vào 1 ojobj tên là request

export const search = async (q, type = 'less') => {
    try {
        const res = await httpRequest.get('users/search', {
            params: {
                q,
                type,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
