
<!-- 메인컴포넌트 -->
<template>
    <div>
        <div>{{turn}} 님의 턴입니다.</div>
        <!-- computed가 매번 실행해서 쪼개는게 의마가 없다 tr,td컴포넌트 필요없이 한곳에서 처리함   -->
        <table-component>
            <tr v-for="(rowData, rowIndex) in tableData" :key="rowIndex">
                <td @click="onClickTd(rowIndex, cellIndex)" v-for="(cellData, cellIndex) in rowData" :key="cellIndex">{{cellData}}</td>
            </tr>
        </table-component>
        <div v-if="winner">{{winner}}님의 승리!</div>
    </div>
</template>

<script>
    import {mapState} from 'vuex';
    // import store from './store'; // store랑 최상위 컴포넌트랑 연결 해줘야됨 .
    import store, { CLICK_CELL, SET_WINNER, RESET_GAME, CHANGE_TURN, NO_WINNER } from './store'; // 변수로 빼두면 오타낼 걱정이 없어서 사용 
    import TableComponent from './TableComponent';

    export default {
        store, 
        components: {
            TableComponent,
        },
        data() {
            return {
                data: 1,
            }
        },
        computed: {
            ...mapState(['winner', 'turn', 'tableData']), //mapState : computed와 store의 state를 한번에  연결함 . 
        //     winner() {
        //         return this.$store.state.winner;
        //     },
        //     turn() {
        //         return this.$store.state.turn;
        //     }
        },
        methods: { //td를 누르먄 직접 수정되는곳
            onClickTd(rowIndex, cellIndex) {
                if(this.cellData) return;
                //commit(뮤테이션 이름, 데이터값)
                this.$store.commit(CLICK_CELL, { row: rowIndex, cell: cellIndex }); //뮤테이션 이름이 CLICK_CELL인것이 실행된다  뮤테이션을 부를때 commit을 사용한다. 
            
                this.$set(this.tableData[rowIndex], cellIndex, this.turn); // 테이블에 o 또는 x 를 그림

                let win = false;
                if(this.tableData[rowIndex][0] === this.turn && this.tableData[rowIndex][1] === this.turn && this.tableData[rowIndex][2] === this.turn) {
                    win = true; //가로 3줄인지
                }
                if(this.tableData[0][cellIndex][0] === this.turn && this.tableData[1][cellIndex] === this.turn && this[2][cellIndex] === this.turn) {
                    win = true;//세로승 3줄인지
                }
                if(this.tableData[0][0] === this.turn && this.tableData[1][1] === this.turn && this.tableData[2][2] === this.turn) {
                    win = true; //대각선 3줄인지
                }
                if(this.tableData[0][2] === this.turn && this.tableData[1][1] === this.turn && this.tableData[2][0] === this.turn) {
                    win = true; //대각선
                }
                if(win) { //이긴 경우 : 3줄 달성
                    this.$store.commit(SET_WINNER, this.turn); //승자기록
                    this.$store.commit(RESET_GAME); //데이터 초기화
                } else { //이긴 사람 없으면 무승부인지 검사하는곳
                    let all = true; //all이 true면 무승부
                    this.tableData.forEach((row) => { //모든칸에 o or x 가 채워져 있는지 
                        row.forEach((cell) => {
                            if(!cell){
                                all = false;
                            }
                        });
                    });
                    if(all) { 
                        this.$store.commit(NO_WINNER)//무승부
                        this.$store.commit(RESET_GAME);
                    } else {
                        this.$store.commit(CHANGE_TURN) //이기거나 진것도 아니면 게임이 아직 안끝났기에 턴 바꿔주기 
                    }
                }
            }    
        }
    };
</script>

<style>

</style>