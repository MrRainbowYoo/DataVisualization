<template>
  <div class="hello">
    <div class="wrap">
      <div class="head">
        <h2>疫情数据可视化</h2>
        <p>统计截至 {{ totalData.lastUpdateTime }}</p>
      </div>
      <div class="middle">
        <div class="data-wrap">
          <div class="databox left-top-angle f23a3b">
            <div class="data-add">较上日<span class="add-count f23a3b">+{{ totalData.nowConfirm_add }}</span></div>
            <div class="data-total f23a3b">{{ totalData.nowConfirm }}</div>
            <div class="data-title">现有确诊</div>
          </div>
          <div class="databox ca3f81">
            <div class="data-add">较上日<span class="add-count ca3f81">+{{ totalData.noInfect_add }}</span></div>
            <div class="data-total ca3f81">{{ totalData.noInfect}}</div>
            <div class="data-title">无症状感染者</div>
          </div>
          <div class="databox right-top-angle f05926">
            <div class="data-add">较上日<span class="add-count f05926">+{{ totalData.importedCase_add }}</span></div>
            <div class="data-total f05926">{{ totalData.importedCase }}</div>
            <div class="data-title">境外输入</div>
          </div>
          <div class="databox left-bottom-angle cc1e1e">
            <div class="data-add">较上日<span class="add-count cc1e1e">+{{ totalData.confirm_add }}</span></div>
            <div class="data-total cc1e1e">{{ totalData.confirm }}</div>
            <div class="data-title">累计确诊</div>
          </div>
          <div class="databox i78b50">
            <div class="data-add">较上日<span class="add-count i78b50">+{{ totalData.heal_add }}</span></div>
            <div class="data-total i78b50"> {{ totalData.heal }} </div>
            <div class="data-title">累计治愈</div>
          </div>
          <div class="databox right-bottom-angle e45a65">
            <div class="data-add">较上日<span class="add-count e45a65">+{{ totalData.dead_add }}</span></div>
            <div class="data-total e45a65">{{ totalData.dead }}</div>
            <div class="data-title">累计死亡</div>
          </div>
        </div>
      </div>
      <div class="map">
        <Map></Map>
      </div>
    </div>
  </div>
</template>

<script>
  import  axios from 'axios'
  import Map from "./Map";
export default {
  name: 'HelloWorld',
  components: {Map},
  data () {
    return {
      totalData: {},
    }
  },
  methods:{
    getData(){
      var that = this
      axios.get('http://localhost:5000/getData').then((res) => {
        // console.log(res.data)
        that.totalData = res.data
        console.log(that.totalData)
      })
    }
  },
  created() {
    this.getData()
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }
  .wrap {
    width: 80%;
    min-width: 850px;
    /*border: 1px solid #2c3e50;*/
    margin: 0 auto;
  }

  .wrap p{
    font-size: 14px;
  }

  .middle {
    width: 100%;
    margin-bottom: 20px;
  }

  .data-wrap {
    width: 60%;
    /*border: 1px solid #2c3e50;*/
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  .databox {
    margin: 5px;
    padding: 5px 0;
    /*border: 1px solid #ffee00;*/
    flex: 1;
    width: 30%;
    min-width: 30%;
    max-width: 33%;
    background-color: bisque;
  }

  .data-add {
    color: #7c7c7c;
    font-size: 20px;
    height: 30px;
    line-height: 30px;
  }

  .data-total {
    color: #f23a3b;
    font-size: 25px;
    font-weight: bold;
    height: 30px;
    line-height: 30px;
  }

  .data-title {
    color: #222;
    font-size: 20px;
    height: 30px;
    line-height: 30px;
  }

  .left-top-angle {
    border-radius: 10px 0 0 0;
  }

  .right-top-angle {
    border-radius: 0 10px 0 0;
  }

  .right-bottom-angle {
    border-radius: 0 0 10px 0;
  }

  .left-bottom-angle {
    border-radius: 0 0 0 10px;
  }

  .ca3f81 {
    color: #ca3f81;
    background-color: #faf2f6;
  }

  .f23a3b {
    color: #f23a3b;
    background-color: #fdf1f1;
  }

  .f05926 {
    color: #f05926;
    background-color: #fcf4f0;
  }

  .cc1e1e {
    color: #cc1e1e;
    background-color: #fdf1f1;
  }

  .i78b50 {
    color: #178b50;
    background-color: #f1f8f4;
  }

  .e45a65 {
    color: #4e5a65;
    background-color: #f3f6f8;
  }
</style>
