<template>
   <div :id="Pid" class="cesium_box" >
   </div>
  
</template>


<script setup>
import { onMounted } from 'vue';
import Cesium from '@/cesium/cesium.js';
import {id} from '@/cesium/cesium.js';
const GIS =new Cesium()
const Pid =id

onMounted(()=>{
  GIS.initMap()
})

</script>


<style scoped>
.cesium_box{
   width: 100%;
   height: 100vh;
}

</style>