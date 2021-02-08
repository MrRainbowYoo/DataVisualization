<template>

  <div>
<!--    <input type="text" v-model="value">-->
    <el-select v-model="value" placeholder="中国" style="position: absolute;left:10px;top: -50px">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <div id="main" style="width: 100%;height:300px;">
    </div>
  </div>

</template>

<script>

  import axios from 'axios'
  import echarts from "echarts";

    export default {
      name: "TimeLine",
      data(){
        return{
          confirmedCount: [],
          dateId: [],
          currentConfirmedCount: [],
          deadCount: [],
          curedCount: [],

          options: [{
            value: 'CHN',
            label: '中国'
          }, {
            value: 'USA',
            label: '美国'
          }, {
            value: 'IND',
            label: '印度'
          }, {
            value: 'BRA',
            label: '巴西'
          }, {
            value: 'RUS',
            label: '俄罗斯'
          }, {
            value: 'GBR',
            label: '英国'
          }],
          value: ''
        }
      },
      created() {
      },
      mounted() {
        this.$nextTick(() => {
          this.getData('CHN')
          // this.drawLine()
        });
      },
      updated() {
        this.getData(this.value)
      },
      methods: {
        drawLine(){
          var chartDom = document.getElementById('main');
          var myChart = echarts.init(chartDom);
          let option;
          option = {
            title: {
              text: '中国疫情趋势图',
              left: '10'
            },
            xAxis: {
              type: 'category',
              data: this.dateId,
            },
            yAxis: {
              type: 'value',
              name: '人数'
            },
            dataZoom:[{
              type: 'slider',//图表下方的伸缩条
              show : true, //是否显示
              realtime : true, //拖动时，是否实时更新系列的视图
              // start : 0, //伸缩条开始位置（1-100），可以随时更改
              // end : 100, //伸缩条结束位置（1-100），可以随时更改
            }],
            legend: {
              data: ['累计确诊', '现有确诊', '死亡人数','治愈人数']
            },
            series: [{
              data: this.confirmedCount,
              type: 'line',
              name: '累计确诊',
              smooth: true,
              // itemStyle : { normal: {label : {show: true}}}
            },{
              data: this.currentConfirmedCount,
              type: 'line',
              name: '现有确诊',
              smooth: true,
            },{
              data: this.deadCount,
              type: 'line',
              name: '死亡人数',
              smooth: true,
            },{
              data: this.curedCount,
              type: 'line',
              name: '治愈人数',
              smooth: true,
            }],
            tooltip : {
              trigger: 'axis',
              axisPointer: {
                type: 'cross',
                label: {
                  backgroundColor: '#6a7985',
                },
              },
              textStyle:{
                align:'left'
              }
            },
            toolbox: {
              feature: {
                saveAsImage: {show: true},
              },
              right: 120,
            },
          };
          switch (this.value) {
            case "CHN":
              option.title.text = '中国疫情趋势图'
                  break
            case "USA":
              option.title.text = '美国疫情趋势图'
              break
            case "IND":
              option.title.text = '印度疫情趋势图'
              break
            case "BRA":
              option.title.text = '巴西疫情趋势图'
              break
            case "RUS":
              option.title.text = '俄罗斯疫情趋势图'
              break
            case "GBR":
              option.title.text = '英国疫情趋势图'
              break
          }
          option && myChart.setOption(option);
        },
        getData(countryCode){
          axios.get('http://111.231.75.86:8000/api/countries/daily/?countryCodes='+countryCode).then( (res) => {
            // console.log(res)
            let len = res.data.length
            let confirmedCountList = []
            let dateIdList = []
            let currentConfirmedCountList = []
            let deadCountList = []
            let curedCountList = []

            for(let i=0;i<len;i++)
            {
              confirmedCountList.push(res.data[i].confirmedCount)
              dateIdList.push(res.data[i].dateId)
              currentConfirmedCountList.push(res.data[i].currentConfirmedCount)
              deadCountList.push(res.data[i].deadCount)
              curedCountList.push(res.data[i].curedCount)
            }
            this.confirmedCount = confirmedCountList
            this.dateId = dateIdList
            this.currentConfirmedCount = currentConfirmedCountList
            this.deadCount = deadCountList
            this.curedCount = curedCountList
            // console.log(this.confirmedCount)
            // console.log(this.dateId)
            this.drawLine()
          } )
        }
      }
    }
</script>

<style scoped>

</style>
