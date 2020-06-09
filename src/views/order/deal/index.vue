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
                    <el-tag v-if="scope.row.status == 1">进行中</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="操作"
                width="170px"
                align="center">
                <template slot-scope="scope">
                    <el-tooltip class="item"  content="超时" placement="top-start"  :enterable="false">
                                        <el-button type="info" icon="el-icon-timer" circle @click="handelOut(scope.row.id)"></el-button>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="确认" placement="top-start" :enterable="false">
                                         <el-button type="warning" icon="el-icon-finished" circle @click="handleFinish(scope.row.id)" ></el-button>
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
import { getDealList, changeOrder, outOrder} from '@/api/order'
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
        handelOut(id) {
             this.$confirm('超时处理', '警告', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                outOrder({id:id, status:4}).then(res => {
                    this.$message({
                        message: '处理成功成功',
                        type: 'success'
                    })
                    this._getData()
                })
            })
        },
        handleFinish(id) {
              this.$confirm('完成订单', '警告', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                changeOrder({id:id, status:3}).then(res => {
                    this.$message({
                        message: '处理成功成功',
                        type: 'success'
                    })
                    this._getData()
                })
            })
        },
        _getData() {
            getDealList(this.params).then(res => {
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