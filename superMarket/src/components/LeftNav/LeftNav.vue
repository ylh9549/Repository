<template>

	<div class="left-nav">
		<el-menu default-active="$route.path"
		 class="el-menu-vertical-demo"
		 background-color="#495B70"
		 text-color="#fff"
		 active-text-color="#ffd04b"
		 unique-opened
		 router
		  >
			<el-submenu :index="(index + 1) + ' '" v-for="(menu,index) in menus" :key="index">
				<template slot="title">
					<i :class="menu.iconClass"></i>
					<span>{{menu.title}}</span>
				</template>
				
					<el-menu-item :index="subMenu.path" v-for="(subMenu,index) in menu.children" :key="index">{{subMenu.subTitle}}</el-menu-item>
			</el-submenu>
			
		</el-menu>

	</div>

</template>

<script>
	export default {
		data(){
			return {
				menus : []
			}
		},
		methods: {
			getMenus(){
				this.request.get('/account/menus')
				.then(res=>{
					this.menus = res.accessMenu;
				})
				.catch(err=>{
					console.log(err);
					
				})
			}
		},
		created() {
			this.getMenus()
		},
	}
</script>


<style lang="less">
	@import './leftnav.less';
</style>
