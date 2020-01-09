/**
 * 2019年2月24日15:17:43.
 */

import fetch from '../config/fetch';

function getUrl(url) {
  return url;
  // return "/lm/" + url;

}


//登录接口
export const login = (data) => fetch(getUrl('login'), data, "POST", 'application/x-www-form-urlencoded');

//登录注册接口
export const codeLogin = (data) => fetch(getUrl('login/codeLogin.do'), data, "POSTJSON", 'application/json');

//获取验证码接口
export const getSms = (data) => fetch(getUrl('login/loginSendSms.do'), data, "POSTJSON", 'application/json');

//修改密码注册接口
export const forgetPwdAndRegister = (data) => fetch(getUrl('forgetPwdAndRegister'), data, "POST", 'application/x-www-form-urlencoded');

//修改密码接口
export const newUpdatePwd = (data) => fetch(getUrl('newUpdatePwd'), data, "POST", 'application/x-www-form-urlencoded');

//退出登录接口
export const loginOut = (data, headcode) => fetch(getUrl('login/loginOut.do'), data, "POSTJSON", 'application/json', headcode);

//首页列表接口
export const recommendProduct = (data, headcode) => fetch(getUrl('product/recommendProduct'), data, "POST", 'application/x-www-form-urlencoded', headcode);

//首页轮播接口
export const homePictures = (data, headcode) => fetch(getUrl('product/homePictures'), data, "POST", 'application/x-www-form-urlencoded', headcode);

//搜索接口
export const allRecommendProduct = (data, headcode) => fetch(getUrl('product/allRecommendProduct'), data, "POST", 'application/x-www-form-urlencoded', headcode);

//立即申请接口
export const clickApply = (data, headcode) => fetch(getUrl('product/clickApply'), data, "POST", 'application/x-www-form-urlencoded', headcode);

//点击申请
export const clickProductCount = (data, headcode) => fetch(getUrl('product/clickProductCount'), data, "POST", 'application/x-www-form-urlencoded', headcode);


//一键申请
export const oneClickLogin = (data, headcode) => fetch(getUrl('oneClickLogin'), data, "POST", 'application/x-www-form-urlencoded', headcode);


//轮播统计
export const bannerStatistic = (data, headcode) => fetch(getUrl('bannerStatistic'), data, "POST", 'application/x-www-form-urlencoded', headcode);




//查询状态
export const getOrderAuth = (data, headcode) => fetch(getUrl('loanBefore/getOrderAuth.do'), data, "POSTJSON", 'application/json', headcode);
//联系人添加
export const savePInfo = (data, headcode) => fetch(getUrl('loanBefore/submitContactInfo.do'), data, "POSTJSON", 'application/json', headcode);

//联系人添加
export const saveBinfo = (data, headcode) => fetch(getUrl('loanBefore/startApply.do '), data, "POSTJSON", 'application/json', headcode);

//绑卡页获取短信验证码
export const getCardSms = (data, headcode) => fetch(getUrl('loanBefore/bindCardAuthSms.do'), data, "POSTJSON", 'application/json', headcode);
//点击申请借款
export const saveAuthInfo = (data, headcode) => fetch(getUrl('loanBefore/confirmSubmit.do'), data, "POSTJSON", 'application/json', headcode);
//人脸识别
export const getAccount = (data, headcode) => fetch(getUrl('quanzhi/carrier/getAccount.do'), data, "GET", 'application/x-www-form-urlencoded', headcode);

//绑卡页保存按钮
export const saveCard = (data, headcode) => fetch(getUrl('loanBefore/bindCarValidCodeCheck.do'), data, "POSTJSON", 'application/json', headcode);


//查询借款人信息
export const getCardInfo = (data, headcode) => fetch(getUrl('loanBefore/queryBorrowerInfo.do'), data, "POSTJSON", 'application/json', headcode);


//查询银行卡详细
export const qzIsGetYysData = (data, headcode) => fetch(getUrl('quanzhi/carrier/qzIsGetYysData.do'), data, "GET", 'application/x-www-form-urlencoded', headcode);
//获取借款信息
export const information = (data, headcode) => fetch(getUrl('index/information.do'), data, "POSTJSON", 'application/json', headcode);

//点击还款
export const repayment = (data, headcode) => fetch(getUrl('loanAfter/repayment.do'), data, "POSTJSON", 'application/json', headcode);
//type 1 正常还款  2 展期    //borrower_id  借款人id   //orderId  订单id    //app_request  1 //loginToken  token

//是否可以展期
export const isExtension = (data, headcode) => fetch(getUrl('app/isExtension.do'), data, "POST", 'application/x-www-form-urlencoded', headcode);

//展期信息
export const repayInfo = (data, headcode) => fetch(getUrl('loanAfter/getExtensionInfo.do'), data, "POSTJSON", 'application/json', headcode);


//获取系统配置
export const configInfo = (data, headcode) => fetch(getUrl('index/config.do'), data, "POSTJSON", 'application/json', headcode);

//获取银行列表
export const getBank = (data, headcode) => fetch(getUrl('loanBefore/getSupportBank.do'), data, "POSTJSON", 'application/json', headcode);
//获取银行列表
export const getBCard = (data, headcode) => fetch(getUrl('loanAfter/getCardInfo.do'), data, "POSTJSON", 'application/json', headcode);

//是否启用该银行卡
export const enableBankCard = (data, headcode) => fetch(getUrl('loanAfter/enableCard.do'), data, "POSTJSON", 'application/json', headcode);

//我要借款确认页
export const loanCalculation = (data, headcode) => fetch(getUrl('loanBefore/loanCalculation.do'), data, "POSTJSON", 'application/json', headcode);

//我要借款确认页
export const borrowerInfo = (data, headcode) => fetch(getUrl('app/borrowerInfo.do'), data, "POST", 'application/x-www-form-urlencoded', headcode);

//身份证上传--正面
export const submitIdentityFont = (data, headcode) => fetch(getUrl('hs/submitIdentityFont.do'), data, "POST", 'application/x-www-form-urlencoded', headcode);

//身份证上传--反面
export const submitIdentityBack = (data, headcode) => fetch(getUrl('hs/submitIdentityBack.do'), data, "POST", 'application/x-www-form-urlencoded', headcode);

//身份证查询
export const queryIdentityInfo = (data, headcode) => fetch(getUrl('loanBefore/queryIdentityInfo.do'), data, "POSTJSON", 'application/json', headcode);


//活體
export const submitIdentityFaceVerify = (data, headcode) => fetch(getUrl('hs/submitIdentityFaceVerify.do'), data, "POST", 'application/x-www-form-urlencoded', headcode);

//运营商认证
export const carrier = (data, headcode) => fetch(getUrl('loanBefore/redirectYys.do'), data, "POSTJSON", 'application/json', headcode);

//运营商认证回调
export const successCallback = (data, headcode) => fetch(getUrl('loanBefore/yysAuthCallback.do '), data, "POSTJSON", 'application/json', headcode);

//获取联系客服
export const getContact = (data, headcode) => fetch(getUrl('index/getContact.do'), data, "POSTJSON", 'application/json', headcode);

//还款发送验证码
export const repaymentSendSms = (data, headcode) => fetch(getUrl('loanAfter/repaymentSendSms.do'), data, "POSTJSON", 'application/json', headcode);

//借款详情
export const borrowrepayInfo = (data, headcode) => fetch(getUrl('loanAfter/repayInfo.do'), data, "POSTJSON", 'application/json', headcode);

//支付方式
export const getPayTypeList = (data, headcode) => fetch(getUrl('loanAfter/getPayTypeList.do'), data, "POSTJSON", 'application/json', headcode);

//反馈
export const feedBack = (data, headcode) => fetch(getUrl('loanAfter/feedBack.do'), data, "POSTJSON", 'application/json', headcode);

//消息回复
export const queryfeedBack = (data, headcode) => fetch(getUrl('loanAfter/queryfeedBack.do'), data, "POSTJSON", 'application/json', headcode);