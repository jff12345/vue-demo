<template>
  <h1>
    {{ a.count }}
    {{ b.name }}
  </h1>
  <div>
    <el-input  v-model="a.count"  ></el-input>
    <el-button  @click="xiugai()"  >修改</el-button>
   
  </div>
</template>


<script setup >
// 首先需要引入一下我们刚刚创建的store
import {useCounter,useUser} from '@/stores/index.js'
// 因为是个方法，所以我们得调用一下
const a= useCounter()
const b= useUser()



 function xiugai (){

  a.add()
  b.add()
 }
  
</script>
