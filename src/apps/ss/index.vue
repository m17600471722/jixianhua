<template>
	<div class="lki">
		<!-- <add-dialog :response="response" v-if="response.isShowDialog" ref="addDialogRef" @closeDialog="closeDialog"> -->
			<div slot="libBox" class="libBox">
				<div class="auto">
					<video id="video" width="480" height="320" autoplay></video>
					<canvas id="canvas" width="480" height="320" style="display: none;"></canvas>
					<img src="/static/images/body_default.png" id="img" width="480" height="320" style="margin-left: 20px;">
					<!-- <img src="" id="img" width="480" height="320" style="margin-left: 20px;"> -->
					<div>
						<button id="capture" title="点击进行拍照" @click="takePhoto">拍照</button>
					</div>
					<div>
						<button id="sure" title="是否用这张图片进行验证" @click="sure">确认</button>
					</div>
				</div>
			</div>
		<!-- </add-dialog> -->
		<!-- <loading :loadingStatus="loadingStatus"></loading> -->
		
	</div>
</template>
<script>
	// import loading from "src/biz_components/loading/loading.vue";
	// import addDialog from "biz_components/dialog.vue";
	export default {
		name: "livingvalidation",
		props: ["response"],
		components: {
			// addDialog: addDialog,
			// loading:loading
		},
		data: function() {
			return {
				File:"", //上传图片文件
				streamPicture:"",
				loadingStatus: {
                    isShowDialogMark: false,
                    loadingTitle: "等待"
                },
			}
		},
        created:function(){
			// this.$message.success('先进行人脸识别 识别成功方可进行新增布控');
        },
       
		mounted: function() {
			this.initCamera();
		},
		methods: {
			//初始化摄像头 获取摄像头权限
			initCamera(){
				let self = this;
				navigator.getUserMedia  = navigator.getUserMedia ||navigator.webkitGetUserMedia ||navigator.mozGetUserMedia;
				if (navigator.getUserMedia) {
					//调用用户媒体设备, 访问摄像头
					navigator.getUserMedia({video : {width: 480, height: 320}},function(stream) {
							var video = document.querySelector('video');
							video.srcObject = stream;
							self.streamPicture = stream; //关闭摄像头需要用
							video.onloadedmetadata = function(e) {
								video.play();
							};
						}, function(err) {
							console.log("访问用户媒体设备失败: " + err.name);
						})
				} else {
					// self.$message.error('不支持访问用户媒体');
				}
			},
			//拍照点击
			takePhoto(){
				let canvas = document.getElementById('canvas');
				let context = canvas.getContext('2d');
				context.drawImage(video, 0, 0, 480, 320);      
				// 获取图片base64链接
				var image = canvas.toDataURL('image/png');
				// 定义一个img
				var img = document.getElementById("img");
				//设置属性和src
				//img.id = "imgBoxxx";
				img.src = image;
				//将图片添加到页面中
				//document.body.appendChild(img);
				function dataURLtoFile(dataurl, filename) {
					var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
						bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
					while (n--) {
						u8arr[n] = bstr.charCodeAt(n);
					}
					return new File([u8arr], filename, {type: mime});
				}
				this.File = dataURLtoFile(image, 'aa.png');
				//console.log(dataURLtoFile(image, 'aa.png'));
				return dataURLtoFile(image, 'aa.png');
			},
			//确认图片上传 人脸识别 确定权限
			sure(){
				debugger;
				var self = this;
				//console.log(this.File);
				if(this.File == ""){ //如果不点击拍照
					self.$message.warning(`请先拍照再点击确定`);
					return;
				}
				this.loadingStatus.isShowDialogMark = true;
				var formData = new FormData();
				formData.append("file",this.File);
				$.ajax({
					type: "POST", // 数据提交类型
					url: "/gateway/disposition-service/face_verification", // 发送地址
					data: formData, //发送数据
					async: true, // 是否异步
					processData: false, //processData 默认为false，当设置为true的时候,jquery ajax 提交的时候不会序列化 data，而是直接使用data
					contentType: false,
					success:function(data){
						if(data.data){
							self.$refs.addDialogRef.closeDialog();//关闭 dialog 组件 和 摄像机流 
							self.$emit('realAddNewTask'); //触发父组件realAddNewTask方法 弹出新建布控窗口
							self.$message.success(`${data.message}`);
						}else{
							self.$message.warning(`${data.message}`);
						}
						self.loadingStatus.isShowDialogMark = false;
					},
					error:function(e){
						self.loadingStatus.isShowDialogMark = false;
						self.$message.warning(`${e}`);
						//console.log("不成功"+e);
					}
				});
			},
			closeDialog(){
				//console.log("closeDialog");
				if(this.streamPicture){
                    this.streamPicture.getTracks()[0].stop();//如果是活体检测界面 关闭摄像机
                }
			}
		},
	}
</script>
<style lang="scss" scoped>
	// @import "../less/ixwpre.less";
		/* 样式 写的比较随意 感觉不好看 可以自行修改*/
		.libBox{
			width:100%;
			height:100%;
			background:  url("/static/images/searchIdentity.png") no-repeat; 
			#capture{
				// position: absolute;
				// right: 190px;
				// bottom: -40px;

			}
			#video{
				position: absolute;
				right: 0;
				top: 0;
			}
			#img{
				position: absolute;
				left: 0;
				top: 0;
			}
			.auto{
				position: absolute;
				left: 50%;
				top: 50%;
				height: 320px;
				margin-top: -160px;
			}
			#sure{
				position: absolute;
				left: 210px;
				bottom: -40px;

			}
			button{
				cursor: pointer;
				margin: 0 auto;
				border: 1px solid #f0f0f0;
				background: #5CACEE;
				color: #FFF;
				width: 100px;
				height: 36px;
				line-height: 36px;
				border-radius: 8px;
				text-align: center;
				/*禁止选择*/
				-webkit-touch-callout: none; /* iOS Safari */
				-webkit-user-select: none; /* Chrome/Safari/Opera */
				-khtml-user-select: none; /* Konqueror */
				-moz-user-select: none; /* Firefox */
				-ms-user-select: none; /* Internet Explorer/Edge */
				user-select: none; /* Non-prefixed version, currently not supported by any browser */
			}
		}
		
</style>