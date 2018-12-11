import Vue from 'vue'
// import  * as api from '../api/api'
/**
 *  1、获取水源地的列表信息：
 *  2、获取 水源地的详情信息：
 *  包括 监测情况
 *  5、获取翻页
 *  6、获取搜索组件信息
 */
const state = {
    listInfo: {total:'30',desc:'共计查询xx',lists:[{title:'青草沙',href:'/sydDetail/1',tag1:'II',tag2:'达标',tag3:'719',tag4:'在用',x:'121.222',y:'31.365'},
     {title:'长江口陈行水源地',href:'/sydDetail/2',tag1:'111',tag2:'不达标',tag3:'111',tag4:'33',x:'121.122',y:'31.065'}
    ,{title:'金泽水源地',href:'/sydDetail/5',tag1:'111',tag2:'221',tag3:'111',tag4:'33',x:'121.32',y:'31.35'}
    ,{title:'黄浦江上游',href:'/sydDetail/6',tag1:'111',tag2:'221',tag3:'111',tag4:'备用',x:'121.12',y:'31.5'}
    ,{title:'东风西沙水源地',href:'/sydDetail/6',tag1:'111',tag2:'221',tag3:'111',tag4:'33',x:'121.42',y:'31.05'}]},
    listDetail:{name:'吴淞江',sz:'II',pj:'II',zdgn:'过渡区',
                addrwater:'吴淞江~苏州河',sdm:'嘉定汶',edm:'蕰藻浜',
                zb:[{name:'嘉定汶',x:121.604799,y:31.217459},
                    {name:'蕰藻浜',x:121.403122,y:31.317181}],
                jcz:[{id:'1',name:'白鹤',zb:'II',pj:'II'},{id:'2',name:'黄渡',zb:'II',pj:'II'}]},
    loading:true,
    pageNum:10,
    pageEnd:1,
    pageStart:1,
    jcInfo:{name:['采样时间','2017-03-07','水温','11.1','pH','7.7','溶解氧','7.7','高猛酸盐指数','7.7','化学需氧量','7.7','五日生化需氧量','7.7','氨氮','7.7','总磷','7.7','总氮','7.7'],
           }
}

const mutations = {
    getLists (state, payload) {
      state.listInfo = payload.res
    },
    getListsByParams (state, payload) {
      state.listInfo = payload.res
    },
    // 下拉加载 ，就相当于翻页一次
    loadMore (state,payload){
        state.listInfo = state.listInfo.contact(payload.res)
        state.pageStart +=1
    },
    getListsDetail(state,payload) {
        state.listDetail = payload.res;
    },
    getQueryMenu(state,payload) {
        state.queryMenu = payload.res;
    },
    getJcInfo(state,payload) {
        state.jcInfo = payload.res;
    }
}

const actions = {
    getLists({commit}){
        commit({
            type: 'getLists',
            res: res.body.results
        })
    },
    // 这个查询默认就是 从0 开始的10条
    getListsByParams({commit},payload){
        return new Promise((resolve,reject) =>{
            Vue.http.get('/api/map',{param:payload.param,page:0})
                .then(res => {
                    commit({
                        type: 'getListsByParams',
                        res: res.body.results
                    })
                resolve(res);
            }).catch(err => {
                console.log(err);
                reject(err);
            })
       })
    },
    // 翻页
    loadMore({commit},payload){
        return new Promise((resolve,reject) =>{
            Vue.http.get('/api/map',{param:payload.param,page:state.pageStart})
                .then(res => {
                    commit({
                        type: 'getListsByParams',
                        res: res.body.results
                    })
                resolve(res);
            }).catch(err => {
                console.log(err);
                reject(err);
            })
       })
    },
    getListsDetail({commit},payload){
        return new Promise((resolve,reject) =>{
            Vue.http.get('/api/map',{id:payload.id})
                .then(res => {
                    commit({
                        type: 'getListsDetail',
                        res: res.body.results
                    })
                resolve(res);
            }).catch(err => {
                console.log(err);
                reject(err);
            })
       })       
    },
    getQueryMenu({commit}){
        commit({
            type: 'getQueryMenu',
            res: res.body.results
        })
    },
    getJcInfo({commit},payload){
        return new Promise((resolve,reject) =>{
            Vue.http.get('/api/map',{type:payload.type})
                .then(res => {
                    commit({
                        type: 'getJcInfo',
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