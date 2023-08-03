//config
import routesConfig from '~/config/routes';

//Layouts
import { HeaderOnly } from '~/components/Layout';

//Pages
import Home from '~/pages/Home';
import Following from '~/pages/Following';
import Profile from '~/pages/Profile';
import Upload from '~/pages/Upload';
import Search from '~/pages/Search';

// dùng cho router không cần đăng nhập vẫn có thể vào
const publicRoutes = [
    { path: routesConfig.home, component: Home },
    { path: routesConfig.following, component: Following },
    { path: routesConfig.profile, component: Profile }, //cấu hình để chuyển sang trang profile
    { path: routesConfig.upload, component: Upload, layout: HeaderOnly },
    { path: routesConfig.search, component: Search, layout: null },
];

// phải đăng nhập mới vào đc
const privateRoutes = [];

export { publicRoutes, privateRoutes };
