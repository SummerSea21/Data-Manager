<template>
  <el-card>
    <div class="nav">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户列表</el-breadcrumb-item>
      </el-breadcrumb>
      <el-row style="margin-top: 15px;">
        <el-col :span="8">
          <el-input placeholder="请输入内容" class="input-with-select" v-model="query">
            <el-button slot="append" icon="el-icon-search" @click.prevent="search"></el-button>
          </el-input>
          <!-- <span>{{searchN}}</span> -->
        </el-col>
        <el-button style="margin-left:5px;" type="success" plain @click.prevent="addUser">添加用户</el-button>
      </el-row>
    </div>
    <el-table :data="tableData" border style="margin-top: 15px;width: 100%">
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="username" label="姓名" width="100"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
      <el-table-column prop="mobile" label="电话"></el-table-column>
      <el-table-column label="用户状态">
        <templte slot-scope="scope">
          <span>{{scope.row}}</span>
          <el-switch v-model="scope.row.mg_state" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </templte>
      </el-table-column>
      <el-table-column label="操作">
        <templte slot-scope="scope">
          <span>{{scope.row.id}}</span>
          <el-button type="primary" icon="el-icon-edit" plain size="mini"></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            plain
            size="mini"
            @click.prevent="mydel(scope.row.id)"
          ></el-button>
          <el-button type="success" icon="el-icon-check" plain size="mini" @click.prevent="role"></el-button>
        </templte>
      </el-table-column>
    </el-table>
    <el-pagination
      @current-change="pc"
      @size-change="sc"
      :current-change="pagenum"
      style="margin-top: 15px;"
      :page-sizes="pagesizes"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
    <!-- 新增对话增加用户面板 -->
    <el-dialog title="添加用户" :visible.sync="dialogFormVisible">
      <el-form
        label-position="top"
        status-icon
        :model="adduser"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
        :rules="rules"
      >
        <el-form-item label="用户名">
          <el-input status-icon type="text" v-model="adduser.username"></el-input>
          <div>{{adduser}}</div>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input status-icon type="password" v-model="adduser.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input status-icon type="email" v-model="adduser.email"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="mobile">
          <el-input status-icon v-model="adduser.mobile" ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.prevent="noadd">取 消</el-button>
        <el-button type="primary" @click.prevent="addUserfn">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>
<script>
export default {
  data() {
    return {
      tableData: [
        {
          username: "",
          emil: "",
          mobile: ""
        }
      ],
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        email: [{ required: true, message: "请输入邮箱地址", trigger: "blur" }],
        mobile: [{ required: true, trigger: "blur", message: "请输入电话" }]
      },
      adduser: {
        password: "",
        username: "",
        emil: "",
        mobile: ""
      },
      query: "",
      pagenum: 1,
      pagesize: 5,
      pagesizes: [5, 10],
      total: "",
      dialogFormVisible: false
    };
  },
  methods: {
    getData() {
      this.$http({
        url: `http://localhost:8888/api/private/v1/users?query=${
          this.query
        }&pagenum=${this.pagenum}&pagesize=${this.pagesize}`,
        method: "get",
        headers: {
          Authorization: window.localStorage.getItem("token")
        }
      }).then(res => {
        console.log(res);

        let { data, meta } = res.data;
        if (meta.status === 200) {
          this.tableData = data.users;
          this.total = data.total;
        }
      });
    },
    addUser() {
      this.dialogFormVisible = true;
    },
    noadd() {
      this.dialogFormVisible = false;
    },
    addUserfn() {
      this.$http({
        url: "http://localhost:8888/api/private/v1/users",
        method: "post",
        data: this.adduser,
        headers: {
          Authorization: window.localStorage.getItem("token")
        }
      }).then(res => {
        if (res.data.meta.status === 201) {
          this.$message({
            message: res.data.meta.msg,
            type: "success"
          });
          this.getData();
        }
        for (const key in this.adduser) {
          this.adduser[key] = "";
        }
        this.dialogFormVisible = false;
      });
    },
    mydel(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$http({
          url: "http://localhost:8888/api/private/v1/users/" + id,
          method: "delete",
          headers: {
            Authorization: window.localStorage.getItem("token")
          }
        }).then(res=>{
          if(res.data.meta.status===200){
            this.getData()
             this.$message({
            type: 'success',
            message: '删除成功!'
          });
          }
        });
      });
    },
   
    pc(currentpage) {
      this.pagenum = currentpage;
      this.getData();
    },
    sc(pagesize) {
      this.pagesize = pagesize;
      this.getData();
    },
    search() {
      this.getData();
    },
  
  },
  mounted() {
    this.getData();
  }
};
</script>

<style>
</style>