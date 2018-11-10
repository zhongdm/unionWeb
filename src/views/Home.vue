<template>
    <div class="container">
        <div class="home-img"></div>
        <div class="form-container" id="hash1">
            <label for="" class="title">申请</label>
            <div class="main-content" id="insureForm">
                <!-- <form action=""> -->
                    <mt-field label="银行卡号" type="number" :disabled="isExceed ? true : false" placeholder="银行卡号" @blur.native.capture="validateForm(1)"  v-model="formData.bankCardNo" class="bankCardNo"></mt-field>
                    <p class="error-msg"></p>
                    <mt-field label="姓名" :disabled="isExceed ? true : false" placeholder="姓名" v-model="formData.username" @blur.native.capture="validateForm(2)" class="username"></mt-field>
                    <p class="error-msg"></p>
                    <mt-field label="身份证号" type="number" :disabled="isExceed ? true : false" placeholder="身份证号" v-model="formData.idNo" @blur.native.capture="validateForm(3)" class="IDNo"></mt-field>
                    <p class="error-msg"></p>
                    <mt-field label="手机号" type="number" :disabled="isExceed ? true : false" placeholder="手机号" v-model="formData.mobile" @blur.native.capture="validateForm(4)" class="mobile"></mt-field>
                    <p class="error-msg"></p>
                    <div class="valit-flex">
                        <mt-field label="" type="number" :disabled="isExceed ? true : false" placeholder="输入验证码" class="valit-input verificationCode" @blur.native.capture="validateForm(5)" v-model="formData.verificationCode"></mt-field>
                        <mt-button class="valit-btn" @click.native="getCodeBy" v-if="show">获取验证码</mt-button>
                        <mt-button class="valit-btn" v-if="!show">倒计时({{count}}s)</mt-button>
                    </div>
                    <p class="error-msg"></p>
                    <mt-field label="航班号" :disabled="isExceed ? true : false" placeholder="航班号" @blur.native.capture="validateForm(6)" v-model="formData.planeNo" class="planeNo"></mt-field>
                     <p class="error-msg"></p>
                    <mt-cell title="预计起飞时间" class="startTime selectInput">
                        <mt-button :disabled="isExceed ? true : false" @click.native="openStartPicker" plain class="time-cell-btn">
                            <span id="startTime" class="placeholder">{{formData.startTime == '' ? '选择起飞时间': formData.startTime}}</span>
                            <!-- <mt-cell id="startTime" title="" value="选择起飞时间" class="placeholder"></mt-cell> -->
                            <i class="date-icon"></i>
                        </mt-button>
                    </mt-cell>
                    <p class="error-msg"></p>
                    <div @touchmove.prevent> 
                        <mt-datetime-picker
                            ref="startPicker"
                            type="datetime"
                            :startDate="startDate"
                            :endDate="endDate"
                            @confirm="getStartDate"
                            @cancel="cancelStartDate"
                            v-model="formData.startPickerData">
                        </mt-datetime-picker>
                    </div>
                    <mt-cell title="预计到达时间" class="endTime selectInput">
                        <mt-button @click.native="openEndPicker" :disabled="isExceed ? true : false" plain class="time-cell-btn">
                            <span id="endTime" class="placeholder" >{{formData.endTime == '' ? '选择到达时间': formData.endTime}}</span>
                            <i class="date-icon"></i>
                        </mt-button>
                    </mt-cell>
                    <p class="error-msg"></p>
                    <div @touchmove.prevent> 
                        <mt-datetime-picker
                            ref="endPicker"
                            type="datetime"
                            :startDate="endStartDate"
                            @confirm="getEndDate"
                            @cancel="cancelEndDate"
                            v-model="formData.endPickerData">
                        </mt-datetime-picker>
                    </div>
                    <mt-cell title="出发城市" class="startCity selectInput">
                        <mt-button @click.native="openStartCity" :disabled="isExceed ? true : false" plain class="time-cell-btn startCityClass">
                            <span id="departure" class="placeholder">{{formData.startCity == '' ? '选择出发城市': formData.startCity}}</span>
                            <!-- <img src="" alt="" style="display:inline-block;width:20px;height:20px;background-color:red;"> -->
                        </mt-button>
                    </mt-cell>
                    <p class="error-msg"></p>
                    <div @touchmove.prevent> 
                        <mt-popup
                            style="width:100%;"
                            v-model="isVisible"
                            position="bottom">
                            <!-- <div @touchmove.prevent>  -->
                            <mt-picker :slots="slots" :show-toolbar="true" ref="picker" @change="onStartCityChange">
                                <mt-button plain @click="handleConfirmStartCity" class="sure">确认</mt-button>
                            </mt-picker>
                            <!-- </div>  -->
                        </mt-popup>
                    </div>
                    <mt-cell title="到达城市" class="endCity selectInput">
                        <mt-button :disabled="isExceed ? true : false" @click.native="openDesCity" plain class="time-cell-btn">
                            <span id="destination" class="placeholder">{{formData.endCity == '' ? '选择到达城市': formData.endCity}}</span>
                            <!-- <img src="" alt="" style="display:inline-block;width:20px;height:20px;background-color:red;"> -->
                        </mt-button>
                    </mt-cell>
                    <p class="error-msg"></p>
                    <GlobalCity @get-value="getDesValue" v-if="isDesVisibility"></GlobalCity>
                    <p class="checkbox">
                        <input type="checkbox" name="protocal" id="protocal" checked/><i></i>
                        <label for="protocal">我已查看并同意
                        <!-- <a href="javascript:void(0)" @click="readAffirms">保险条款</a> -->
                        <!-- 和 -->
                        <a href="javascript:void(0)" @click="readClause">投保须知</a>
                        和
                        <a href="javascript:void(0)" @click="insuranceInstruction">航空延误险保险说明</a>
                        </label>
                    </p>
                    <!-- </form> -->
                     <mt-button :disabled="isExceed ? true : false"  plain class="btn-submit" @click.native="commitInsure">立即投保</mt-button>
               
            </div>
        </div>
        <div class="instructions">
            <label for="" class="title">活动说明</label>
            <section class="ins-list">
                <ul>
                    <li><p>权益领取时间：即日起至2019年3月31日</p></li>
                    <li><p>权益对象：江苏地区62开头的银联高端信用卡持卡人</p></li>
                    <li><p>权益生效：在活动页面1元领取“航班延误险”权益，权益生效领取即生效，保险正式生效时间为领取权益页面登记的航班起飞时间。如1月1日支付成功领取权益，登记的航班起飞时间为1月20日，则保险起期为1月20日00:00</p></li>
                    <li><p>权益售后：保险售后请拨打中银保险7*24小时服务热线：<a href='javascript:void(0)' style="color:orange;font-weight:bold;display:inline-block;" @click="callPhone('95566')">95566-4</a></p></li>
                </ul>
                <p>注：该权益仅限航班出发地为江苏的银联高端信用卡持卡人享受，活动期内权益限量9000份，先到先得，领完为止；该活动权益每位持卡人限领取不超过2次。</p>
            </section>
            <div class="btn-group">
                <!-- <mt-button plain @click.native="exitInsure">退保</mt-button> -->
                <mt-button type="primary" @click.native="searchInsureHistory">历史保单</mt-button>
            </div>
        </div>
        <InsuranceClause :isVisible="isVisibleClause" @closeDialog="closeDialog"></InsuranceClause>
        <Affirms :isVisible="isVisibleAffirms" @closeDialog="closeDialog"></Affirms>
        <InsuranceInstruction :isVisible="isVisibleInstruction" @closeDialog="closeDialog"></InsuranceInstruction>
    </div>
</template>

<script>
import { unionPayInterests, getCode, readyInsure, cancelInsure, queryInsureHistory, validateNum} from './api/api'
import city from 'vue-city'
import luhmCheck from '../common/luhn'
import { MessageBox, Toast, Picker, Popup } from 'mint-ui'
// import GlobalCity from '@/components/GlobalCity'

export default {
    data () {
        return{
            isVisibility: false,
            isDesVisibility: false,
            show: true,
            count: 0,
            TIME_COUNT: 60,
            isExceed: false,
            formData: {
                bankCardNo: '',
                username: '',
                idNo: '',
                mobile: '',
                verificationCode: '',
                planeNo: '',
                startTime: '',
                endTime: '',
                startCity: '',
                endCity: ''
            },
            city: {
                isShow: false,
                cityData: [],
                onChoose: null,
                localCity: {},
                starCity: []
            },
            desCity: {
                isShow: false,
                cityData: [],
                onChoose: null,
                localCity: {},
                starCity: []
            },
            isVisibleClause: false,
            isVisibleAffirms: false,
            isVisibleInstruction: false,
            slots: [
                {
                    flex: 1,
                    values: ['南京', '扬州', '泰州', '无锡', '南通', '盐城', '徐州', '连云港', '淮安', '常州', '苏州', '镇江', '宿迁'],
                    className: 'slot-long',
                    textAlign: 'center'
                },
            ]
        }
    },
    computed: {
        isOk () {

        },
        isVisible: {
            get() {
                console.log(this.isVisibility)
                return this.isVisibility
            },
            set(val) {

            }
            
        },
        startDate(){
            let curDate = new Date()
            curDate.setDate(curDate.getDate() + 1)
            return new Date(curDate)
        },
        endDate(){
            if (this.formData.endTime != '') {
                return new Date(this.formData.endTime)
            }
        },
        endStartDate(){
            if (this.formData.startTime != '') {
                return new Date(this.formData.startTime)
            }
            return this.startDate
        }
    },
    components: {
        city,
        GlobalCity: () => import('@/components/GlobalCity'),
        InsuranceClause: () => import('./InsuranceClause'),
        Affirms: () => import('./Affirms'),
        InsuranceInstruction: () => import('./InsuranceInstruction')
    },
    created (){
        validateNum({}).then(res => {
            if(res.data.code == 200) {
                // this.isExceed = true
            }
            else {
                this.isExceed = true
            }
        })
    },
    mounted(){
        let scrollTop = ''
        if (document.documentElement && document.documentElement.scrollTop) {
            document.documentElement.scrollTop = 0
        } else if (document.body) {
            document.body.scrollTop = 0
        }
        this.goAnchor()
        if (sessionStorage.getItem('insureInfo')) {
            this.formData = JSON.parse(sessionStorage.getItem('insureInfo'))
            this.formData.startTime = this.formData.startTime.replace(/-/g, '/')
            this.formData.endTime = this.formData.endTime.replace(/-/g, '/')
            this.verificationCode = ''
            sessionStorage.removeItem('insureInfo')
        }

       
     },
    methods: {
        callPhone (phone) {
            window.location.href = 'tel://' + phone
        },
        goAnchor () {
            let selector = sessionStorage.getItem('selector') ? sessionStorage.getItem('selector') : ''
            if (!!selector) {
                let anchor = document.getElementById(selector)
                console.log(anchor.offsetTop)
                this.$nextTick(() => {
                    document.documentElement.scrollTop = anchor.offsetTop
                })
                sessionStorage.removeItem('selector')
            } else {
                this.$nextTick(() => {
                    
                    if (document.documentElement && document.documentElement.scrollTop) {
                        document.documentElement.scrollTop = 0
                    } else if (document.body) {
                        document.body.scrollTop = 0
                    }

                })
            }
        },
        validateForm (index) {
            let timer = null
            let _this = this
            switch (index) {
                case 1:
                    timer = setTimeout(function(){
                        _this.changeCard();
                        timer = null
                    }, 100)
                break;
                case 2:
                    timer = setTimeout(function(){
                        _this.validateUsername()
                        timer = null
                    }, 100)
                break;
                case 3:
                    timer = setTimeout(function(){
                        _this.validateIDNo();
                        timer = null
                    }, 100)
                break;
                case 4:
                    timer = setTimeout(function(){
                        _this.validateMobile()
                        timer = null
                    }, 100)
                break;
                case 5:
                    timer = setTimeout(function(){
                        _this.validateVerificationCode();
                        timer = null
                    }, 100)
                break;
                case 6:
                    timer = setTimeout(function(){
                        _this.validatePlane()
                        timer = null
                    }, 100)
                break;
                case 7:
                    timer = setTimeout(function(){
                        _this.validateStartTime();
                        timer = null
                    }, 100)
                break;
                case 8:
                    timer = setTimeout(function(){
                        _this.validateEndTime()
                        timer = null
                    }, 100)
                break;
                case 9:
                    timer = setTimeout(function(){
                        th_thisis.validateStartCity();
                        timer = null
                    }, 100)
                break;
                case 10:
                    timer = setTimeout(function(){
                        _this.validateEndCity()
                        timer = null
                    }, 100)
                break;
                default:
                break;
            }
        },
        changeCard(){
            let value = this.formData.bankCardNo
            if(this.checkBankNo(value)){
                this.removeError('bankCardNo')
                unionPayInterests({
                    cardInfo: value
                }).then((res) => {
                    if (res.data.code == 200) {
                        console.log("success")
                        if (res.data.data) {
                            let data = res.data.data
                            this.formData.mobile = data.phoneNumber
                            this.formData.username = data.userName
                            this.formData.idNo = data.identityCardNumber
                        }
                        this.removeError('bankCardNo')
                        return true
                    }else {
                        this.addErrorMsg('bankCardNo', res.data.message)
                        return false
                    }
                    
                }).catch(error => {
                    console.log(error)
                })
                return true
            }
            return false
        },
        validateUsername(){
            let _this = this
            if(!_this.checkRequired('username', '请输入姓名')){
                return false
            }else {
                _this.removeError('username')
                return true
            }
        },
        validateIDNo(){
            if(this.checkIDNo(this.formData.idNo)){
                this.removeError('IDNo')
                return true
            }
            return false
        },
        validateMobile(){
            if(this.checkMobile(this.formData.mobile)){
                this.removeError('mobile')
                 return true
            }
            return false
        },
        validateVerificationCode(){
            if(this.checkRequired('verificationCode', '请输入验证码')){
                this.removeError('verificationCode')
                 return true
            }
            return false
        },
        validatePlane(){
            if(this.checkRequired('planeNo', '请输入航班号')){
                this.removeError('planeNo')
                 return true
            }
            return false
        },
        validateStartTime(){
            if(this.checkRequired('startTime', '请选择预计起飞时间')){
                this.removeError('startTime')
                return true
            }
            return false
        },
        validateEndTime(){
            if(this.checkRequired('endTime', '请选择预计到达时间')){
                this.removeError('endTime')
                 return true
            }
            return false
        },
        validateStartCity(){
            if(this.checkRequired('startCity', '请选择出发城市')){
                this.removeError('startCity')
                 return true
            }
            return false
        },
        validateEndCity(){
            if(this.checkRequired('endCity', '请选择到达城市')){
                this.removeError('endCity')
                 return true
            }
            return false
        },
        bankAndCardAndTelValidate () {
            if(this.checkBankNo(this.formData.bankCardNo) &&
                this.checkIDNo(this.formData.idNo) &&
                this.checkMobile(this.formData.mobile)){
                return true
            }
            return false
        },
        removeError (className) {
            let errElm = document.getElementsByClassName(className)[0]
            if (errElm && errElm.className && errElm.className.indexOf('error') !== -1) {
                errElm.className = errElm.className.replace(/error/, '')
            }
            if(className == 'verificationCode') {
                errElm = errElm.parentNode
            }
            if (errElm && errElm.nextElementSibling) {
                errElm.nextElementSibling.innerHTML = '';
            }
        },
        formValidate () {
            if(!this.changeCard(this.formData.bankCardNo)) {
                return false
            }
            if(!this.validateUsername()) {
                return false
            }
            if(!this.validateIDNo()) {
                return false
            }
            if(!this.validateMobile()) {
                return false
            }
            if(!this.validateVerificationCode()) {
                return false
            }
            if(!this.validatePlane()) {
                return false
            }
            if(this.formData.startTime == '') {
                this.addErrorMsg('startTime', '请选择预计起飞时间')
                return false
            }
            if(this.formData.endTime == '') {
                this.addErrorMsg('endTime', '请选择预计到达时间')
                return false
            }
            if(this.formData.startCity == '') {
                this.addErrorMsg('startCity', '请选择出发城市')
                return false
            }
            if(this.formData.endCity == '') {
                this.addErrorMsg('endCity', '请选择到达城市')
                return false
            }
            
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
        addErrorMsg(className, errMsg) {
            let errElm = document.getElementsByClassName(className)[0]
            if(errElm.getElementsByTagName('input').length > 0) {
                let errClass = document.getElementById('insureForm').getElementsByClassName('error')
                errClass.length > 0 
                    ? errClass[0].focus()
                    : errElm.getElementsByTagName('input')[0].focus()
            }
            if(errElm.className.split(' ').indexOf('error') == -1){
                errElm.className += ' error'
            }
            if(className == 'verificationCode') {
                errElm = errElm.parentNode
            }
            errElm.nextElementSibling.innerHTML = errMsg;
            return false
        },
        checkRequired(ele, requiredMsg){
            if(this.formData[ele] == '') {
                this.addErrorMsg(ele, requiredMsg)
                return false
            }
            return true
        },
        checkBankNo (bankno) {
            const bankNo = bankno.replace(/\s/g, '')
            if (bankNo == '') {
                this.addErrorMsg('bankCardNo', '请输入银行卡号');
                return false;
                // return false;
            }
            if (bankNo.length < 16 || bankNo.length > 19) {
                this.addErrorMsg('bankCardNo', '银行卡号长度必须在16到19之间');
                return false;
            }
            const reg = /^62\d*$/; // 62开头
            if(!reg.exec(bankNo)) {
                // MessageBox({
                //     title: '错误',
                //     message: '62'
                // })
                this.addErrorMsg('bankCardNo', '请输入正确的银行卡号');
                return false;
            }
            if(!luhmCheck(bankNo)) {
                this.addErrorMsg('bankCardNo', '请输入合法的银行卡号');
                return false
            }
            return true
        },
        checkMobile(mobile){
            let mobileReg = /^1\d{10}$/;
            if(mobileReg.test(mobile)== false) {
                this.addErrorMsg('mobile', '请输入正确的手机号码')
                return false;
            }
            return true
        },
        checkIDNo(idNo){
            let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/; 
            if(reg.test(idNo) === false) 
            { 
                this.addErrorMsg('IDNo', "身份证输入不合法"); 
                return false;
            }
            return true
        },
        getCodeBy() {
            // 获取验证码
            let _this = this
            if(this.bankAndCardAndTelValidate()) {
                // _this.$axios.post('/api/unionpay/activity/getVerificationCode',
                getCode({
                    phoneNumber: this.formData.mobile,
                    identityCardNumber: this.formData.idNo,
                    cardNumber: this.formData.bankCardNo
                }).then((res) => {
                    if(res.data.code == "200") {
                        console.log("success")
                        let timer = null
                        this.count = this.TIME_COUNT
                        if (!timer) {
                            this.show = false;
                            timer = setInterval(() => {
                            if (this.count > 1 && this.count <= this.TIME_COUNT) {
                                this.count--;
                            } else {
                                this.show = true;
                                clearInterval(this.timer);
                                    timer = null;
                                }
                            }, 1000)
                        }
                    } else {
                        Toast({
                            title: "提示",
                            message: res.data.message
                        })
                    }
                }).catch((error) => {
                    MessageBox({
                        title: "提示",
                        message: '获取验证码失败'
                    })
                    console.log(error)
                })
                // getCode({
                //     phoneNumber: this.formData.mobile,
                //     identityCardNumber: this.formData.idNo,
                //     cardNumber: this.formData.bankCardNo
                // }).then((res) => {
                //     if(res.data.code == '200') {
                //         console.log(res)
                //     }
                // }).catch((err) => {
                //     console.log(err)
                // })
                return true
            }
            return false
        },
        commitInsure() {
            // 立即投保
            if(this.formValidate()) {
                this.formData.startTime = this.formData.startTime.replace(/\//g, '-')
                this.formData.endTime = this.formData.endTime.replace(/\//g, '-')
                sessionStorage.setItem('insureInfo', JSON.stringify(this.formData))
                this.$router.push('/insureConfirm')
            }
        },
        exitInsure() {
            // 退保
        },
        searchInsureHistory() {
            // 历史保单
            this.$router.push('/insureHistorySearch')
        },
        openStartPicker() {
            this.preventMove()
            this.$refs.startPicker.open();
        },
        preventMove () {
            document.body.style.overflowY = 'hidden'
            document.body.style.overflow = 'hidden'
            // ios兼容
            // document.getElementsByTagName('html')[0].style.overflow = "hidden"
            // document.getElementsByTagName('html')[0].style.height = "100%"
            // document.body.style.overflow = "hidden"
        },
        reset () {
            document.body.style.overflowY = 'auto'
            document.body.style.overflow = 'auto'
            // document.getElementsByTagName('html')[0].style.overflow = "visible"
            // document.getElementsByTagName('html')[0].style.height = "auto"
            // document.body.style.overflow = "visible"
            // document.body.style.height = "auto"
        },
        getStartDate (val) {
            this.reset()
            const date = this.formateDate(val, '/')
            document.getElementById('startTime').innerHTML = date
            this.formData.startTime = date
            this.removeError('startTime')
            // document.getElementById('startTime').value = val
        },
        cancelStartDate(){
            this.reset()
            if (this.formData.startTime === '') {
                this.addErrorMsg('startTime', '请选择起飞时间')
                return false
            }else {
                this.removeError('startTime')
            }
        },
        openEndPicker() {
            this.$refs.endPicker.open();
        },
        getEndDate (val) {
            // this.reset()
            const endDate = this.formateDate(val, '/')
            document.getElementById('endTime').innerHTML = endDate
            this.formData.endTime = endDate
            this.removeError('endTime')
        },
        cancelEndDate(){
            // this.reset()
            if (this.formData.endTime === '') {
                this.addErrorMsg('endTime', '请选择到达时间')
                return false
            }else {
                this.removeError('endTime')
            }
        },
        openStartCity () {
            let _this = this
            this.isVisibility = true
            
            document.body.addEventListener('click', function(e) {
                if (e.target.className == 'v-modal') {
                    _this.isVisibility = false
                }
            })
        },
        openDesCity () {
            this.preventMove()
            this.isDesVisibility = true
        },
        handleConfirmStartCity () {
            this.formData.startCity = this.$refs.picker.getValues()[0]
            this.isVisibility = false
            // this.reset()
        },
        getDesValue(payload){
            this.reset()
            this.isDesVisibility = false
            if(payload) {
                let elm = document.getElementById('destination')
                elm.innerHTML = payload
            //    elm.className += ' selected'
                this.formData.endCity = payload
                this.removeError('endCity')
            }else {
                this.formData.endCity === '' ? this.addErrorMsg('endCity', '请选择到达城市') : this.removeError('endCity')
            }
        },
        close () {
            this.reset()
            this.city.isShow = false
            this.desCity.isShow = false
        },
        formateDate (date, formatter) {
            const myDate = new Date(date)
            let y = myDate.getFullYear()
            let m = myDate.getMonth() + 1
                m = m < 9 ? '0' + m : m
            let d = myDate.getDate()
                d = d < 9 ? '0' + d : d
            let h = myDate.getHours()
                h = h < 9 ? '0' + h : h
            let mn = myDate.getMinutes()
                mn = mn < 9 ? '0' + mn : mn
            // return y+'/'+m+'/'+d+" "+h+":"+mn;
            return y+formatter+m+formatter+d+" "+h+":"+mn;
        },
        readClause () {
            this.isVisibleClause = true
            this.preventMove()
        },
        readAffirms () {
            this.isVisibleAffirms = true
            this.preventMove()
        },
        insuranceInstruction () {
            this.isVisibleInstruction = true
            this.preventMove()
        },
        closeDialog () {
            this.isVisibleClause = false
            this.isVisibleAffirms = false
            this.isVisibleInstruction = false
            this.reset()
        // },
        // closeAffirmsDialog () {
        //     this.isVisibleAffirms = false
        //     this.reset()
        }
    }
}
</script>

<style lang="less" scoped>
@yellow: rgb(252, 223, 81);
@darkGreen: rgb(17,89,67);
@green: rgba(58,172,110,1);

    .container {
        background-color: rgba(211,233,221, 1)
    }
    .home-img {
        background: url('../assets/img/bg_1.png') no-repeat center;
        background-size: contain;
        height: 100vh;
    }
    .form-container, 
    .instructions
    {
        margin-left: 10px;
        margin-right: 10px;
        .title {
            background-color: @darkGreen;
            width: 80%;
            color: @yellow;
            display: block;
            text-align: center;
            margin: 0 auto;
            padding: 8px 0;
            font-size: 26px;
            font-weight: bold;
            border-top-left-radius: 8px;
            border-top-right-radius: 8px;
        }
        .ins-list, .main-content {
            background-color: @green;
            padding: 12px 20px;
            border-radius: 4px;
        }
        ul {
            margin: 0;
            padding: 0;
            margin-left: 20px;
            li {
                list-style: decimal!important;
                p {
                    text-align: left;
                }
            }
        }
    }
    .form-container {
        .main-content {
            margin-bottom: 45px;
            .checkbox a {
                color: @yellow;
            }
            .btn-submit {
                background-color: #fff;
                width: 100%;
                border-radius: 40px;
                color: @green;
                font-weight: bold;
                border: none;
                margin-bottom: 10px;
            }
            .mint-cell {
                margin: 10px 0;
                border-radius: 4px;
                /deep/ .mint-cell-title {
                    text-align: left;
                }
                /deep/ .mint-field-core {
                    text-align: right;
                }
            }
            .time-cell-btn {
                border: none;
                padding: 0;
                text-align: right;
                flex: 1;
                font-size: inherit;
                .placeholder {
                    color: #888;
                    vertical-align: top;
                }
                .date-icon {
                    display: inline-block;
                    width: 20px;
                    height: 20px;
                    background: url(../assets/img/icon.png) no-repeat;
                    background-size: contain;
                }
            }
            .xin-widget-citys {
                margin: 0;
            }
            .selected {
                position: relative;
                padding-right: 20px;
                &:after {
                    content: '×';
                    position: absolute;
                    width: 15px;
                    height: 15px;
                    line-height: 15px;
                    background-color: rgb(217, 220, 223);
                    border-radius: 50%;
                    top: 2px;
                    color: #fff;
                }
            }
            .selectInput {
                /deep/ .mint-cell-title {
                    width: 105px!important;
                    -webkit-box-flex: 0;
                    -ms-flex: 0;
                        flex: none;
                }
                /deep/ .mint-cell-value {
                   flex: 1;
                }
            }
            /deep/ .xin-widget-citys .xin-widget-citys-content .xin-widget-citys-local {
                display: none!important;
            }
        }
    }
    .instructions {
        .ins-list {
            color: #fff;
            padding: 20px;
        }
    }
    .btn-group {
        padding: 20px 0;
        display: -webkit-box;
        display: -moz-box;
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;
        margin: 15px 0 0;
        .mint-button--default.is-plain {
            border-color: @green;
            color: @green;
        }
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
    
    .valit-flex {
        display: flex;
        min-height: 48px;
        .valit-input {
            flex: 1;
            margin: 0!important;
            margin-right: 10px !important;
            /deep/ .mint-field-core {
                text-align: left !important;
            }
        }

        .valit-btn {
            flex: 1;
            min-height: 48px;
            // margin: 10px 0;
            margin-left: 10px;
            padding: 0;
            color: @green;
            background-color: rgb(210,232,222);
        }
    }

/deep/ .form-container .main-content .mint-cell .mint-field-core {
    background-color: transparent;
}
.slot-long {
    width: 100%;
}
.sure {
    border: none!important;
    position: absolute;
    right: 0;
}
.my-mask {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: #d8d8d8;
    opacity:.5;
    z-index: 1999;
}
</style>