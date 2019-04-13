<template>
  <div class="home">
    <cube-scroll>
      <cube-slide class="adSlide" :data="adList">
        <cube-slide-item v-for="(item, index) in adList" :key="index">
          <a :href="item.url">
            <img :src="item.image" width="100%">
          </a>
        </cube-slide-item>
      </cube-slide>
      <div class="floor">
        <div class="floor-title">
          <img width="100%" src="//m.360buyimg.com/mobilecms/s750x80_jfs/t20863/125/519979559/24806/2e941d67/5b0fecc7N541bb0dd.png!q70.jpg.dpg">
        </div>
        <ul class="floor-graphic" v-if="floorList1">
          <li class="floor-graphic-item col04" v-for="(item, index) in floorList1" :key="index">
            <a :href="item.url" class="graphic-link">
              <div class="graphic-text">
                <strong class="graphic-tit linear_color">{{item.tit}}</strong>
                <p class="graphic-wz" style="color:#222">{{item.wz}}</p>
              </div>
              <div class="graphic-img">
                <img width="100%" :src="item.image">
              </div>
            </a>
          </li>
        </ul>
      </div>
      <div class="floor">
        <div class="floor-title">
          <img width="100%" src="//m.360buyimg.com/mobilecms/s750x80_jfs/t15526/56/2344102455/23273/d8e15d5a/5aa0dbc1Nefd2bd2a.png!q70.jpg.dpg">
        </div>
        <ul class="floor-graphic" v-if="floorList2">
          <li class="floor-graphic-item col02" v-for="(item, index) in floorList2" :key="index">
            <a :href="item.url" class="graphic-link">
              <div class="graphic-text">
                <strong class="graphic-tit" style="color: rgb(0, 0, 0);">{{item.tit}}</strong>
                <p class="graphic-wz" style="color:#FF5959">{{item.wz}}</p>
              </div>
              <div class="graphic-img">
                <img width="50%" :src="image" v-for="(image, index) in item.image" :key="index">
              </div>
            </a>
          </li>
        </ul>
      </div>
      <div class="floor">
        <div class="floor-title">
          <img width="100%" src="//m.360buyimg.com/mobilecms/s750x80_jfs/t19381/275/717008577/26686/e58b7ef4/5aa23f27Nfa6d6be3.png!q70.jpg.dpg">
        </div>
        <ul class="floor-graphic" v-if="floorList3">
          <li class="floor-graphic-item col02" v-for="(item, index) in floorList3" :key="index">
            <a :href="item.url" class="graphic-link horizontal">
              <div class="graphic-text">
                <strong class="graphic-tit">{{item.tit}}</strong>
                <p class="graphic-wz" style="color:#D663E1">{{item.wz}}</p>
              </div>
              <div class="graphic-img">
                <img width="100%" :src="item.image">
              </div>
            </a>
          </li>
        </ul>
      </div>
    </cube-scroll>
  </div>
</template>

<script type="text/ecmascript-6">
import { getAdvertising, getRecommend } from 'api/index.js'
import { ERR_OK } from 'api/config.js'

export default {
  data() {
    return {
      adList: [],
      floorList1: [],
      floorList2: [],
      floorList3: []
    }
  },
  created() {
    this._getAdvertising()
    this._getRecommend()
  },
  methods: {
    _getAdvertising() {
      getAdvertising().then(res => {
        if (res.errno === ERR_OK) {
          this.adList = res.data
        }
      })
    },
    _getRecommend() {
      getRecommend().then(res => {
        if (res.errno === ERR_OK) {
          this._formatRecommend(res.data)
        }
      })
    },
    _formatRecommend(data) {
      for (let i = 0; i < data.length; i++) {
        if (data[i].type === 0) {
          this.floorList1.push(data[i])
        } else if (data[i].type === 1) {
          this.floorList2.push(data[i])
        } else if (data[i].type === 2) {
          this.floorList3.push(data[i])
        }
      }
    }
  },
  components: {

  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.home
  position fixed
  top 0
  right 0
  bottom 45px
  left 0
  .floor
    .floor-title
      background #f6f6f6
    .floor-graphic
      display flex
      flex-wrap wrap
      .floor-graphic-item
        &.col04
          flex 0 0 25%
          width 25%
        &.col02
          flex 0 0 50%
          width 50%
          .graphic-img
            img
              box-sizing border-box
              padding .175rem
        .graphic-link
          display block
          border-right 1px solid #f5f5f5
          border-bottom 1px solid #f5f5f5
          padding .325rem
          &.horizontal
            overflow hidden
            .graphic-text, .graphic-img
              display inline-block
              vertical-align top
            .graphic-img
              float right
              width 5rem
          .graphic-text
            .graphic-tit
              line-height 1.125rem
              font-size .8rem
            .graphic-wz
              font-size .6rem
          .graphic-img
            box-sizing border-box
            padding .275rem .2rem 0
</style>
