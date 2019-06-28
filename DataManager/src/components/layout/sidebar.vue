<template>
  <el-menu class="el-menu-vertical-demo" :unique-opened="true" :router="true">
    <el-submenu v-for='item in menus' :key='item.id' :index="item.path" >
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>{{item.authName}}</span>
      </template>
      <el-menu-item-group>
        <el-menu-item v-for='item2 in item.children' :key='item2.id' :index="item2.path">
          <i class="el-icon-menu"></i>
          <span slot="title">{{item2.authName}}</span>
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>
   
  </el-menu>
</template>

<script>
export default {
  data(){
return{
  menus:[],
}
  },
  methods:{
    getmenu(){
      this.$http({
        url:'menus',
      }).then(res=>{
        console.log(res);
        this.menus=res.data.data
        
      })
    }
  },
  mounted(){
    this.getmenu()
  }
};
</script>

<style>
</style>
