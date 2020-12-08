<!--<template>-->
<!--  <div>-->
<!--    <div id="myChart" :style="{width: '100%', height: '500px'}"></div>-->
<!--    <Zhejiang :province_name_EN='province_name_EN' :province_name_CN='province_name_CN' ref="zhejiang"></Zhejiang>-->
<!--  </div>-->

<!--</template>-->

<!--<script>-->
<!--  import  axios from 'axios'-->
<!--  import Zhejiang from "./provinces/Zhejiang";-->

<!--  var provinces = ['shanghai', 'hebei','shanxi','neimenggu','liaoning','jilin','heilongjiang','jiangsu','zhejiang','anhui','fujian','jiangxi','shandong','henan','hubei','hunan','guangdong','guangxi','hainan','sichuan','guizhou','yunnan','xizang','shanxi1','gansu','qinghai','ningxia','xinjiang', 'beijing', 'tianjin', 'chongqing', 'xianggang', 'aomen', 'taiwan'];-->
<!--  var provincesText = ['上海', '河北', '山西', '内蒙古', '辽宁', '吉林','黑龙江',  '江苏', '浙江', '安徽', '福建', '江西', '山东','河南', '湖北', '湖南', '广东', '广西', '海南', '四川', '贵州', '云南', '西藏', '陕西', '甘肃', '青海', '宁夏', '新疆', '北京', '天津', '重庆', '香港', '澳门', '台湾'];-->

<!--    export default {-->
<!--      name: "China",-->
<!--      components: {Zhejiang},-->
<!--      data(){-->
<!--        return {-->
<!--          mydata: [],-->
<!--          province_name_CN: '浙江',-->
<!--          province_name_EN: 'zhejiang',-->
<!--        }-->
<!--      },-->
<!--      mounted() {-->
<!--        this.drawLine()-->
<!--        },-->
<!--      created() {-->
<!--        this.getProvinceData()-->
<!--        },-->
<!--      methods: {-->
<!--        toProvince(param){-->
<!--          console.log(param)-->

<!--          var province_name_CN = param.name-->

<!--          if(province_name_CN == '台湾' || province_name_CN == '南海诸岛'){-->
<!--            alert('当前地区暂不支持')-->
<!--            return-->
<!--          }-->

<!--          var province_index = provincesText.findIndex(x => {-->
<!--            return province_name_CN === x-->
<!--          })-->
<!--          var province_name_EN = provinces[province_index]-->
<!--          console.log('当前省份为 '+province_name_CN+' 全拼为 '+province_name_EN)-->
<!--          this.province_name_CN = province_name_CN-->
<!--          this.province_name_EN = province_name_EN-->

<!--          this.$refs.zhejiang.setOptions1(province_name_CN)-->
<!--        },-->
<!--        drawLine() {-->
<!--          // 基于准备好的dom，初始化echarts实例-->
<!--          let myChart = this.$echarts.init(document.getElementById('myChart'))-->
<!--          let that = this-->
<!--          // 绘制图表-->
<!--          myChart.setOption({-->
<!--            backgroundColor: '#fff',-->
<!--            title: {-->
<!--              text: '中国新冠肺炎疫情地图',-->
<!--              subtext: '中国各省份现有确诊病例',-->
<!--            },-->
<!--            tooltip: {-->
<!--              trigger: 'item',-->
<!--              formatter: '地区:{b}<br>现有:{c} '-->
<!--            },-->
<!--            toolbox: {-->
<!--                show: true,-->
<!--                orient: 'vertical',-->
<!--                left: 'right',-->
<!--                top: 'center',-->
<!--                feature: {-->
<!--                    dataView: {readOnly: true},-->
<!--                    saveAsImage: {}-->
<!--                }-->
<!--            },-->
<!--            visualMap: [{-->
<!--              max: 500,-->
<!--              min: 0,-->
<!--              show: false,-->
<!--              text: ['高', '低'],-->
<!--              realtime: false,-->
<!--              calculable: false,-->
<!--              itemHeight: '200',-->
<!--              inverse: true, // 翻转-->
<!--              orient: 'horizontal',-->
<!--              inRange: {-->
<!--                // color: ['#DDDDDD', '#026FDD']-->
<!--                color: ['#dddddd', '#f3070a'],-->
<!--              }-->
<!--            },{-->
<!--              type: 'piecewise',-->
<!--              max: 500,-->
<!--              min: 0,-->
<!--              realtime: false,-->
<!--              calculable: false,-->
<!--              itemHeight: '15',-->
<!--              itemWeight: '10',-->
<!--              inverse: false, // 翻转-->
<!--              orient: 'vertical',-->
<!--              inRange: {-->
<!--                // color: ['#DDDDDD', '#026FDD']-->
<!--                color: ['#efefef', '#f3070a'],-->
<!--              },-->
<!--              pieces: [-->
<!--                {min: 101, max: 999, label: '> 101'}, // 不指定 max，表示 max 为无限大（Infinity）。-->
<!--                {min: 51, max: 100},-->
<!--                {min: 21, max: 50},-->
<!--                {min: 11, max: 20, label: '11 - 20'},-->
<!--                {min: 1, max: 10},-->
<!--                {value: 0, label: '0', color:'#ffffff'}, // 表示 value 等于 123 的情况。-->
<!--              ],-->
<!--              showLabel: true,-->
<!--          }],-->
<!--            series: [-->
<!--              {-->
<!--                name: '中国各省份现有确诊病例数据统计',-->
<!--                type: 'map',-->
<!--                mapType: 'china', // 自定义扩展图表类型-->
<!--                roam: false,-->
<!--                itemStyle: {-->
<!--                  normal: { label: { show: true }, areaColor: '#ffffff' },-->
<!--                  emphasis: { label: { show: true, fontWeight: 'bold', color: '#333'}, areaColor: '#f3f6f8' },-->
<!--                },-->
<!--                data: this.mydata-->
<!--              }-->
<!--            ]-->
<!--          })-->

<!--          myChart.on('click', function(param) {-->
<!--            // event.stopPropagation()-->
<!--            that.toProvince(param)-->
<!--          })-->
<!--        },-->

<!--        getProvinceData() {-->
<!--          var that = this-->
<!--          var data = []-->

<!--          axios.get('http://localhost:5000/getProvinceData').then( (res) => {-->
<!--            console.log(res.data)-->
<!--            let provinceData = res.data-->
<!--            for(var item in provinceData){-->
<!--              // console.log(item + " " + provinceData[item])-->
<!--              var province = {name: item, value: provinceData[item]}-->
<!--              data.push(province)-->
<!--            }-->
<!--          } ).then( (res) =>{-->
<!--              this.mydata = data-->
<!--              console.log('数据获取完成')-->
<!--              this.drawLine()-->
<!--              // console.log(data)-->
<!--          })-->
<!--        },-->
<!--      }-->
<!--    }-->
<!--</script>-->

<!--<style scoped>-->

<!--</style>-->
