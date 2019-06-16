<template>
<div class="goods-manage">
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span>商品管理</span>
        </div>
        <div class="text">

            <!-- 查询 -->
            <div>
                <el-form size="mini" :inline="true" :model="searchForm" class="demo-form-inline">
                    <!-- 分类 -->
                    <el-form-item label="选择分类" prop="cateName">
                        <el-select v-model="searchForm.cateName" placeholder="请选择分类">
                        <el-option label="全部" value="全部"></el-option>
                        <el-option label="电子类" value="电子类"></el-option>
                        <el-option label="烟酒类" value="烟酒类"></el-option>
                        <el-option label="食品类" value="食品类"></el-option>
                        <el-option label="服装类" value="服装类"></el-option>
                        <el-option label="蔬菜类" value="蔬菜类"></el-option>
                        </el-select>
                    </el-form-item>
                    <!-- 关键字 -->
                    <el-form-item label="关键字">
                    <el-input v-model="searchForm.keyword" placeholder="商品名称或条形码"></el-input>
                    </el-form-item>
                    <!-- 查询按钮 -->
                    <el-form-item>
                    <el-button type="primary" @click="getGoodsListByPage">查询</el-button>
                    </el-form-item>
                </el-form>
            </div>


            <el-table
                ref="goodsTableData"
                :data="goodsTableData"
                tooltip-effect="dark"
                style="width: 100%"
                >
                <el-table-column type="selection" width="55"></el-table-column>
                <!-- 商品条形码 -->
                <el-table-column prop="barCode" label="商品条形码"></el-table-column>

                <!-- 商品名称 -->
                <el-table-column prop="goodsName" label="商品名称"></el-table-column>

                <!-- 所属分类 -->
                <el-table-column prop="cateName" label="所属分类"></el-table-column>

                <!-- 售价 -->
                <el-table-column prop="salePrice" label="售价"></el-table-column>

                <!-- 是否促销 -->
                <el-table-column prop="promotion" label="是否促销"></el-table-column>

                <!-- 库存 -->
                <el-table-column prop="goodsNum" label="库存"></el-table-column>
                
                <!-- 账号创建日期 -->
                <el-table-column label="日期">
                    <template slot-scope="scope">{{ scope.row.ctime | filterDate }}</template>
                </el-table-column>

			</el-table>


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
            
            
        </div>
    </el-card>

</div>
    
</template>

<script>

import moment from "moment";
export default {
    data() {
        return {
            searchForm:{
                cateName:"",
                keyword:""

            },
            goodsTableData:[],
            currentPage:1,
            pageSize:3,
            total:0,



        }
    },

    methods: {
        getGoodsListByPage(){
            let params = {
                currentPage:this.currentPage,
                pageSize:this.pageSize,
                cateName:this.searchForm.cateName,
                keyword:this.searchForm.keyword
            }
            this.request.get("/goods/goodslistbypage",params)
            .then(res=>{
                let {total,data} = res;
                this.goodsTableData = data;
                this.total = total
            })
            .catch(err=>{
                console.log(err);
                
            })

        },
        handleSizeChange(val){
            this.pageSize = val
            this.getGoodsListByPage()
        },
        handleCurrentChange(val){
            this.currentPage = val;
            this.getGoodsListByPage()
        }


    },
    created() {
        this.getGoodsListByPage()
    },
    filters:{
		filterDate (time){
			return moment(time).format("YYYY-MM-DD")
		}
	}
}
</script>


<style lang="less">

</style>