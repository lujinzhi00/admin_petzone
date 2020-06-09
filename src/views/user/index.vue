<template>
    <div class="app-container">
        <p class="page-title">会员列表</p>
        <div class="filter-container">

            <div style="float: right">
                <el-input placeholder="会员名"
                    style="width: 200px"
                    class="filter-item"
                    v-model="params.nickname" clearable @clear = "_getData()"></el-input>
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
                label="用户名"  >
                <template slot-scope="scope">
                    <el-input v-if="scope.row.edit"
                        class="edit-input"
                        size="small"
                        v-model="scope.row.nickname"></el-input>
                    <span v-else>{{scope.row.nickname}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center"
                label="个人简介" >
                <template slot-scope="scope">
                    <el-input v-if="scope.row.edit"
                        class="edit-input"
                        v-model="scope.row.extend"></el-input>
                    <span v-else>{{scope.row.extend}}</span>
                </template>
            </el-table-column>
             <el-table-column align="center"
                label="微信" >
                <template slot-scope="scope">
                    <el-input v-if="scope.row.edit"
                        class="edit-input"
                        v-model="scope.row.wechat"></el-input>
                    <span v-else>{{scope.row.wechat}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center"
                label="手机号" >
                <template slot-scope="scope">
                    <el-input v-if="scope.row.edit"
                        class="edit-input"
                        v-model="scope.row.tellphone"></el-input>
                    <span v-else>{{scope.row.tellphone}}</span>
                </template>
            </el-table-column>
                        <el-table-column align="center"
                label="信誉值" >
                <template slot-scope="scope">
                    <el-input v-if="scope.row.edit"
                        class="edit-input"
                        v-model="scope.row.reputation"></el-input>
                    <span v-else>{{scope.row.reputation}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center"
                width="400px"
                label="操作">
                <template slot-scope="scope">
                    <el-button v-if="scope.row.edit"
                        icon="el-icon-refresh"
                        size="mini"
                        type="warning"
                        @click="handleCancel(scope.row)">取消
                    </el-button>
                    <el-button v-if="scope.row.edit"
                        icon="el-icon-circle-check-outline"
                        size="mini"
                        type="success"
                        @click="handleEdit(scope.$index, scope.row)">保存
                    </el-button>
                    <el-button v-else
                        size="mini"
                        type="primary"
                        icon="el-icon-edit"
                        @click="scope.row.edit=!scope.row.edit">编辑
                    </el-button>
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
import { getUserList, editUser} from '@/api/user'
import { pageMixin } from '@/utils/mixin'
export default {
    name: "user",
    mixins: [pageMixin],
    data() {
        return {
            params: {
                nickname: '',
            },
        }
    },

    methods: {
        //修改分类
        handleEdit(index, row) {
                row.old_nickname = row.nickname
                row.old_wechat= row.wechat
                row.old_tellphone =row.tellphone 
                row.old_reputation=row.reputation 
                row.old_extend=row.extend 
                row.edit = false
            editUser(row).then(res => {
                this.$message({
                    message: res.msg,
                    type: 'success'
                })
            }).catch(err=>{
                    this._getData()
                })
        },

        //取消修改分类
        handleCancel(row) {
            row.edit = false
            console.log(row)
            row.nickname = row.old_nickname
            row.wechat = row.old_wechat
            row.tellphone = row.old_tellphone
            row.reputation = row.old_reputation
            row.extend = row.old_extend
        },
       //获取数据
        _getData(){
            getUserList(this.params).then(res => {
                this.list = res.data.data.map(item => {
                this.$set(item, 'edit', false)
                item.old_nickname = item.nickname
                item.old_wechat= item.wechat
                item.old_tellphone =item.tellphone 
                item.old_reputation=item.reputation 
                item.old_extend=item.extend 
                    return item
                })
                this.total = res.data.total
                this.pageSize = res.data.per_page
                this.page = res.data.current_page
                this.table_loading = false
            }).catch(err => {
                this.table_loading = true
            })
        }
    },
    created()
    {
        this._getData()
    }
}
</script>

<style scoped>
.el-tag + .el-tag {
  margin-left: 10px;
}

.search-container {
  margin-bottom: 5px;
  margin-top: 5px;
}

.page-container {
  float: right;
  margin: 20px;
}

.button-new-tag {
  margin-left: 10px;
}

.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>