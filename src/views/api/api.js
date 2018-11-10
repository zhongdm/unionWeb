import axios from 'axios'

// 银联权益校验
export const unionPayInterests = params => axios.get('/api/unionpay/activity/rightsAndInterests/'+params.cardInfo)
// 历史保单查看
export const queryInsureHistory = params => axios.get('/api/zybx/order/queryBdInfoByIdentityCardNumber/'+params.cardId)
export const cancelInsure = params => axios.get('', params)
// 获取验证码
export const getCode = (params) => axios.post('/api/unionpay/activity/getVerificationCode', params)
// 立即投保按钮
export const readyInsure = params => axios.post('/api/zybx/order/verificationCode/'+params.verificationCode, params.zybxOrder)
// 验证保险分数是否超过9000份
export const validateNum = params => axios.get('/api/zybx/order/verificationBxNumber', params)
// 承保
export const saveUnionPay = params => axios.post(`/api/zybx/order/order/${params.verificationCode}`, params.zybxOrder)

export const queryInfoById = params => axios.get(`/api/zybx/order/queryBdInfoById/${params.id}`)
