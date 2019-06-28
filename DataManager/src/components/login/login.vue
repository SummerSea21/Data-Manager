<template>
  <div class="back">
    <div class="content">
      <el-form
        label-position="top"
        :model="dataList"
        status-icon
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
        :rules="rules"
      >
        <h2>用户登录</h2>
        <el-form-item label="用户名" prop="username">
          <el-input status-icon type="text" v-model="dataList.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input status-icon type="password" v-model="dataList.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="btn" type="primary" @click.prevent="add">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      dataList: {
        psssword: '',
        username: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
    }
  },
  methods: {
    add () {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.$http({
            url: 'http://localhost:8888/api/private/v1/login',
            method: 'post',
            data: this.dataList
          }).then(res => {
            console.log(res)
            if (res.data.meta.status === 200) {
              window.localStorage.setItem('token', res.data.data.token)
              this.$router.push('./home')
              this.$message({
                message: '登录成功',
                type: 'success'
              })
            
            } else {
              this.$message.error('登陆失败')
            }
          })
        }
      })
    }
  }
}
</script>

<style scoped>
.back {
  width: 100%;
  height: 100%;
  background-color: #324152;
}
.content {
  width: 500px;
  height: 440px;
  padding: 40px;
  box-sizing: border-box;
  background-color: #fff;
  margin: 0 auto;
  transform: translateY(25%);
}
.btn {
  width: 100%;
}
</style>
