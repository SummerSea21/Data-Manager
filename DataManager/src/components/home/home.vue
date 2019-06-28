<template>
  <el-container>
    <el-header>
      <topHead></topHead>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <Sidebar></Sidebar>
      </el-aside>
      <el-main>
     <router-view>
     </router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import Sidebar from '../layout/sidebar'
import topHead from '../layout/topHead'
export default {
  components: {
    Sidebar,
    topHead
  },
  mounted () {
    let token = window.localStorage.getItem('token')
    if (!token) {
      this.$message({
        message:'请登录'
      })
      this.$router.push('/login')
    }
  }
}
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
 height: 100%;
}
img {
  width: 65px;
}
.lable {
  color: #fff;
  line-height: 28px;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-seri;
}
</style>
