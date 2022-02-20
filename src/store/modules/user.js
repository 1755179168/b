import { login, logout, getTx } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'

import { whoami } from "@/api/loginVerifi"
const getDefaultState = () => {
    return {
        token: getToken(),
        user: {},
        avatar: '',
    }
}

const state = getDefaultState()

const mutations = {
    RESET_STATE: (state) => {
        Object.assign(state, getDefaultState())
    },
    SET_TOKEN: (state, token) => {
        state.token = token
    },
    SET_NAME: (state, name) => {
        state.name = name
    },
    SET_AVATAR: (state, avatar) => {
        state.avatar = avatar
    },
    setUser(state, payload) {
        state.user = payload;
    }
}

const actions = {
    // user login
    async login({ commit }, userInfo) {
        const response = await login(userInfo);
        typeof response != 'string' ? commit('setUser', response.data) : '';
        return response;
    },

    // get user info
    getInfo({ commit, state }) {
        return new Promise((resolve, reject) => {
            whoami().then(response => {
                // console.log(data, response);
                if (typeof response == 'string') {
                    return reject('token错误');
                }
                commit('setUser', response.data);
                resolve();
            }).catch(error => {
                reject(error)
            })



            //     getInfo(state.token).then(response => {
            //         const { data } = response

            //         if (!data) {
            //             return reject('Verification failed, please Login again.')
            //         }

            //         const { name, avatar } = data

            //         commit('SET_NAME', name)
            //         commit('SET_AVATAR', avatar)
            //         resolve(data)
            //     }).catch(error => {
            //         reject(error)
            //     })
        })
    },

    // user logout
    // remove token
    resetToken({ commit }) {
        return new Promise(resolve => {
            removeToken() // must remove  token  first
            commit('RESET_STATE')
            resolve()
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}