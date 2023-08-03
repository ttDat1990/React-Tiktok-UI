import { useEffect, useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faSpinner } from '@fortawesome/free-solid-svg-icons';
import HeadlessTippy from '@tippyjs/react/headless'; //tippy để làm tooltip và dropdown, headless dùng để làm phần dropdown mình tự code
import 'tippy.js/dist/tippy.css'; //này để dùng css cho tippy
import classNames from 'classnames/bind'; //Dùng bind để có thể dùng classname dạng a-b

import * as searchService from '~/services/searchService';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import AccountItem from '~/components/AccountItem';
import { SearchIcon } from '~/components/Icons';
import { useDebounce } from '~/hooks'; //dùng để delay quá trình call api
import styles from './Search.module.scss';

const cx = classNames.bind(styles);

function Search() {
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [showResult, setShowResult] = useState(true);
    const [loading, setLoading] = useState(false);

    const debounced = useDebounce(searchValue, 500); // debounced giá trị searchValue với thời gian là 500ms

    const inputRef = useRef();

    useEffect(() => {
        if (!debounced.trim()) {
            setSearchResult([]);
            return;
        }

        const fetchApi = async () => {
            setLoading(true);
            const result = await searchService.search(debounced);
            setSearchResult(result);
            setLoading(false);
        };

        fetchApi();

        //nối chuỗi thì phải bao chuỗi bằng ``, khi truyền searchValue(debounced) thì encode để tránh truyền vào chuỗi kí tự đặc biệt
        //thay thế bằng axios thì ko cần encode, sử dụng dạng obj để truyền param, bỏ qua bước parse json .then((res) => res.json())
        // thay axios bằng request đã cấu hình thì ko cần đưa đoạn url api dài vô nữa
        // thay request .get bằng get đã cấu hình
        //cấu hình gọi api ở ngoài luôn (searchService)
    }, [debounced]); // khi user gõ sẽ onchange thẻ input và setSearchValue (lúc này đã trở thàn debounced để delay call api) -> lọt vào trong useEffect

    //Logic cho dấu x clear kết quả
    const handleClear = () => {
        setSearchValue(''); //khi click vài x thì set lại searchvalue = rỗng => xóa nó trong input
        setSearchResult([]); // khi nhấn x cũng đồng thòi clear luôn kết quả tìm kiếm trả về
        inputRef.current.focus(); // lấy tham chiếu hiện tại của thẻ input và focus vào nó(xem lại bài useref)
    };

    const handleHideResult = () => {
        setShowResult(false); // chuyển showResult thành false để ẩn
    };

    //Xử lý ko cho nhập dấu space đầu tiên
    const handleChange = (e) => {
        //Xử lý ko cho nhập dấu cách ở đay thì sẽ ko bị re-render nhiều
        const searchValue = e.target.value;
        if (!searchValue.startsWith(' ')) {
            setSearchValue(searchValue);
        }
    };

    return (
        // using a wrapper tag to solve this by creating a new parentnode context
        <div>
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
                        onChange={handleChange} //onchange: khi có user gõ tìm trong thẻ input thì setSearchValue bằng giá trị mới nhập vô
                        onFocus={() => setShowResult(true)} // focus vào input thì lại cho showResult=true để hiện tippy lên
                    />
                    {!!searchValue && !loading && (
                        <button className={cx('clear')} onClick={handleClear}>
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </button>
                    )}
                    {loading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}
                    <button className={cx('search-btn')} onMouseDown={(e) => e.preventDefault()}>
                        {/* e.preventDefault loại bỏ hàn vi mặc định khi onMousedown */}
                        <SearchIcon />
                    </button>
                </div>
            </HeadlessTippy>
        </div>
    );
}

export default Search;
