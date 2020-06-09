<template>
    <div class="app-container">
        <p class="page-title">轮播图记录管理(请勿随意添加)</p>
        <div class="filter-container">
            <el-button type="primary"
                plain
                class="filter-item"
                @click="handelAdd()">添加记录</el-button>
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
                label="记录名">
                <template slot-scope="scope">
                    <el-input v-if="scope.row.edit"
                        class="edit-input"
                        size="small"
                        v-model="scope.row.name"></el-input>
                    <span v-else>{{scope.row.name}}</span>
                </template>
            </el-table-column>
             <el-table-column align="center"
                label="是否展示">
               <template slot-scope="scope">
                    <el-tooltip content="设置精选"
                        placement="top">
                        <el-switch :active-value="2"
                            :inactive-value="1"
                            active-color="#13ce66"
                            inactive-color="#ff4949"
                            @click.native="setStatus(scope.$index, scope.row)"
                            v-model="scope.row.choose">
                        </el-switch>
                    </el-tooltip>
                </template>
            </el-table-column>
            <el-table-column align="center"
                label="操作"
                width="400px">
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
                    <el-button size="mini"
                        type="danger"
                        icon="el-icon-close"
                        @click="handleDel(scope.$index, scope.row)">删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog :visible.sync="showDialog"
            title="添加记录"
            width="30%">
            <el-form :model="form"
                status-icon
                label-width="100px"
                :rules="formRule"
                ref="cateForm"
                @submit.native.prevent>
                <el-form-item label="记录名"
                    prop="name">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item>
                    <div style="float: right">
                        <el-button type="primary"
                            @click="onSubmit">提交</el-button>
                    </div>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
import { getBanner, addBanner, editBanner, delBanner , chaBanner} from '@/api/banner'
import { pageMixin } from '@/utils/mixin'
export default {
    name: "addBanner-list",
    mixins: [pageMixin],
    data() {
        return {
            showDialog: false,
            form: {
                name: '',
            },
            formRule: {
                name: [
                    { required: true, message: '请输入记录名', trigger: 'blur' }
                ],
            },
            inputValue: '',
        }
    },

    methods: {
         setStatus(index, row) {
            const choose = row.choose == 1 ? 2 : 1
            chaBanner({ id: row.id, choose: row.choose }).then(res => {
                this.$message.success(res.msg)
            }).catch(err => {
                row.choose = choose
            })
        },
        //添加顶级分类
        handelAdd() {
            this.form.name = ''
            this.showDialog = true
        },
        //添加顶级分类提交
        onSubmit() {
            this.$refs.cateForm.validate(valid => {
                if (!valid) {
                    return false
                }
                addBanner(this.form).then(res => {
                    this.$message({
                        message: res.msg,
                        type: 'success'
                    })
                    this._getData()
                    this.showDialog = false
                })
            })
        },
        handleEdit(index, row) {
            editBanner(row).then(res => {
                this.$message({
                    message: res.msg,
                    type: 'success'
                })
                row.old_name = row.name
                row.edit = false
            })
        },

        //取消修改分类
        handleCancel(row) {
            row.edit = false
            row.name = row.old_name
        },

        //删除分类
        handleDel(index, row) {
            this.$confirm('是否确定删除该分类', '警告', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                delBanner({ id: row.id }).then(res => {
                    this.$message({
                        message: '删除成功',
                        type: 'success'
                    })
                    this.list.splice(index, 1)
                })
            })
        },
        //获取数据
        _getData() {
            getBanner().then(res => {
                res.data.map(item => {
                    item.edit = false
                    item.old_name = item.name
                })
                this.list = res.data
                this.table_loading = false
            }).catch(err => {
                this.table_loading = true
            })
        },
    },

}
</script>

<style scoped>
</style>