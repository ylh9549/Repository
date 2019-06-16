<template>
	<div class="login">
		
		<el-card class="box-card">
            <div slot="header" class="clearfix">
                <h1>
                    <span class="el-icon-menu"></span> 华联超市管理系统</h1>
            </div>

            <div class="text item">
                <el-form :model="loginForm" status-icon :rules="rules" ref="loginForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="账号" prop="account">
                        <el-input type="text" v-model="loginForm.account" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input type="password" v-model="loginForm.password" autocomplete="off"></el-input>
                    </el-form-item>
					<el-form-item label="确认密码" prop="checkPass">
						<el-input type="password" v-model="loginForm.checkPass" autocomplete="off"></el-input>
					</el-form-item>
                    <el-form-item>
                        <el-button type="info" plain @click="submitForm()">登录</el-button>
                        <el-button type="info" plain @click="resetForm()">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-card>
	</div>

</template>

<script>
	import {passwordReg} from "@/utils/validator";

	import local from '@/utils/local'
	
	export default {
		data(){
			//确认密码自定义函数
			const confirmPassword = (rule,value,callback) =>{
				if(value === ""){
					callback(new Error("确认密码不能为空"))
				}else if(value !== this.loginForm.password){
					callback(new Error("两次密码不一致"))
				}else{
					callback()
				}
			}
			
			//密码自定义函数
			const checkPassword = (rule,value,callback)=>{
				if(value === ""){
					callback(new Error("密码不能为空"))
				}else if(!passwordReg(value)){
					callback(new Error("以字母开头，长度在3~6之间，只能包含字符、数字和下划线"))
				}else{
					if(this.loginForm.checkPass !== ""){
						this.$refs.loginForm.validateField('checkPass')
					}
					callback()
				}
			}
			
			
			
			
			return{
				loginForm:{
					account:"",
					password:"",
					checkPass:""
				},
				rules:{
					account:[
						{required: true, message: '请输入账号', trigger: 'blur'},
						{min:3,max:6,message:"账号长度 3~6 位",trigger:"blur"}
						
					],
					password:[
						{required:true,validator:checkPassword,trigger:"blur"}
					],
					checkPass:[
						{required:true,validator:confirmPassword,trigger:"blur"}
					]
					
				}
			}
		},
		methods:{
			submitForm(){
				this.$refs.loginForm.validate(valid=>{
					if(valid){
						let params = {
							account:this.loginForm.account,
							password:this.loginForm.password
						}
						this.request.post("/login/checklogin",params)
							.then(res=>{
								let { code, reason, token} = res;
								
								
								if (code === 0){

									local.save("admin123",token)

								
									
									this.$message({
										type:"success",
										message:reason
									})

									this.$router.push("/home")

								}else if (code === 1){
									this.$message.error(reason)
								}
								
							})
							.catch(err=>{
								console.log(err);
								
							})
			
					}
				})
				
			},
			resetForm(){
				this.$refs.loginForm.resetFields()
			}
			
		}

	}
</script>


<style lang="less">
	@import "./login.less";
</style>
