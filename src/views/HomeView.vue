<template>
  <cesium-view> 
  </cesium-view> 

<div class="left-operate">
  <el-button  size="small" @click="reposition()">复位</el-button>
  <el-button   size="small" @click="revolveHawkeye()">视点飞行</el-button>
  <el-button  size="small" @click="addBrightness()">增加亮度</el-button>
  <el-button :disabled="issubtractBrightness"  size="small" @click="subtractBrightness()">减小亮度</el-button>
  <el-button  size="small" @click="addBuilding()">{{ houseTitle }}</el-button>
  <el-button  size="small" @click="addImage()">{{ title }}</el-button>
  <el-button  size="small" @click="addRain()">{{ rainTitle }}</el-button>
  <el-button  v-if="rain==true"  size="small" @click="bigrainSpeed()">大雨</el-button>
  <el-button  v-if="rain==true" :disabled="isRain"  size="small" @click="minirainSpeed()">小雨</el-button>
  <el-button  size="small" @click="handoff2D3D(2)">2维</el-button>
  <el-button  size="small" @click="handoff2D3D(1)">2.5维</el-button>
  <el-button  size="small" @click="handoff2D3D(3)">3维</el-button>
  <el-button  size="small" @click="addCar()">{{ carTitle }}</el-button>
  <el-button  size="small" @click="addHawkeye()">{{ hawkeyeTitle }}</el-button>
  <el-button  size="small" @click="addPunctuation()">{{ punctuationTitle }}</el-button>

  </div>
</template>
<script setup>
  
import CesiumView from '@/cesium/index.vue'
import {
         map,                     //  实例
         fly,                     //  飞行
         flyRoaming,              //  飞行漫游
         setDefaultBrightness,    //  亮度  
         buildingModel,           //  3D房子
         addImages,               //  添加影像
         addRainEffect,           //  添加下雨特效
         morphTo,                 //  23维切换
         addDemoGraphic1,         //  小车模型
         hawkeyeAPI,              //  鹰眼图
         punctuationsAPI ,        //  添加标签
        
       
        } from '@/cesium/cesium.js'
import {ref ,reactive ,watch } from 'vue'

// 复位开始
function reposition(){
 const cameraView = { lng: 116.391245, lat: 39.905757, alt: 20000000,heading:0,pitch:-90,roll:0 }
 const options = {duration:2}
  fly(cameraView,options)
}
// 复位结束

const arr = reactive([
{ lat: 39.905757, lng: 116.391245, alt: 697.3, heading: 0, pitch: -26.2 ,duration:10,stop:0 },
{ lat: 39.905757, lng: 116.391245, alt: 697.3, heading: 90, pitch: -26.2,duration:2,stop:0 },
{ lat: 39.905757, lng: 116.391245, alt: 697.3, heading: 180, pitch: -26.2,duration:5,stop:0 },
{ lat: 39.905757, lng: 116.391245, alt: 697.3, heading: 270, pitch: -26.2,duration:7,stop:0 },
{ lat: 39.905757, lng: 116.391245, alt: 697.3, heading: 360, pitch: -26.2,duration:10,stop:0 },
])
function  revolveHawkeye(){
  flyRoaming(arr)
}

// 调整亮度开始
const  brightness = ref(1)
const issubtractBrightness=ref(false)
function addBrightness(){
  brightness.value =brightness.value+0.1
  setDefaultBrightness(brightness.value)
}
function subtractBrightness(){
  brightness.value =brightness.value-0.1
  setDefaultBrightness(brightness.value)
}
watch(brightness,(a)=>{
  a>0.2?issubtractBrightness.value=false:issubtractBrightness.value=true
})

// 调整亮度结束

// 添加3d建筑开始
const addHouse=ref(false)
const houseTitle=ref('添加3D建筑')
function addBuilding(){
  addHouse.value=!addHouse.value
  addHouse.value==true?houseTitle.value='移除3D建筑':houseTitle.value='添加3D建筑'
  buildingModel(addHouse.value)
  fly({ lng: 116.391245, lat: 39.905757, alt: 697.3,heading:357.3,pitch:-26.2,roll:0 },{options:4})
}
// 添加3d建筑结束


// 添加影像开始
const a = ref(false)
const title = ref('添加影像')
function addImage(){
    a.value=!a.value
    a.value==true?title.value='关闭影像':title.value='添加影像';
  addImages(a.value)
 
}
// 添加影像结束

// 开启下雨
const rain = ref(false)
const rainTitle = ref('下雨')
function addRain(){
    rain.value=!rain.value
    rain.value==true?rainTitle.value='雨停':rainTitle.value='下雨'
   
 ;
 addRainEffect(rain.value)
}
// 关闭下雨

// 雨速控制开始
const rainSpeed =ref(10)
const isRain =ref(false)
 function bigrainSpeed(){
  rainSpeed.value=rainSpeed.value+1
 map.effects.rain.speed =rainSpeed.value
 }
 function minirainSpeed(){
  rainSpeed.value=rainSpeed.value-1
 map.effects.rain.speed =rainSpeed.value
 }
 watch(rainSpeed,(a)=>{
  a>2?isRain.value=false:isRain.value=true
})
 
// 雨速控制结束

// 切换23维开始
function handoff2D3D(type){
  morphTo(type)
}
// 切换23维结束



// 添加影像开始
const car = ref(false)
const carTitle = ref('添加小车')
function addCar(){
  car.value=!car.value
  car.value==true?carTitle.value='移除小车':carTitle.value='添加小车';
 addDemoGraphic1(car.value)
}
// 添加影像结束








// 添加鹰眼图开始
const hawkeye = ref(false)
const hawkeyeTitle = ref('添加鹰眼图')
function addHawkeye(){
   hawkeye.value=!hawkeye.value
   hawkeye.value==true?hawkeyeTitle.value='移除鹰眼图':hawkeyeTitle.value='添加鹰眼图';
   hawkeyeAPI(hawkeye.value)
}
// 添加鹰眼图结束



// 添加鹰眼图开始
const punctuation = ref(false)
const punctuationTitle = ref('添加标点')
function addPunctuation(){
  punctuation.value=!punctuation.value
  punctuation.value==true?punctuationTitle.value='移除标点':punctuationTitle.value='添加标点';
  punctuationsAPI(punctuation.value)
}
// 添加鹰眼图结束



















</script>

<style scoped>
.left-operate{
 position: absolute;
 left: 0;
 top: 0;
 width: 100%;
 color: aqua;
 


}
</style>