<template>
  <el-card>
   <Usertop one='权限管理' two='权限列表'></Usertop>
    <el-table :data="tableData" height="600" border style="width: 100% ;margin-top: 15px">
     <el-table-column type="index"></el-table-column>

      <el-table-column prop="authName" label="权限名称" width="180"></el-table-column>
      <el-table-column prop="path" label="路径" width="180"></el-table-column>
      <el-table-column  label="层级" width="180">
       <template slot-scope='scope'>
         {{scope.row.level==='0'?'一级':(scope.row.level==='1'?'二级':'三级')}}
       </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
import Usertop from '../users/usertop'
export default {
  components:{
    Usertop
  },
  data() {
    return {
      tableData: [
        {
          authName: "",
          path: "",
          level: ""
        }
      ]
    };
  },
  methods: {
    getdata() {
      this.$http({
        url: "rights/list",
        method: "get"
      }).then(res => {
        console.log(res);
        this.tableData = res.data.data;
      });
    }
  },
  mounted() {
    this.getdata();
  }
};
</script>

<style>
</style>
