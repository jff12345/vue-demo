<template>
    <div>
       <son-view  :x="x" :y="y" ></son-view>
        <el-button @click="butt" >修改obj</el-button>
    </div>
</template>


<script setup>

import sonView from '@/components/sonView.vue'
import {reactive,ref} from 'vue'

const x=reactive(["景"])
const y=reactive([1])

// 父组件动态传值
const butt =()=>{

    x.push('景')
    y.push(1)
}

</script>