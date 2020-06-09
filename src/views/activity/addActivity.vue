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
                <el-col :span="12">
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
				<el-col :span="12">
				    <el-form-item label="举办时间"
				        prop="time">
                     <el-date-picker
                        v-model="formValue.time"
                        type="datetime"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        placeholder="选择日期时间">
                        </el-date-picker>
				    </el-form-item>
				</el-col>
            </el-row>
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
    </div>
</template>

<script>
import MDinput from "@/components/MDinput"
import { inArray } from "@/utils/index"
import tinymce from "@/components/Tinymce"
import { getAddress,addActivity} from "@/api/activity"
export default {
    name: "addActivity",
    data() {
        return {
            formValue: {
               title:'',
			   time:'',
			   description:'',
               address_id:'',
               author_id:''
            },
            formRules: {
                title: [
                    { required: true, message: '必填项', trigger: 'blur' },
                    { min: 4, max: 25, message: '请输入4-25个字', trigger: 'blur' }
                ],
                address_id: [
                    { required: true, message: '请选择地址', trigger: 'blur'},
                ],
                time: [
                    { required: true,  message: '请选择时间', trigger: 'blur'}
                ],
                description: [
                    { required: true, min: 1, message: '不能为空', trigger: 'blur'}
                ]
            },
            address: [],
        }
    },
    created() {
        getAddress().then(res => { 
            this.formValue.author_id = res.data.id
            this.address = res.data.address
        })
    },
    methods: {
        //提交
        onSubmit() {
            console.log(this.formValue)
            this.$refs.fromInput.validate(valid => {
                if (!valid) {
                    this.$message({
                        message: '信息填写错误,请仔细检查',
                        type: 'error'
                    })
                    return false
                }
                addActivity(this.formValue).then(res => {
                    console.log(this.formValue)
                    this.$message({
                        message: res.msg,
                        type: 'success'
                    })
                    this.$router.push('/activity/index')
                })
            })
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
