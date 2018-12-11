import Vue from 'vue'
// import  * as api from '../api/api'
/**
 *  查询框的几点说明：
 *  sgclick 表示 拥有单击事件的查询
 *  iconnone 表示 拥有图标的图例
 */
const state = {
    mapPoints: [],
    mapQuery: [
        {cl:'filter-nav-item',title:'类别',o:'类别',type:'sgclick',key:'lb',select:''},
        {cl:'filter-nav-item',title:'状态',o:'状态',type:'sgclick',key:'zt',select:''},
        {cl:'filter-nav-item',title:'图例',o:'图例',type:'iconnone',key:'tl',select:''},
        {cl:'filter-nav-query',title:'重置',o:'重置',type:'iconnone',key:'clear',select:''},
    ],
    mapQueryDetails:[],
    sgPoints:[],
    mapQueryRoot:[],
    loading:true
}

const mutations = {
    getMapPoints (state, payload) {
      state.mapPoints = payload.res
    },
    getSingleMapPoints (state, payload) {
      state.mapPoints = payload.res
    },
    getMapPointsByParams (state,payload){
        state.mapPoints = payload.res
    },
    getQueryDetail(state,payload){
        state.mapQueryDetails = payload.res;
        state.mapQueryRoot = payload.root;
    }
}

const actions = {
    getMapPoints({commit}){
        Vue.http.get('/api/map')
            .then(res => {
                commit({
                    type: 'getMapPoints',
                    res: res.body.results
                })
        })
    },
    getMapPointsByParams({commit},payload){
      return new Promise((resolve,reject) =>{
        Vue.http.get('/api/map',{param:payload.val})
            .then(res => {
                commit({
                    type: 'getMapPointsByParams',
                    res: res.body.results
                })
            resolve(res);
        }).catch(err => {
            console.log(err);
            reject(err);
        })
      })
    },
    getSingleMapPoints({commit},payload){
        Vue.http.get('/api/map',{id:payload.id})
            .then(res => {
                commit({
                    type: 'getSingleMapPoints',
                    res: res.body.results
                })
        })
    },
    getQueryDetail({commit},payload){
        switch(payload.id){
            case 0:
               commit({
                   type:'getQueryDetail',
                   res:[{key:'dbqsh',name:'地表水取水户',},
                        {key:'dxqsh',name:'地下水取水户'},
                        {key:'dysh',name:'大用水户'},
                        {key:'syd',name:'水源地'},
                        {key:'sgnq',name:'水功能区'},
                       {key:'swcz',name:'水文测站'},
                       {key:'xc',name:'咸潮'}
                        ],
                   root:payload.root
               })
               break;
            case 1:
               commit({
                   type:'getQueryDetail',
                   res:[{key:'ok',name:'正常'},
                        {key:'error',name:'异常'}],
                   root:payload.root
               })
               break;
            case 2:
               commit({
                   type:'getQueryDetail',
                   res:[{key:'ok',name:'正常'},
                        {key:'error',name:'异常'}],
                   root:payload.root
               })
               break;
            default:
                commit({
                    type:'getQueryDetail',
                    res:[]
                })
                break;
        }
    }
}

export default {
    state,
    mutations,
    actions
}