import { HeaderOnly } from '~/components/Layout';

import Home from '~/pages/Home';
import Following from '~/pages/Following';
import Profile from '~/pages/Profile';
import Upload from '~/pages/Upload';
import Search from '~/pages/Search';

// dùng cho router không cần đăng nhập vẫn có thể vào
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/following', component: Following },
    { path: '/:nickname', component: Profile }, //cấu hình để chuyển sang trang profile
    { path: '/upload', component: Upload, layout: HeaderOnly },
    { path: '/search', component: Search, layout: null },
];

// phải đăng nhập mới vào đc
const privateRoutes = [];

export { publicRoutes, privateRoutes };
