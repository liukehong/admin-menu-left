<template>
    <Card>
        <div slot="title">
            <Row>
                <Input v-model="name" placeholder="请输入姓名搜搜..." style="width: 200px" />
            </Row>
            <Row style="margin-top: 10px;">
                <Button type="primary" icon="search">搜索</Button>
                <Button type="ghost" >取消</Button>
            </Row>
        </div>
        <Table :columns="columns1" :data="data1"></Table>
        <Page style="margin-top: 10px;" :total="100"></Page>
    </Card>
</template>
<script>
    export default {
        data () {
            return {
                name: '',
                columns1: [
                    {
                        title: '姓名1',
                        key: 'name'
                    },
                    {
                        title: '年龄',
                        key: 'age'
                    },
                    {
                        title: '地址',
                        key: 'address'
                    }
                ],
                data1: [
                    {
                        name: '张三',
                        age: 18,
                        address: '广州',
                        date: '2018-10-03'
                    },
                    {
                        name: '李四',
                        age: 24,
                        address: '深圳',
                        date: '2018-10-01'
                    },
                    {
                        name: '小五',
                        age: 30,
                        address: '东莞',
                        date: '2018-10-02'
                    },
                    {
                        name: '老六',
                        age: 26,
                        address: '香港',
                        date: '2018-10-04'
                    }
                ]
            }
        }
    }
</script>
