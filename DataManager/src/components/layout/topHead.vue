<template>
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
</template>

<script>
export default {
  methods: {
    move () {
      this.$confirm('确认退出系统?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        window.localStorage.removeItem('token')
        this.$router.push('/login')
      })
    }

  }
}
</script>

<style>

</style>
