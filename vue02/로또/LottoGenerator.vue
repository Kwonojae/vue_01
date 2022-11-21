
<!-- 메인컴포넌트 -->
<template>
    <div>
        <div>당첨 숫자</div>
        <div id="결과창">
            <lotto-ball v-for="ball in winBalls" v-bind:key="ball" v-bind:number="ball" ></lotto-ball>
        </div>
        <div>보너스</div>
        <lotto-ball v-if="bonus" :number="bonus"></lotto-ball>
        <button v-if="redo" @click="onClickRedo">한번더</button>
    </div>
</template>

<script>
    import LottoBall from './LottoBall.vue';

    function getWinNumbers() {
        console.log('getWinNumbers');
        const candidate = Array(45).fill().map((v, i) => i + 1);
        const shuffle = [];
        while (candidate.length > 0) {
            shuffle.push(candidate.splice(Math.floor(Math.random()*candidate.length),1)[0]);
        }
        const bonusNumber = shuffle[shuffle.length -1 ];
        const winNumbers = shuffle.slice(0, 6).sort((p,c) => p - c );
        return [...winNumbers, bonusNumber];
        
    }
    const timeouts =[];
    export default {     
        components: {
            LottoBall
        },
        data() {
            return {
                winNumbers: getWinNumbers(), // 숫자 뽑는곳
                winBalls:[], //시각적인 효과를 주기위한거
                bonus: null,
                redo: false,
            };
        },
        computed: { 
        
        },
        methods: { //렌더링을 다시 할 때마다 항상 함수를 실행한다. 
                onClickRedo() {
                    this.winNumbers = getWinNumbers();
                    this.winBalls = [];
                    this.bonus = null;
                    this.redo = false;
                },
                showBalls() {
                    for(let i = 0; i < this.winNumbers.length - 1; i++) {
                        timeouts[i] = setTimeout(() => {
                            this.winBalls.push(this.winNumbers[i]);
                        }, (i + 1) * 1000);
                    }
                    timeouts[i] = setTimeout(() => {
                        this.bonus = this.winNumbers[6]; 
                        this.redo = true;
                    }, 7000);
                },
            },
            created() {
                //컴포넌트가 화면에 나타나기 전 
                console.log('created');
            },
            mounted() {
                //컴포넌트가 화면에 나타난 후
                console.log('mounted');
                this.showBalls();
            },
            updated() {
                console.log('updated');
            },
            beforeDestroy() {
                console.log('beforeDestory');
                timeouts.forEach((t) => {
                    clearTimeout(t);
                })
            },
            watch: { //어떤 값이 바뀌 었는지 안 바뀌었는지 감시하는 역활
                winBalls(val, oldVal) {
                    if (val.length === 0) {
                        this.showBalls();
                    }
                }
            }
    };
</script>

<style>

</style>