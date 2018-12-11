import Vue from 'vue'
import * as API from '../api/api'
/**
 * 管理考核
 * 1、整体的环形图
 * 2、取水户数据信息
 * 3、水质评价数据信息
 */

const state = {
    // updated using new data
    qshList:[
        {txt:'异常站点',value:'加载中'},
        {txt:'正常站点',value:'加载中'},
        {txt:'站点总数',value:'加载中'}
    ],
    zdList:[
        {txt:'站点总数',value:'10'},
        {txt:'巡检总数',value:'20'},
        {txt:'巡检率',value:'30%'},
        {txt:'到报站点',value:'30'}
    ],
    ywList:[
        {txt:'任务总数',value:'60'},
        {txt:'完成数',value:'20'},
        {txt:'完成率',value:'70%'}
    ],
    nowDate:'',
    qsListUp:[],
    qsListDown:[],
    sjListUp:[],  // 数据质量 - 数据排行 - 高
    sjListDown:[], // 数据质量 - 数据排行 - 低
    jcsjList:[], //  数据质量 - 监测数据
    zssjList:[], // 数据质量 - 数据走势
    sjLegend:[], // 数据质量 - 图例
    zsLegend:[], // 数据质量 走势 -legend
    jcqsList:[], //  数据质量 - 监测数据
    zsqsList:[], // 数据质量 - 数据走势
    jcqsLegend:[], // 数据质量 - 图例
    zsqsLegend:[], // 数据质量 走势 -legend
    qsList:[
        {txt:'取水户数',value:'20',dw:''},
        {txt:'许可总量',value:'20',dw:'亿m³'},
        {txt:'取水总量',value:'30',dw:'亿m³'},
        {txt:'取水许可比',value:'30',dw:''}
    ],
    clList:[
        {txt:'超量户数',value:'20',dw:''},
        {txt:'超标水量',value:'20',dw:'亿m³'},
        {txt:'超标比率',value:'30',dw:''}
    ],
    xkzList:[
        {txt:'证总数',value:'20',dw:''},
        {txt:'失效证数',value:'20',dw:''},
        {txt:'失效比率',value:'30',dw:''}
    ],
    dysList:[
        {txt:'用水户数',value:'20',dw:''},
        {txt:'用水计划',value:'20',dw:''},
        {txt:'用水总量',value:'30',dw:''},
        {txt:'计划比率',value:'30',dw:''}
    ],
    // updated using new data
    sydList:[
        {txt:'水源地',value:'加载中',dw:''},
        {txt:'监测数量',value:'加载中',dw:''},
        {txt:'超标数量',value:'加载中',dw:''},
        {txt:'超标比率',value:'加载中',dw:''},
        {txt:'超标项数',value:'加载中',dw:''},
        {txt:'超标水源地',value:'加载中',dw:''}
    ],
    // updated using new data
    sgnqList:[
        {txt:'水功能区',value:'加载中',dw:''},
        {txt:'监测数量',value:'加载中',dw:''},
        {txt:'超标数量',value:'加载中',dw:''},
        {txt:'超标比率',value:'加载中',dw:''},
        {txt:'超标项数',value:'加载中',dw:''},
        {txt:'超标测站',value:'加载中',dw:''}
    ],
    // 首页的- 
    sjsbList:[  // 数据上报
        {txt:'取水户',value:'20',txt1:'监测站点',value1:'1'},
        {txt:'用水户',value:'20',txt1:'监测站点',value1:'22'},
        {txt:'水质监测站',value:'20',txt1:'',value1:''}
    ],
    sjzlList:[  // 数据质量
        {txt:'监测站点',value:'20'},
        {txt:'取水上报数据量',value:'20'},
        {txt:'用水上报数据量',value:'20'},
        {txt:'水质上报数据量',value:'20'},
    ],
    ywxjList:[  // 运维巡检
        {txt:'巡检站点',value:'20'},
        {txt:'运行维护站点',value:'20'}
    ],
    ywjgList:[  // 业务监管
        {txt:'取水户',value:'20'},
        {txt:'用水户',value:'20'},
        {txt:'饮用水源地',value:'20'},
        {txt:'水功能区',value:'20'}
    ],
    // 数据上报的--
    qssbList:[
        {txt:'应报站点',value:'20'},
        {txt:'实到站点',value:'20'},
        {txt:'上报率',value:'20'}
    ],
    yssbList:[
        {txt:'应报站点',value:'20'},
        {txt:'实到站点',value:'20'},
        {txt:'上报率',value:'20'}
    ],
    sydsbList:[
        {txt:'应报站点',value:'20'},
        {txt:'实到站点',value:'20'},
        {txt:'上报率',value:'20'}
    ],
    sgnqsbList:[
        {txt:'应报站点',value:'20'},
        {txt:'实到站点',value:'20'},
        {txt:'上报率',value:'20'}
    ],
    // 数据上报 - 取用水
    jczdList:[
        {txt:'应报站点',value:'20'},
        {txt:'实到站点',value:'20'},
        {txt:'到报率',value:'20'}
    ],
    hourList:[
        {txt:'应报条数',value:'20'},
        {txt:'实到条数',value:'20'},
        {txt:'到报率',value:'20'},
        {txt:'到报站点',value:'20'}
    ],
    dayList:[
        {txt:'应报条数',value:'20'},
        {txt:'实到条数',value:'20'},
        {txt:'到报率',value:'20'},
        {txt:'到报站点',value:'20'}
    ],
    // 数据上报 - 水质监测
    swczList:[
        {txt:'应报站点',value:'20'},
        {txt:'实到站点',value:'20'},
        {txt:'到报率',value:'20'}
    ],
    sydczList:[
        {txt:'应报站点',value:'20'},
        {txt:'实到站点',value:'20'},
        {txt:'到报率',value:'20'}
    ],
    sgnqczList:[
        {txt:'应报站点',value:'20'},
        {txt:'实到站点',value:'20'},
        {txt:'到报率',value:'20'}
    ]
}

const mutations = {
    jrqk_getLists (state, payload) { // 数据质量-首页
//        state.qshList = payload.res[0];
//        state.sydList = payload.res[1];
//        state.sgnqList = payload.res[2];
        // var xmlHttp = new XMLHttpRequest();
        // xmlHttp.open("GET", JRQK_LIST, false);
        // xmlHttp.send(null);
        const api_retrieved_values = payload.res;
        state.qshList = [
            {txt:'异常站点',value:api_retrieved_values["qysh"]["yczd"]},
            {txt:'正常站点',value:api_retrieved_values["qysh"]["zczd"]},
            {txt:'站点总数',value:api_retrieved_values["qysh"]["zdzs"]}
        ];
        state.sgnqList = [
            {txt:'水功能区',value:api_retrieved_values["sgnq"]["sgnqSl"],dw:''},
            {txt:'监测数量',value:api_retrieved_values["sgnq"]["sgnqJcsl"],dw:''},
            {txt:'超标数量',value:api_retrieved_values["sgnq"]["sgnqCbsl"],dw:''},
            {txt:'超标比率',value:api_retrieved_values["sgnq"]["sgnqCbl"],dw:''},
            {txt:'超标项数',value:api_retrieved_values["sgnq"]["sgnqCbxs"],dw:''},
            {txt:'超标测站',value:api_retrieved_values["sgnq"]["sgnqCbcz"],dw:''}
        ];
        state.sydList = [
            {txt:'水源地',value:api_retrieved_values["syd"]["sydSl"],dw:''},
//  If data is now provided/becomes available, uncomment the following code
            {txt:'监测数量',value:api_retrieved_values["syd"]["sydJcsl"]||0,dw:''},
           {txt:'超标数量',value:api_retrieved_values["syd"]["sydCbsl"]||0,dw:''},
           {txt:'超标比率',value:api_retrieved_values["syd"]["sydCbl"]||0,dw:''},
           {txt:'超标项数',value:api_retrieved_values["syd"]["sydCbxs"]||0,dw:''},
           {txt:'超标水源地',value:api_retrieved_values["syd"]["sydCbsyd"]||0,dw:''}
        ];
    },
    getSjList (state, payload) { //数据质量 -排行榜
        // 结果处理
        let org_data = payload.res.data;
        if(payload.sjtype == '水源地'){
          var org_data_temp = [];
          org_data.forEach((element,index) => {
                if(index <3)
                org_data_temp.push(element);
          })
          org_data = org_data_temp;
        }
        // console.log(org_data);
        let page_param = payload.opar;
        if(page_param == 'gao')
        state.sjListUp = org_data;
        else
        state.sjListDown = org_data;
    },
    getSjList_QS (state, payload) { //数据质量 -排行榜 - 取用水
        // 结果处理
        let org_data = payload.res.data;
        // console.log(org_data);
        let page_param = payload.opar;
        if(page_param == 'gao')
          state.qsListUp = org_data;
        else
        state.qsListDown = org_data;
    },
    getJcsjList (state, payload) { //数据质量 - 监测情况
        // 结果处理
        let org_data = payload.res.data;
        state.sjLegend = [];
        state.jcsjList = [];
        org_data.forEach(element => {
            state.sjLegend.push(element.error_title);
            state.jcsjList.push(element.num);
        });
        
    },
    getZssjList (state, payload) { //数据质量 - 质量走势
        // 结果处理
        state.zssjList = [];
        state.zsLegend = '';
        let org_data = payload.res.data;
        org_data.forEach(element => {
            state.zsLegend = element.error_title;
            state.zssjList.push(element.num);
        });
    },
    getJcqsList (state, payload) { //数据质量 - 监测情况
        // 结果处理
        let org_data = payload.res.data;
        state.jcqsLegend = [];
        state.jcqsList = [];
        org_data.forEach(element => {
            state.jcqsLegend.push(element.error_title);
            state.jcqsList.push(element.num);
        });
        
    },
    getZsqsList (state, payload) { //数据质量 - 质量走势
        // 结果处理
        state.zsqsList = [];
        state.zsqsLegend = '';
        let org_data = payload.res.data;
        org_data.forEach(element => {
            state.zsqsLegend = element.error_title;
            state.zsqsList.push(element.num);
        });
    },
    getYwLists (state, payload) { // 运维考核的 - 整体
        state.ywList = payload.res[0];
        state.zdList = payload.res[1];
    },
    getJgLists (state,payload) { // 监管-首页
        // 结果处理
        state.qsList = payload.res[0];
        state.clList = payload.res[1];
        state.xkzList = payload.res[2];
        state.dysList = payload.res[3];
    },
    getCheckLists (state, payload) { // 管理考核 - 首页

        state.sjsbList = payload.res[0];
        state.sjzlList = payload.res[1];
        state.ywxjList = payload.res[2];
        state.ywjgList = payload.res[3];
    },
    getSbLists (state, payload) { // 数据上报 - 首页
        
        state.qssbList = payload.res[0];
        state.yssbList = payload.res[1];
        state.sydsbList = payload.res[2];
        state.sgnqsbList = payload.res[3];
    },
    getTime (state, payload) {
        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        if (month < 10) {
            month = "0" + month;
        }
        if (day < 10) {
            day = "0" + day;
        }
        var nowDate1 = year + "-" + month + "-" + day;
        state.nowDate = nowDate1;
    }
}

const actions = {
    getTime({commit}){
        commit('getTime')
    },
    jrqk_getLists({commit},payload){
        return new Promise((resolve,reject) =>{
            Vue.http.jsonp(API.JRQK_LIST, {param:payload.param})
                .then(response => {
                    commit({
                        type: 'jrqk_getLists',
                        res: response.body
                    })
                resolve(response);
            }).catch(err => {
                console.log(err);
                reject(err);
            })
        })
    },
    getSjLists({commit},payload){
        let param = encodeURI(encodeURI(JSON.stringify(payload)));
        return new Promise((resolve,reject) =>{
            Vue.http.jsonp(API.SZPJ_PHB+"&params="+param)
                .then(response => {
                    commit({
                        type: 'getSjList',
                        res: response.body,
                        opar:payload.type,
                        sjtype:payload.hdst_type
                    })
                resolve(response);
            }).catch(err => {
                console.log(err);
                reject(err);
            })
        })
    },
    getSjList_QS({commit},payload){
        let param = encodeURI(encodeURI(JSON.stringify(payload)));
        return new Promise((resolve,reject) =>{
            Vue.http.jsonp(API.QYS_PHB+"&params="+param)
                .then(response => {
                    commit({
                        type: 'getSjList_QS',
                        res: response.body,
                        opar:payload.type
                    })
                resolve(response);
            }).catch(err => {
                console.log(err);
                reject(err);
            })
        })
    },
    getJcsjLists({commit},payload){ // 数据质量 - 监测情况
        let param = encodeURI(encodeURI(JSON.stringify(payload)));
        return new Promise((resolve,reject) =>{
            Vue.http.jsonp(API.SZPJQK_LIST+"&params="+param)
                .then(response => {
                    commit({
                        type: 'getJcsjList',
                        res: response.body
                    })
                resolve(response);
            }).catch(err => {
                console.log(err);
                reject(err);
            })
        })
    },
    getJcqsLists({commit},payload){ // 数据质量 - 监测情况
        let param = encodeURI(encodeURI(JSON.stringify(payload)));
        return new Promise((resolve,reject) =>{
            Vue.http.jsonp(API.QYSJC_LIST+"&params="+param)
                .then(response => {
                    commit({
                        type: 'getJcqsList',
                        res: response.body
                    })
                resolve(response);
            }).catch(err => {
                console.log(err);
                reject(err);
            })
        })
    },
    getZssjLists({commit},payload){ // 数据质量 - 数据走势
        let param = encodeURI(encodeURI(JSON.stringify(payload)));
        return new Promise((resolve,reject) =>{
            Vue.http.jsonp(API.SZPJZS_LIST+"&params="+param)
                .then(response => {
                    commit({
                        type: 'getZssjList',
                        res: response.body
                    })
                resolve(response);
            }).catch(err => {
                console.log(err);
                reject(err);
            })
        })
    },
    getZsqsLists({commit},payload){ // 数据质量 - 数据走势
        let param = encodeURI(encodeURI(JSON.stringify(payload)));
        return new Promise((resolve,reject) =>{
            Vue.http.jsonp(API.QYSZS_LIST+"&params="+param)
                .then(response => {
                    commit({
                        type: 'getZsqsList',
                        res: response.body
                    })
                resolve(response);
            }).catch(err => {
                console.log(err);
                reject(err);
            })
        })
    },
    getYwLists({commit},payload){
        Vue.http.jsonp('/api/map',{param:payload.param})
        .then(res => {
            commit({
                type: 'getSjLists',
                res: res.body.results   
            })
        }).catch(err => {
            console.log(err);
            reject(err);
        })
    },
    getJgLists({commit},payload){
        Vue.http.jsonp('/api/map',{param:payload.param})
        .then(res => {
            commit({
                type: 'getJgLists',
                res: res.body.results   
            })
        }).catch(err => {
            console.log(err);
            reject(err);
        })
    },
    getCheckLists({commit},payload){
        Vue.http.jsonp('/api/map',{param:payload.param})
        .then(res => {
            commit({
                type: 'getCheckLists',
                res: res.body.results   
            })
        }).catch(err => {
            console.log(err);
            reject(err);
        })
    },
    getSbLists({commit},payload){
        Vue.http.jsonp('/api/map',{param:payload.param})
        .then(res => {
            commit({
                type: 'getSbLists',
                res: res.body.results   
            })
        }).catch(err => {
            console.log(err);
            reject(err);
        })
    }
}

export default {
    state,
    mutations,
    actions
}
