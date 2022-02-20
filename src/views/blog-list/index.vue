<template>
  <div class="blog-list-container">
    <el-table
      border
      :data="blogList.rows"
      v-show="blogList.total"
      style="width: 100%"
    >
      <el-table-column label="序号" width="180" align="center">
        <template slot-scope="scope">{{ scope.$index + 1 }}</template>
      </el-table-column>
      <el-table-column label="文章名称" prop="title" width="180" align="center">
        <template>
          <el-popover
            placement="top-start"
            title="标题"
            width="200"
            trigger="hover"
            content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。"
          >
            <el-button slot="reference">hover 激活</el-button>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        label="文章描述"
        prop="description"
        width="180"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="scanNumber"
        label="浏览量"
        align="center"
      ></el-table-column>
      <el-table-column
        label="评论"
        prop="commentNumber"
        align="center"
      ></el-table-column>

      <el-table-column
        label="所属分类"
        prop="category.name"
        align="center"
      ></el-table-column>
      <el-table-column
        label="发布日期"
        prop="createDate"
        align="center"
      ></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            circle
            @click="editBlog(scope.row)"
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            circle
            @click="deleteBlog(scope.row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination
        background
        hide-on-single-page
        :page-sizes="[pageInfo.limit]"
        @current-change="handlerPageChange"
        layout="prev, pager, next"
        :total="blogList.total"
        :page-size="pageInfo.limit"
      >
      </el-pagination>
      {{ blogList.total }}
    </div>
  </div>
</template>

<script>
import { getPageBlog } from "@/api/blog";
import getDate from "@/utils/getDate";

export default {
  async created() {
    const r = await getPageBlog(this.pageInfo.page, this.pageInfo.limit);
    r.data.rows.forEach((element) => {
      element.createDate = getDate(element.createDate);
    });
    this.blogList = r.data;
  },
  data() {
    return {
      blogList: {},
    };
  },
  computed: {
    pageInfo() {
      return {
        page: +this.$route.query.page || 1,
        limit: +this.$route.query.limit || 10,
      };
    },
  },
  methods: {
    editBlog() {},
    deleteBlog() {},
    handlerPageChange(page) {
      this.$router.push({
        name: "BlogList",
        query: {
          page,
          limit: this.pageInfo.limit,
        },
      });
    },
  },
  watch: {
    // $route :{
    //   handler(){},
    //   deep: true,
    //   immdeiate: fasle
    // },
    "$route.query.page"() {
      getPageBlog(this.pageInfo.page, this.pageInfo.limit).then((r) => {
        r.data.rows.forEach((element) => {
          element.createDate = getDate(element.createDate);
        });
        this.blogList = r.data;
      });
    },
  },
};
</script>

<style scoped>
.blog-list-container {
  box-sizing: border-box;
  padding: 30px;
}
</style>