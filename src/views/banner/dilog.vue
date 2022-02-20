<template>
  <el-dialog
    title="请编辑信息"
    :visible.sync="dataInfo.dialogVisible"
    width="45%"
    @close="handleClose(false)"
  >
    <div class="slogan">
      <h3>标语</h3>
      <input
        class="log"
        type="text"
        :value="dataInfo.title"
        @input="dataInfo.title = $event.target.value"
      />
    </div>
    <div class="discption">
      <h3>描述</h3>
      <textarea
        class="textarea"
        :value="dataInfo.description"
        @input="dataInfo.description = $event.target.value"
      ></textarea>
    </div>
    <el-form>
    <el-row>
      <el-col :span="12">
        <el-form-item label="中图预览">
          <Upload
            :value="dataInfo.midImg"
            :uploadTitle="dataInfo.title"
            :url="'/api/upload'"
            :header="header"
            @upload="bupload"
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="大图预览">
          <Upload
            :value="dataInfo.bigImg"
            :uploadTitle="dataInfo.title"
            :url="'/api/upload'"
            :header="header"
            @upload="dupload"
          />
        </el-form-item>
      </el-col>
    </el-row>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible(true)" type="primary">确 认</el-button>
      <el-button @click="dialogVisible(false)">取 消</el-button>
    </span>
  </el-dialog>
</template>

<script>
import Upload from "@/components/Upload2/index.vue";
import urlConfig from "@/urlConfig";
export default {
  created() {
    this.dataInfo = null;
    this.dataInfo = { ...this.dialogData };
  },
  props: ["dialogData"],
  data() {
    return {
      dataInfo: null,
    };
  },
  components: {
    Upload,
  },
  methods: {
    handleClose(show) {
      show
        ? this.$emit("isClo", show, this.dataInfo)
        : this.$emit("isClo", show);
    },
    dialogVisible(show) {
      this.handleClose(show);
    },
    bupload(url){
      this.dataInfo.midImg = urlConfig + url;
      console.log(this.dataInfo);
    },
    dupload(url){
      this.dataInfo.bigImg = urlConfig + url;
    },

  },
  computed:{
    header(){
      return {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    }
  }
};
</script>
<style scoped>
.slogan,
.discption {
  margin: 20px 0;
  padding: 5px;
}
.slogan span,
.discption span {
  display: block;
  padding: 5px;
}
.log,
.textarea {
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  height: 30px;
  border-radius: 8px;
  border: 1px solid #dcdfe6;
}
.log:focus,
.textarea:focus {
  outline: none;
  border: 1px solid #409eff;
}
.textarea {
  padding: 5px;
  height: 80px;
}
</style>