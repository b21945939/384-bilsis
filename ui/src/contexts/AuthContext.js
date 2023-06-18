import PropTypes from 'prop-types';
import { createContext, useEffect, useReducer } from 'react';
// utils
import axios from '../utils/axios';

import Cookies from 'js-cookie';
import { sleep } from '../utils';

// ----------------------------------------------------------------------

const initialState = {
    isAuthenticated: false,
    isInitialized: false,
    user: null
};

const handlers = {
    INITIALIZE: (state, action) => {
        const { isAuthenticated, user } = action.payload;
        return {
            ...state,
            isAuthenticated,
            isInitialized: true,
            user
        };
    },
    LOGIN: (state, action) => {
        const { user } = action.payload;

        return {
            ...state,
            isAuthenticated: true,
            user
        };
    },
    LOGOUT: (state) => ({
        ...state,
        isAuthenticated: false,
        user: null
    }),
    REGISTER: (state, action) => {
        const { user } = action.payload;

        return {
            ...state,
            isAuthenticated: true,
            user
        };
    }
};

const reducer = (state, action) => (handlers[action.type] ? handlers[action.type](state, action) : state);

const AuthContext = createContext({
    ...initialState,
    method: 'jwt',
    login: () => Promise.resolve(),
    logout: () => Promise.resolve(),
    register: () => Promise.resolve()
});

// ----------------------------------------------------------------------

AuthProvider.propTypes = {
    children: PropTypes.node
};

function AuthProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        const initialize = async () => {
            try {
                const response = await axios.get('/user/personal');
                const user = response.data;
                dispatch({
                    type: 'INITIALIZE',
                    payload: {
                        isAuthenticated: true,
                        user
                    }
                });
            } catch (err) {
                console.error(err);

                dispatch({
                    type: 'INITIALIZE',
                    payload: {
                        isAuthenticated: false,
                        user: null
                    }
                });
            }
        };

        initialize();
    }, []);

    const login = async (id, password) => {
        return axios
            .post(`/user/login`, {
                id: parseInt(id),
                password
            })
            .then((response) => {
                const user = response.data;

                dispatch({
                    type: 'LOGIN',
                    payload: {
                        user
                    }
                });
            })
            .catch((error) => {
                throw error;
            });
    };

    const register = async (id, email, password, type) => {
        // const response = await
        console.log('register');

        return axios
            .post(`/user/register`, {
                id: parseInt(id),
                email,
                password,
                type
            })
            .then((response) => {
                const user = response.data;

                dispatch({
                    type: 'REGISTER',
                    payload: {
                        user
                    }
                });
            })
            .catch((error) => {
                throw error;
            });
    };

    const logout = async () => {
        return axios
            .get(`/user/logout`)
            .then(async () => {
                await sleep(1000);

                Cookies.remove('sessid');

                dispatch({
                    type: 'LOGOUT'
                });
            })
            .catch((error) => {
                throw error;
            });
    };

    return (
        <AuthContext.Provider
            value={{
                ...state,
                method: 'jwt',
                login,
                logout,
                register
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export { AuthContext, AuthProvider };
