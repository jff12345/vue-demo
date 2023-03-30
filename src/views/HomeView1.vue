
<template>
<div class="box">
  <div class="header">
    <!-- <div class="touxiang"><div>
      <img class="image" src="@/assets/image/dog.png" alt="">
    </div></div>
    <div class="user"><div></div></div> -->
  </div>
  <div class="container">
     <div class="aside">
      <!-- 左侧开始 -->
       <el-menu
        active-text-color="#ffd04b"
        background-color="#545c64"
        class="el-menu-vertical-demo"
        text-color="#fff"
        unique-opened
        @select="handleselect"
      >
          <template  v-for="(item,index) in menu" :key='index' >
          <el-sub-menu v-if="item.submenu.length>0" :index="item.identity">
          <template #title>
            <el-icon></el-icon>
            <span>{{item.name}}</span>
          </template>
          <el-menu-item-group v-for="x in item.submenu" :key='x.identity' >
            <el-menu-item :index="x.identity">  <el-icon></el-icon>
             <span>  {{x.name}}</span></el-menu-item>
          </el-menu-item-group>
          </el-sub-menu>
          <el-menu-item  v-else  :index="item.identity">
            <el-icon></el-icon>
             <span>  {{item.name}}</span>
          </el-menu-item>
          </template>
      </el-menu>

      <!-- 左侧结束 -->
     </div>
     <div class="main"><router-view></router-view></div>
  </div>
</div>
</template>


<script   setup >
import {reactive} from "vue"
import { useRouter } from 'vue-router'
import  aside from '../assets/menu/aside.json'

 const router = useRouter()
const menu = reactive(aside)  

// 跳转路由
const handleselect =(a)=>{
   router.push('/'+a)
}


</script>


<style scoped>
.box{
  height: 100vh;
  display: grid;
  grid-template-rows: 100px auto ;
}

.container{
  display: grid;
  grid-template-columns: 200px auto ;
}
  .header{
      border-bottom: 1px solid #ccc;
       display: grid;
        grid-template-columns: 200px auto ;
        }
.touxiang{
     display: grid;
     justify-items: center;
     align-items: center;
}
.image{
  width: 80px;
  height: 80px;
}

 .image:hover{
     width: 100px;
     height: 100px;
  }

    .aside{
      background-color: #545c64;
  }
  
</style>