<template>
    <div class="mask" v-if="isVisible">
        <h2 style="text-align:center;font-weight:bold;margin-bottom:5px;">航空延误险保险说明</h2>
        <div class="content-detail">
            <div>
                <p>1.保额及保险责任</p>
                <p>航班延误被保险人必须乘坐投保航班且航班起飞或到达目的地时间（两者较长者）延误3小时及以上赔偿300元；航班取消或所乘航班起飞后返航、备降赔偿100元。</p>
                <p>2.保险期间</p>
                <p>投保当次航班。</p>
                <p>3.投保份数</p>
                <p>同一持卡人，活动期间限投保2次。</p>
                <p>4.退保相关</p>
                <p>保险合同于投保航班计划起飞日期当日零时生效，保险生效前可拨打中银保险服务热线进行退保申请。</p>
                <p>5.服务咨询</p>
                <p>投保咨询及投诉，请拨打中银保险7*24小时服务热线：95566-4。</p>
                <p>6.理赔申请流程</p>
                <p>（1）申请人须在保险事故发生30日内拨打95566服务热线报案。</p>
                <p>（2）理赔申请所需材料：</p>
                <ul class="sub-parag">
                    <li>a)	用户身份证复印件</li>
                    <li>b)	用户理赔申请书</li>
                    <li>c)	政府机构或航空公司出具的航空事故证明或通知书</li>
                    <li>d)	本次航空出行交易消费记录凭证</li>
                </ul>
                <p>（3）	理赔申请材料传递：</p>
                <ul class="sub-parag">
                    <li>a)&nbsp;邮件寄送
                        <p>寄送地址：江苏省南京市洪武路29号东方金融大厦14楼</p>
                <p>收 件 人：理赔服务部（025-84477880）</p>
                    </li>
                    <li>b)&nbsp;营业厅现场接收
                        <p>营业厅地址：江苏省南京市洪武路29号东方金融大厦14楼</p>
                    </li>
                    <li>c)&nbsp;网上渠道上传
                        <p>yinjig_zyb@mail.notes.bank-of-china.com</p>
                    </li>
                </ul>
                <p>7.产品条款</p>
                <ul>
                    <li>1.&nbsp;<a href="javascript:void(0);" @click="inOne(1)">航空旅程综合保险条款（中银（备-家财）[2016]主2号）</a></li>
                    <li>2.&nbsp;<a href="javascript:void(0);" @click="inOne(2)">中银保险《航空旅程综合保险附加航班备降返航保险》条款（注册编号：C00004632122018071602512）</a></li>
                    <li>3.&nbsp;<a href="javascript:void(0);" @click="inOne(4)">中银保险《航空旅程综合保险附加航班取消扩展责任条款》（注册编号：C00004632122018071602522）</a></li>
                    <li>4.&nbsp;<a href="javascript:void(0);" @click="inOne(5)">中银保险《航空旅程综合保险附加航班取消时间扩展条款》（注册编号：C00004632122018071602542）</a></li>
                    <li>5.&nbsp;<a href="javascript:void(0);" @click="inOne(3)">中银保险《航空旅程综合保险附加航班延误扩展责任条款》（注册编号：C00004632122018071602572）</a></li>
                    <li>6.&nbsp;<a href="javascript:void(0);" @click="inOne(6)">中银保险《航空旅程综合保险附加备降返航导致航班延误除外条款》（注册编号：C00004632122018071602482）</a></li>
                </ul>
            </div>
        </div>
        <div class="btn-group">
            <mt-button class="close" plain @click.native="closeMask">关闭</mt-button>
        </div>
        <AllInsurances :visibleFlag="visibleFlg" @closeDialog="closeDialog"></AllInsurances>
    </div>
</template>

<script>
export default {
    props: {
        isVisible: Boolean
    },
    data () {
        return {
            visibleFlag: -1,
            visibleFlg: -1
        }
    },
    watch: {
        visibleFlag (val) {
            console.log(this.visibleFlag)
            this.visibleFlg = val
        }
    },
    components: {
        AllInsurances: () => import('./AllInsurances')
    }, 
    methods: {
        closeMask () {
            this.$emit('closeDialog', false)
        },
        inOne (index) {
            this.visibleFlag = index
        },
        closeDialog () {
            this.visibleFlag = -1
            // this.reset()
        }
    }
}
</script>

<style scoped>
.mask {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background: #fff;
    padding: 20px;
}
.content-detail {
    height: 80vh;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
}
.btn-group {
    position: fixed;
    bottom: 15px;
    left: 20px;
    right: 20px;
}
.close {
    width: 100%;
}
p {
    line-height: 30px;
}
.sub-parag {
    margin-left: 22px;
}
.sub-parag li p {
    line-height: 24px;
}
</style>