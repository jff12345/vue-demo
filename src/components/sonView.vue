<template>
    <div>
   {{ props.x }}{{ props.y }}
      <div id="main" class="box"></div>
    </div>
</template>

<script setup>
import {defineProps,onMounted,watch} from 'vue'
import * as echarts from 'echarts'

const props=defineProps(['x','y'])

const xx=props.x

const yy=props.y


// 监听变化
watch( xx, (a) => {
  eachers()
})

watch( yy, (a) => {
  eachers()
})


onMounted(()=>{
  eachers()

})

const eachers= ()=>{
  // 基于准备好的dom，初始化echarts实例
var myChart = echarts.init(document.getElementById('main'));
// 绘制图表
myChart.setOption({
  title: {
    text: 'ECharts 入门示例'
  },
  tooltip: {},
  xAxis: {
    data: props.x
  },
  yAxis: {},
  series: [
    {
      name: '销量',
      type: 'bar',
      data: props.y
    }
  ]
});
}



</script>


<style scoped >
.box{
    width: 500px;
    height: 500px;
}
</style>