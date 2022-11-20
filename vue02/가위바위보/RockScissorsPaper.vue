
<!-- 메인컴포넌트 -->
<template>
    <div>
        <div id="computer" v-bind:style="computedStyleObject"></div>
        <div>
            <button @click="onClickButton('바위')">바위</button>
            <button v-on:click="onClickButton('가위')">가위</button>
            <button @click="onClickButton('보')">보</button>
        </div>
        <div>{{result}}</div>
        <div>현재 {{score}}점</div>
        
    </div>
</template>

<script>
    const rspCoords = {
        바위 : '0',
        가위: '-142px',
        보: '-284px'
    };
    const scores = {
        가위: 1,
        바위: 0,
        보: -1
    }
    const computerChoice = (imgCoord) => {
        return Object.entries(rspCoords).find(function(v) {
            return v[1] === imgCoord;
        })[0];
    }
    let interval = null;
    export default {
        data() {
            return {
                imgCoord: rspCoords.바위,
                result:'',
                score: 0,
            };
        },
        computed: { 
            computedStyleObject() {
                return {
                    background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${this.imgCoord} 0`,
                };
            }
        },
        methods: { //렌더링을 다시 할 때마다 항상 함수를 실행한다. 
            changeHand() {
                interval = setInterval(() => {
                    if(this.imgCoord === rspCoords.바위) {
                        this.imgCoord = rspCoords.가위;
                    } else if (this.imgCoord === rspCoords.가위) {
                        this.imgCoord  = rspCoords.보;
                    } else if (this.imgCoord === rspCoords.보) {
                        this.imgCoord = rspCoords.바위;
                    }
                },100);
            },
            onClickButton(choice){
                clearInterval(interval);
                const myScore = scores[choice];
                const cpuScore = scores[computerChoice(this.imgCoord)];
                const diff = myScore - cpuScore;
                if(diff === 0) {
                    this.result = '비김';
                } else if ([-1,2].includes(diff)) {
                    this.result = '이김';
                    this.score + 1;
                } else {
                    this.result = '졌습니다.';
                    this.score -= 1;
                }
                setTimeout(() => {
                    this.changeHand()
                }, 1000)
            },
        },
            beforeCreate() {
                console.log('beforeCreate');
            },
            created() {
                //컴포넌트가 화면에 나타나기 전 
                console.log('created');
            },
            beforeMount() {
                console.log('beforemoounte');
            },
            mounted() {
                //컴포넌트가 화면에 나타난 후
                console.log('mounted');
                this.changeHand();
                
            },
            beforeUpdate() {
                console.log('beforeUpdate');
            },
            updated() {
                console.log('updated');
            },
            beforeDestroy() {
                console.log('beforeDestory');
                clearInterval(interval);
            },
            destroyed() {
                console.log('destroyed');
            },
    };
</script>

<style>
    #computer {
        width: 142px;
        height: 200px;
        background-position: 0 0;
    }
</style>