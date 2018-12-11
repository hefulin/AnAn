<!--
  描述：拖放地图组件，默认尺寸是 500 * 300
  接收属性参数：
    lat: 纬度
    lng: 经度
  自定义事件：
    drag: 拖放完成事件
  示例：
    <redmap @drag="dragMap" lat="22.574405" lng="114.095388"></redmap>
-->
<template>
    <div class="m-map">
        <div id="js-container" class="map">

        </div>
    </div>
</template>

<script>
    import remoteLoad from '../../config/remoteLoad.js'
    import {MapKey, MapCityName} from '../../config/config'

    export default {
        props: ['points', 'type'],
        data() {
            return {
                searchKey: '',
                placeSearch: null,
                dragStatus: false,
                AMapUI: null,
                AMap: null,
                map: '',
                mapAddress: {
                    address: '获取地址中...',
                    lng: '',
                    lat: '',
                    type: 'success'
                }
            }
        },
        watch: {
            points() {
                console.log(this.points);
                this.refreshMap();
            },
            mapAddress(val, oldVal) {
                this.$emit('mapAddress', this.mapAddress);
            }
        },
        methods: {
            // 实例化地图
            initMap() {
                this.$emit('mapAddress', {
                    address: '获取地址中...',
                    lng: '',
                    lat: '',
                    type: 'success'
                });
                // 加载PositionPicker，loadUI的路径参数为模块名中 'ui/' 之后的部分
                let AMapUI = this.AMapUI = window.AMapUI
                let AMap = this.AMap = window.AMap
                AMapUI.loadUI(['misc/PositionPicker'], PositionPicker => {
                    let mapConfig = {
                        zoom: 9,
                        cityName: MapCityName
                    }
                    console.log('实例化' + this.points);
                    if (this.lat && this.lng) {
                        mapConfig.center = [this.lng, this.lat]
                    }
                    let infoWindow = new AMap.InfoWindow({
//            isCustom: true,
                        offset: new AMap.Pixel(0, -30)
                    });
                    let map = new AMap.Map('js-container', mapConfig)
                    this.map = map;
                    console.log(map);

                    //定位
                    var _this = this;
                    map.plugin('AMap.Geolocation', function() {
                        var geolocation = new AMap.Geolocation({
                            // 是否使用高精度定位，默认：true
                            enableHighAccuracy: true,
                            // 设置定位超时时间，默认：无穷大
                            timeout: 10000,
                            // 定位按钮的停靠位置的偏移量，默认：Pixel(10, 20)
                            buttonOffset: new AMap.Pixel(10, 20),
                            //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
                            zoomToAccuracy: true,
                            //  定位按钮的排放位置,  RB表示右下
                            buttonPosition: 'RB'
                        })

                        geolocation.getCurrentPosition();
                        AMap.event.addListener(geolocation, 'complete', onComplete);
                        AMap.event.addListener(geolocation, 'error', onError);

                        function onComplete (data) {
                            // data是具体的定位信息
                            console.log('地点：' + data.formattedAddress);
                            console.log('经度：' + data.position.getLng());
                            console.log('纬度：' + data.position.getLat());
                            _this.mapAddress = {
                                address: data.formattedAddress,
                                lng: data.position.getLng(),
                                lat: data.position.getLat(),
                                type: 'success'
                            };
                        }
                        function onError (data) {
                            // 定位出错
                            console.log('定位失败' + data);
                            _this.mapAddress = {
                                address: "获取位置失败",
                                lng: "获取位置失败",
                                lat: "获取位置失败",
                                type: 'error'
                            };
                        }
                    });
                    // 加载地图搜索插件
                    AMap.service('AMap.PlaceSearch', () => {
                        this.placeSearch = new AMap.PlaceSearch({
                            pageSize: 5,
                            pageIndex: 1,
                            citylimit: true,
                            city: MapCityName,
                            map: map,
                            panel: 'js-result'
                        })
                    })
                    // 启用工具条
                    AMap.plugin(['AMap.ToolBar'], function () {
                        map.addControl(new AMap.ToolBar({
                            position: 'RB'
                        }))
                    })
                    // 创建地图上的点
                    for (var i = 0; i < this.points.length; i++) {
                        console.log(this.points);
                        let marker = new AMap.Marker({
                            position: [this.points[i].lng, this.points[i].lat],
                            title: this.points.name,
                            map: map,
                            icon: this.points[i].icon,
                        });
                        marker.content = this.getContent(this.points[i].name, this.points[i].desc).join("");
                        marker.on('click', markerClick => {
                            infoWindow.setContent(markerClick.target.content);
                            infoWindow.open(map, markerClick.target.getPosition());
                        });
                        // marker.emit('click', {target: marker});
                    }
                })
            },
            refreshMap() {
                // 创建地图上的点
                for (var i = 0; i < this.points.length; i++) {
                    let marker = new AMap.Marker({
                        position: [this.points[i].lng, this.points[i].lat],
                        title: this.points.name,
                        map: this.map,
                        icon: this.points[i].icon,
                    });
                    marker.content = this.getContent(this.points[i].name, this.points[i].desc).join("");
                    marker.on('click', markerClick => {
                        infoWindow.setContent(markerClick.target.content);
                        infoWindow.open(map, markerClick.target.getPosition());
                    });
                    // marker.emit('click', {target: marker});
                }
            },
            getContent(name, desc) {
                let t = this.type;
                console.log(t);
                let content = [];
                content.push('<div class="infowindow-content">');
                content.push('<h4 class="amap-info-header">');
                content.push(name);
                content.push('</h4>');
                content.push('<div>');
                content.push(desc);
                content.push('</div>');
                content.push('</div>');
                return content;
            }

        },
        async mounted() {
            // 已载入高德地图API，则直接初始化地图
            if (window.AMap && window.AMapUI) {
                this.initMap()
                // 未载入高德地图API，则先载入API再初始化
            } else {
                await remoteLoad(`http://webapi.amap.com/maps?v=1.3&key=${MapKey}`)
                await remoteLoad('http://webapi.amap.com/ui/1.0/main.js')
                this.initMap()
            }
        }
    }
</script>

<style lang="css">
    .m-map {
        position: relative;
        height: 100%;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: 100%;
    }

    .m-map .map {
        width: 100%;
        height: 100%;
    }

    .m-map .search {
        position: absolute;
        top: 10px;
        left: 10px;
        width: 285px;
        z-index: 1;
    }

    .m-map .search input {
        width: 180px;
        border: 1px solid #ccc;
        line-height: 20px;
        padding: 5px;
        outline: none;
    }

    .m-map .search button {
        line-height: 26px;
        background: #fff;
        border: 1px solid #ccc;
        width: 50px;
        text-align: center;
    }

    .m-map .result {
        max-height: 300px;
        overflow: auto;
        margin-top: 10px;
    }
</style>