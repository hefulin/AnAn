/**
 * 根据接口编号获取接口地址
 *
 * */
//获取所有接口信息地址
const BASE_URL = "http://101.230.199.221:7005/wrmsApp/app/system/getSysPower"
const access_token = "[b36680850768ff1b]"
const url = BASE_URL + "/" + access_token;
//接收数据
const state = {
    interFace: []
}

const mutations = {
    getInterFace(state, payload) {
        state.interFace = payload.res;
    }

}

const actions = {
    getInterFace({commit}) {
        return new Promise((resolve, reject) => {
            Vue.$http.jsonp(url, {params: {power_code: 'SH_SZY2_APP_02_001'}})
                .then(res => {
                    commit({
                        type: '',
                        res: res.body.results
                    })
                    resolve(res);

                }).catch(err => {
                console.log(err);
                reject(err);
            })

        })
    }
}

export default {
    state,
    mutations,
    actions
}