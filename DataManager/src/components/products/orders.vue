<template>
  <el-card>
    <Usertop one="订单管理" two="订单列表"></Usertop>
    <template>
      <el-table :data="tableData" border style="margin-top: 15px;width: 100%">
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="order_number" label="订单编号" width="180"></el-table-column>
        <el-table-column prop="order_price" label="订单价格" width="180"></el-table-column>
        <el-table-column  label="是否付款">
            <el-tag type="danger">未付款</el-tag>
        </el-table-column>
        <el-table-column prop="is_send" label="是否发货"></el-table-column>
        <el-table-column  label="下单时间">
            <template slot-scope="scope">
             {{scope.row.create_time|timer}}
            </template>
        </el-table-column>
        <el-table-column  label="操作">
          <el-button type="primary" icon="el-icon-edit" plain></el-button>
        </el-table-column>
      </el-table>
    </template>
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
  </el-card>
</template>

<script>
import moment from 'moment'
import Usertop from "../users/usertop";
export default {
  data() {
    return {
      tableData: [{
           order_number:'',
           order_price:''
      }
         
      ],
      pagesize: 20,
      pagesizes: [10, 20, 30, 40],
      total: 0,
      pagenum: 2,
      total:0
    };
  },
  filters:{
    'timer'(value){
        return moment(value).format('YYYY-MM-DD hh:mm:ss ')
    }
  },
  methods: {
    getdata() {
       this.$http({
           url:`orders?pagenum=${this.pagenum}&pagesize=${
          this.pagesize
        }`,
       }).then(res=>{
           console.log(res);
           
           this.tableData=res.data.data.goods
           this.total=res.data.data.total
       })
    },
    handleSizeChange(pagesize) {
      this.pagesize = pagesize;
      this.getdata();
    },
    handleCurrentChange(pagenum) {
      this.pagenum = pagenum;
      this.getdata();
    }
  },
  components: {
    Usertop
  },
  mounted(){
      this.getdata()
  }
};
</script>

<style>
</style>
