<template>
  <div class="upload-container">
    <div class="upload">
      <el-upload
        class="avatar-uploader"
        :action="url"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
        :headers="header"
      >
        <img v-if="value" :src="value" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </div>
  </div>
</template>

<script>
export default {
  props: ["uploadTitle", 'width', 'value', 'url', 'header'],
  methods:{
    handleAvatarSuccess(rep){
      if(rep.code === 0){
        this.$emit('upload', rep.data);
      }
    },
    beforeAvatarUpload(){}
  }
};
</script>

<style scoped>
.upload-title {
  font-weight: 450;
}
.upload-container{
  padding-left: 45px; 
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>