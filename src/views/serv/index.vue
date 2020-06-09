<template>
    <div class="app-container">
        <p class="page-title">服务列表</p>
        <div class="filter-container">
            <el-button type="primary"
                plain
                class="filter-item"
                @click="addServ()">添加服务</el-button>
            <div style="float: right">
                <el-input placeholder="服务名称"
                    style="width: 200px"
                    class="filter-item"
                    v-model="params.title" clearable @clear = "_getData()"></el-input>
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
                width="50px">
            </el-table-column>
            <el-table-column align="center"
                prop="title"
                label="服务名称" width="150px">
            </el-table-column>
            <el-table-column align="center"
                prop="description"
                label="服务描述" width="350px">
            </el-table-column>
			<el-table-column align="center"
			    prop="price"
			    label="价格(元)" width="100px">
			</el-table-column>
			<el-table-column align="center"
			    prop="imgurl"
			    label="服务图片">
				<template slot-scope="scope">
				    <div class="img-container">
				        <img :src="cdn + scope.row.imgurl"
				            class="img-container" style="width: 80px;height: 80px;">
				    </div>
				</template>
			</el-table-column>
			<el-table-column align="center"
			    prop="address.detail"
			    label="服务地址">
			</el-table-column>
            <el-table-column align="center"
                prop="status"
                label="状态">
                <template slot-scope="scope">
                    <el-tag type="success"
                        v-if="scope.row.status == 1">上架中</el-tag>
                    <el-tag type="warning"
                        v-else>待上架</el-tag>
                </template>
            </el-table-column>
          <el-table-column align="center"
              label="操作" width="150px">
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
import { getServList, delServ,getRegServInfo ,regServ } from '@/api/serv'
import { pageMixin } from '@/utils/mixin'
import { mapMutations } from 'vuex'
export default {
    name: "serv",
    mixins: [pageMixin],
    data() {
        return {
            params: {
                title: ''
            },
        }
    },
    methods: {
        setStatus(index, row) {
            const status = row.status == 1 ? 0 : 1
            changeStatus({ id: row.id, status: row.status }).then(res => {

            }).catch(err => {
                row.status = status
            })
        },
		 //编辑商品,并把用户信息存储在VUEX,方便调用
		handleEdit(info) {
            this.$router.push({path: '/serv/editServ', query: {id: info.id}})
        },
		//删除商品
		handleDel(index, info) {
		    this.$confirm('删除服务将不可恢复', '警告', {
		        confirmButtonText: '确定',
		        cancelButtonText: '取消',
		        type: 'warning'
		    }).then(() => {
		        delServ(info).then(res => {
		            this.$message({
		                message: '删除成功',
		                type: 'success'
		            })
		            this.list.splice(index, 1)
		        })
		    })
			this._getData()
		},
		addServ(flag) {
		    this.$router.push('/serv/addServ/')
			},
        _getData() {
            getServList(this.params).then(res => {
                this.total = res.data.total
                this.pageSize = res.data.per_page
                this.page = res.data.current_page
                this.list = res.data.data
                this.table_loading = false
				console.log(res)
            }).catch(err => {
                this.table_loading = true
            })
        }
    }
}
</script>

<style scoped lang="scss">
</style>