<template>
  <div class="app-container">
    <Dilog :dialogData="dialogData" v-if="dialogData" @isClo="show" />
    <el-table :data="tableData" v-if="tableData.length">
      <el-table-column align="center" label="序号" width="80">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="title" label="标题" width="380">
      </el-table-column>
      <el-table-column
        align="center"
        prop="description"
        label="描述"
        width="450"
      >
      </el-table-column>
      <el-table-column align="center" label="中图预览" width="380">
        <template slot-scope="scope">
          <el-image
            style="width: 145px;"
            :src="scope.row.midImg"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column align="center" label="大图预览" width="180">
        <template slot-scope="scope">
          <el-image
            style="width: 145px;"
            :src="scope.row.bigImg"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-tooltip
            class="item"
            effect="dark"
            content="编辑"
            placement="top"
            :hide-after="2000"
          >
            <el-button
              @click="handleClick(scope.row, scope.$index + 1)"
              class="cell"
              type="text"
              size="small"
              >编辑</el-button
            >
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { getBanner, setBanner } from "@/api/banner";
import Dilog from "./dilog.vue";
import urlConfig from "@/urlConfig";
export default {
  components: {
    Dilog,
  },
  async created() {
    const bannerData = await getBanner();
    bannerData.data.forEach((element, i) => {
      //图片拼接本地服务器地址
      if (element.midImg.substr(0, 4) != "http") {
        element.bigImg = urlConfig + element.bigImg;
        element.midImg = urlConfig + element.midImg;
      }
    });
    this.tableData = bannerData.data;
  },

  methods: {
    show(bool, editData) {
      if (bool) {
        //a
        this.tableData.forEach((ele, i) => {
          if (ele.id === editData.id) {
            const arr = Object.keys(editData);
            arr.forEach((e) => {
              ele[e] = editData[e];
            });
            setBanner(this.tableData).then((r) => {
              getBanner().then((r) => {
                (this.tableData = r.data),
                  this.$message({
                    message: "修改成功！",
                    type: "success",
                  });
              });
            });
            return;
          }
        });
      }
      this.dialogVisible = false;
      this.dialogData = null;
    },
    handleClick(row, scope) {
      this.xb = scope;
      this.dialogVisible = true;
      row.dialogVisible = this.dialogVisible;
      this.dialogData = row;
    },
  },
  data() {
    return {
      tableData: [],
      dialogData: null,
      dialogVisible: false,
      xb: null,
    };
  },
};
</script>

<style scoped>
.cell {
  text-align: center;
}
.app-container{
  margin: 45px;
}
</style>