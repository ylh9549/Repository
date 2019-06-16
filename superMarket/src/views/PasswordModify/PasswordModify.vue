<template>
<div class="password-modify">
    <el-card class="box-card">
  <div slot="header" class="clearfix">
    <span>密码修改</span>
    
  </div>
  <div class="text">
      <el-form style="width:350px" :model="passwordModify" status-icon :rules="rules" ref="passwordModify" label-width="100px" class="demo-ruleForm">
        <el-form-item label="原密码" prop="password">
            <el-input type="text" v-model="passwordModify.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
            <el-input type="text" v-model="passwordModify.newPassword" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
            <el-input type="text" v-model="passwordModify.checkPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="info" plain @click="submitForm()">修改</el-button>
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

    data() {


        const oldPassword = (rule,value,callback)=>{   
            this.request.post("/account/passwordmodify",{password : value})
            .then(res=>{
                let {code ,reason} = res;
                if(code === 0){
                    callback()
                }else{
                    callback(new Error(reason))
                }

            })
            .catch(err=>{
                console.log(err);
                
            })



        }




        const confirmPassword = (rule,value,callback) =>{
            if(value === ""){
                callback(new Error("确认密码不能为空"))
            }else if(value !== this.passwordModify.newPassword){
                callback(new Error("两次密码不一致"))
            }else{
                callback()
            }
        }

        
        const checkPassword = (rule,value,callback)=>{
            if(value === ""){
                callback(new Error("密码不能为空"))
            }else if(!passwordReg(value)){
                callback(new Error("以字母开头，长度在3~6之间"))
            }else{
                if(this.passwordModify.checkPass !== ""){
                    this.$refs.passwordModify.validateField("checkPass")
                }
                callback()
            }
        }




        return {
            passwordModify:{
                password:"",
                newPassword:"",
                checkPass:""
                
            },
            rules:{
                password:[
                    {required:true,validator:oldPassword,trigger:"blur"}

                ],
                newPassword:[
                    {required:true,validator:checkPassword,trigger:"blur"}
                ],
                checkPass:[
                    {required:true,validator:confirmPassword,trigger:"blur"}
                ]
            }
        }
    },

    methods: {
        submitForm(){
            this.$refs.passwordModify.validate(valid=>{
                if(valid){
                    let params = {
                        newPassword:this.passwordModify.newPassword
                    }
                    this.request.post("/account/savenewpassword",params)
                    .then(res=>{
                        let {code,reason} = res;
                        if (code === 0){
                            this.$message({
                                type:"success",
                                message:reason
                            })
                            local.remove("admin123")

                            setTimeout(()=>{
                                this.$router.push('/login')
                            },600)
                        }else if (code === 1){
                            this.$message.error(reason)
                        }
                    })
                    .catch(err=>{
                        console.log(err);
                        
                    })




                }else{
                    return
                }
            })

        }
    },
}
</script>


<style lang="less">

</style>