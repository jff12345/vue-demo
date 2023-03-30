<template>
    <div>
        <el-input  v-model="x.name" ></el-input>
    </div>
</template>


<script setup >

import {reactive,watch} from 'vue'

const x = reactive({
    name:'景'
})


// 监听对象中的某个属性
watch(
  () => x.name,
  (a,b) => {
    // 输出的也是某个属性
  console.log(a,b);
  }
)

// 某个属性改变可以输出它父级的具体对象
watch(x, (a) => {
  console.log(a);
})


</script>