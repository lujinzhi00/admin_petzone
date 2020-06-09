<template>
    <div class="dashboard-container">
        <el-row>
            <el-col :span="12"
                style="height: 300px;"
                id="member">
            </el-col>
            <el-col :span="12"
                id="acts"
                style="height: 300px;">
            </el-col>
        </el-row>
        <el-row class="enter-container">
            <el-col :span="6">
                <div class="enter"
                    @click="gotoUrl('/user/index')">
                    <div class="img">
                        <svg-icon icon-class="admin-manage"></svg-icon>
                    </div>
                    <div class="text">
                        <div class="number">{{enter.user}}</div>
                        <div class="title">会员数量</div>
                    </div>
                </div>
            </el-col>
            <el-col :span="6">
                <div class="enter"
                    @click="gotoUrl('/serv/index')">
                    <div class="img">
                        <svg-icon icon-class="product"></svg-icon>
                    </div>
                    <div class="text">
                        <div class="number">{{enter.serv}}</div>
                        <div class="title">服务数量</div>
                    </div>
                </div>
            </el-col>
            <el-col :span="6">
                <div class="enter"
                    @click="gotoUrl('/order/list')">
                    <div class="img">
                        <svg-icon icon-class="order"></svg-icon>
                    </div>
                    <div class="text">
                        <div class="number">{{enter.order}}</div>
                        <div class="title">订单数量</div>
                    </div>
                </div>
            </el-col>
            <el-col :span="6">
                <div class="enter"
                    @click="gotoUrl('/activity/index')">
                    <div class="img">
                        <svg-icon icon-class="system"></svg-icon>
                    </div>
                    <div class="text">
                        <div class="number">{{enter.activity}}</div>
                        <div class="title">活动数量</div>
                    </div>
                </div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24"
                id="order"
                style="height: 300px;">

            </el-col>
        </el-row>
    </div>
</template>

<script>
import echarts from 'echarts'
import {memberCharts, salesCharts, sysInfo, orderInfo } from '@/api/dashboard'
export default {
    name: 'dashboard',
    data() {
        return {
            echarts1: null,
            echarts2: null,
            echarts3: null,
            enter: [],
        }
    },
    created() {
        this.$nextTick(() => {
            this.initChart1()
            this.initChart2()
            this.initChart3()
        })
    },
    mounted() {
        this.$nextTick(() => {
            this._getData1()
            this._getData2()
            this._getData3()
            this._getData9()
        })
    },
    methods: {
        gotoUrl(url) {
            this.$router.push(url)
        },
        initChart1() {
            this.echarts1 = echarts.init(document.getElementById('member'))
            this.echarts1.setOption({
                title: {
                    x: 'center',
                    text: '销售数量'
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                        type: 'line'        // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                xAxis: {
                    type: 'category',
                    data: [],
                    axisTick: {
                        alignWithLabel: true
                    }
                },
                yAxis: {
                    type: 'value',
                    name:'订单数',
                     max: 50,
                    min: 0,
                    boundaryGap: [0.2, 0.2]
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                series: [{
                    data: [],
                    type: 'line',
                    areaStyle: {}
                }]
            })
        },
        initChart2() {
            this.echarts2 = echarts.init(document.getElementById('acts'))
            this.echarts2.setOption({
                title: {
                    x: 'center',
                    text: '活动统计',
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                        type: 'line'        // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                xAxis: [
                    {
                        type: 'category',
                        data: [],
                    }
                ],
                yAxis: {
                    max: 50,
                    min: 0,
                    boundaryGap: [0.2, 0.2]
                },
                series: [
                    
                ]
            })
        },
        initChart3() {
            this.echarts3 = echarts.init(document.getElementById('order'))
            this.echarts3.setOption({
                title: {
                    x: 'center',
                    text: '订单状态'
                },
                legend: {
                    data: ['取消订单', '进行中', '已完成', '订单超时'],
                    x: 'right'
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                xAxis: {
                    type: 'category',
                    data: [],
                    axisTick: {
                        alignWithLabel: true
                    }
                },
                yAxis: {
                    type: 'value'
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                series: [],
                animationEasing: 'elasticOut',
                animationDelayUpdate(idx) {
                    return idx * 4
                }
            })
        },
        _getData1() {
            this.echarts1.showLoading()
            salesCharts().then(res => {
                this.echarts1.setOption({
                    xAxis: { data: res.data.time },
                    series: [{ data: res.data.data }]
                })
                this.echarts1.hideLoading()
            }).catch(err => {
                console.log(err)
            })
        },
        _getData2() {
            this.echarts2.showLoading()
           memberCharts().then(res => {
                var xdata =new Array();
                var ydata = new Array();
                for(var i=0;i<res.data.length;i++)
                {
                    xdata.push(res.data[i].title)
                    ydata.push(res.data[i].count)
                }
                this.echarts2.setOption({
                    xAxis: { data: xdata},
                    series: [{ data: ydata, type: 'bar', barWidth:30 }]
                })
                this.echarts2.hideLoading()
            }).catch(err => {
                console.log(err)
            })
        },
        _getData3() {
            this.echarts3.showLoading()
            orderInfo().then(res => {
                this.echarts3.setOption({
                    xAxis: { data: res.data.time },
                    yAxis:{
                    type: 'value',
                    min:0,
                    max:30
  
                    },
                    series: [
                        {
                            data: res.data.cancel,
                            type: 'bar',
                            name: '取消订单',
                            animationDelay(idx) {
                                return idx * 10
                            }
                        }, {
                            data: res.data.on,
                            type: 'bar',
                            name: '进行中',
                            animationDelay(idx) {
                                return idx * 10 + 100
                            }
                        }, {
                            data: res.data.finish,
                            type: 'bar',
                            name: '已完成',
                            animationDelay(idx) {
                                return idx * 10 + 200
                            }
                        }, {
                            data: res.data.out,
                            type: 'bar',
                            name: '订单超时',
                            animationDelay(idx) {
                                return idx * 10 + 300
                            }
                        }]
                })
                this.echarts3.hideLoading()
            }).catch(err => {
                console.log(err)
            })
        },
        _getData9() {
            sysInfo().then(res => {
                this.enter = res.data
            }).catch(err => {
                console.log(err)
            })
        },
    },
    beforeDestroy() {
        // if (!this.echarts1) {
        //     return
        // }
        // this.echarts1.dispose()
        // this.echarts1 = null
        // this.echarts2.dispose()
        // this.echarts2 = null
        // this.echarts3.dispose()
        // this.echarts3 = null
        // this.echarts4.dispose()
        // this.echarts4 = null
        // this.echarts5.dispose()
        // this.echarts5 = null
        // this.echarts6.dispose()
        // this.echarts6 = null
        // this.echarts7.dispose()
        // this.echarts7 = null
        // this.echarts8.dispose()
        // this.echarts8 = null
    },
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
    &-container {
        margin: 30px;
        .enter-container {
            margin: 30px 0;
            .enter {
                display: flex;
                justify-content: space-between;
                align-items: center;
                background-color: #fff;
                margin: 10px 30px;
                box-shadow: 0 0 3px #000;
                .img {
                    background: #2ec7c9;
                    border-right: 1px solid #fff;
                    svg {
                        width: 30px;
                        height: 30px;
                        margin: 30px;
                        fill: #fff;
                    }
                }
                .text {
                    flex: 1;
                    text-align: center;
                    .number {
                        font-size: 30px;
                    }
                    .time {
                        font-size: 15px;
                    }
                    .title {
                        color: #ccc;
                    }
                }
                &:hover {
                    background-color: #7cbdbc;
                    color: #fff;
                    .img {
                        background-color: #7cbdbc;
                        // svg {
                        //     fill: #2ec7c9;
                        // }
                    }
                    .title {
                        color: #fff;
                    }
                }
            }
        }
    }
    &-text {
        font-size: 30px;
        line-height: 46px;
    }
}
</style>
