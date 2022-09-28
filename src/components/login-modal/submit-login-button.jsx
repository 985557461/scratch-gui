import PropTypes from 'prop-types';
import React from 'react';
import Button from '../button/button.jsx';

const SubmitLoginButton = ({
    className,
    onClick
}) => (
    <div>
        <Button
            className={className}
            onClick={onClick}
        >
            <p>{'登录'}</p>
        </Button>
    </div>
);
SubmitLoginButton.propTypes = {
    className: PropTypes.string,
    onClick: PropTypes.func
};
SubmitLoginButton.defaultProps = {
    onClick: () => {
    }
};
export default SubmitLoginButton;
