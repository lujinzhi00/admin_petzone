<template>
    <div class="app-container">
        <p class="page-title">精选管理</p>
        <div class="filter-container">
            <div style="float: right; display: flex">
              <el-select v-model="params.type"
                    style="width: 200px; margin: 0 3px"
                    placeholder="选择订单状态">
                    <el-option label="所有帖子"
                        value=""></el-option>
                    <el-option label="疑问贴"
                        value="1"></el-option>
                    <el-option label="交流帖"
                        value="2"></el-option>
                </el-select>
                <el-button type="primary"
                    class="filter-item"
                    @click="search()">搜索</el-button>
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
                prop="title"
                label="帖子标题">
            </el-table-column>
            <el-table-column align="center"
                prop="description"
                label="描述">
            </el-table-column>
            <el-table-column align="center"
                prop="type"
                label="类型">
                <template slot-scope="scope">
                    <el-tag 
                        v-if="scope.row.type == 1">疑问贴</el-tag>
                    <el-tag 
                        v-else>交流贴</el-tag>
                </template>
            </el-table-column>
            <el-table-column align="center"
                label="操作"
                width="80px">
                <template slot-scope="scope">
                    <el-tooltip content="设置精选"
                        placement="top">
                        <el-switch :active-value="2"
                            :inactive-value="1"
                            active-color="#13ce66"
                            inactive-color="#ff4949"
                            @click.native="setStatus(scope.$index, scope.row)"
                            v-model="scope.row.best">
                        </el-switch>
                    </el-tooltip>
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
import { getCommentList, commentChange } from '@/api/comment'
import { pageMixin } from '@/utils/mixin'
export default {
    name: "comment",
    mixins: [pageMixin],
    data() {
        return {
            params: {
                type: ''
            }
        }
    },
    methods: {
        setStatus(index, row) {
            const best = row.best == 1 ? 2 : 1
            commentChange({ id: row.id, best: row.best }).then(res => {
                this.$message.success(res.msg)
            }).catch(err => {
                row.best = best
            })
        },
        _getData() {
            getCommentList(this.params).then(res => {
                this.total = res.data.total
                this.pageSize = res.data.per_page
                this.page = res.data.current_page
                this.list = res.data.data
                this.table_loading = false
            }).catch(err => {
                this.table_loading = true
            })
        }
    }
}
</script>

<style scoped lang="scss">
</style>