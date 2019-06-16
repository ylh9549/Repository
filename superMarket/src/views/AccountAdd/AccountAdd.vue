<template>
<div class="account-add">
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span>添加账号</span>
        </div>
        <div class="text">
            <el-form style="width:300px" :model="accountAdd" status-icon :rules="rules" ref="accountAdd" label-width="100px" class="demo-ruleForm">
                <el-form-item label="用户名" prop="account">
                    <el-input type="text" v-model="accountAdd.account" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="accountAdd.password" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkPass">
                    <el-input type="password" v-model="accountAdd.checkPass" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="选择用户组" prop="usergroup">
                    <el-select v-model="accountAdd.usergroup" placeholder="请选择用户组">
                    <el-option label="超级管理员" value="超级管理员"></el-option>
                    <el-option label="普通用户" value="普通用户"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item>
                    <el-button type="info" plain @click="submitForm()">添加</el-button>
                </el-form-item>
            </el-form>
            
        </div>
    </el-card>
</div>
    
</template>

<script>


import {passwordReg} from "@/utils/validator";
import qs from "qs";



export default {
    data() {

        const checkPassword = (rule,value,callback) =>{
            if(value === ""){
                callback(new Error("密码不能为空"))
            }else if(!passwordReg(value)){
                callback(new Error("以字母开头，长度在3~6之间"))
            }else{
                if(this.accountAdd.checkPass !== ""){
                    this.$refs.accountAdd.validateField("checkPass")
                }
                callback()
            }
        }


        const confirmPassword = (rule, value, callback) => {
            if (value === '') { // 非空
                callback(new Error('确认密码不能为空'))
            } else if (value !== this.accountAdd.password) {   // 一致性
                callback(new Error('两次密码不一致'))
            } else {
                callback(); // 成功
            }
        }

        return {
            accountAdd:{
                account:"",
                password:"",
                checkPass:"",
                usergroup:""
            },
            rules:{
                account:[
                    {required:true,message:"请输入用户名",trigger:"blur"},
                    {min:3,max:6,message:"账号长度 3~6 位",trigger:"blur"}

                ],
                password:[
                   {required: true, validator: checkPassword, trigger: 'blur'}
                ],
                checkPass:[
                    {required: true, validator: confirmPassword, trigger: 'blur'}
                ],
                 usergroup: [
                    {required: true, message: '请选择用户组', trigger: 'change'} // 非空
                ]
            }
        }
    },
    methods: {
        submitForm(){
            this.$refs.accountAdd.validate(valid => {
                //如果通过验证valid就是true 否则就是false
                if(valid) {
                    let params = {
                        account:this.accountAdd.account,
                        password:this.accountAdd.password,
                        usergroup:this.accountAdd.usergroup
                    }
                    // console.log(this.request);
                    this.request.post("/account/accountadd",params)
                    .then(res =>{
                        //获取后端响应回来的数据
                        let {code,reason} = res;
                        //判断
                        if(code === 0){
                            this.$message({
                                type:"success",
                                message:reason
                            })
                            //跳转账号列表
                            this.$router.push("/home/accountmanage")
                        }else if(code === 1){
                            this.$message.error(reason)
                        }
                    })
                    .catch(err =>{
                        console.log(err);
                        
                    })
                }else{
                    console.log("前端验证不通过");
                    return
                    
                }
            })
        }
    },
}
</script>


<style lang="less">

</style>

