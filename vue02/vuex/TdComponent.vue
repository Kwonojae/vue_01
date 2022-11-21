<template>
    <td @click="onClickTd">{{cellData}}</td>
</template>

<script>
    export default {
        props: {
            cellData : String, // o x 또는 빈칸
            rowIndex: Number,
            cellIndex: Number,
        },
        methods: {
            onClickTd() {
                if(this.cellData) return;
                const rootData = this.$root.$data;
                console.log(rootData);
                this.$set(rootData.tableData[this.rowIndex], this.cellIndex, rootData.turn); // 테이블에 o 또는 x 를 그림

                let win = false;
                if(rootData.tableData[this.rowIndex][0] === rootData.turn && rootData.tableData[this.rowIndex][1] === rootData.turn && rootData.tableData[this.rowIndex][2] === rootData.turn) {
                    win = true; //가로 3줄인지
                }
                if(rootData.tableData[0][this.cellIndex][0] === rootData.turn && rootData.tableData[1][this.cellIndex] === rootData.turn && rootData[2][this.cellIndex] === rootData.turn) {
                    win = true;//세로승 3줄인지
                }
                if(rootData.tableData[0][0] === rootData.turn && rootData.tableData[1][1] === rootData.turn && rootData.tableData[2][2] === rootData.turn) {
                    win = true; //대각선 3줄인지
                }
                if(rootData.tableData[0][2] === rootData.turn && rootData.tableData[1][1] === rootData.turn && rootData.tableData[2][0] === rootData.turn) {
                    win = true; //대각선
                }
                if(win) { //이긴 경우 : 3줄 달성
                    rootData.winner = rootData.turn;  //승자기록
                    rootData.turn = 'O';
                    rootData.tableData = [['', '', ''], ['', '', ''], ['', '', '']]; //데이터 초기화
                } else { //이긴 사람 없으면 무승부인지 검사하는곳
                    let all = true; //all이 true면 무승부
                    rootData.tableData.forEach((row) => { //모든칸에 o or x 가 채워져 있는지 
                        row.forEach((cell) => {
                            if(!cell){
                                all = false;
                            }
                        });
                    });
                    if(all) { //무승부
                        rootData.winner = ''; //승자 없애줌
                        rootData.turn = 'O';
                        rootData.tableData = [['', '', ''], ['', '', ''], ['', '', '']];
                    } else {
                        rootData.turn = rootData.turn === 'O' ? 'X' : 'O'; //이기거나 진것도 아니면 게임이 아직 안끝났기에 턴 바꿔주기 
                    }
                }

            }
        }
    }
</script>