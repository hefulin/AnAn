/**
 *  登录相关的信息
 */
import * as util from '../../libs/utils'
const state = {
    userInfo: null //用户信息
}

const mutations = {
    getUserInfo (state, payload) {
      state.userInfo = payload.res
    }
}

const actions = {
    getUserInfo({commit}){
        let user = util.getJStore('userInfo');
        commit({
            type: 'getUserInfo',
            res: user
        })
    }
}

export default {
    state,
    mutations,
    actions
}

