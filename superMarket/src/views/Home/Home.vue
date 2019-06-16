<template>
	<div class="home">

		<el-container>
			<!-- 左侧 -->
			<el-aside width="200px">
				
				<LeftNav/>
			
			</el-aside>

			<!-- 右侧 -->
			<el-container>
				<!-- 头 -->
				<el-header>
					
					<Top ref="top"></Top>
					
				</el-header>
				<!-- 中 -->
				<el-main>
					
					<router-view @A="B"></router-view>
					
				</el-main>
				<!-- 尾 -->
				<el-footer>
					
					<Bottom></Bottom>
					
				</el-footer>
			</el-container>

		</el-container>



	</div>

</template>

<script>
	
	import LeftNav from "@/components/LeftNav/LeftNav.vue"
	import Top from "@/components/Top/Top.vue"
	import Bottom from "@/components/Bottom/Bottom.vue"
	export default {
		
		components:{
			LeftNav,
			Top,
			Bottom
		},
		methods: {
			B(){
				this.$refs.top.getUserInfo()
			}
		},
	}
</script>


<style lang="less">
	@import './home.less';
</style>
