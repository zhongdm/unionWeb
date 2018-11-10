<template>
    <div class="list-detail">
        <div class="tip-success">
            <template v-if="bxStatus === 0">
                <img src="../assets/img/ready.png" alt="投保中图片">
                <span class="tip-text tip-text-ing">投保中</span>
            </template>
            <template v-if="bxStatus === 1">
                <img src="../assets/img/success.png" alt="投保成功图片">
                <span class="tip-text tip-text-success">投保成功</span>
            </template>
            <template v-if="bxStatus === 2">
                <img src="../assets/img/fail.png" alt="投保失败图片">
                <span class="tip-text tip-text-failure">投保失败</span>
            </template>
        </div>
        <div class="btn-group" v-if="bxStatus === 0">
            <mt-button @click.native="queryInfo" size="large" plain>刷新
                <!-- <img src="../assets/img/refresh.png" height="20" width="20" slot="icon"> -->
            </mt-button>
        </div>
        <div class="order-list" v-if="bxStatus === 1">
            <div class="list-content">
                您好！您已成功领取航空延误险权限，保单号为{{dataList.bxNo}}，您可以登录中银保险有限公司电子商务平台网站
                <a href="http://e.bocins.com" target="_blank">http://e.bocins.com</a>，进入“客户服务区”——“意健险保单查询和下载”查询并下载电子保单和保险条款。
            </div>
        </div>
    </div>
</template>

<script>
import { queryInfoById } from './api/api'
import { MessageBox, Toast } from 'mint-ui'

export default {
    name: 'InsureStatus',
    data () {
        return {
            dataList: [],
            // bxStatus: -1 
        }
    },
    computed: {
        bxStatus: {
        // 0:未开始，1:成功， 2:失败
            get () {
                return this.dataList.bxStatus
            },
            set (val) {

            }
        }
    },
    mounted () {
        this.queryInfo()
    },
    methods: {
        queryInfo (ii) {
            let _url = window.location.href
            let id = _url.split('?')[1].replace(/id=/, '')
            queryInfoById({
                id: id
            }).then(res => {
                if (res.data.code === 200) {
                    this.dataList = res.data.data
                    let data = res.data.data
                    if (data.bxStatus === null || data.bxStatus === '') {
                        // 投保未开始
                        this.dataList.bxStatus = 0
                    } else if (data.bxStatus === 'SUCCESS') {
                        this.dataList.bxStatus = 1
                    } else {
                        this.dataList.bxStatus = 2
                    }
                }
            }).catch(error => {
                Toast({
                    title: "提示",
                    message: '购买失败'
                })
                console.log(error)
            })
        }
    }
}
</script>


<style lang="less" scoped>
body {
    background: #8bf1c93b;
}
.list-detail {
    padding: 20px;
    .tip-success {
        margin: 30px auto;
        img {
            width: .6rem;
            display: block;
            margin: 0 auto;
        }
        .tip-text {
            display: block;
            margin: 10px auto;
            text-align: center;
            font-size: .2rem;
        }
        // .tip-text-ing {
        //     color: #00f5a1;
        // }
        .tip-text-success {
            color: #00c051;
        }
        .tip-text-failure {
            color: red;
        }
    }
    .order-list {
        font-size: .19rem;
        line-height: .33rem;
        margin-top: 50px;
        padding: 0 25px;
        .field-group {
            padding: 5px 0;
        }
    }
    .btn-group {
        text-align: center;
        position: fixed;
        top: 60%;
        left: 20px;
        right: 20px;
    }
}
    
</style>