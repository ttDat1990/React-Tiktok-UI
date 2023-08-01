import { useEffect, useState, useRef } from 'react';
import classNames from 'classnames/bind'; //Dùng bind để có thể dùng classname dạng a-b
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faSpinner } from '@fortawesome/free-solid-svg-icons';
import HeadlessTippy from '@tippyjs/react/headless'; //tippy để làm tooltip và dropdown, headless dùng để làm phần dropdown mình tự code
import 'tippy.js/dist/tippy.css'; //này để dùng css cho tippy
import { Wrapper as PopperWrapper } from '~/components/Popper';
import styles from './Search.module.scss';
import AccountItem from '~/components/AccountItem';
import { SearchIcon } from '~/components/Icons';

const cx = classNames.bind(styles);

function Search() {
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [showResult, setShowResult] = useState(true);
    const [loading, setLoading] = useState(false);

    const inputRef = useRef();

    useEffect(() => {
        if (!searchValue.trim()) {
            setSearchResult([]);
            return;
        }

        setLoading(true);

        //nối chuỗi thì phải bao chuỗi bằng ``, khi truyền searchValue thì encode để tránh truyền vào chuỗi kí tự đặc biệt
        fetch(`https://tiktok.fullstack.edu.vn/api/users/search?q=${encodeURIComponent(searchValue)}&type=less`)
            .then((res) => res.json())
            .then((res) => {
                setSearchResult(res.data);
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });
    }, [searchValue]); // khi user gõ sẽ onchange thẻ input và setSearchValue -> lọt vào trong useEffect

    const handleClear = () => {
        setSearchValue(''); //khi click vài x thì set lại searchvalue = rỗng => xóa nó trong input
        setSearchResult([]); // khi nhấn x cũng đồng thòi clear luôn kết quả tìm kiếm trả về
        inputRef.current.focus(); // lấy tham chiếu hiện tại của thẻ input và focus vào nó(xem lại bài useref)
    };

    const handleHideResult = () => {
        setShowResult(false); // chuyển showResult thành false để ẩn
    };

    return (
        <HeadlessTippy
            interactive // thêm att này để có thể tương tác với dropdown hiện ra
            visible={showResult && searchResult.length > 0} // nếu có kết quả tìm kiếm vàshowResult = true thì hiện
            render={(attrs) => (
                <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                    <PopperWrapper>
                        <h4 className={cx('search-title')}>Accounts</h4>
                        {searchResult.map((result) => (
                            <AccountItem key={result.id} data={result} />
                        ))}
                    </PopperWrapper>
                </div> //đưa component wrapper vào trong thì sẽ tùy chỉnh đc width của nó vì đã set width = 100% của parents
            )}
            onClickOutside={handleHideResult} //click ra ngoài tippy thì thực hiện handleHideResult
        >
            <div className={cx('search')}>
                <input
                    ref={inputRef} // để khi có nội dung tìm kiếm thì focus vào input lại
                    value={searchValue} //đưa giá trị mới nhập vô đây, 2 ways binding
                    placeholder="Search account and videos"
                    spellCheck={false}
                    onChange={(e) => setSearchValue(e.target.value)} //onchange: khi có user gõ tìm trong thẻ input thì setSearchValue bằng giá trị mới nhập vô
                    onFocus={() => setShowResult(true)} // focus vào input thì lại cho showResult=true để hiện tippy lên
                />
                {!!searchValue && !loading && (
                    <button className={cx('clear')} onClick={handleClear}>
                        <FontAwesomeIcon icon={faCircleXmark} />
                    </button>
                )}
                {loading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}
                <button className={cx('search-btn')}>
                    <SearchIcon />
                </button>
            </div>
        </HeadlessTippy>
    );
}

export default Search;
