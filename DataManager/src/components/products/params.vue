<template>
  <el-card>
    <Usertop one="商品管理" two="分类参数"></Usertop>
    <el-alert title="注意：只允许为第三级分类设置相关参数！" type="warning" style="margin-top: 15px;" show-icon></el-alert>
    <el-form
      label-position="left"
      status-icon
      ref="ruleForm"
      label-width="120px"
      class="demo-ruleForm"
      width="180"
    >
      <el-form-item label="请选择商品分类">{{value}}
        <el-cascader v-model="values" :options="goodsclass" :props="props" :show-all-levels="false"></el-cascader>
      </el-form-item>
    </el-form>
    <template>
      <el-tabs v-model="activeName" >
        <el-tab-pane label="动态参数" name="first">
          <el-button type="primary" disabled>添加动态参数</el-button>
        </el-tab-pane>
        <el-tab-pane label="静态参数" name="second">
          <el-button type="primary" disabled>添加静态参数</el-button>
        </el-tab-pane>
      </el-tabs>
    </template>
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
      activeName: "first",
      props: {
        expandTrigger: "hover",
        label: "cat_name",
        value: "cat_id",
        checkStrictly: true
      },
      values: [],
      goodsclass: [],
     
    };
  },
  methods: {
    getvalue() {
      this.$http({
        url: "categories?type=3",
        method: "get"
      }).then(res => {
        // console.log(res);
        this.goodsclass = res.data.data;
      });
    }
  },
  mounted() {
    this.getvalue();
  }
};
</script>

<style>
</style>