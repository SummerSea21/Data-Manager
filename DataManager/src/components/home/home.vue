<template>
  <el-container>
    <el-header>
      <el-row>
        <el-col :span="4">
          <img src="./logo.png" alt="">
        </el-col>
        <el-col :span="16">
          <h2 class='lable'>电商后台管理系统</h2>
        </el-col>
        <el-col :span="4">
          <el-button type="info" @click="move">退出</el-button>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside width="200px">
       <Sidebar></Sidebar>
      </el-aside>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>
<script>
import Sidebar from './sidebar'
export default {
    components:{
        Sidebar
    },
    methods:{
        move(){
            this.$router.push('/login')
        }
    }
};
</script>

<style>
.el-container {
  height: 100%;
}
.el-header {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #fff;
  color: #333;
  line-height: 200px;

}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}
img{
    width: 65px;
}
.lable{
    color:#fff;
    line-height: 28px;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-seri 
}
</style>
