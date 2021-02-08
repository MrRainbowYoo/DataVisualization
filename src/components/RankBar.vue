<template>

  <div id="bar" style="width: 100%;height: 350px"></div>

</template>

<script>
  import axios from 'axios'
  import echarts from 'echarts'
    export default {
      name: "RankBar",
      data(){
        return {
          countryNames: [],
          count: []
        }
      },
      mounted() {
        this.$nextTick(()=>{
          this.getRank()
        })
      },
      methods: {
        initChart(){
          var chartDom = document.getElementById('bar')
          var myChart = echarts.init(chartDom)
          var option
          option = {
            title: {
              text: '现有确诊数排行前 10 位的国家',
              top: '5%',
              left: 10
            },
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'shadow'
              },
              textStyle: {
                align: 'left'
              },
              formatter: "{b}：{c}人",
            },
            grid: {
              // left: '3%',
              // right: '4%',
              // bottom: '3%',
              // containLabel: true,
            },

            xAxis: {
              type: 'value',
              boundaryGap: [0, 0.01]
            },
            yAxis: {
              type: 'category',
              data: this.countryNames.reverse()
            },
            series: [
              {
                type: 'bar',
                data: this.count.reverse()
              }
            ]
          };
          option && myChart.setOption(option)
        },
        getRank() {
          var that = this
          var countryList = []
          var countryNames = []
          var count = []
          axios.get('http://111.231.75.86:8000/api/countries/').then( (res)=>{
            // console.log(res)
            for(let i=0;i<res.data.length;i++){
              let countryName = res.data[i].countryName
              let currentConfirmedCount = res.data[i].currentConfirmedCount
              let country = {'name':countryName,'value':currentConfirmedCount}
              countryList.push(country)
            }
            countryList.sort(that.sortCurrentConfirmedCount)

            countryList = countryList.slice(0,10)
            for(let i=0;i<countryList.length;i++){
              countryNames.push(countryList[i].name)
              count.push(countryList[i].value)
            }
            that.countryNames = countryNames
            that.count = count
            // console.log(that.countryNames,that.count)
            that.initChart()
          } )
        },
        sortCurrentConfirmedCount(a,b){
          return b.value - a.value
        }
      }
    }
</script>

<style scoped>

</style>
