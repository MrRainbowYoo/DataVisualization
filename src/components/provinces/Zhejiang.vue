<!--<template>-->
<!--  <div>-->
<!--    <div :id="id" class="o-echarts"></div>-->
<!--    <div style="float: right;opacity: 0">{{ province_name_CN+','+ province_name_EN}}</div>-->
<!--  </div>-->

<!--</template>-->

<!--<script>-->

<!--  import echarts from 'echarts';-->
<!--  import axios from 'axios';-->

<!--  export default {-->
<!--    name: 'Zhejiang',-->
<!--    props: {-->
<!--      'province_name_CN': String,-->
<!--      'province_name_EN': String,-->
<!--    },-->
<!--    data() {-->
<!--      return {-->
<!--        mydata: [],-->
<!--        id: 'echarts_' + new Date().getTime() + Math.floor(Math.random() * 1000),-->
<!--        echartObj: null,-->
<!--        option: {-->
<!--          title: {-->
<!--            text: '新冠肺炎疫情分布',-->
<!--            textStyle: {-->
<!--              fontSize: 18,-->
<!--            }-->
<!--          },-->
<!--          tooltip: {-->
<!--            trigger: 'item',-->
<!--            formatter: '地区:{b}<br>现有:{c} '-->
<!--          },-->
<!--          toolbox: {-->
<!--            show: true,-->
<!--            orient: 'vertical',-->
<!--            left: 'right',-->
<!--            top: 'center',-->
<!--            feature: {-->
<!--              dataView: {readOnly: true},-->
<!--              saveAsImage: {}-->
<!--            }-->
<!--          },-->
<!--          visualMap: {-->
<!--            type: 'piecewise',-->
<!--            max: 500,-->
<!--            min: 0,-->
<!--            realtime: false,-->
<!--            calculable: false,-->
<!--            itemHeight: '15',-->
<!--            itemWeight: '10',-->
<!--            inverse: false, // 翻转-->
<!--            orient: 'vertical',-->
<!--            inRange: {-->
<!--              // color: ['#DDDDDD', '#026FDD']-->
<!--              color: ['#efefef', '#f3070a'],-->
<!--            },-->
<!--            pieces: [-->
<!--              {min: 21, max: 100, label: '> 21'}, // 不指定 max，表示 max 为无限大（Infinity）。-->
<!--              {min: 16, max: 20},-->
<!--              {min: 11, max: 15},-->
<!--              {min: 6, max: 10, label: '6 - 10'},-->
<!--              {min: 1, max: 5},-->
<!--              {value: 0, label: '0', color:'#ffffff'}, // 表示 value 等于 123 的情况。-->
<!--            ],-->
<!--            showLabel: true,-->
<!--          },-->
<!--          geo: {-->
<!--            map: '',-->
<!--            label: {-->
<!--              normal: {-->
<!--                show: true,-->
<!--                color: '#000'-->
<!--              },-->
<!--              emphasis: {-->
<!--                show: true,-->
<!--                color: '#333',-->
<!--                fontWeight: 20-->
<!--              }-->
<!--            },-->
<!--            roam: true,-->
<!--            itemStyle: {-->
<!--              normal: {-->
<!--                areaColor: '#ffffff',-->
<!--              },-->
<!--              emphasis: {-->
<!--                areaColor: '#f3f6f8' // hover效果-->
<!--              }-->
<!--            },-->
<!--            left: '5%',-->
<!--            right: '5%',-->
<!--            top: '5%',-->
<!--            bottom: '5%'-->
<!--          },-->
<!--          series: [{-->
<!--            name: '现有确诊病例数据统计',-->
<!--            type: 'map',-->
<!--            geoIndex: 0, // 不可缺少，否则无tooltip 指示效果-->
<!--            data:[{name:'呼伦贝尔市',value:50}]-->
<!--          }]-->
<!--        }-->
<!--      };-->
<!--    },-->
<!--    mounted() {-->
<!--      this.begin()-->
<!--      // this.getCityData(this.province_name_CN)-->
<!--    },-->
<!--    updated() {-->
<!--      this.begin()-->
<!--      this.getCityData(this.province_name_CN)-->
<!--    },-->
<!--    methods: {-->
<!--      begin(){-->
<!--        this.echartObj = echarts.init(document.getElementById(this.id));-->

<!--        // var JSON = require('../../assets/provinces_json/'+this.province_name_EN+'.json')-->
<!--        echarts.registerMap(this.province_name_CN, JSON);-->
<!--        this.echartObj.setOption(this.getOptions(), true);-->

<!--        // window.addEventListener('resize', () => {-->
<!--        //   if (this.echartObj && this.echartObj.resize) {-->
<!--        //     this.echartObj.resize();-->
<!--        //   }-->
<!--        // });-->
<!--      },-->
<!--      setOptions1(name){-->
<!--        this.option.title.text = name+'新冠肺炎疫情分布'-->
<!--        this.option.geo.map = name-->
<!--        this.option.series[0].name = name+'现有确诊病例数据统计'-->
<!--      },-->
<!--      getOptions() {-->
<!--        this.option.series[0].data = this.mydata-->
<!--        return this.option;-->
<!--      },-->

<!--      getCityData(province_name_CN){-->
<!--        var data = []-->
<!--        var that = this-->
<!--        axios.get('http://localhost:5000/getCityData/'+province_name_CN, {-->
<!--          headers: {-->
<!--            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"-->
<!--          },-->
<!--        }).then((res) =>{-->
<!--          console.log(res)-->
<!--          let CityData = res.data-->
<!--          for(var item in CityData) {-->
<!--            var city = {name: item+'市', value: CityData[item]}-->
<!--            data.push(city)-->
<!--          }-->
<!--        }).then((res) => {-->
<!--          that.mydata = data-->
<!--          console.log('数据获取完成')-->
<!--          that.begin()-->
<!--          console.log(data)-->
<!--        })-->
<!--      }-->
<!--    }-->
<!--  };-->
<!--</script>-->
<!--<style scoped>-->
<!--  .o-echarts {-->
<!--    min-width: 667px;-->
<!--    min-height: 500px;-->
<!--    width: 667px;-->
<!--    height: 100%;-->
<!--    border: 1px solid #333;-->
<!--    margin: 0 auto;-->
<!--  }-->
<!--</style>-->
