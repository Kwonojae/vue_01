//store를 여러개 만들어도 된다 .
//vue와 별도의 라이브러리 이다.
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex); //vue랑 Vuex를 연결해줘야 함! this.$store 사용 가능
// Vue.use(axios); //this.$axios생성

//오브젝트 다이나믹 프로퍼티 동적 속성
export const SET_WINNER = 'SET_WINNER'; // import { SET_WINNER, .... } from './store; export 이름이 같은것만 가져올수 있다. 
export const CLICK_CELL = 'CLICK_CELL';
export const CHANGE_TURN = 'CHANGE_TURN';
export const RESET_GAME = 'RESET_GAME';
export const NO_WINNER = 'NO_WINNER ';


export default new Vuex.Store({ // export default 사용하면 import store from './'store'; 처럼 가져올수 있다. 
    state: {
        tableData: [
            ['', '', ''],
            ['', '', ''],
            ['', '', ''],
        ],
        turn: 'O',
        winner: '',
    }, //vue의 data와 비슷
    getters: { //state에 추가적인 작업을 할 때 사용함 캐싱됨.
        turnMessage(state) {
            return this.turn + '님이 승리하셨습니다.';
        }
    }, //vue의 computed와 비슷
    mutations: {
        [SET_WINNER](state, winner){ //vue에서 mutation은 함수를 대문자로 사용한다 규칙  데이터를 전달해줌 
            state.winner = winner;
        },
        [CLICK_CELL](state, { row, cell}) {
            Vue.set(state.tableData[row],cell = state.turn); //배열을 인덱스로 수정할 경우  set (바꾸고싶은값,  key, X)  === [1],[0]를 x 로 바꾼다
        },
        [CHANGE_TURN](state) {
            state.turn = state.turn === 'O' ? 'X' : 'O';
        },
        [RESET_GAME](state){
            state.turn = 'O';
            state.tableData = [
                ['', '', ''],
                ['', '', ''],
                ['', '', ''],
            ];
        },
        [NO_WINNER](state) {
            state.winner = '';
        }
        
    }, //state를 수정할 때 사용한다. 동기적으로 
    actions:{

    },//비동기를 사용할때, 또는 여러 뮤테이션을 연달아 실행할 때
});