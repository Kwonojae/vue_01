
<!-- 메인컴포넌트 -->
<template>
    <div>
        <div>{{turn}} 님의 턴입니다.</div>
        <table-component :table-data="tableData"></table-component>
        <div v-if="winner">{{winner}}님의 승리!</div>
    </div>
</template>

<script>
    import EventBus from './EventBus'
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
            },
            onClickTd(rowIndex, cellIndex){
                console.log(rowIndex, cellIndex);                
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
                    this.winner = this.turn;  //승자기록
                    this.turn = 'O';
                    this.tableData = [['', '', ''], ['', '', ''], ['', '', '']]; //데이터 초기화
                } else { //이긴 사람 없으면 무승부인지 검사하는곳
                    let all = true; //all이 true면 무승부
                    this.tableData.forEach((row) => { //모든칸에 o or x 가 채워져 있는지 
                        row.forEach((cell) => {
                            if(!cell){
                                all = false;
                            }
                        });
                    });
                    if(all) { //무승부
                        this.winner = ''; //승자 없애줌
                        this.turn = 'O';
                        this.tableData = [['', '', ''], ['', '', ''], ['', '', '']];
                    } else {
                        this.turn = this.turn === 'O' ? 'X' : 'O'; //이기거나 진것도 아니면 게임이 아직 안끝났기에 턴 바꿔주기 
                    }
                }
            }    
        },
        created() {
            EventBus.$on('clickTd',this.onClickTd);

        }
            
    };
</script>

<style>

</style>