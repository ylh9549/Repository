<template>
	<div class="top">
		<el-row :gutter="20">
			<!-- 左侧标题 -->
			<el-col :span="20">
				<h3 class="title">
					<i class="el-icon-menu"></i>
					华联超市管理系统
				</h3>
			</el-col>
			<!-- 右侧 -->
			<el-col :span="4">
				<el-row>
					<el-col :span="8">
						<!-- 头像 -->
						<div class="avatar">
							<img width="100%" height="100%" :src="imgUrl"/>
						</div>
					</el-col>
					<el-col :span="16">
						<!-- 登录账号名 -->
						<el-dropdown  @command="handleCommand">
							<span class="el-dropdown-link">
								{{account}}<i class="el-icon-arrow-down el-icon--right"></i>
							</span>
							<el-dropdown-menu slot="dropdown">
								<el-dropdown-item command="personal">个人中心</el-dropdown-item>
								<el-dropdown-item command="logout">退出系统</el-dropdown-item>
							</el-dropdown-menu>
						</el-dropdown>
					</el-col>


				</el-row>

			</el-col>
		</el-row>
	</div>
</template>

<script>
	import local from '@/utils/local'

	export default {
		data() {
			return {
				account:"",
				imgUrl:""
			}
		},
		methods: {
			handleCommand(command){
				if (command === "personal"){
					this.$router.push("/home/personal")
					
				}else if(command === "logout"){
					local.remove("admin123");
					this.$message({
						type:"success",
						message:"退出成功"
					})
					setTimeout(()=>{
						this.$router.push("/login")
					},1000)
				}
				
			},
			 getUserInfo(){
				this.request.get("/account/accountinfo")
				.then(res=>{
					let {account,img_url} = res[0]
					this.account = account;
					this.imgUrl = `http://127.0.0.1:666/${img_url}`;

				})
				.catch(err=>{
					console.log(err);
					
				})
			}
			




		},

		created() {



			this. getUserInfo();


		},



	}
</script>

<style lang="less">
	@import "./top.less";
</style>
