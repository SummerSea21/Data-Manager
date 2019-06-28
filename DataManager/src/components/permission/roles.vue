<template>
  <el-card>
    <div class="nav">
      <Usertop one="权限管理" two="角色列表"></Usertop>
      <el-row style="margin-top: 15px;">
        <el-button type="default" plain @click.prevent="addUser">添加用户</el-button>
      </el-row>
      <!-- 列表 -->
      <el-table :data="roleData" border style="margin-top: 30px;width: 100%">
        <el-table-column type="expand">
          <template slot-scope="scope">
            {{scope.row}}
            <el-row v-for="item1 in scope.row.children" :key="item1.id">
              <el-col :span="4">
                <el-tag
                  closable
                  style="margin-top: 5px;"
                  @close="delperm(scope.row.id,item1.id,scope.row)"
                >{{item1.authName}}</el-tag>
                <i class="el-icon-arrow-right"></i>
              </el-col>
              <el-col :span="20">
                <el-row v-for="item2 in item1.children" :key="item2.id">
                  <el-col :span="5">
                    <el-tag
                      closable
                      type="success"
                      style="margin-top: 5px;"
                      @close="delperm(scope.row.id,item2.id,scope.row)"
                    >{{item2.authName}}</el-tag>
                    <i class="el-icon-arrow-right"></i>
                  </el-col>
                  <el-col :span="19">
                    <el-tag
                      closable
                      type="warning"
                      v-for="item3 in item2.children"
                      :key="item3.id"
                      style="margin-top: 5px;margin-right: 10px"
                      @close="delperm(scope.row.id,item3.id,scope.row)"
                    >{{item3.authName}}</el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="roleName" label="角色名称" width="400"></el-table-column>
        <el-table-column prop="roleDesc" label="角色描述" width="400"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            {{scope.row.id}}
            <el-button
              type="primary"
              icon="el-icon-edit"
              plain
              size="mini"
              @click.prevent="edit(scope.row.id)"
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              plain
              size="mini"
              @click="mydel(scope.row.id)"
            ></el-button>
            <el-button
              type="success"
              icon="el-icon-check"
              plain
              size="mini"
              @click.prevent="editRole(scope.row.children)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 添加角色对话框 -->
      <el-dialog title="添加用户" :visible.sync="dialogFormVisible" width="30%">
        <el-form
          label-position="left"
          status-icon
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
          width="180"
        >
          <el-form-item label="角色名称">
            <el-input status-icon v-model="roleList.roleName"></el-input>
          </el-form-item>
          <el-form-item label="角色描述">
            <el-input status-icon v-model="roleList.roleDesc"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click.prevent="noadd">取 消</el-button>
          <el-button type="primary" @click.prevent="add">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 编辑橘色 -->
      <el-dialog title="编辑用户" :visible.sync="editdial" width="30%">
        <el-form
          label-position="left"
          status-icon
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
          width="180"
        >
          <el-form-item label="角色名称">
            <el-input status-icon v-model="editlist.roleName"></el-input>
          </el-form-item>
          <el-form-item label="角色描述">
            <el-input status-icon v-model="editlist.roleDesc"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click.prevent="noedit">取 消</el-button>
          <el-button type="primary" @click.prevent="editfn(id)">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 树形结构 -->
      <el-dialog title="权限分配" :visible.sync="rolefn" width="30%">
        <el-tree
          :data="perlist"
          :default-checked-keys="defaultData"
          show-checkbox
          :props="defaultProps"
          getHalfCheckedKeys="defaultData"
          :default-expand-all="true"
          node-key="id"
        ></el-tree>
        <div slot="footer" class="dialog-footer">
          <el-button @click.prevent="noedit">取 消</el-button>
          <el-button type="primary">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </el-card>
</template>

<script>
import Usertop from "../users/usertop";
export default {
  components: {
    Usertop
  },
  data() {
    return {
      defaultData: [],
      roleData: [],
      perlist: [],
      roleList: {
        roleName: "",
        roleDesc: ""
      },
      editlist: {
        roleName: "",
        roleDesc: "",
        roleId: ""
      },
      defaultProps: {
        children: "children",
        label: "authName"
      },
      dialogFormVisible: false,
      editdial: false,
      rolefn: false
    };
  },
  methods: {
    addUser() {
      this.dialogFormVisible = true;
    },
    getdata() {
      this.$http({
        url: "http://localhost:8888/api/private/v1/roles",
        method: "get",
        headers: {
          Authorization: window.localStorage.getItem("token")
        }
      }).then(res => {
        let { data, meta } = res.data;
        if (meta.status === 200) {
          this.roleData = data;
        }
      });
    },
    add() {
      this.$http({
        url: "roles",
        method: "post",
        data: {
          roleName: this.roleList.roleName,
          roleDesc: this.roleList.roleDesc
        }
      }).then(res => {
        let { data, meta } = res.data;
        if (meta.status === 201) {
          this.$message({
            message: meta.msg,
            type: "success"
          });
          this.roleList = "";
          this.getdata();
          this.dialogFormVisible = false;
        }
      });
    },
    noadd() {
      this.dialogFormVisible = false;
    },
    mydel(id) {
      this.$confirm("此操作将永久删除该角色, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$http({
          url: "roles/" + id,
          method: "delete"
        }).then(res => {
          if (res.data.meta.status === 200) {
            this.getdata();
            this.$message({
              type: "success",
              message: "删除成功!"
            });
          }
        });
      });
    },
    edit(id) {
      this.$http({
        url: "roles/" + id,
        method: "get"
      }).then(res => {
        let { data, meta } = res.data;
        console.log(res);

        for (let key in data) {
          this.editlist = data;
        }
        console.log(editlist);
      });
      this.editdial = true;
    },
    editfn() {
      this.$http({
        url: `roles/${this.editlist.roleId}`,
        method: "put",
        data: {
          roleName: this.editlist.roleName,
          roleDesc: this.editlist.roleDesc
        }
      }).then(res => {
        let { data, meta } = res.data;
        if (meta.status === 200) {
          this.getdata();
          this.$message({
            message: meta.msg,
            type: "success"
          });
          this.editdial = false;
        }
      });
    },
    noedit() {
      this.editdial = false;
    },
    delperm(roleId, rightId, perms) {
      this.$http({
        url: `roles/${roleId}/rights/${rightId}`,
        method: "delete"
      }).then(res => {
        if (res.data.meta.status === 200) {
          this.$message({
            message: res.data.meta.msg,
            type: "success"
          });
        }
        perms.children = res.data.data;
      });
    },
    editRole(perms) {
      this.rolefn = true;
      this.$http({
        url: "rights/tree",
        method: "get"
      }).then(res => {
        this.perlist = res.data.data;
        if (res.data.meta.status === 200) {
          perms.forEach(item1 => {
            item1.children.forEach(item2 => {
              item2.children.forEach(item3 => {
                console.log(item3);
                this.defaultData.push(item3.id);
              });
            });
          });
        }
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
