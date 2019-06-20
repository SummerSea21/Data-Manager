<template>
  <div>
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
    >
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>用户管理</span>
        </template>
        <li
          role="menuitem"
          tabindex="-1"
          class="el-menu-item is-active"
        >
          <i class="el-icon-menu"></i>
          <span>用户列表</span>
        </li>
      </el-submenu>
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>权限管理</span>
        </template>
       <li
          role="menuitem"
          tabindex="-1"
          class="el-menu-item is-active"
        >
          <i class="el-icon-menu"></i>
          <span>用户列表</span>
        </li>
      </el-submenu>
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>商品管理</span>
        </template>
        <li
          role="menuitem"
          tabindex="-1"
          class="el-menu-item is-active"
        >
          <i class="el-icon-menu"></i>
          <span>用户列表</span>
        </li>
      </el-submenu>
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>订单管理</span>
        </template>
       <li
          role="menuitem"
          tabindex="-1"
          class="el-menu-item is-active"
        >
          <i class="el-icon-menu"></i>
          <span>用户列表</span>
        </li>
      </el-submenu>
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>数据统计</span>
        </template>
        <li
          role="menuitem"
          tabindex="-1"
          class="el-menu-item is-active"
        >
          <i class="el-icon-menu"></i>
          <span>用户列表</span>
        </li>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>

<style>
.el-icon-menu{
    text-align: center
}
</style>
