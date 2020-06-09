<template>
    <div class="app-container"
        id="add-pro">
        <el-form class="form-container"
            :inline="true"
            status-icon
            :rules="formRules"
            ref="fromInput"
            :model="formValue"
            @submit.native.prevent
            label-width="80px"
            label-position="left">
            <el-row>
                <el-col :span="24"
                    style="margin-bottom: 22px">
                    <el-form-item prop="title"
                        id="title-item">
                        <MDinput :maxlength="25"
                            v-model="formValue.title">输入标题</MDinput>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="选择地址"
                        prop="address_id">
                        <el-select v-model="formValue.address_id"
                            style="width: 200px">
                            <el-option v-for="(item, index) in address"
                                :label="item.detail"
                                :value="item.id"
                                :key="index"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
				<el-col :span="8"
				    v-if="!haveSku">
				    <el-form-item label="服务价格"
				        prop="price">
				        <el-input style="width: 200px"
				            type="number"
				            v-model.number="formValue.price"></el-input>
				    </el-form-item>
				</el-col>
				<el-col :span="8">
				    <el-form-item label="是否上架"
				        prop="status">
				        <el-radio v-model.number="formValue.status"
				            :label="1"
				            border >上架</el-radio>
				        <el-radio v-model.number="formValue.status"
				            :label="2"
				            border >待上架</el-radio>
				    </el-form-item>
				</el-col>
            </el-row>
            <span class="diver">图片上传(第一张将作为默认显示)</span>
            <el-upload :action="imgPostUrl"
                :multiple="false"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :on-success="uploadSuccess"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                style="padding-bottom: 22px"
                :limit="1">
                <i class="el-icon-plus"></i>
            </el-upload>
            <el-row>
                <el-col>
                    <span class="diver">详细内容</span>
                    <div class="editor-container">
                        <tinymce :height=400
                            ref="editor"
                            v-model="formValue.description"></tinymce>
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <el-col>
                    <el-button type="primary"
                        @click="onSubmit"
                        style="float:right">提交</el-button>
                </el-col>
            </el-row>
        </el-form>
        <el-dialog :visible.sync="dialogVisible">
            <img width="100%"
                :src="dialogImageUrl"
                alt="">
        </el-dialog>
    </div>
</template>

<script>
import MDinput from "@/components/MDinput"
import { inArray } from "@/utils/index"
import tinymce from "@/components/Tinymce"
import { getAddress,addServ } from "@/api/serv"
const api = process.env.BASE_API
const cdn = process.env.CDN
export default {
    name: "addServ",
    data() {
        return {
            cdn: cdn,
            formValue: {
               title:'',
			   price:'',
			   status:'',
			   description:'',
			   imgs:[],
			   address_id:'',
			   imgurl:''
            },
            formRules: {
                title: [
                    { required: true, message: '必填项', trigger: 'blur' },
                    { min: 4, max: 25, message: '请输入4-25个字', trigger: 'blur' }
                ],
                address_id: [
                    { required: true, message: '请选择地址', trigger: 'blur', type: 'number' },
                ],
                price: [
                    { required: true, min: 0.01, message: '市场价不得低于0.01元', trigger: 'blur', type: 'number' }
                ],
                description: [
                    { required: true, min: 1, message: '不能为空', trigger: 'blur'}
                ],
                status: [
                    { required: true, enum: [0, 1], message: '非法数据', trigger: 'blur', type: 'number' }
                ],
				imgurl: [
				    { required: true, message: '请上传图片', trigger: 'blur' }
				],

            },
            address: [],
            imgPostUrl: api + '/common/uploadImg', //图片上传地址
            dialogImageUrl: '', //已完成上传, 加载图片预览地址
            dialogVisible: false, //加载图片预览地址flag
            haveSku: false
        }
    },
    created() {
        getAddress().then(res => {
            this.address = res.data.address
        })
    },
    methods: {
        //图片预览
        handlePictureCardPreview(file) {
            console.log('handlePictureCardPreview', file)
            this.dialogVisible = true
            this.dialogImageUrl = file.url
        },
        //图片删除钩子
        handleRemove(file, fileList) {
            this.formValue.imgs.splice(inArray(this.formValue.imgs, file.response.data), 1)
            console.log('handleRemove', file, fileList)
			
        },
        //图片上传钩子
        uploadSuccess(res, file, fileList) {
            this.formValue.imgs.unshift(res.data)
            console.log('uploadSuccess', res, file, fileList)
			this.formValue.imgurl = res.data
        },
        //图片删除前钩子
        beforeRemove(file, fileList) {
            console.log('beforeRemove', file, fileList)
            return this.$confirm('确定移除？')
        },
        //提交
        onSubmit() {
            this.$refs.fromInput.validate(valid => {
                if (!valid) {
                    this.$message({
                        message: '信息填写错误,请仔细检查',
                        type: 'error'
                    })
                    return false
                }
                addServ(this.formValue).then(res => {
                    this.$message({
                        message: res.msg,
                        type: 'success'
                    })
                    this.$router.push('/serv/index')
                })
            })
        },
        //重写头部
        overwrite(h, { column, $index }) {
            return (
                <el-popover placement="top-start" trigger="click">
                    <el-row>
                        <el-col span={15}>
                            <el-input size="mini"
                                on-change={(str) => { this.skuAttr[column.property] = str }}
                                placeholder="全部修改"></el-input>
                        </el-col>
                        <el-col span={9}>
                            <el-button size="mini"
                                style="float: right"
                                on-click={() => this.setAll(column.property)}
                                type="success">确定</el-button>
                        </el-col>
                    </el-row>
                    <span slot="reference" style="display: flex; justify-content:center">{column.label}<i class="el-icon-edit"></i></span>
                </el-popover>
            )
        },
        //重写图片上传头部
        overwriteImg(h, { column, $index }) {
            // const _this = this
            if (!this.skuAttr.img) {
                return h('el-popover', {
                    props: {
                        placement: 'top-start',
                        trigger: 'click'
                    }
                }, [h('el-upload', {
                    props: {
                        action: this.imgPostUrl,
                        showFileList: false,
                        onSuccess: this.setAllImg
                    },
                }, [(<el-button slot="trigger"
                    size="mini"
                    type="primary">选取文件</el-button>)]), (<span slot="reference" style="display: flex; justify-content:center">{column.label}<i class="el-icon-edit"></i></span>)]
                )
            } else {
                /* return (
                    <el-popover placement="top-start" trigger="click">
                        <el-row>
                            <el-col span={15} style="display: flex; justify-content:center">
                                <el-upload
                                    action={this.imgPostUrl}
                                    showFileList={false}
                                    on-success={() => _this.setAllImg}
                                >
                                    <img src={this.cdn + this.skuAttr.img} style="height: 28px; width: 28px;" />
                                </el-upload>
                            </el-col>
                            <el-col span={9}>
                                <el-button size="mini"
                                    style="float: right"
                                    on-click={() => this.setAll('img')}
                                    type="success">确定</el-button>
                            </el-col>
                        </el-row>
                        <span slot="reference" style="display: flex; justify-content:center">{column.label}<i class="el-icon-edit"></i></span>
                    </el-popover>
                ) */
                return (
                    <el-popover placement="top-start" trigger="click">
                        <el-row>
                            <el-col span={15} style="display: flex; justify-content:center">
                                {h('el-upload', {
                                    props: {
                                        action: this.imgPostUrl,
                                        showFileList: false,
                                        onSuccess: this.setAllImg
                                    }                                }
                                    , [(<img src={this.cdn + this.skuAttr.img} style="height: 28px; width: 28px;" />)])}
                            </el-col>
                            <el-col span={9}>
                                <el-button size="mini"
                                    style="float: right"
                                    on-click={() => this.setAll('img')}
                                    type="success">确定</el-button>
                            </el-col>
                        </el-row>
                        <span slot="reference" style="display: flex; justify-content:center">{column.label}<i class="el-icon-edit"></i></span>
                    </el-popover>
                )
            }
        }
    },
    watch: {
        chooseSku1(newV, oldV) {
            this.buildChild()
        },
        chooseSku2(newV, oldV) {
            this.buildChild()
        },
    },
    components: {
        MDinput, tinymce
    },
}
</script>

<style lang="sass">
    #add-pro
        .form-container
            padding: 10px 50px
            .material-input
                font-weight: 800
                font-size: 23px
                color: rgba(176, 195, 25, 0.8)
            #title-item
                display: block
                .el-form-item__content
                    display: block !important
            .diver
                display: block
                font-size: 12px
                color: #ccc
                line-height: 40px
                margin-bottom: 22px
                border-bottom: 1px dashed #ccc
                .el-form-item__error
                    position: relative
                    padding-top: 0
                    top: auto
                    left: 10px
                    display: inline-block
            .editor-container 
                min-height: 500px
                margin: 0 0 30px
                .editor-upload-btn-container 
                    text-align: right
                    margin-right: 10px
                    .editor-upload-btn 
                    display: inline-block
            .table-sku
                font-size: 12px
            .upload-img-col
                display: flex
                justify-content: center
                .upload-img
                    display: block
                    height: 28px
                    width: 28px
            .el-icon-edit
                margin-left: 5px
                line-height: 23px
                &:before
                    -webkit-text-fill-color: #409EFF
                    fill: #409EFF
</style>
