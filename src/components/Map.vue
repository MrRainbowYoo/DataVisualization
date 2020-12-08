<template>
  <div class="content row-flex-start" style="min-width:1000px;ovorflow-x:auto;" v-loading.fullscreen.lock="fullscreenLoading">
    <div class="left_map" id="left_map"  @click="showChinaMap"></div>
    <div class="right_opetate row-center" id="right_opetate"></div>
<!--    <el-button-->
<!--      type="primary"-->
<!--      @click="openFullScreen1"-->
<!--      v-loading.fullscreen.lock="fullscreenLoading">-->
<!--      指令方式-->
<!--    </el-button>-->
  </div>
</template>

<script>
  import echarts from "echarts";
  import china from 'echarts/map/json/china.json'
  import axios from 'axios'
  echarts.registerMap('china', china)
  var provinces = ['shanghai', 'hebei','shanxi','neimenggu','liaoning','jilin','heilongjiang','jiangsu','zhejiang','anhui','fujian','jiangxi','shandong','henan','hubei','hunan','guangdong','guangxi','hainan','sichuan','guizhou','yunnan','xizang','shanxi1','gansu','qinghai','ningxia','xinjiang', 'beijing', 'tianjin', 'chongqing', 'xianggang', 'aomen', 'taiwan'];
  var provincesText = ['上海', '河北', '山西', '内蒙古', '辽宁', '吉林','黑龙江',  '江苏', '浙江', '安徽', '福建', '江西', '山东','河南', '湖北', '湖南', '广东', '广西', '海南', '四川', '贵州', '云南', '西藏', '陕西', '甘肃', '青海', '宁夏', '新疆', '北京', '天津', '重庆', '香港', '澳门', '台湾'];
  export default {
    created() {
      // this.cityOpt = cityName;
      this.getProvinceData()
    },
    mounted() {
      this.$nextTick(() => {
        this.initMap();
      });
    },
    data() {
      return {
        map :{},
        cityOpt: [],
        mapForm: {},
        mapData: [],
        CityData: [],
        mapOpt: [],

        fullscreenLoading: false,
        outNum : ''
      };
    },
    props: {},
    methods: {
      openFullScreen1() {
        this.fullscreenLoading = true;
        setTimeout(() => {
          this.fullscreenLoading = false;
        }, 2000);
      },
      getMapOpt(place) {
        let option = option = {
          backgroundColor: '',
          title: {
            text: "中国新冠肺炎疫情地图",
            subtext: '中国各省份现有确诊病例',
            left: "center"
          },
          tooltip: {
            trigger: 'item',
            formatter: '地区:{b}<br>现有:{c} '
          },
          toolbox: {
            show: true,
            orient: 'vertical',
            left: 'right',
            top: 'center',
            feature: {
              dataView: {readOnly: true},
              saveAsImage: {}
            }
          },
          visualMap: place?{
            type: 'piecewise',
            max: 500,
            min: 0,
            realtime: false,
            calculable: false,
            itemHeight: '15',
            itemWeight: '10',
            inverse: false, // 翻转
            orient: 'vertical',
            inRange: {
              // color: ['#DDDDDD', '#026FDD']
              color: ['#efefef', '#f3070a'],
            },
            pieces: [
              {min: 21, max: 100, label: '> 21'}, // 不指定 max，表示 max 为无限大（Infinity）。
              {min: 16, max: 20},
              {min: 11, max: 15},
              {min: 6, max: 10, label: '6 - 10'},
              {min: 1, max: 5},
              {value: 0, label: '0', color:'#ffffff'}, // 表示 value 等于 123 的情况。
            ],
            showLabel: true,
          }:{
            type: 'piecewise',
            max: 500,
            min: 0,
            realtime: false,
            calculable: false,
            itemHeight: '15',
            itemWeight: '10',
            inverse: false, // 翻转
            orient: 'vertical',
            inRange: {
              // color: ['#DDDDDD', '#026FDD']
              color: ['#efefef', '#f3070a'],
            },
            pieces: [
              {min: 101, max: 999, label: '> 101'}, // 不指定 max，表示 max 为无限大（Infinity）。
              {min: 51, max: 100},
              {min: 21, max: 50},
              {min: 11, max: 20, label: '11 - 20'},
              {min: 1, max: 10},
              {value: 0, label: '0', color:'#ffffff'}, // 表示 value 等于 123 的情况。
            ],
            showLabel: true,
          },
          geo: {
            map: place?place:'china',
            label: {
              normal: {
                show: true,
                color: '#000'
              },
              emphasis: {
                show: true,
                color: '#333',
                fontWeight: 20
              }
            },
            roam: true,
            itemStyle: {
              normal: {
                areaColor: '#ffffff',
                borderColor: '#111'
              },
              emphasis: {
                areaColor: '#f3f6f8'
              }
            }
          },
          series:place? [{
            name: '现有确诊病例数据统计',
            type: 'map',
            itemStyle: {
              normal: { label: { show: true }, areaColor: '#ffffff' },
              emphasis: { label: { show: true, fontWeight: 'bold', color: '#333'}, areaColor: '#f3f6f8' },
            },
            geoIndex: 0, // 不可缺少，否则无tooltip 指示效果
            data:this.CityData
          }]:[{
            name: '现有确诊病例数据统计',
            type: 'map',
            itemStyle: {
              normal: { label: { show: true }, areaColor: '#ffffff' },
              emphasis: { label: { show: true, fontWeight: 'bold', color: '#333'}, areaColor: '#f3f6f8' },
            },
            geoIndex: 0, // 不可缺少，否则无tooltip 指示效果
            data:this.mapData
          }]
        }
        return option
      },
      //显示中国地图
      showChinaMap(){
        this.outNum = ''
        let option = this.getMapOpt()
        option.title.text = '中国新冠肺炎疫情地图'
        this.map.setOption(option, true);
      },
      //显示各省地图
      getProvinceMapOpt(provinceAlphabet,provinceName){
        axios.get('static/province/'+provinceAlphabet+'.json').then((s)=>{
          echarts.registerMap(provinceAlphabet, s.data)
          let option = this.getMapOpt(provinceAlphabet)
          option.title.text = provinceName+'新冠肺炎疫情分布'
          if(this.outNum != '')
            option.title.text += "    境外输入："+this.outNum
          this.map.setOption(option, true);
          console.log('地图已加载')
        })
      },
      initMap() {
        this.openFullScreen1()
        var dom = document.getElementById("left_map");
        this.map = echarts.init(dom);
        let option = this.getMapOpt()
        if (option && typeof option === "object") {
          this.map.setOption(option, true);
        }
        this.map.on('click', (param)=> {
          event.stopPropagation()// 阻止冒泡
          // 找到省份名
          let provinceIndex = provincesText.findIndex(x=>{
            return param.name ===x
          })
          if(provinceIndex===-1)return
          let provinceAlphabet = provinces[provinceIndex]

          if(param.name == '台湾' || param.name == '南海诸岛')
          {
            // alert("该地区暂不支持")
            this.$message.error('该地区暂不支持哦');
            return;
          }
          this.openFullScreen1()
          this.getCityData(param.name,provinceAlphabet)
          // 重新渲染各省份地图
          this.getProvinceMapOpt(provinceAlphabet,param.name)
        })
      },
      getProvinceData() {
        var that = this
        var data = []

        axios.get('http://localhost:5000/getProvinceData').then( (res) => {
          console.log(res.data)
          let provinceData = res.data
          for(var item in provinceData){
            // console.log(item + " " + provinceData[item])
            var province = {name: item, value: provinceData[item]}
            data.push(province)
          }
        } ).then( (res) =>{
          this.mapData = data
          console.log('数据获取完成')
          this.showChinaMap()
          // console.log(data)
        })
      },


      getCityData(province_name_CN,provinceAlphabet){
        var data = []
        var that = this
        axios.get('http://localhost:5000/getCityData/'+province_name_CN, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
          },
        }).then((res) =>{
          console.log(res)
          let CityData = res.data
          for(var item in CityData) {
            if(item == '境外输入')
              that.outNum = CityData[item]
            var city = {name: item, value: CityData[item]}
            data.push(city)
          }
        }).then((res) => {
          that.CityData = data
          console.log('市区数据获取完成')
          console.log(data)
          that.getProvinceMapOpt(provinceAlphabet,province_name_CN)
        })
      }
    },
    computed: {}
  };
</script>

<style>
  .left_map {
    width: 50%;
    height: 500px;
    margin: 0 auto;
    /*border: 1px solid #333333;*/
  }
  .right_opetate {
    flex: 1;
    height: 100%;
    /*background: #404a59*/
  }
  .map_form {
  }
</style>

