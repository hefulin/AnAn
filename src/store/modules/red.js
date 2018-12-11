/**
 *  三条红线的数据接口
 */
import * as API from '../api/api'
const state = {
    tablists:[],
    newlists:[],
    newDetail:{}
}

const mutations = {
    getTabLists (state, payload) {
      state.tablists = payload.res
    },
    getNewLists (state,payload) {
        state.newlists = payload.res
    },
    getNewDetail (state,payload) {
        state.newDetail = payload.res
    }
}

const actions = {
    getTabLists({commit}){
        return new Promise((resolve,reject) =>{
            Vue.http.jsonp(API.HOME_TABLIST,{param:payload.year})
                .then(res => {
                    commit({
                        type: 'getTabLists',
                        res: res.body.results
                    })
                resolve(res);
            }).catch(err => {
                console.log(err);
                reject(err);
            })
       })
    },
    getNewLists({commit}){
        return new Promise((resolve,reject) =>{
            Vue.http.jsonp(API.HOME_NEWLIST)
                .then(res => {
                    commit({
                        type: 'getNewLists',
                        res: res.body.results
                    })
                resolve(res);
            }).catch(err => {
                console.log(err);
                reject(err);
            })
       })
    },
    getNewDetail({commit}) {
        return new Promise((resolve,reject) =>{
            Vue.http.jsonp(API.HOME_NEWDETAIL)
               .then(res => {
                   commit({
                       type:'getNewDetail',
                       res:res.body.results
                   })
               })
        })
    }
}

export default {
    state,
    mutations,
    actions
}