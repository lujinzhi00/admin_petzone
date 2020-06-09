<template>
    <div class="app-container">
        <p class="page-title">活动列表</p>
        <div class="filter-container">
            <el-button type="primary"
                plain
                class="filter-item"
                @click="addActivity()">发布活动</el-button>
            <div style="float: right">
                <el-input placeholder="活动标题"
                    style="width: 200px"
                    class="filter-item"
                    v-model="params.title"></el-input>
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
                align="center" width="50px">
            </el-table-column>
            <el-table-column align="center"
                label="活动标题"
                prop="title" width="150px">
            </el-table-column>
            <el-table-column align="center"
                label="活动描述"
                prop="description" >
            </el-table-column>
            <el-table-column align="center"
                label="举行时间"
                prop="time" >
            </el-table-column>
            <el-table-column align="center"
                label="举办地点"
                prop="detail" >
            </el-table-column>
            <el-table-column align="center"
                label="状态" width="100px">
                <template slot-scope="scope">
                    <el-tag v-if="scope.row.state==1"
                        type="info">进行中</el-tag>
                    <el-tag v-if="scope.row.state==2"
                        type="danger">已结束</el-tag>
                </template>
            </el-table-column> 
            <el-table-column align="center"
                label="操作" width="250px">
                <template slot-scope="scope">
                    <el-button size="mini"
                        type="danger"
                        @click="handleDel(scope.$index, scope.row)">删除</el-button>
                        <el-button size="mini"
                        type="info" v-if="scope.row.state!=2"
                        @click="handleedit(scope.row.id)">修改</el-button>
                        <el-button size="mini"
                        type="warning" v-if="scope.row.state!=2"
                        @click="handlechange(scope.row.id)">结束</el-button>
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
import { getActivityList, delActivity,changeActivity} from '@/api/activity'
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
        //删除活动
        handleDel(index, info) {
            this.$confirm('删除活动将不可恢复', '警告', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                delActivity(info).then(res => {
                    this.$message({
                        message: '删除成功',
                        type: 'success'
                    })
                    this.list.splice(index, 1)
                    this._getData()
                })
            })
        },
        //跳转到发布页面
           addActivity(flag) {
            this.$router.push('/activity/addActivity')
            this.setEditAdmin({})
        },
        //修改状态
        handlechange(id)
        {
            changeActivity({id:id,state:2}).then(res=>{
                this.$message.success('操作成功')
                this._getData()
            }).catch(err=>{
                this.$message.error('操作失败')
            })
           
        },
        //修改活动信息
        handleedit(id)
        {
            this.$router.push({path: '/activity/editActivity', query: {id: id}})
        },
        //获取数据
        _getData() {
            getActivityList(this.params).then(res => {
                this.list = res.data.data
                this.total = res.data.total
                this.pageSize = res.data.per_page
                this.page = res.data.current_page
                this.table_loading = false
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
el-button
{
    width: 30px;
    font-size: 15px;
}
</style>