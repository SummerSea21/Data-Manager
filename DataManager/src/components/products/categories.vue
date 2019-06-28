<template>
  <el-card>
    <Usertop one="商品管理" two="商品分类"></Usertop>
    <el-button type="success" style="margin-top: 15px;" plain @click="addclass">添加分类</el-button>
    <el-table :data="currentgood" border style="width: 100% ;margin-top: 15px">
      <el-table-tree-column
        treeKey="cat_id"
        parentKey="cat_pid"
        levelKey="cat_level"
        prop="cat_name"
        label="分类名称"
        folder-icon="icon icon-folder"
        file-icon="icon icon-file"
      ></el-table-tree-column>
      <el-table-column label="级别">
        <template
          slot-scope="scope"
        >{{scope.row.cat_level===0?'一级':scope.row.cat_level===1?'二级':'三级'}}</template>
      </el-table-column>
      <el-table-column label="是否有效">
        <template slot-scope="scope">{{scope.row.cat_deleted?'无效':'有效'}}</template>
      </el-table-column>
      <el-table-column label="操作">
        <el-button type="primary" icon="el-icon-edit" circle></el-button>
        <el-button type="danger" icon="el-icon-delete" circle></el-button>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="correntpage"
      :page-sizes="[5, 10]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
    <!-- 添加分类 -->
    <el-dialog title="添加商品分类" :visible.sync="dialogFormVisible" width="30%">
      <el-form
        label-position="left"
        status-icon
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
        width="180"
      >
        <el-form-item label="分类名称">
          <el-input v-model="addname"></el-input>
        </el-form-item>
        <el-form-item label="分类名称">  
          {{values}}    
          <el-cascader
            v-model='values'
            :options="goodsclass"
            :props="props"
            :show-all-levels="true"
          ></el-cascader>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.prevent="noadd">取 消</el-button>
        <el-button type="primary" @click.prevent="add">确 定</el-button>
      </div>
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
      // 分类数据
      goodsList: [],
      //展示数据源
      currentgood: [],
      goodsclass: [],
      pagesize: 5,
      pagesizes: [5, 10],
      total: 0,
      correntpage: 2,
      dialogFormVisible: false,
      props: {
        expandTrigger: "hover",
        label: "cat_name",
        value: "cat_id",
        checkStrictly: true
      },
      values:[],
      addname:''
    };
  },
  methods: {
    //  获取商品分类名称
    getclass() {
      this.$http({
        url: "categories",
        method: "get"
      }).then(res => {
        let { data, meta } = res.data;
        if (meta.status === 200) {
          this.goodsList = data;
          this.total = this.goodsList.length;
          this.getpagelist();
        }
      });
    },
    getvalue() {
      this.$http({
        url: "categories?type=2",
        method: "get"
      }).then(res => {
        console.log(res);
        this.goodsclass = res.data.data;
        console.log(this.goodsclass);
      });
    },
    getpagelist() {
      let begin = (this.correntpage - 1) * this.pagesize;
      let end = this.correntpage * this.pagesize - 1;
      this.currentgood = this.goodsList.slice(begin, end + 1);
      console.log(this.currentgood);
    },
    handleSizeChange(pagesize) {
      this.pagesize = pagesize;
      this.getclass();
    },
    handleCurrentChange(correntpage) {
      this.correntpage = correntpage;
      this.getclass();
    },
    addclass() {
      this.dialogFormVisible = true;
      this.getvalue();
    }
  },
  mounted() {
    this.getclass();
  }
};
</script>

<style>
</style>
