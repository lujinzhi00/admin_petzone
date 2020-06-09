<template>
    <div class="app-container">
        <p class="page-title">地址列表</p>
        <div class="filter-container">
            <el-button type="primary"
                plain
                class="filter-item"
                @click="addAddress()">添加地址</el-button>
            <div style="float: right">
                <el-input placeholder="负责人姓名"
                    style="width: 200px"
                    class="filter-item"
                    v-model="params.name" clearable @clear = "_getData()"></el-input>
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
                label="负责人姓名"
                prop="name">
            </el-table-column>
            <el-table-column align="center"
                label="负责人手机"
                prop="mobile">
            </el-table-column>
            <el-table-column align="center"
                label="地址信息"
                prop="detail">
            </el-table-column>
            <el-table-column align="center"
                label="操作">
                <template slot-scope="scope">
                    <el-button size="mini"
                        type="primary"
                        @click="handleEdit(scope.row)">编辑</el-button>
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
import { getAddressList, delAddress } from '@/api/address'
import { mapMutations } from 'vuex'
import { pageMixin } from '@/utils/mixin'
export default {
    name: "userIndex",
    mixins: [pageMixin],
    data() {
        return {
            params: {
                name: '',
            },
        }
    },

    methods: {
        //编辑地址,并把用户信息存储在VUEX,方便调用
        handleEdit(info) {
             this.$router.push({path: '/address/editAddress', query: {id: info.id}})
        },
        //删除地址
        handleDel(index, info) {
            this.$confirm('删除将不可恢复', '警告', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                delAddress(info).then(res => {
                    this.$message({
                        message: '删除成功',
                        type: 'success'
                    })
                    this.list.splice(index, 1)
                })
            })
        },
        //跳转到添加地址
        addAddress(flag) {
            this.$router.push('/address/addAddress/')
        },
        //获取数据
        _getData() {
            getAddressList(this.params).then(res => {
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