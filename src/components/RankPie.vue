<template>

  <div>
    <div id="rank" style="width: 100%;height: 300px"></div>
  </div>

</template>

<script>
  import  axios from "axios"
  import echarts from "echarts"
    export default {
      name: "Rank",
      data(){
        return {
          countriesSortedByConfirmedCount: []
        }
      },
      mounted() {
        this.$nextTick(()=>{
          this.getRank()
        })
      },
      methods: {
        initChart(){
          var chartDom = document.getElementById('rank')
          var myChart = echarts.init(chartDom)
          var option

          option = {
            title: {
              text: '各国累计确诊占比',
              subtext: '前50个国家'
            },
            tooltip: {
              trigger: 'item',
              formatter: "{a} <br/>{b}：{c}人 <br/>占比：{d}%",
              textStyle:{
                align:'left'
              }
            },
            legend: {
              top: '5%',
              left: 'right',
              orient: 'vertical',
              type: 'scroll'
            },
            series: [
              {
                name: '累计确诊',
                type: 'pie',
                radius: ['40%', '70%'],
                avoidLabelOverlap: false,
                label: {
                  show: false,
                  position: 'center'
                },
                emphasis: {
                  label: {
                    show: true,
                    fontSize: '40',
                    fontWeight: 'bold'
                  }
                },
                labelLine: {
                  show: false
                },
                data: this.countriesSortedByConfirmedCount
              }
            ]
          };

          option && myChart.setOption(option)
        },
        getRank() {
          var that = this
          var countryList = []
          axios.get('http://111.231.75.86:8000/api/countries/').then( (res)=>{
            // console.log(res)
            for(let i=0;i<res.data.length;i++){
              let countryName = res.data[i].countryName
              let confirmedCount = res.data[i].confirmedCount
              let currentConfirmedCount = res.data[i].currentConfirmedCount
              let country = {'name':countryName,'value':confirmedCount}
              countryList.push(country)
            }
            countryList.sort(that.sortConfirmedCount)
            this.countriesSortedByConfirmedCount = countryList.slice(0,50)
            console.log(this.countriesSortedByConfirmedCount)
            that.initChart()
          } )
        },
        sortConfirmedCount(a,b){
          return b.value - a.value
        }
      }
    }
</script>

<style scoped>

</style>
