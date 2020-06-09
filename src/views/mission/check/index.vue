<template>
    <div class="app-container">
        <p class="page-title">任务列表</p>
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
                label="状态"
                width="120px">
                <template slot-scope="scope">
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
                        @click="handleChange(scope.row.id)">通过</el-button>
                         <el-button size="mini"
                        type="info"
                        @click="handleChange1(scope.row.id)">打回</el-button>
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
import { getCheckList, delmission , change} from '@/api/mission'
import { mapMutations } from 'vuex'
import { pageMixin } from '@/utils/mixin'
export default {
    name: "userIndex",
    mixins: [pageMixin],
    data() {
        return {
            params: {
            },
        }
    },

    methods: {
        //审核
        handleChange(id) {
            this.$confirm('审核通过', '警告', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                change({id:id, state:2}).then(res => {
                    this.$message({
                        message: '审核通过成功',
                        type: 'success'
                    })
                    this._getData()
                })
            })
            this._getData()
        },
         handleChange1(id) {
            this.$confirm('审核不通过', '警告', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                change({id:id, state:7}).then(res => {
                    this.$message({
                        message: '打回成功',
                        type: 'success'
                    })
                    this._getData()
                })
            })
        },
        //获取数据
        _getData() {
            getCheckList(this.params).then(res => {
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