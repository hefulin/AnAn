import Vue from 'vue'
import * as API from '../api/api'

/**
 *  1、获取取水户的详情信息：
 *  包括 基础信息、取水口
 *  2、获取 取水户的监测信息：
 *  包括 日取水、月取水、年取水
 *  3、获取 取水户的列表信息
 *  4、获取取水户的查询条件信息
 *  5、获取翻页
 *  6、获取搜索组件信息
 */
const state = {
    listInfo: {
        total: '30', desc: '共计查询xx1', lists: [{title: '上海宝信软件', href: '/qshDetail/1', tag1: '1', tag2: '1', tag3: '1'}
            , {title: '上海嘛哩屋', href: '/qshDetail/2'}
            , {title: '上海报亭', href: '/qshDetail/3', tag1: '11111', tag2: '111', tag3: '111'}
            , {title: '上海报亭', href: '/qshDetail/4', tag1: '1', tag2: '1', tag3: '1'}
            , {title: '上海报亭', href: '/qshDetail/5', tag1: '111', tag2: '221', tag3: '111'}
            , {title: '上海报亭', href: '/qshDetail/6', tag1: '111', tag2: '221', tag3: '111'}
            , {title: '上海报亭', href: '/qshDetail/7', tag1: '111', tag2: '331', tag3: '3331'}
            , {title: '上海报亭', href: '/qshDetail/7', tag1: '111', tag2: '331', tag3: '3331'}]
    },
    listDetail: {
        name: '上海城投发展有限公司', wtnum: 345.33, yt: '工业用水',
        pcode: '123455', addr: '上海宝山友谊路1016号', lng: 121.372882, lat: 31.176523,
        qsk: [{qskname: '黄浦江A', xkz: '取水[2017]', xksl: 30.1, x: 121.604799, y: 31.217459},
            {qskname: '黄浦江B', xkz: '取水[2017]', xksl: 31.1, x: 121.403122, y: 31.317181},
            {qskname: '黄浦江C', xkz: '取水[2017]', xksl: 32.1, x: 121.203122, y: 31.217181}]
    },
    queryMenu: [

        {
            title: '用水类型', ol: '用水类型', select: '', key: 'yslx', type: 'radio', children: [
                {title: '工业用水大户', key: '工业用水大户', checked: true},
                {title: '建筑业及第三产业', key: '建筑业及第三产业', checked: false},
                {title: '第三产业用水大户', key: '第三产业用水大户', checked: false}
                ]
        },{
        title: '监测类型', ol: '监测类型', select: '', key: 'jclx', type: 'checkbox', children: [
            {title: '不限', key: '-1', checked: true},
            {title: '国控级在线', key: '国控级在线', checked: false},
            {title: '市级在线', key: '市级在线', checked: false}
            ]
    },
        {
            title: '行政区划', ol: '行政区划', select: '', key: 'xzqh', type: 'checkbox', children: [
                {title: '不限', key: '-1', checked: true},
                {title: '徐汇区', key: '徐汇区', checked: false},
                {title: '闵行区', key: '闵行区', checked: false },
                {title: '黄浦区', key: '黄浦区', checked: false },
                {title: '静安区', key: '静安区', checked: false },
                {title: '长宁区', key: '长宁区', checked: false },
                {title: '浦东新区', key: '浦东新区', checked: false },
                {title: '普陀区', key: '普陀区', checked: false },
                {title: '青浦区', key: '青浦区', checked: false },
                {title: '松江区', key: '松江区', checked: false },
                {title: '金山区', key: '金山区', checked: false },
                {title: '宝山区', key: '宝山区', checked: false },
                {title: '崇明区', key: '崇明区', checked: false },
                {title: '奉贤区', key: '奉贤区', checked: false },
                {title: '虹口区', key: '虹口区', checked: false },
                {title: '杨浦区', key: '杨浦区', checked: false },
                {title: '嘉定区', key: '嘉定区', checked: false }
                ]
        },
        {
            title: '四级分区', ol: '四级分区', select: '', key: 'szysjqmc', type: 'checkbox', children: [
                {title: '不限', key: '-1', checked: true},
                {title: '三岛区', key: '三岛区', checked: false},
                {title: '阳澄淀泖区', key: '阳澄淀泖区', checked: false},
                {title: '杭嘉湖区', key: '杭嘉湖区', checked: false},
                {title: '浦东区', key: '浦东区', checked: false},
                {title: '浦西区', key: '浦西区', checked: false}
                ]
        }
    ],
    loading: true,
    pageNum: 10,
    pageEnd: 1,
    pageStart: 1,
    qslInfo: [] // 获取取水量
}

const mutations = {
    getLists(state, payload) {
        state.listInfo = payload.res
    },
    getListsByParams(state, payload) {
        state.listInfo = payload.res
    },
    // 下拉加载 ，就相当于翻页一次
    loadMore(state, payload) {
        state.listInfo = state.listInfo.contact(payload.res)
        state.pageStart += 1
    },
    getListsDetail(state, payload) {
        state.listDetail = payload.res;
    },
    getQueryMenu(state, payload) {
        state.queryMenu = payload.res;
    },
    getQslInfo(state, payload) {
        state.qslInfo = payload.res;
    }
}

const actions = {
    getLists({commit}, payload) {
        return new Promise((resolve, reject) => {
            Vue.http.post(API.QSH_LIST, {params: payload.param, page: 0})
                .then(res => {
                    commit({
                        type: 'getLists',
                        res: res.body.results
                    })
                    resolve(res);
                }).catch(err => {
                console.log(err);
                reject(err);
            })
        })
    },
    // 这个查询默认就是 从0 开始的10条 根据条件查询取水户列表
    getListsByParams({commit}, payload) {
        return new Promise((resolve, reject) => {
            Vue.http.post(API.QSH_LIST, {params: payload.param, page: 0})
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
    loadMore({commit}, payload) {
        return new Promise((resolve, reject) => {
            Vue.http.get('/api/map', {param: payload.param, page: state.pageStart})
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
    getListsDetail({commit}, payload) {
        return new Promise((resolve, reject) => {
            Vue.http.get('/api/map', {id: payload.id})
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
    getQueryMenu({commit}) {
        return new Promise((resolve, reject) => {
            Vue.http.post(API.QSH_QSL, {params: payload.param, page: 0})
                .then(res => {
                    commit({
                        type: 'getQueryMenu',
                        res: res.body.results
                    })
                    resolve(res);
                }).catch(err => {
                console.log(err);
                reject(err);
            })
        })
    },
    getQslInfo({commit}, payload) {
        return new Promise((resolve, reject) => {
            Vue.http.get('/api/map', {type: payload.type})
                .then(res => {
                    commit({
                        type: 'getQslInfo',
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