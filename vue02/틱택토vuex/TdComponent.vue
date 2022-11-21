<template>
    <td @click="onClickTd">{{cellData}}</td>
</template>

<script> 
    import { CLICK_CELL, SET_WINNER, RESET_GAME, CHANGE_TURN, NO_WINNER } from './store'; // 변수로 빼두면 오타낼 걱정이 없어서 사용 
    import { mapState } from 'vuex';
    export default {
        props: {
            // cellData : String, // o x 또는 빈칸
            rowIndex: Number,
            cellIndex: Number,
        },
        computed: { //computed를 사용해서 vuex state를 가져올수 있다. vuex의 state를 사용하기 위해서는 반드시 computed를 사용해야된다.
    
            ...mapState({
                tableData : state => state.tableData,
                turn: state => state.turn,
                cellData(state) {
                    return state.tableData[this.rowIndex][this.cellIndex]; 
                    //computed 가 배열때문에 매번 실행됨.
                },
            }),
            // cellData() {
            //     return this.$store.state.tableData[this.rowIndex][this.cellIndex];
            // },
            // tableData() {
            //     return this.$store.state.tableData;
            // },
            // turn() {
            //     return this.$store.state.turn;
            // },
        },
    }
</script>