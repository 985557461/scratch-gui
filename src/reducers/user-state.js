import keyMirror from 'keymirror';
import isBlank from '../lib/common-utils';

const SET_USER_DATA = 'scratch-gui/user-state/SET_USER_DATA';
const USER_LOGOUT = 'scratch-gui/user-state/USER_LOGOUT';

const KEY_USER_LOGIN_NAME = 'user_login_name';
const KEY_USER_LOGIN_PWD = 'user_login_pwd';

/**
 * 用户的两种状态
 * @type {{}}
 */
const UserState = keyMirror({
    NOT_LOGIN: null,
    LOGIN: null
});

const UserStates = Object.keys(UserState);

/**
 * 登陆初始化状态
 * @type {{userData: null, loginState: null, error: null}}
 */
const initialState = {
    error: null,
    userData: {
        userName: null,
        password: null
    },
    loginState: UserState.NOT_LOGIN
};

// 将用户名、密码存储到本地
const storeUserInfoToLocal = function (userName, password) {
    localStorage.setItem(KEY_USER_LOGIN_NAME, userName);
    localStorage.setItem(KEY_USER_LOGIN_PWD, password);
};

// 获取用户的用户名密码
const getUserInfoFromLocal = function () {
    const userLoginName = localStorage.getItem(KEY_USER_LOGIN_NAME);
    const userLoginPwd = localStorage.getItem(KEY_USER_LOGIN_PWD);

    return {
        userName: userLoginName,
        password: userLoginPwd
    };
};

const getUserInitState = function () {
    // 从本地加载用户名、密码，如果存在说明用户已经登陆
    const localUserInfo = getUserInfoFromLocal();
    const loginUserName = localUserInfo.userName;
    const loginUserPwd = localUserInfo.password;

    // 根据本地用户信息判断是否登陆
    let userLoginState = UserState.NOT_LOGIN;
    if (!isBlank(loginUserName) && !isBlank(loginUserPwd)) {
        userLoginState = UserState.LOGIN;
    }

    // 用本地信息更新state
    return Object.assign({}, initialState, {
        loginState: userLoginState,
        userData: {
            userName: loginUserName,
            password: loginUserPwd
        }
    });
};

// 用户是否登陆
const userIsLogin = loginState => loginState === UserState.LOGIN;

// 更新用户信息
const setUserData = function (userName, password) {
    storeUserInfoToLocal(userName, password);
    return {
        type: SET_USER_DATA,
        loginState: UserState.LOGIN,
        userName: userName,
        password: password
    };
};

// 退出登录
const userLogout = function () {
    storeUserInfoToLocal(null, null);
    return {
        type: USER_LOGOUT,
        loginState: UserState.NOT_LOGIN,
        userName: null,
        password: null
    };
};

const reducer = function (state, action) {
    if (typeof state === 'undefined') {
        state = initialState;
    }
    switch (action.type) {
    case SET_USER_DATA: {
        return Object.assign({}, state, {
            loginState: action.loginState,
            userData: Object.assign({}, state.userData, {
                userName: action.userName,
                password: action.password
            })
        });
    }
    case USER_LOGOUT: {
        return Object.assign({}, state, {
            loginState: action.loginState,
            userData: Object.assign({}, state.userData, {
                userName: action.userName,
                password: action.password
            })
        });
    }
    default:
        return state;
    }
};

export {
    reducer as default,
    initialState as userStateInitialState,
    UserState,
    UserStates,
    userIsLogin,
    setUserData,
    userLogout,
    getUserInitState
};
