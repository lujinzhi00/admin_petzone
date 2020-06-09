<template>
    <div class="app-container">
        <p class="page-title">轮播内容管理</p>
        <div class="filter-container">
            <el-button type="primary"
                plain
                class="filter-item"
                @click="handelAdd()">添加轮播内容</el-button>
            <div style="float: right; display: flex">
            <el-input placeholder="简介"
                    style="width: 200px"
                    class="filter-item"
                    v-model="params.description"></el-input>
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
                prop="description"
                label="简介">
            </el-table-column>
            <el-table-column align="center"
                prop="imgurl"
                label="图片">
                <template slot-scope="scope">
                    <img :src="cdn + scope.row.imgurl"
                        class="scope-img"
                        v-if="scope.row.imgurl">
                </template>
            </el-table-column>
            <el-table-column align="center"
                prop="info.name"
                label="所属记录">
            </el-table-column>
            <el-table-column align="center"
                label="操作"
                width="170px">
                <template slot-scope="scope">
                    <el-button size="mini"
                        type="primary"
                        @click="handleEdit(scope.$index, scope.row)">编辑
                    </el-button>
                    <el-button size="mini"
                        type="danger"
                        @click="handleDel(scope.$index, scope.row)">删除
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
        <el-dialog :visible.sync="showDialog"
            title="添加轮播内容"
            width="30%" @close="reset">
            <el-form :model="form"
                status-icon
                label-width="120px"
                :rules="formRule"
                ref="cateForm"
                @submit.native.prevent>
                <el-form-item label="选择所属轮播"
                    prop="banner_id">
                    <el-select v-model="form.banner_id"
                        style="width: 100%;"
                        placeholder="请选择">
                        <el-option v-for="(item,i) in cate"
                            :key="i"
                            :label="item.name"
                            :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="简介"
                    prop="deccription">
                    <el-input v-model="form.description"></el-input>
                </el-form-item>
                <el-form-item label="推荐图片">
                    <el-upload :on-success="skuImgUploadSuccess"
                        :show-file-list="false"
                        class="upload-img-col"
                        :action=imgPostUrl>
                        <el-button slot="trigger"
                            v-if="!form.imgurl"
                            type="primary">选取文件</el-button>
                        <img :src="cdn + form.imgurl"
                            class="upload-img"
                            v-else
                            slot="trigger"
                            alt="" width="300px" height="300px">
                    </el-upload>
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
import { getBanner, bannerItem, addBannerItem, editBannerItem, delBannerItem } from '@/api/banner'
import { pageMixin } from '@/utils/mixin'
const api = process.env.BASE_API
export default {
    name: "addBannerItem",
    mixins: [pageMixin],
    data() {
        return {
            showDialog: false,
            cate: [],
            params: {
                description: ''
            },
            form: {
                description: '',
                imgurl: '',
                banner_id: '',
            },
            isAdd: true,
            formRule: {
                description: [
                    { required: true, message: '请输入简介', trigger: 'blur' },
                     { min:1,max: 10, message: '不能超过10个字符', trigger: 'blur' }
                ],
                banner_id: [
                    { required: true, type: 'number', message: '请选择所属分类', trigger: 'change' }
                ],
            },
            inputValue: '',
            imgPostUrl: api + '/common/uploadImg', //图片上传地址
        }
    },
    created() {
        getBanner().then(res => {
            this.cate = res.data
        }).catch(err => {
            console.log(err)
        })
    },

    methods: {
        reset()
        {
            this.$refs.cateForm.resetFields()
        },
        // 上传图片
        skuImgUploadSuccess(res, files) {
            if (res.status == 1) {
                this.form.imgurl = res.data
            }
        },
        //添加记录内容
        handelAdd() {
            [this.form.description,this.form.name,this.form.imgurl,this.form.banner_id, this.showDialog, this.isAdd] = ['','', '', '', true, true]
        },
        // 修改推荐内容
        handleEdit(index, row) {
            [this.showDialog, this.isAdd, this.form] = [true, false, row]
        },
        //添加顶级分类提交
        onSubmit() {
            this.$refs.cateForm.validate(valid => {
                if (!valid) {
                    return false
                }
                if (this.isAdd) {
                    addBannerItem(this.form).then(res => {
                        this.$message({
                            message: res.msg,
                            type: 'success'
                        })
                        this._getData()
                        this.showDialog = false
                    })
                } else {
                    editBannerItem(this.form).then(res => {
                        this.$message({
                            message: res.msg,
                            type: 'success'
                        })
                        this._getData()
                        this.showDialog = false
                    })
                }
            })
        },

        //删除推荐内容
        handleDel(index, row) {
            this.$confirm('是否确定删除该推荐内容', '警告', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                delBannerItem({ id: row.id }).then(res => {
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
            bannerItem(this.params).then(res => {
                this.total = res.data.total
                this.pageSize = res.data.per_page
                this.page = res.data.current_page
                this.list = res.data.data
                this.table_loading = false
            }).catch(err => {
                this.table_loading = true
            })
        },
    },

}
</script>

<style scoped lang="scss">
.upload-img {
    width: 100%;
}
.scope-img {
    width: 53px;
}
</style>