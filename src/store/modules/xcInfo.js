import Vue from 'vue'
// import  * as api from '../api/api'
/**
 *  1、获取水功能区的列表信息：
 *  2、获取 水功能区的详情信息：
 *  包括 监测情况
 *  3、反馈水功能区情况
 *  5、获取翻页
 *  6、获取搜索组件信息
 */
const state = {
    listInfo: {total:'30',desc:'共计查询xx',lists:[{title:'吴淞江',href:'/sgnqDetail/1',tag1:'缓存区',tag2:'目标水质：II',tag3:'评价水质：II'},{title:'吴淞江',href:'/sgnqDetail/2'}
    ,{title:'吴淞江',href:'/sgnqDetail/3',tag1:'11111',tag2:'111',tag3:'111'},{title:'吴淞江',href:'/qshDetail/4',tag1:'1',tag2:'1',tag3:'1'}
    ,{title:'吴淞江',href:'/sgnqDetail/5',tag1:'111',tag2:'221',tag3:'111'}
    ,{title:'吴淞江',href:'/sgnqDetail/6',tag1:'111',tag2:'221',tag3:'111'}
    ,{title:'吴淞江',href:'/sgnqDetail/7',tag1:'111',tag2:'331',tag3:'3331'}
    ,{title:'吴淞江',href:'/sgnqDetail/7',tag1:'111',tag2:'331',tag3:'3331'}]},
    listDetail:{name:'吴淞江',sz:'II',pj:'II',zdgn:'过渡区',
                addrwater:'吴淞江~苏州河',sdm:'嘉定汶',edm:'蕰藻浜',
                zb:[{name:'嘉定汶',x:121.604799,y:31.217459},
                    {name:'蕰藻浜',x:121.403122,y:31.317181}],
                jcz:[{id:'1',name:'白鹤',zb:'II',pj:'II'},{id:'2',name:'黄渡',zb:'II',pj:'II'}]},
    queryMenu:[
                {title:'控制水源地',ol:'控制水源地',select:'',key:'kzsyd',type:'checkbox',children:[
                        {title:'不限',key:'-1',checked:true},
                        {title:'青草沙',key:'青草沙',checked:true},
                        {title:'陈行',key:'陈行',checked:false},
                        {title:'东风西沙',key:'东风西沙',checked:false}]},

                {title:'监测状态',ol:'监测状态',select:'',key:'state',type:'radio',children:[
                        {title:'不限',key:'-1',checked:true},
                        {title:'正常',key:'正常',checked:false},
                        {title:'超标',key:'超标',checked:false}
                        ]}

             ],
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