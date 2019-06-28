<template>
  <el-card>
    <Usertop one="商品管理" two="商品列表"></Usertop>
    <el-row style="margin-top: 15px;">
      <el-col :span="8">
        <el-input placeholder="请输入内容" class="input-with-select" v-model="query">
          <el-button slot="append" icon="el-icon-search" @click.prevent="search"></el-button>
        </el-input>
      </el-col>
      <el-button style="margin-left:5px;" type="success" plain @click.prevent="addgoods">添加商品</el-button>
    </el-row>
    <el-table :data="tableData" border style="width: 100% ;margin-top: 15px">
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="goods_name" label="商品名称"></el-table-column>
      <el-table-column prop="goods_price" label="商品价格" width="140"></el-table-column>
      <el-table-column prop="goods_weight" label="商品重量" width="120"></el-table-column>
      <el-table-column  label="创建时间">
        <template slot-scope="scope">
          {{scope.row.upd_time|timer}}
        </template>  
        <!-- {{19900202|timer}} -->
      </el-table-column>
      <el-table-column label="操作">
        <el-button type="primary" icon="el-icon-edit" plain size="mini"></el-button>
        <el-button type="danger" icon="el-icon-delete" plain size="mini"></el-button>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="pagesizes"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </el-card>
</template>

<script>
import Usertop from "../users/usertop";
import moment from 'moment'
export default {
  filters:{
    'timer'(value){
      return moment(value).format('YYYY-MM-DD hh:mm:ss a')
    }
  },
  components: {
    Usertop
  },
  data() {
    return {
      tableData: [{ goods_name: "", goods_price: "", goods_weight: "" }],
      pagesize: 20,
      pagesizes: [10, 20, 30, 40],
      total: 0,
      pagenum: 2,
      query: ""
    };
  },
  methods: {
    getdata() {
      this.$http({
        url: `goods?query=${this.query}&pagenum=${this.pagenum}&pagesize=${
          this.pagesize
        }`,
      }).then(res => {
        console.log(res);
        this.tableData = res.data.data.goods;
        this.total = res.data.data.total;

        console.log(this.total);
      });
    },
    handleSizeChange(pagesize) {
      this.pagesize = pagesize;
      this.getdata();
    },
    handleCurrentChange(pagenum) {
      this.pagenum = pagenum;
      this.getdata();
    },
    addgoods() {
      this.$router.push("/add");
    },
    search() {console.log('ssss');
    
      this.getdata()
    }
  },
  mounted() {
    this.getdata();

  }
};
</script>

<style>
</style>