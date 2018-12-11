/**
 * 时间：2018-05-28
 * 描述：图表类的工具
 */
export default {
    /**
     * 
     * @param {*['上报中断','上报延迟','数据跳大','数据跳小','数据为负']} legend 
     * @param {*} ds 数据
     */
    initLine(legend,ds){
        var option = {
            
             legend: {
                 data:legend
             },
             grid: {
                 left: '3%',
                 right: '4%',
                 bottom: '3%',
                 containLabel: true
             },
             xAxis : [
                 {
                     type : 'category',
                     boundaryGap : false
                 }
             ],
             yAxis : [
                 {
                     type : 'value',
                     max:function(value) {
                        return value.max + 5;
                     }
                 }
             ],
             series : [
                //  {
                //      name:legend[0],
                //      type:'line',
                //      stack: '总量',
                //     //  label: {
                //     //      normal: {
                //     //          show: true,
                //     //          position: 'top'
                //     //      }
                //     //  },
                //      data:ds[0]
                //  },
                //  {
                //      name:legend[1],
                //      type:'line',
                //      stack: '总量',
                //     //  label: {
                //     //      normal: {
                //     //          show: true,
                //     //          position: 'top'
                //     //      }
                //     //  },
                //      data:ds[1]
                //  },
                //  {
                //      name:legend[2],
                //      type:'line',
                //      stack: '总量',
                //     //  label: {
                //     //      normal: {
                //     //          show: true,
                //     //          position: 'top'
                //     //      }
                //     //  },
                //      data:ds[2]
                //  },
                //  {
                //      name:legend[3],
                //      type:'line',
                //      stack: '总量',
                //     //  label: {
                //     //      normal: {
                //     //          show: true,
                //     //          position: 'top'
                //     //      }
                //     //  },
                //      data:ds[3]
                //  },
                 {
                     name:legend,
                     type:'line',
                     stack: '总量',
                     label: {
                         normal: {
                             show: true,
                             position: 'top'
                         }
                     },
                     data:ds
                 }
             ]
         };
         return option;
    },
    initChart(legend,dt){
        
              var option = {
                  grid:{
                    top:'14%',
                    left:'2',
                    bottom: '10%'
                  },
                  tooltip: {
                      trigger: 'axis',
                      axisPointer: {
                          type: 'shadow'
                      }
                  },
                  xAxis: [
                      {
                          type: 'category',
                          axisTick: {show: false},
                          data: legend
                      }
                  ],
                  yAxis: [
                      {
                          show:false,
                          type: 'value'
                      }
                  ],
                  series: [
                        {
                            name: '总量',
                            type: 'bar',
                            barGap: 1,
                            label: {
                                normal: {
                                    show: true,
                                    position: 'top'
                                }
                            },
                            itemStyle:{
                              normal:{
                                color:function(params){
                                   var colors = ['#36a2da', '#32c5e9', '#67e0e3', '#9ee7b7','#e5323e'];
        
                                   return colors[params.dataIndex];
                                }
                              }
                            },
                            data: dt
                        }
                    ]
                  };
              return option;
    },
    initYwLine1(legend,ds){
        var option = {
            
             legend: {
                 data:legend
             },
             grid: {
                 left: '3%',
                 right: '4%',
                 bottom: '3%',
                 top:'5',
                 containLabel: true
             },
             xAxis : [
                 {
                     type : 'category',
                     boundaryGap : false
                 }
             ],
             yAxis : [
                 {
                     type : 'value'
                 }
             ],
             series : [
                 {
                     name:legend[0],
                     type:'line',
                     stack: '总量',
                     label: {
                         normal: {
                             show: true,
                             position: 'top'
                         }
                     },
                     data:ds[0]
                 },
                 {
                     name:legend[1],
                     type:'line',
                     stack: '总量',
                     label: {
                         normal: {
                             show: true,
                             position: 'top'
                         }
                     },
                     data:ds[1]
                 }
             ]
         };
         return option;
    },
    initYwLine2(ds){
        var option = {
             grid: {
                 left: '3%',
                 right: '4%',
                 bottom: '3%',
                 top:'5',
                 containLabel: true
             },
             xAxis : [
                 {
                     type : 'category'
                 }
             ],
             yAxis : [
                 {
                     type : 'value'
                 }
             ],
             series : [
                 {
                     type:'line',
                     label: {
                         normal: {
                             show: true,
                             position: 'top'
                         }
                     },
                     data: ds
                 }
             ]
         };
         return option;
    },
    initHBar(t,x1,x2){
        var option = {
            title:{
                text:''
            },
            grid: {
                left: '-20%',
                right: '4%',
                bottom: '30%',
                top: '0%',
                containLabel: true
            },
            xAxis: {
                type: 'value',
                show:false
            },
            yAxis: {
                type: 'category',
               show:false
            },
            series: [
                {
                    name: '目标',
                    type: 'bar',
                    itemStyle:{
                        normal:{
                          color:'#37a2da'
                        }
                    },
                    data: [20203]
                },
                {
                    name: '实际',
                    type: 'bar',
                    itemStyle:{
                        normal:{
                          color:'#ffd85c'
                        }
                    },
                    data: [19325]
                }
            ]
        };
        return option;
    },
    initLine3(legend,ds){
        var option = {
            
             legend: {
                 data:legend
             },
             grid: {
                 left: '3%',
                 right: '4%',
                 bottom: '3%',
                 containLabel: true
             },
             xAxis : [
                 {
                     type : 'category',
                     boundaryGap : false
                 }
             ],
             yAxis : [
                 {
                     type : 'value'
                 }
             ],
             series : [
                 {
                     name:legend[0],
                     type:'line',
                     stack: '总量',
                     label: {
                         normal: {
                             show: true,
                             position: 'top'
                         }
                     },
                     data:ds[0]
                 },
                 {
                     name:legend[1],
                     type:'line',
                     stack: '总量',
                     label: {
                         normal: {
                             show: true,
                             position: 'top'
                         }
                     },
                     data:ds[1]
                 },
                 {
                     name:legend[2],
                     type:'line',
                     stack: '总量',
                     label: {
                         normal: {
                             show: true,
                             position: 'top'
                         }
                     },
                     data:ds[2]
                 }
             ]
         };
         return option;
    },
    initLine2(legend,ds){
        var option = {
            
             legend: {
                 data:legend
             },
             grid: {
                 left: '3%',
                 right: '4%',
                 bottom: '3%',
                 containLabel: true
             },
             xAxis : [
                 {
                     type : 'category',
                     boundaryGap : false
                 }
             ],
             yAxis : [
                 {
                     type : 'value'
                 }
             ],
             series : [
                 {
                     name:legend[0],
                     type:'line',
                     stack: '总量',
                     label: {
                         normal: {
                             show: true,
                             position: 'top'
                         }
                     },
                     data:ds[0]
                 },
                 {
                     name:legend[1],
                     type:'line',
                     stack: '总量',
                     label: {
                         normal: {
                             show: true,
                             position: 'top'
                         }
                     },
                     data:ds[1]
                 }
             ]
         };
         return option;
    }
}