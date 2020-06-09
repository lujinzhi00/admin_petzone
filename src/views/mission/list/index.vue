<template>
    <div class="app-container">
        <p class="page-title">任务列表</p>
        <div class="filter-container">
            <div style="float: right">
                 <el-select v-model="params.state"
                    style="width: 200px; margin: 0 3px"
                    placeholder="选择任务状态">
                    <el-option label="待审核"
                        value="1"></el-option>
                    <el-option label="通过"
                        value="2"></el-option>
                    <el-option label="进行中"
                        value="3"></el-option>
                    <el-option label="发布人取消"
                        value="4"></el-option>
                    <el-option label="接受人取消"
                        value="5"></el-option>
                        <el-option label="完成"
                        value="6"></el-option>
                    <el-option label="打回"
                        value="7"></el-option>
                </el-select>
                <el-button type="primary"
                    class="filter-item"
                    @click="search">搜索</el-button>
            </div>
        </div>
        <el-table v-loading="table_loading"
            element-loading-text="加载中..."
            border
            fit
            highlight-current-row
            :data="list">
            <el-table-column label="ID"
                prop="id"
                align="center"
                width="60px">
            </el-table-column>
            <el-table-column align="center"
                label="任务标题"
                prop="title">
            </el-table-column>
            <el-table-column align="center"
                label="任务描述"
                prop="description">
            </el-table-column>
            <el-table-column align="center"
                label="发起人"
                prop="author.nickname">
            </el-table-column>
            <el-table-column align="center"
                label="接收人"
                prop="receive.nickname">
            </el-table-column>
            <el-table-column align="center"
                label="状态"
                width="120px">
                <template slot-scope="scope">
                      <el-tag v-if="scope.row.state==7"
                        type="info">不通过</el-tag>
                    <el-tag v-if="scope.row.state==1"
                        type="primary">待审核</el-tag>
                    <el-tag v-if="scope.row.state==2"
                        type="success">发布中</el-tag>
                    <el-tag v-if="scope.row.state==3"
                        type="warning">进行中</el-tag>
                    <el-tag v-if="scope.row.state==4"
                        type="info">发布人取消</el-tag>
                    <el-tag v-if="scope.row.state==5"
                        type="info">接收人取消</el-tag>
                    <el-tag v-if="scope.row.state==6"
                        type="danger">已完成</el-tag>
                </template>
            </el-table-column> 
            <el-table-column align="center"
                label="操作">
                <template slot-scope="scope">
                    <el-button size="mini"
                        type="danger"
                        @click="handleDel(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="page-container">
            <el-pagination background
                @size-change="handleSizeChange"
                :current-page.sync="params.page"
                @current-change="handleCurrentChange"
                :page-sizes="page_sizes"
                :page-size="params.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
import { getAdminList, delAdmin } from '@/api/adminUser'
import { getMissionList, delmission } from '@/api/mission'
import { mapMutations } from 'vuex'
import { pageMixin } from '@/utils/mixin'
export default {
    name: "userIndex",
    mixins: [pageMixin],
    data() {
        return {
            params: {
                state: '',
            },
        }
    },

    methods: {
        //删除任务
        handleDel(index, info) {
            this.$confirm('删除任务将不可恢复', '警告', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                delmission(info).then(res => {
                    this.$message({
                        message: '删除成功',
                        type: 'success'
                    })
                    this.list.splice(index, 1)
                    this._getData()
                })
            })
        },
        //获取数据
        _getData() {
            getMissionList(this.params).then(res => {
                this.list = res.data.data
                this.total = res.data.total
                this.pageSize = res.data.per_page
                this.page = res.data.current_page
                this.table_loading = false
				console.log(this.params)
            }).catch(err => {
                this.table_loading = true
            })
        },
        ...mapMutations({
            'setEditAdmin': 'SET_EDIT_ADMIN'
        })
    },

}
</script>

<style scoped>
.search-container {
  margin-bottom: 10px;
}
</style>