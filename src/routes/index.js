//config
import config from '~/config';

//Layouts
import { HeaderOnly } from '~/layouts';

//Pages
import Home from '~/pages/Home';
import Following from '~/pages/Following';
import Profile from '~/pages/Profile';
import Upload from '~/pages/Upload';
import Search from '~/pages/Search';

// dùng cho router không cần đăng nhập vẫn có thể vào
const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.following, component: Following },
    { path: config.routes.profile, component: Profile }, //cấu hình để chuyển sang trang profile
    { path: config.routes.upload, component: Upload, layout: HeaderOnly },
    { path: config.routes.search, component: Search, layout: null },
];

// phải đăng nhập mới vào đc
const privateRoutes = [];

export { publicRoutes, privateRoutes };
