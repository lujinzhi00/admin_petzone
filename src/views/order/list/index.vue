<template>
    <div class="app-container"
        id="order">
        <p class="page-title">订单列表</p>
         <div class="filter-container">
            <div style="float: right">
                <el-input placeholder="订单号"
                    style="width: 200px"
                    class="filter-item"
                    v-model="params.order_no"></el-input>
                <el-button type="primary"
                    class="filter-item"
                    @click="search">搜索</el-button>
            </div>
        </div>
        <el-table v-loading="table_loading"
            ref="tableRef"
            element-loading-text="加载中..."
            border
            highlight-current-row
            row-key='id'
            :data="list">
            <el-table-column label="ID"
                prop="id"
                align="center">
            </el-table-column>
            <el-table-column label="订单编号"
                prop="order_no"
                align="center">
            </el-table-column>
            <el-table-column label="下单用户"
                prop="user.nickname"
                align="center">
            </el-table-column>
            <el-table-column label="服务标题"
                prop="servs.title"
                align="center">
            </el-table-column>
            <el-table-column label="服务价格"
                prop="servs.price"
                align="center">
            </el-table-column>
            <el-table-column label="开始时间"
                prop="start_time"
                align="center">
            </el-table-column>
            <el-table-column label="截至时间"
                prop="end_time"
                align="center">
            </el-table-column>
            <el-table-column label="订单状态"
                prop="status"
                align="center">
                <template slot-scope="scope">
                    <el-tag type="danger" v-if="scope.row.status == 2">取消</el-tag>
                    <el-tag v-if="scope.row.status == 1">进行中</el-tag>
                    <el-tag v-if="scope.row.status == 3" type="success">完成</el-tag>
                    <el-tag v-if="scope.row.status == 4" type="warning">超时</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="操作"
                width="170px"
                align="center">
                <template slot-scope="scope">
                    <el-tooltip class="item" effect="dark" content="删除" placement="top-start" :enterable="false">
                                        <el-button type="danger" icon="el-icon-delete" circle @click="handleDel(scope.$index, scope.row)"></el-button>
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
import { getOrderList, delOrder, changeOrder, outOrder} from '@/api/order'
import { pageMixin } from '@/utils/mixin'
export default {
    name: "order-list",
    mixins: [pageMixin],
    data() {
        return {
            params: {
                order_no: '',
            }
        }
    },
    methods: {
            handleDel(index, info) {
            this.$confirm('删除订单将不可恢复', '警告', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                delOrder(info).then(res => {
                    this.$message({
                        message: '删除成功',
                        type: 'success'
                    })
                    this.list.splice(index, 1)
                })
            })
        },
        _getData() {
            getOrderList(this.params).then(res => {
                this.list = res.data.data
                this.total = parseInt(res.data.total)
                this.params.pageSize = parseInt(res.data.per_page)
                this.params.page = parseInt(res.data.current_page)
                this.table_loading = false
            }).catch(err => {
                this.table_loading = false
            })
        }
    }
}
</script>

<style lang="sass" scoped>
    #order
  
</style>