import classNames from 'classnames';
import { useState, forwardRef } from 'react';
import images from '~/assets/images/';
import styles from './Image.module.scss';

const Image = forwardRef(({ src, alt, className, fallback = images.noImage, ...props }, ref) => {
    const [_fallback, setFallback] = useState('');
    // muốn custom hình lỗi thì thêm prop là fallback
    const handleError = () => {
        setFallback(fallback);
    };

    return (
        <img
            className={classNames(styles.wrapper, className)} //cách dùng classname khi ko dùng bind
            ref={ref}
            src={_fallback || src}
            alt={alt}
            {...props}
            onError={handleError}
        />
    );
});
export default Image;
