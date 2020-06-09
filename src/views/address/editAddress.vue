<template>
    <div class="app-container">
        <el-form label-width="180px"
            status-icon
            :rules="formRules"
            ref="loginForm"
            :model="formValue"
            @submit.native.prevent>
            <el-form-item label="负责人姓名"
                prop="name">
                <el-input name="name"
                    v-model="formValue.name"
                    style="width: 280px"></el-input>
            </el-form-item>
            <el-form-item label="手机"
                prop="mobile">
                <el-input v-model="formValue.mobile"
                    style="width: 280px"
                    ></el-input>
            </el-form-item>
            <el-form-item label="地址详情"
                prop="detail">
                <el-input v-model="formValue.detail"
                    style="width: 280px"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary"
                    @click="onSubmit()">立即修改</el-button>
                <el-button @click="resetForm"
                   >重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getDetail, editAddress } from '@/api/address'

export default {
    name: "addAddress",
    created() {
        this._getData()
    },
    data() {
     var mobileCheck = (rule, value, cb) => {
             const mobile = /^1[345789]\d{9}$/
             if (mobile.test(value)) return cb()
             cb(new Error('请输入合法手机号码'))
     }
        return {
            //表单双向绑定数据
            formValue: {
                name: '',
                mobile: '',
                detail: '',
            },
            //表单提交规则
            formRules: {
                name: [
                    { required: true, message: '必填项', trigger: 'blur' },
                    { min: 2, message: '最少为输入2位数', trigger: 'blur' }
                ],
                mobile: [
                    {required: true, message: '请输入手机号码', trigger: 'blur'},
                    { validator:mobileCheck,trigger:'blur' }
                ],
                detail: [
                    { required: true, message: '必填项', trigger: 'blur' },
                ],
            }
        }
    },
    methods: {
        //提交表单
        onSubmit() {
            this.$refs.loginForm.validate(valid => {
                if (!valid) {
                    return false
                }
                editAddress(this.formValue).then(res => {
                    this.$message({
                        message: res.msg,
                        type: 'success'
                    })
                    this.$router.push('/address/index')
                })
            })
        },
        //获取用户信息
        _getData()
        {
            getDetail(this.$route.query).then(res => {
		            this.formValue = res.data
		        }).catch(err => {
		        })
        },
        //重置表单
        resetForm() {
            this.$refs.loginForm.resetFields()
        }
    },
}
</script>

<style scoped>
</style>