<template>
<div class="sales-total">
      <!-- 面板组件 -->
       <el-card class="box-card">
            <!-- 头部 -->
            <div slot="header" class="clearfix">
                <span>销售统计</span>
            </div>
            <!-- 内容 -->
            <div class="text item">
                <!-- 1 准备一个容器 -->
                <div id="box" style="height: 400px;"></div>
            </div>

        </el-card>
</div>
    
</template>

<script>
export default {
    mounted() {
         // 这是后端响应的数据   
      var res = {
          categoryName: ['2019-04-10', '2019-04-11', '2019-04-12', '2019-04-13', '2019-04-14', '2019-04-15', '2019-04-16'],
          value: [500, 1500, 3000, 2000, 1250, 460, 5000]
      }
      let {categoryName,value} = res;
      this.drawSalesChart(categoryName,value)

        
    },
    methods: {
        drawSalesChart(categoryData=[],value=[]){
            let myChart = this.echarts.init(document.getElementById("box"))
            let option = {
                tooltip: {
                    show: true
                },
                legend: {
                    data:['销量']
                },
                xAxis : [
                    {
                        type : 'category',
                        data : categoryData
                    }
                ],
                yAxis : [
                    {
                        type : 'value'
                    }
                ],
                series : [
                    {
                        "name":"销量",
                        "type":"line",
                        "data":value
                    }
                ]

            }
            myChart.setOption(option)

        }
        
    },
    
}
</script>


<style lang="less">

</style>