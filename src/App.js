import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from '~/routes'; //chỉ đơn giản là import nội dung file này sang
import { DefaultLayout } from './components/Layout';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    {publicRoutes.map((route, index) => {
                        // Lấy publicRoutes như 1 obj bình thường để map
                        // trong map phải thêm key
                        // element= yêu cầu 1 element, mà trong obj đang lưu là component nên cần chuyển qua bằng cách
                        // đặt 1 biến (nếu là component gán vào biến thì phải viết hoa chữ cái đầu)
                        // route.component -> chuyển route thành component
                        // xem bài JSX để hiểu thêm

                        let Layout = DefaultLayout;
                        if (route.layout) {
                            Layout = route.layout;
                        } else if (route.layout === null) {
                            Layout = Fragment;
                        }

                        const Page = route.component;
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
