<template>
    <div class="inner-container align-pos">
        <div class="header">
            <h2>查看您的历史保单</h2>
            <span>填写您的身份证号查看</span>
        </div>
        <div class="search-form">
            <mt-field id="idNo" placeholder="输入证件号码" @change="changeIDNo" v-model="cardNo" class="custom-input"></mt-field>
            <p class="error-msg" style="padding: 5px"></p>
            <mt-button size="large" class="btn-search" type="primary" @click.native="searchIdentityInfo">查看</mt-button>
        </div>
        <!-- <div class="tips-wrapper">
            <i></i>
            <div class="tips-content"><i></i>
            您可以登录中银保险有限公司电子商务平台网站
            <a href="http://e.bocins.com" target="_blank">http://e.bocins.com</a>，进入“客户服务区”——“意健险保单查询和下载”查询并下载电子保单和保险条款。
        </div>
        </div> -->
        <div class="tips-content"><i></i>
            您可以登录中银保险有限公司电子商务平台网站
            <a href="http://e.bocins.com" target="_blank">http://e.bocins.com</a>，进入“客户服务区”——“意健险保单查询和下载”查询并下载电子保单和保险条款。
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            cardNo: ''
        }
    },
    methods: {
        changeIDNo(){
            if(this.cardNo == '') 
            {   
                let errElm = document.getElementById('idNo')
                errElm.className += ' error'
                errElm.nextElementSibling.innerHTML = '请输入身份证号';
                return false;
            }

            let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/; 
            if(reg.test(this.cardNo) === false) 
            {   
                let errElm = document.getElementById('idNo')
                errElm.className += ' error'
                errElm.nextElementSibling.innerHTML = '请输入正确的身份证号';
                return false;
            }
            return true
        },
        removeError (id) {
            let errElm = document.getElementById(id)
            if (errElm && errElm.className && errElm.className.indexOf('error') !== -1) {
                errElm.className = errElm.className.replace(/error/, '')
            }
            errElm.nextElementSibling.innerHTML = '';
        },
        searchIdentityInfo () {
            if(this.changeIDNo()){
                this.removeError('idNo')
                this.$router.push({path: '/insureHistory', query: { cardId: this.cardNo }})
            }
            
        }
    }
}
</script>


<style lang="less" scoped>
@green: green;
    body {
        background-color: #fff;
        .align-pos {
            background-color: #fff;
            text-align: left;
            padding: .2rem;
            .header {
                h2 {
                    color: @green;
                    font-size: .26rem;
                    margin: .1rem 0;
                }
                span {
                    font-size: .18rem;
                }
            }
            .btn-search {
                margin-top: 12px;
            }
            .mint-cell {
                background-color: rgb(241, 242, 244);
                border-radius: 4px;
                margin: 18px auto 0;
                /deep/ .mint-field-core {
                    background-color: rgb(241, 242, 244) !important;
                }
            }
            .mint-button--primary {
                background-color: @green;
            }
            .tips-content {
                margin-top: 40px;
                i {
                    width: 20px;
                    height: 20px;
                    display: inline-block;
                    background: url('../assets/img/tips.png') no-repeat center;
                    background-size: contain;
                    vertical-align: bottom;
                }
            }
        }
    }
</style>