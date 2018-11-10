<template>
    <div class="mask" v-if="isVisible">
        <h2 style="text-align:center;font-weight:bold;">投保须知</h2>
        <p>尊敬的客户：</p>
        <p class="paragraph">感谢您投保我司保险产品，为保护您的合法权益，请仔细阅读保险条款，保险产品公告、广告、彩页等宣传材料不属于保险合同的组成部分。请重点关注保险责任、责任免除、投/被保险人权力义务、免赔额或免赔率的计算等内容并可要求本公司工作人员对上述内容进行详细讲解。</p>
        <p class="paragraph">订立保险合同时，保险人就保险标的或者被保险人的有关情况提出询问的，投保人应当如实告知。投保人故意或因重大过失未履行如实告知义务，足以影响被保险人决定是否同意承保或者提高保险费率的，保险人有权解除合同。</p>
        <p class="paragraph">其他未尽事宜，请见具体条款。</p>
        <div class="btn-group">
            <mt-button class="close" plain @click.native="closeMask">关闭</mt-button>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        isVisible: Boolean
    },
    methods: {
        closeMask () {
            this.$emit('closeDialog', false)
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
.btn-group {
    position: fixed;
    bottom: 15px;
    left: 20px;
    right: 20px;
}
.close {
    width: 100%;
}
.paragraph {
    text-indent: 2em;
}
</style>