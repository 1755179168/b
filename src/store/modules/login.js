import { login } from "@/api/loginVerifi.js";
export default {
    namespaced: true,
    state: () => {
        return {
            userInfo: null,
        }
    },
    mutations: {
        setUser(state, payload) {
            state.userInfo = payload;
        }
    },
    actions: {
        async loginUserVerifi(ctx, payload) {
            const response = await login(payload);
            ctx.commit('setUser', response);
        }
    }
}