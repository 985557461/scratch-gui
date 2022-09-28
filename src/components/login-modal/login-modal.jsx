import Modal from '../../containers/modal.jsx';
import styles from './login-modal.css';
import React, {useRef} from 'react';
import PropTypes from 'prop-types';
import Box from '../box/box.jsx';
import SubmitLoginButton from './submit-login-button.jsx';
import {connect} from 'react-redux';
import {closeLoginModal} from '../../reducers/modals';
import {showAlertWithTimeout} from '../../reducers/alerts';
import {setUserData} from '../../reducers/user-state';

// 默认的登陆用户名/密码
const DEFAULT_LOGIN_USER_NAME = 'rabbit';
const DEFAULT_LOGIN_USER_PASSWORD = 'rabbit';

// 登录弹框
const LoginModal = function (props) {
    // since react 16.8.0
    const nameInput = useRef();
    const pwdInput = useRef();

    const handleLoginClick = () => {
        const userName = nameInput.current.value;
        const password = pwdInput.current.value;
        if (userName.trim() === '') {
            props.onShowNoLoginNameAlertWithTimeout();
            return;
        }
        if (password.trim() === '') {
            props.onShowNoPwdNameAlertWithTimeout();
            return;
        }
        if (userName.trim() !== DEFAULT_LOGIN_USER_NAME) {
            props.onShowLoginUserNameErrorAlertWithTimeout();
            return;
        }
        if (password.trim() !== DEFAULT_LOGIN_USER_PASSWORD) {
            props.onShowLoginPasswordErrorAlertWithTimeout();
            return;
        }
        props.onSetUserData(userName, password);
    };

    return (
        <Modal
            className={styles.modalContent}
            contentLabel={props.title}
            id="loginModal"
            onRequestClose={props.onCloseLoginModal}
            fullScreen={false}
            showCloseButton={false}
        >
            <Box>
                <input
                    className={styles.minInput}
                    placeholder="账号"
                    type="text"
                    ref={nameInput}
                /><br/>
                <input
                    className={styles.minInput}
                    placeholder="密码"
                    type="password"
                    ref={pwdInput}
                /><br/>
                <SubmitLoginButton className={styles.btnSubmit} onClick={handleLoginClick}/>
            </Box>
        </Modal>
    );
};

LoginModal.propTypes = {
    title: PropTypes.string.isRequired,
    onCloseLoginModal: PropTypes.func.isRequired,
    onShowNoLoginNameAlertWithTimeout: PropTypes.func.isRequired,
    onShowNoPwdNameAlertWithTimeout: PropTypes.func.isRequired,
    onShowLoginUserNameErrorAlertWithTimeout: PropTypes.func.isRequired,
    onShowLoginPasswordErrorAlertWithTimeout: PropTypes.func.isRequired,
    onSetUserData: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    loginError: state.scratchGui.userState.error
});

const mapDispatchToProps = dispatch => ({
    onCloseLoginModal: () => {
        dispatch(closeLoginModal());
    },
    onShowNoLoginNameAlertWithTimeout: () => {
        dispatch(showAlertWithTimeout(dispatch, 'noLoginName'));
    },
    onShowNoPwdNameAlertWithTimeout: () => {
        dispatch(showAlertWithTimeout(dispatch, 'noLoginPassword'));
    },
    onShowLoginUserNameErrorAlertWithTimeout: () => {
        dispatch(showAlertWithTimeout(dispatch, 'loginUserNameError'));
    },
    onShowLoginPasswordErrorAlertWithTimeout: () => {
        dispatch(showAlertWithTimeout(dispatch, 'loginPasswordError'));
    },
    onSetUserData: (userName, password) => {
        dispatch(setUserData(userName, password));
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginModal);
