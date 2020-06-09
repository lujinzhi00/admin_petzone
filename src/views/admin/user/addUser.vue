<template>
    <div class="app-container">
        <el-form label-width="180px"
            status-icon
            :rules="formRules"
            ref="loginForm"
            :model="formValue"
            @submit.native.prevent>
            <el-form-item label="管理员账号"
                prop="admin_name">
                <el-input name="name"
                    v-model="formValue.admin_name"
                    style="width: 280px"
                    :disabled="admin_name_readonly"></el-input>
            </el-form-item>
            <el-form-item label="设置角色"
                prop="role_id">
                <el-select v-model="formValue.role_id"
                    style="width: 280px"
                    placeholder="请选择">
                    <el-option v-for="(role,i) in roles"
                        :key="i"
                        :label="role.role_name"
                        :value="role.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="设置密码"
                prop="password">
                <el-input v-model="formValue.password"
                    style="width: 280px"
                    type="password"
                    :placeholder="passwordPlaceholder"></el-input>
            </el-form-item>
            <el-form-item label="真实姓名"
                prop="real_name">
                <el-input v-model="formValue.real_name"
                    style="width: 280px"></el-input>
            </el-form-item>
             <el-form-item label="电话号码"
                prop="tellphone">
                <el-input v-model="formValue.tellphone"
                    style="width: 280px"></el-input>
            </el-form-item>
            <el-form-item label="是否启用">
                <el-radio-group v-model="formValue.status">
                    <el-radio border
                        v-for="(la, i) in status"
                        :key="i"
                        :label="i">{{la}}</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item>
                <el-button type="primary"
                    @click="onSubmit()">立即创建</el-button>
                <el-button @click="resetForm"
                    v-if="!admin_name_readonly">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getRegAdminInfo, regAdmin } from '@/api/adminUser'

export default {
    name: "adduserd",
    created() {
        this.$nextTick(() => {
            this._getRole()
        })
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
                admin_name: '',
                role_id: '',
                password: '',
                real_name: '',
                status: 0,
                tellphone:'',
                id: null,
            },
            passwordPlaceholder: '',
            admin_name_readonly: false,
            roles: {},
            status: {},
            //表单提交规则
            formRules: {
                admin_name: [
                    { required: true, message: '必填项', trigger: 'blur' },
                    { min: 5, message: '最少为输入5位数', trigger: 'blur' }
                ],
                password: [
                    // {required: true, message: '必填项', trigger: 'blur'},
                    { min: 6, message: '最少为输入6位数', trigger: 'blur' }
                ],
                role_id: [
                    { required: true, message: '必填项', trigger: 'change' },
                ],
                real_name: [
                    { required: true, message: '必填项', trigger: 'blur' },
                    { min: 2, message: '最少为输入2位数', trigger: 'blur' }
                ],
                 tellphone: [
                    {required: true, message: '请输入手机号码', trigger: 'blur'},
                    { validator:mobileCheck,trigger:'blur' }
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
                regAdmin(this.formValue).then(res => {
                    this.$message({
                        message: res.msg,
                        type: 'success'
                    })
                    this.$router.push('/admin/user')
                })
            })
        },
        //重置表单
        resetForm() {
            this.$refs.loginForm.resetFields()
        },
        //从VUEX里取得用户信息(如果有的话就是编辑,没有的话就是添加)
        _getRole() {
            if (Object.keys(this.editAdmin).length > 0) {
                this.formValue.admin_name = this.editAdmin.admin_name
                this.formValue.tellphone = this.editAdmin.tellphone
                 this.formValue.admin_name = this.editAdmin.admin_name
                this.formValue.real_name = this.editAdmin.real_name
                this.formValue.role_id = this.editAdmin.role_id
                this.formValue.status = this.editAdmin.status
                this.formValue.id = this.editAdmin.id
                this.formValue.password = ''
                this.passwordPlaceholder = '不填不修改'
                this.admin_name_readonly = true
            }
            getRegAdminInfo().then(res => {
                this.roles = res.data.role
                this.status = res.data.status
            })
        }
    },
    computed: {
        ...mapGetters([
            'editAdmin'
        ])
    }
}
</script>

<style scoped>

</style>