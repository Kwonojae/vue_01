
<!-- 메인컴포넌트 -->
<template>
    <div>
        <div>{{turn}} 님의 턴입니다.</div>
        <table-component :table-data="tableData"></table-component>
        <div v-if="winner">{{winner}}님의 승리!</div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import TableComponent from './TableComponent';
    export default {     
        components: {
            TableComponent,
        },
        data() {
            return {
                tableData: [
                    ['', '', ''],
                    ['', '', ''],
                    ['', '', ''],
                ],
                turn: 'O',
                winner: '',
            };
        },
        methods: { //렌더링을 다시 할 때마다 항상 함수를 실행한다. 
            onChangeData() {
                //this.tableData[1][0] = 'X'; vue에서 작동하지 않는다 아래 사용 해야함
                // Vue.set(this.tableData[1], 0, 'X'); // set (바꾸고싶은값,  key, X)  === [1],[0]를 x 로 바꾼다
                this.$set(this.tableData[1], 0, 'X'); //Vue.set과 동일하다 위에거 
            }    
        },
            
    };
</script>

<style>

</style>