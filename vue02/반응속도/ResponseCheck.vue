
<!-- 메인컴포넌트 -->
<template>
    <div>
        <div id="screen" v-bind:class="state" @click="onClickScreen">{{message}}</div>
        <template v-if="result.length">
            <!-- v-show는 true면 화면에 나오고 false면 안나옴
                눈에 안보이게 처리 디스플레이 논 처리됨 .
                v-if는 그냥 태그 자체가 존재하지 않는다.  주석 처리함 
                v-else 보통 많이씀
                쓸대없이 div 가 사용 될경우 template사용한다. 
            -->
            <div>평균시간: {{average}}ms</div>
            <button v-on:click="onReset">리셋</button>
        </template>
    </div>
</template>

<script>
    let startTime = 0; //starttime - endtime = 반응속도
    console.log("sT : " + startTime);
    let endTime = 0;
    console.log("eT: " + endTime);
    let timeout = null;
    export default {
        data() {
            return {
                result: [],
                state: 'waiting',
                message: '클릭해서 시작하세요.',    
            }
        },
        computed: { // 중요! 캐싱. 리액티브(반응적)인 의존관계에 의해 캐시화 되어진다. 팀플릿의 데이터 표현을 더 직관적이고 간결하게 도와주는 속성이다.
            // 컴퓨티느 속성은 단순히 뷰 템플릿 코드의 가독성만 높여줄 뿐만 아니라 컴퓨티드 속성의 대상으로 정한 data 속성이 변했을 때 이를 감지하고 자동으로 다시 연산해준다. 
            average() {
                return this.result.reduce((previousValue,currentValue) => previousValue + currentValue , 0) / this.result.length || 0 ;
            },
        },
        methods: { //렌더링을 다시 할 때마다 항상 함수를 실행한다. 
            onReset() {
                this.result = [];
            },
            onClickScreen() {
                if (this.state === 'waiting') {
                    this.state = 'ready';
                    this.message = '초록색이 되면 클릭하세요.'; 
                    timeout = setTimeout(() => {
                        this.state ='now';
                        this.message = '지금 클릭!'
                        startTime = new Date(); 
                        console.log(new Date());
                    }, Math.floor(Math.random() * 1000) +2000); //2~3초
                    console.log("math: " + Math.floor(Math.random() * 1000) +2000);
                } else if (this.state === 'ready') {
                    clearTimeout(timeout);
                    this.state = 'now';
                    this.message = '너무 성급하시군요! 초록색이 된 후에 클릭하세요.'
                } else if (this.state === 'now') {
                    endTime = new Date();
                    this.state = 'waiting'
                    this.message = '클릭해서 시작하세요.'
                    this.result.push(endTime - startTime); 
                    console.log("length: " + this.result.length);
                    console.log(this.result.reduce((a,c) => a + c , 0) / this.result.length );
                    
                }
            }
        },
    };
</script>

<style>
    #screen {
        /* scoped 붙이면 여기 있는 컴포넌트만 유효하고 안붙이면 그냥 Css임*/
        width: 300px;
        height: 200px;
        text-align: center;
        user-select: none;
    }
    #screen.waiting {
        background-color: aqua;
    }
    #screen.ready {
        background-color: red;
        color: white;
    }
    #screen.now {
        background-color: greenyellow;
    }
</style>