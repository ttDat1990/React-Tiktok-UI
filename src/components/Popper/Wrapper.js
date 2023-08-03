import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Popper.module.scss';

const cx = classNames.bind(styles);
function Wrapper({ children, className }) {
    return <div className={cx('wrapper', className)}>{children}</div>; // tạo wrapper này để làm cái vỏ css ở ngoài, ở trong tùy trường hợp
}

Wrapper.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
};

export default Wrapper;
