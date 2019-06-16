<template>
	<div class="account-manage">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>账号管理</span>

			</div>
			<div class="text">
				
				<el-table
					@selection-change="handleSelectionChange"
					ref="accountTableData"
					:data="accountTableData"
					tooltip-effect="dark"
					style="width: 100%"
					>

					<el-table-column
					type="selection"
					width="55">
					</el-table-column>

					<el-table-column
					prop="account"
					label="账号">
					</el-table-column>

					<el-table-column
					prop="usergroup"
					label="用户组">
					</el-table-column>

					<el-table-column
					label="日期">
					 <template slot-scope="scope">{{ scope.row.createdate | filterDate}}</template>
					</el-table-column>

					<el-table-column label="操作">
						<template slot-scope="scope">
							<el-button
								size="mini"
								type="info" plain
								@click="handleEdit(scope.row.id)">
								修改
							</el-button>
							<el-button
								size="mini"
								type="info" plain
								@click="handleDelete(scope.row.id)">删除
							</el-button>


						</template>

					</el-table-column>

				</el-table>

				<!-- 修改模态框 -->
				<el-dialog width="440px" title="修改账号" :visible.sync="dialogFormVisible">
				<!-- 修改表单 -->
				<el-form :model="editForm" :rules="rules" ref="editForm">

					<!-- 账号 -->
					<el-form-item prop="account" style="width: 320px;" label="账号" :label-width="formLabelWidth">
					<el-input v-model="editForm.account" auto-complete="off"></el-input>
					</el-form-item>

					<!-- 用户组 -->
					<el-form-item prop="userGroup" label="用户组" :label-width="formLabelWidth">
					<el-select v-model="editForm.userGroup" placeholder="请选择用户组">
						<el-option label="超级管理员" value="超级管理员"></el-option>
						<el-option label="普通用户" value="普通用户"></el-option>
					</el-select>
					</el-form-item>

				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button @click="dialogFormVisible = false">取 消</el-button>
					<el-button type="primary" @click="saveEdit">确 定</el-button>
				</div>
				</el-dialog>


				 <!-- 分页组件 -->
				<div style="margin-top: 20px">
				<el-pagination
					@size-change="handleSizeChange"
					@current-change="handleCurrentChange"
					:current-page="currentPage" 
					:page-sizes="[1, 3, 5, 10, 20, 50]"
					:page-size="pageSize"
					layout="total, sizes, prev, pager, next, jumper"
					:total="total">
				</el-pagination>
				</div>

				<!-- 批量删除 -->
				<div style="margin-top: 20px">
					<el-button type="info" plain @click="batchDel">批量删除</el-button>
					<el-button type="info" plain @click="cancelSelect">取消选择</el-button>
				</div>
			</div>
		</el-card>
	</div>

</template>

<script>

import moment from "moment";
export default {
  data() {
		return {
			accountTableData: [],
			currentPage: 1,//当前页
			pageSize: 3,
			total: 0,
			editForm:{
				account:"",
				userGroup:""
			},
			editId:"",
			dialogFormVisible: false,
			formLabelWidth: '100px',
			rules:{
				account:[
					{required: true, message: '账号不能为空', trigger: 'blur'},
					{min: 3, max: 6, message: '账号长度 3~6 位', trigger: 'blur'}
				]
			},
			selectedId:[]//删除选择id数组
			
		};
	},
	methods: {
		getAccountList() {
			//发送axios 请求所有账号数据
			// this.request.get("/account/accountlist")
			// .then(res=>{
			// 	this.accountTableData = res;
			// })
			// .catch(err=>{
			// 	console.log(err);
				
			// })

			let params = {
				currentPage:this.currentPage,
				pageSize:this.pageSize
			}
			
			//请求数据
			this.request.get("/account/accountlistbypage",params)
				.then(res=>{
					let {total,data} = res;
					
					//赋值给对应变量
					this.total = total;
					this.accountTableData = data;

					if (!data.length && this.currentPage !== 1){
						this.currentPage -= 1;
						this.getAccountList();
					}

				})
				.catch(err=>{
					console.log(err);
					
				})
			

		},


		//修改
		handleEdit(id){
			//显示模态框
			this.dialogFormVisible=true;
			//id
			this.editId=id;
			this.request.get("/account/editaccount",{id})
				.then(res=>{
					this.editForm.account = res[0].account;
					this.editForm.userGroup = res[0].usergroup;
				})
				.catch(res=>{
					console.log(err);
					
				})
		
		},

		//保存修改
		saveEdit(){

			//获取整个表单验证
			this.$refs.editForm.validate(valid=>{
				if(valid){
					this.dialogFormVisible = false;
					let params = {
						account:this.editForm.account,
						userGroup:this.editForm.userGroup,
						editId:this.editId
					}

					this.request.post("/account/saveeditaccount",params)

						.then(res=>{
							let {code,reason} = res;
							
							if (code === 0){
								this.$message({
									type:"success",
									message:reason
								})
								this.getAccountList()
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
		
		//取消选择
		cancelSelect(){
			this.$refs.accountTableData.clearSelection();
		},

		//删除
		handleDelete(id){

			// 优化删除体验
			this.$confirm('你确定要删除吗?', '温馨提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				// 发送请求给后端 传id给后端
				this.request.get("/account/delaccount",{id})
				.then(res=>{
					let {code,reason} = res;
					if(code===0){
						this.$message({
							type:"success",
							message:reason
						})
						this.getAccountList();
					}else if(code===1){
						this.$message.error(reason)
					}
					
				})
				.catch(err=>{
					console.log(err);
					
				})
				
			}).catch(() => {
				this.$message({
					type: 'info',
					message: '已取消删除'
				})
			})

			
			
		},


		//当选中选择框的状态发送变化 就触发这个函数
		handleSelectionChange(val){
			this.selectedId = val.map(v => v.id);
			// console.log(this.selectedId);
			
		},

		//批量删除
		batchDel(){
			if (!this.selectedId.length){
				this.$message.error("请选择以后再操作")
				return
			}


			  // 优化删除体验
			this.$confirm('你确定要批量删除吗?', '温馨提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => { // 确定

			let params = {
				idArr:this.selectedId
			}
			this.request.get("/account/batchdel",params)
				.then(res=>{
					let {code,reason} = res;
					if (code === 0){
						this.$message({
							type:"success",
							message:reason
						})
						this.getAccountList()
					}else if (code ===1){
						this.$message.error(reason)
					}
				})
				.catch(err=>{		
					console.log(err);
				})

			
			}).catch(() => { // 取消
				this.$message({
					type: 'info',
					message: '已取消删除'
				})
			})

			

		},


		//每页条数改变
		handleSizeChange(val){
			this.pageSize = val;
			this.getAccountList();
			
		},
		handleCurrentChange(val){
			this.currentPage = val;
			this.getAccountList();

		}

	},
	//生命周期钩子函数 vue实例对象创建完成 dom还没有生成
	created() {

		this.getAccountList();
		
	},
	filters:{
		//过滤时间
		filterDate (time){
			return moment(time).format("YYYY-MM-DD")
		}
	}

};
</script>


<style lang="less">
@import "./accountManage.less";
</style>