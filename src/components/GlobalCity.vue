<template>
    <div class="picker-container" id="globalCity">
        <!-- <mt-field id="customInput" placeholder="请输入城市" v-model="selectedCity"></mt-field> -->
        <mt-navbar v-model="active" @click.native="changeTab">
            <mt-tab-item id="1">国内城市</mt-tab-item>
            <mt-tab-item id="2">国际/港澳台</mt-tab-item>
        </mt-navbar>
        <mt-tab-container v-model="active">
            <mt-tab-container-item id="1" v-if="active==='1'">
                <!-- <mt-cell v-for="n in 10" title="tab-container 1" :key="n"></mt-cell> -->
                <!-- <div class="fixed-city"> -->
                    <!-- <mt-cell> -->
                    <city
                        :is-show.sync='city.isShow'
                        :on-choose='city.onChoose'
                        :city-data='city.cityData'
                        :local-city='city.localCity'
                        :star-city='city.starCity'
                        :close="close"
                    ></city>
                    <!-- </mt-cell> -->
                <!-- </div> -->
            </mt-tab-container-item>
            <mt-tab-container-item id="2" v-if="active==='2'">
                 <city
                        :is-show.sync='foreignCity.isShow'
                        :on-choose='foreignCity.onChoose'
                        :city-data='foreignCity.cityData'
                        :local-city='foreignCity.localCity'
                        :star-city='foreignCity.starCity'
                        :close="close"
                    ></city>
            </mt-tab-container-item>
        </mt-tab-container>
    </div>
</template>

<script>
import city from 'vue-city'
import homeCityData from '../common/internal.js'
import foreignCity from '../common/foreign.js'

export default {
    data(){
        return {
            active: '1',
            selectedCity: '',
            city: {
                isShow: true,
                cityData: [],
                onChoose: null,
                localCity: {},
                starCity: []
            },
            foreignCity: {
                isShow: true,
                cityData: [],
                onChoose: null,
                localCity: {},
                starCity: []
            }
        }
    },
    name: 'GlobalCity',
    components: {
        city
    },
    mounted() {
        let _this = this;
            this.getCityInfo();
            this.city.onChoose = function(res){
                _this.city.isShow = false;
                _this.$emit('get-value', res.cityName)
            }
            this.foreignCity.onChoose = function(res){
                _this.city.isShow = false;
                _this.$emit('get-value', res.cityName)
            }
    },
    watch: {
        selectedCity(val, oldVal){
            let insetInput = document.getElementsByClassName('xin-widget-citys-iptbox')[0].childNodes[0]
            insetInput.value = val
            insetInput.onInput = function(){

            }
            this.$nextTick(function(){
                insetInput.focus()
            })
            
            // insetInput.blur()
            let cus = document.getElementById('customInput').getElementsByClassName('mint-field-core')[0]
            cus.focus()
        }
    },
    methods: {
        getCityInfo: function(){
            let _this = this
            if (this.active === '1') {
            // this.city.cityData = homeCityData;
                    import(/* webpackChunkName: "internal" */ '../common/internal.js').then(res => {
                        _this.city.cityData = res.default
                    })

            } else {
                    import(/* webpackChunkName: "foreign" */ '../common/foreign.js').then(res => {
                        _this.foreignCity.cityData = res.default
                    })
                    // _this.foreignCity.cityData = require('../common/foreign.js').default
            // this.foreignCity.cityData = foreignCity;
            }
        },
        close(){
            this.$emit('get-value', '')
        },
        changeTab (v) {
            this.getCityInfo()
        }
    }
}
</script>

<style lang="less" scoped>
@green: rgba(58,172,110,1);
    .picker-container {
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        z-index: 8888;
        background: #fff;
    }
    .mint-navbar{
        position: fixed;
        // top: 38px;
        width: 100%;
        z-index: 11000;
        a {
            color: @green;
        }
        .mint-tab-item.is-selected {
            color: @green;
            border-bottom: 3px solid @green;
            margin-bottom: 0;
        }
    }
/deep/ .xin-widget-citys {
    // top: 88px!important;
    top: 50px!important;
    margin: 0!important;
    background: transparent!important;
    z-index: 1000;
}
/deep/ .xin-widget-citys-letnav {
        top: 110px!important;
}
/deep/ .xin-widget-citys .xin-widget-citys-content .xin-widget-citys-header a {
    line-height: 38px!important;
}
/deep/ .xin-widget-citys .xin-widget-citys-content .xin-widget-citys-header .xin-widget-citys-iptbox input {
    line-height: 38px!important;
}
/deep/ .xin-widget-citys .xin-widget-citys-content .xin-widget-citys-header {
        position: fixed!important;
        top: 0;
        width: 100%;
        height: 38px!important;
        line-height: 38px;
        // TODO：
        z-index: 2100;
}

/deep/ .xin-widget-citys .xin-widget-citys-content .xin-widget-citys-local {
    display: none!important;
}
// /deep/ .xin-widget-citys .xin-widget-citys-content .xin-widget-citys-list {
//     margin-top: 86px;
// }
</style>
