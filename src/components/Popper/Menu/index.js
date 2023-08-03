import { useState } from 'react';
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless'; //tippy để làm tooltip và dropdown, headless dùng để làm phần dropdown mình tự code

import { Wrapper as PopperWrapper } from '~/components/Popper';
import MenuItem from './MenuItem';
import Header from './Header';
import styles from './Menu.module.scss';

const cx = classNames.bind(styles);

const defaultFn = () => {}; //để là hàm mặc định, khi ko truyền onchange thì sẽ ko lỗi

function Menu({ children, items = [], hideOnClick = false, onChange = defaultFn }) {
    //  Ý tưởng là state chứa 1 array, trong array đó có object(s): dạng như là: [{__},{__},...{__}].
    //  Luật là: luôn dùng object cuối cùng để map ra UI.
    //  Ban đầu state có 1 object là {data: items} => items (level.1) sẽ được map ra UI.
    //  Trong các phần tử của items nếu users click vào phần tử cha a.k.a phần tử có "children" thì tiến hành set state để thêm mảng children này vào state,
    //=> lúc này "children"(level 2) sẽ là object cuối cùng trong mảng và theo luật thì sẽ được render ra, nếu users tiếp tục chọn vào option mà nó
    //có "children" (level 3) thì sẽ tiếp tục có mảng mới và setState => render mảng mới ra UI.
    //  Khi ấn back thì tiến hành xoá phần tử cuối cùng để render ra phần tử trước đó.
    const [history, setHistory] = useState([{ data: items }]);
    const current = history[history.length - 1];

    const renderItems = () => {
        return current.data.map((item, index) => {
            const isParent = !!item.children; //thêm !! để convert sang boolean
            return (
                <MenuItem
                    key={index}
                    data={item}
                    onClick={() => {
                        if (isParent) {
                            setHistory((prev) => [...prev, item.children]); //thêm item vào mảng ban đầu
                        } else {
                            onChange(item);
                        }
                    }}
                />
            );
        });
    }; // render ra từng item trong mảng items
    return (
        <Tippy
            delay={[0, 700]}
            offset={[12, 8]} // offset dropdown theo hpwuwogn ngang, cao px
            interactive // thêm att này để có thể tương tác với dropdown hiện ra
            hideOnClick={hideOnClick} //thêm prop này để khi click vào icon avatar thi ko bị ẩn tippy menu đi
            placement="bottom-end" //vị trí
            render={(attrs) => (
                <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
                    <PopperWrapper className={cx('menu-popper')}>
                        {history.length > 1 && (
                            <Header
                                title="Language"
                                onBack={() => {
                                    setHistory((prev) => prev.slice(0, prev.length - 1));
                                }}
                            />
                        )}
                        {renderItems()}
                    </PopperWrapper>
                </div>
            )}
            onHide={() => setHistory((prev) => prev.slice(0, 1))} //sau khi hide popper thì sẽ gọi hàm này
        >
            {children}
        </Tippy>
    );
}

export default Menu;
