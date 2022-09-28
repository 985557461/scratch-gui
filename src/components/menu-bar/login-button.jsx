import classNames from 'classnames';
import {FormattedMessage} from 'react-intl';
import PropTypes from 'prop-types';
import React from 'react';
import Button from '../button/button.jsx';

import styles from './login-button.css';
import {openLoginModal} from '../../reducers/modals';
import {connect} from 'react-redux';
import {showAlertWithTimeout} from '../../reducers/alerts';

const LoginButton = ({
    className,
    onOpenLoginModal,
    onShowAlert
}) => (
    <Button
        className={classNames(
            className,
            styles.loginButton
        )}
        onClick={onShowAlert}
    >
        <FormattedMessage
            defaultMessage="登录"
            description="Label for login"
            id="gui.menuBar.login"
        />
    </Button>
);

LoginButton.propTypes = {
    className: PropTypes.string,
    onOpenLoginModal: PropTypes.func,
    onShowAlert: PropTypes.func
};

LoginButton.defaultProps = {
    onOpenLoginModal: () => {
    }
};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
    onOpenLoginModal: () => {
        dispatch(openLoginModal());
    },
    onShowAlert: () => {
        dispatch(showAlertWithTimeout(dispatch, 'noLoginName'));
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginButton);
