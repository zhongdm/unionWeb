<template>
    <div class="inner-container">
        <div class="section-part" v-for="(item, index) in historyList" :key="index">
            <p class="header">
                <span>保单号：{{item.bxNo}}</span>
                <label for="" class="status" :class="[item.bxStatus == 'SUCCESS' ? 'success' : 'fail']">{{item.bxStatus==='SUCCESS' ? '成功' : '失败'}}</label>
            </p>
            <div class="details">
                <div class="field">
                    <label for="">投保人：</label>
                    <span>{{item.userName}}</span>
                </div>
                <div class="field">
                    <label for="">保险起始日期：</label>
                    <span>{{item.takeoffTime}}</span>
                </div>
                <div class="field">
                    <label for="">保险终止日期：</label>
                    <span>{{item.arrivalTime}}</span>
                </div>
                <div class="field">
                    <label for="">投保航班</label>
                    <span>{{item.flightNumber}}</span>
                </div>
                <div class="field">
                    <label for="">投保日期：</label>
                    <span>{{item.createTime}}</span>
                </div>
            </div>
        </div>
        <div v-if="isNoData" class="no-content">
            什么都没有～～
        </div>
    </div>
</template>

<script>
import { queryInsureHistory } from './api/api'
import axios from 'axios'
export default {
    data () {
        return {
            historyList: [],
            isNoData: false
        }
    },
    mounted () {
        const { cardId } = this.$route.query
        
        queryInsureHistory({cardId: cardId}).then(res => {
            if(res.data.code == 200) {
                console.log('success')
                if (res.data.data.length > 0) {
                    this.historyList = res.data.data
                } else {
                    this.isNoData = true
                }
                
            } else {
                console.log('fail')
                this.isNoData = true
            }
        }).catch(error => {
            console.log(error)
            this.isNoData = true
        })
    }
}
</script>

<style lang="less" scoped>
@green: green;
@red: red;
.inner-container {
    background-color: rgb(241, 242, 244);
    .section-part {
        margin-bottom: 6px;
        padding: 0 .2rem;
        background-color: #fff;
        .header {
            color: #999;
            position: relative;
            padding: 10px 0;
            border-bottom: 2px solid rgb(241, 242, 244);
            .status {
                position: absolute;
                right: 0;
            }
            .success {
                color: @green;
            }
            .fail {
                color: @red;
            }
            
        }
        .details {
            padding: 10px 0;
            .field {
                margin: 5px 0;
                span {
                    color: #999;
                }
            }
        }
    }
    .no-content {
        margin-top: 40px;
        position: fixed;
        width: 100%;
        text-align: center;
    }
}
</style>
