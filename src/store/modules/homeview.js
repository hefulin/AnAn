/**
 * 首页四个方块的数据来源
 */

import * as API from '../api/api'
const state = {
    sgnqNewlists:{new:{y:'2017',m:'12',s:'107',d:'197',db:'60',sg:'70'},
    type:[{name:'保护区',db:'12',sg:'30'},{name:'缓冲区',db:'12',sg:'30'}
         ,{name:'过渡区',db:'62',sg:'40'},{name:'饮用水源区',db:'32',sg:'80'}
         ,{name:'景观区',db:'55',sg:'44'},{name:'工业、农业、排污控制区',db:'32',sg:'90'}],
    year:[{name:'1',db:'50',sg:'80'},{name:'2',db:'50',sg:'80'},
          {name:'3',db:'50',sg:'80'},{name:'4',db:'50',sg:'80'},
          {name:'5',db:'50',sg:'80'},{name:'6',db:'50',sg:'80'},
          {name:'7',db:'50',sg:'80'},{name:'8',db:'50',sg:'80'},
          {name:'9',db:'50',sg:'80'},{name:'10',db:'50',sg:'80'},
          {name:'11',db:'50',sg:'80'},{name:'12',db:'50',sg:'80'}]}
}

const mutations = {
    getSgnqNewlists (state, payload) {
      state.sgnqNewlists = payload.res
    }
}

const actions = {
    getSgnqNewlists({commit}){
        return new Promise((resolve,reject) =>{
            Vue.http.jsonp(API.HOME_TABLIST,{param:payload.month})
                .then(res => {
                    commit({
                        type: 'getSgnqNewlists',
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