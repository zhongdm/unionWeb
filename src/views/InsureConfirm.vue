<template>
    <div class="inner-container">
        <div class="content">
            <h2 class="title">投保信息</h2>
            <div class="person-info part-div">
                <div class="field">
                    <label for="" class="label">投保人(同被保险人)姓名</label>
                    <span class="detail-info">{{formData.username}}</span>
                </div>
                <div class="field">
                    <label for="" class="label">证件号&nbsp;</label>
                    <span class="detail-info">{{formData.idNo}}</span>
                </div>
                <div class="field">
                    <label for="" class="label">手机号码</label>
                    <span class="detail-info">{{formData.mobile}}</span>
                </div>
                <div class="field">
                    <label for="" class="label">银行卡号</label>
                    <span class="detail-info">{{formData.bankCardNo}}</span>
                </div>
            </div>
            <div class="plane-info part-div">
                <div class="field">
                    <label for="" class="label">航班号&nbsp;</label>
                    <span class="detail-info">{{formData.planeNo}}</span>
                </div>
                <div class="field">
                    <label for="" class="label">起飞城市</label>
                    <span class="detail-info">{{formData.startCity}}</span>
                </div>
                <div class="field">
                    <label for="" class="label">起飞时间</label>
                    <span class="detail-info">{{formData.startTime}}</span>
                </div>
                <div class="field">
                    <label for="" class="label">到达城市</label>
                    <span class="detail-info">{{formData.endCity}}</span>
                </div>
                <div class="field">
                    <label for="" class="label">到达时间</label>
                    <span class="detail-info">{{formData.endTime}}</span>
                </div>
            </div>
        </div>
        <div class="footer">
            <p class="protocal checkbox">
                <input type="checkbox" id="protocal" name="protocal" checked/><i></i>
                <label for="protocal">我已查看并同意
                    <!-- <a href="javascript:void(0)" @click="readAffirms">保险条款</a> -->
                    <!-- 和 -->
                    <a href="javascript:void(0)" @click="readClause">投保须知</a>
                    和
                    <a href="javascript:void(0)" @click="insuranceInstruction">航空延误险保险说明</a>
                </label>
            </p>
            <div class="btn-group">
                <mt-button plain @click.native="backEdit">返回修改</mt-button>
                <mt-button type="primary" @click.native="purchase">确认购买</mt-button>
            </div>
        </div>
        <InsuranceClause :isVisible="isVisibleClause" @closeDialog="closeDialog"></InsuranceClause>
        <Affirms :isVisible="isVisibleAffirms" @closeDialog="closeDialog"></Affirms>
        <InsuranceInstruction :isVisible="isVisibleInstruction" @closeDialog="closeDialog"></InsuranceInstruction>
    </div>
</template>

<script>
import { saveUnionPay } from './api/api'
import { MessageBox, Toast } from 'mint-ui'

export default {
    data () {
        return {
            formData: {},
            isVisibleClause: false,
            isVisibleAffirms: false,
            isVisibleInstruction: false
        }
    },
    components: {
        InsuranceClause: () => import('./InsuranceClause'),
        Affirms: () => import('./Affirms'),
        InsuranceInstruction: () => import('./InsuranceInstruction')
    },
    mounted() {
        this.formData = JSON.parse(sessionStorage.getItem('insureInfo'))
    },
    methods: {
        backEdit () {
            // sessionStorage.removeItem('insureInfo')
            sessionStorage.setItem('selector', 'hash1')
            this.$router.push('/')
            // history.go(-1)
        },
        validate () {
            if(!document.getElementById('protocal').checked){
                Toast({
                    message: '请同意协议',
                    position: 'middle',
                    duration: 3000
                });
                return false
            }
            return true;
        },
        purchase () {
            if (this.validate()) {
                saveUnionPay({
                    verificationCode: this.formData.verificationCode,
                    zybxOrder: {
                        arrivalCity: this.formData.endCity,
                        arrivalTime: this.formData.endTime + ':00',
                        bankCardNumber: this.formData.bankCardNo,
                        flightNumber: this.formData.planeNo,
                        identityCardNumber: this.formData.idNo,
                        phoneNumber: this.formData.mobile,
                        takeoffCity: this.formData.startCity,
                        takeoffTime: this.formData.startTime+ ':00',
                        userName: this.formData.username
                    }
                }).then(res => {
                    if (res.data.code === 200) {
                        sessionStorage.removeItem('insureInfo')
                        window.location.href = res.data.data
                    } else {
                        MessageBox({
                            title: "提示",
                            message: '购买失败'
                        })
                        sessionStorage.setItem('selector', 'hash1')
                        this.$router.push('/')
                    }
                }).catch(error => {
                    MessageBox({
                        title: "提示",
                        message: '购买失败'
                    })
                    console.log(error)
                })
            }
        },
        readClause () {
            this.isVisibleClause = true
        },
        readAffirms () {
            this.isVisibleAffirms = true
        },
        insuranceInstruction () {
            this.isVisibleInstruction = true
        },
        closeDialog () {
            this.isVisibleClause = false
            this.isVisibleAffirms = false
            this.isVisibleInstruction = false
        }
    }
}
</script>


<style lang="less" scoped>
@green: green;
body {
     background-color: rgb(241, 242, 244);
}
.inner-container {
     background-color: #fff;
     padding: 0 20px;
}
    .content {
        .title {
            color: @green;
            text-align: left;
            font-size: .22rem;
            font-weight: bold;
            margin: .1rem 0;
        }
        .part-div {
            padding: 6px 0;
            text-align: left;
            border-top: 2px solid rgb(241, 242, 244);
            .field {
                margin-top: 5px;
                margin-bottom: 5px;
                .label {
                    margin-right: 10px;
                }
                .detail-info {
                    color: #999;
                }

            }
            
        }
        .plane-info {
            border-top: 2px solid rgb(241, 242, 244);
        }
    }
    .footer {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: #fff;
        padding: 0 20px;
        border-top: 6px solid rgb(241, 242, 244);
        .protocal {
            margin: 15px 0;
        }
        .btn-group {
            display: -webkit-box;
            display: -moz-box;
            display: -ms-flexbox;
            display: -webkit-flex;
            display: flex;
            margin: 15px 0;
            .mint-button {
                -webkit-box-flex: 1;
                -moz-box-flex: 1;
                -webkit-flex: 1;
                -ms-flex: 1;
                flex: 1;
                margin-right: 20px;
                &:last-child {
                    margin-right: 0;
                }
            }
            .mint-button--primary {
                background-color: @green;
            }
        }
    }
</style>