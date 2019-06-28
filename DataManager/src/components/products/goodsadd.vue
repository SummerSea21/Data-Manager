<template>
  <el-card>
    <Usertop one="商品管理" two="分类参数"></Usertop>

    <el-alert title="添加商品信息" type="info" style="margin-top: 15px;" center show-icon></el-alert>
    <!-- 进度条 -->
    <el-steps
      :active="active"
      align-center
      style="margin-top: 15px;"
      finish-status="success"
      process-status="process"
    >
      <el-step title="基本信息"></el-step>
      <el-step title="商品参数"></el-step>
      <el-step title="商品属性"></el-step>
      <el-step title="商品图片"></el-step>
      <el-step title="商品内容"></el-step>
    </el-steps>
    <template>
      <!-- 导航条 -->
      <el-tabs
        v-model="activeName"
        @tab-click="handleClick"
        tabPosition="left"
        style="margin-top: 15px;"
      >
        <el-tab-pane label="基本信息" name="first">
          <el-form
            ref="numberValidateForm"
            label-width="100px"
            class="demo-ruleForm"
            label-position="top"
          >
            <el-form-item label="商品名称">
              <el-input type="age"></el-input>
            </el-form-item>
            <el-form-item label="商品价格">
              <el-input type="age"></el-input>
            </el-form-item>
            <el-form-item label="商品重量">
              <el-input type="age"></el-input>
            </el-form-item>
            <el-form-item label="商品数量">
              <el-input type="age"></el-input>
            </el-form-item>
            <el-form-item label="分类名称">
              {{values}}
              <el-cascader
                v-model="values"
                :options="goodsclass"
                :props="props"
                :show-all-levels="true"
              ></el-cascader>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="商品参数" name="second">
          <div v-for="(item,index) in goodsList" :key="index">
            <div style="margin-bottom: 10px;margin-top: 10px">{{item.attr_name}}</div>
            <el-checkbox
              v-for="(item1,index) in item.attr_vals.split(',')"
              :key="index"
              border
              v-model="checked"
              style="margin-left: 5px"
            >{{item1}}</el-checkbox>
          </div>
        </el-tab-pane>
        <el-tab-pane label="商品属性" name="third">
          <el-form label-position="top" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item v-for="(item, index) in goodsarr" :key="index" :label="item.attr_name">
              <el-input v-model="item.attr_vals"></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="商品图片" name="fourth">
          <el-upload
            class="upload-demo"
            action="http://localhost:8888/api/private/v1/upload"
            list-type="picture"
            :headers="headers"
            :fileList="fileList"
            :on-success="uploadSuccess"
            :on-remove="remove"
            :on-preview="handlePreview"
          >
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-tab-pane>
        <el-tab-pane label="商品内容" name="fifth">
          <el-button  type="primary">添加内容</el-button>
        </el-tab-pane>
      </el-tabs>
    </template>
    <el-dialog title="提示" :visible.sync="dialogVisible" >
      <img ref='myimg' src="" alt="" style="width:400px" >
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
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
      //遵循规则
      rules: {
        rules1: [
          { required: true, message: "年龄不能为空" },
          { type: "number", message: "年龄必须为数字值" }
        ]
      },
      //级联狂配置
      props: {
        expandTrigger: "hover",
        label: "cat_name",
        value: "cat_id",
        checkStrictly: true
      },
      //选中的分类id
      values: [],
      //级联框数据源
      goodsclass: [],
      active: 0,
      activeName: "first",
      //商品参数数据
      goodsList: [],
      goodsarr: [],
      checked: true,
      headers: {
        Authorization: window.localStorage.getItem("token")
      },
      fileList: [],
      dialogVisible:false
    };
  },
  methods: {
    getvalue() {
      this.$http({
        url: "categories?type=3",
        method: "get"
      }).then(res => {
        this.goodsclass = res.data.data;
        console.log(this.goodsclass);
      });
    },
    handleClick(tag) {
      this.active = +tag.index;
      if (tag.index == "1") {
        this.getnext();
      } else if (tag.index == "2") {
        this.getthen();
      }
    },
    getnext() {
      this.$http({
        url: `categories/${
          this.values[this.values.length - 1]
        }/attributes?sel=many`
      }).then(res => {
        console.log(res);
        this.goodsList = res.data.data;
      });
    },
    getthen() {
      this.$http({
        url: `categories/${
          this.values[this.values.length - 1]
        }/attributes?sel=only`
      }).then(res => {
        console.log(res);
        this.goodsarr = res.data.data;
      });
    },
    uploadSuccess(response, file, fileList) {
      this.fileList.push(response.data.tmp_path);
    },
    remove(file, fileList) {
      let img = file.response.data.tem_path;
      this.fileList.forEach((item, index) => {
        if (item == img) {
          this.fileList.splice(index, 1);
        }
      });
    },
    handlePreview(file) {
      console.log(file);
      let img = file.response.data.url;
      this.dialogVisible=true
      this.$nextTick(function(){
this.$refs.myimg.src=img
      })
      
    }
  },
  mounted() {
    this.getvalue();
  }
};
</script>

<style>
.el-step__title.is-success,
.el-step__title.is-wait,
.el-step__title.is-process {
  font-size: 12px;
}
</style>