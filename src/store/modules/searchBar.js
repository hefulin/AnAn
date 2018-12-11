import Vue from 'vue'
import * as API from '../../store/api/api'
// import  * as api from '../api/api'
/**
 *  搜索框的几点说明：
 *  searchType 表示 当前搜索的是哪个接口
 *  1、初始化获取推荐查询信息
 *  2、根据查询条件获取查询信息，默认就8条，多了不显示
 */
const state = {
    searchLists: [],
    searchUrl:'',
    loading:false
}

const mutations = {
    getDefalutLists (state, payload) {
      state.searchLists = payload.res
    },
    getListByParams (state,payload) {
      state.searchLists = payload.res
    }
}

const actions ={
    getDefalutLists({commit},payload){
        switch(payload.param){
            case 'dbsqsh':
            commit({
                type: 'getDefalutLists',
                res: [{title:'测试',href:'/qshDetail/1',tag1:'测试',tag2:'测试',tag3:'测试'},
                {title:'测试',href:'/qshDetail/1',tag1:'测试',tag2:'测试',tag3:'测试'}]
            })
            state.searchUrl = '123';
            break;
            case 'sgnq':
                commit({
                type: 'getDefalutLists',
                res: [{title:'吴淞江',href:'/qshDetail/1',tag1:'测试',tag2:'测试',tag3:'测试'},
                {title:'吴淞江',href:'/qshDetail/1',tag1:'测试',tag2:'测试',tag3:'测试'}]
            })
            state.searchUrl = '';
            break;
        }
    },
    getListByParams({commit},payload){
        var paramsData={};
        switch(payload.param.split('&&')[0]){
            case 'sgnq':
                this.searchUrl=API.SGNQ_LIST;
                paramsData={ currentPage:'10','wfzNm':payload.param.split('&&')[1]};
                break;
            case 'xc':
                this.searchUrl=API.XC_LIST;
                paramsData={kzsyd: '',
                            state: '',
                            currentPage:'10',
                            name:payload.param.split('&&')[1]}
                break;
            case 'cxksl':
                this.searchUrl=API.QSH_CXKZ;
                paramsData={
                    currentPage:'10',
                    watuser_name:payload.param.split('&&')[1]}
                break;
            case 'qsxkz':
                this.searchUrl=API.QSH_XKZ;
                paramsData={
                    currentPage:'10',
                    qsqrmc:payload.param.split('&&')[1]}
                break;
        }
        paramsData = encodeURI(encodeURI(JSON.stringify(paramsData)));
        return new Promise((resolve,reject) =>{

        Vue.http.get(this.searchUrl+ "&params=" + paramsData,{params:payload.param})
            .then(res => {
                var resu=[];
                switch(payload.param.split('&&')[0]){
                    case 'sgnq':
                        for (let value of res.body.data) {
                            resu.push({title:value.wfzNm,href:"/sgnqDetail/" + value.wfzNb,key:value.wfzNb,tag1:value.wtType,tag2:value.belRiv,tag3:value.tgWq});
                        }
                        break;
                    case 'xc':
                        for (let value of res.body.data) {
                            resu.push({title:value.name,href:"",key:value.stcd,tag1:value.nm_salinity,tag2:value.state,tag3:value.tgWq});
                        }
                        break;
                    case 'qsxkz':
                        for (let value of res.body.data) {
                            resu.push({title:value.qsqrmc,href:"/qsxkzDetail/"+value.id,key:value.id,tag1:value.watuserDivname,tag2:value.qsl,tag3:value.overDate});
                        }
                        break;
                    case 'cxksl':
                        for (let value of res.body.data) {
                            resu.push({title:value.watuser_name,href:"",key:value.watuser_id,tag1:value.qsl,tag2:value.xksl,tag3:value.dt});
                        }
                        break;
                }

                commit({
                    type: 'getListByParams',
                    //res: res.body.results,
                    res:resu
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