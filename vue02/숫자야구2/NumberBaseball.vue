
<!-- 메인컴포넌트 -->
<template>
    <div>
        <h1>{{result}}</h1>
        <form v-on:submit="onSubmitForm">
            <input ref="answer" minlength="4" maxlength="4" v-model="value"/>
            <button type="submit">입력</button>
        </form>
        <div>시도: {{tries.length}}</div>
        <ul>
            <li v-for="t in tries">
            <div>{{t.try}}</div>
            <div>{{t.result}}</div>
            </li>
        </ul>
    </div>
</template>

<script>
    const getNumbers = () => {
        const candidates = [1,2,3,4,5,6,7,8,9];
        const array = [];
        for (let i = 0; i <4 ; i+=1) {
            const chosen = candidates.splice(Math.floor(Math.random() * (9-i)), 1)[0]; // splice 특정 범위를 삭제 하거나 새로운 값을 추가  splice(시작인덱스,몇개의 값을 삭제할지)
            console.log("chosen: "+ chosen);
            array.push(chosen);
        }
        return array;
    }
    export default {
        data() {
            return {
                answer: getNumbers(), //ex [1, 5, 3, 4]
                tries:[],
                value: '',
                result: '',
            }
        },
        methods: {
            onSubmitForm(e){
                e.preventDefault();
                if(this.value === this.answer.join('')){  // 젇답 뭦췄으면
                    this.tries.push ({
                        try: this.value,
                        result: '홈런',
                    });
                    this.result = "홈런";
                    alert('게임을 다시 실행합니다.');
                    this.value = '';
                    this.tries = [];
                    this.$refs.answer.focus();
                } else { //정답 틀렸을 
                    if(this.tries.length >= 9) {
                        this.result = `10번 넘게 틀려서 실패! 답은! ${this.answer.join(',')}였습니다`;
                        alert('게임을 다시 시작합니다.');
                        this.value = '';
                        this.answer = getNumbers();
                        this.tries = [];
                        this.$refs.answer.focus();
                    }
                    let strike = 0;
                    let ball = 0;
                    const answerArray = this.value.split('').map(v => parseInt(v));
                    for(let i = 0; i <4; i+= 1) {
                        if(answerArray[i] === this.answer[i]) { //숫자 자릿수 모두 정답
                            console.log('array : ' + answerArray[i], 'answer : ' + this.answer[i]);
                            strike++;
                        }else if (this.answer.includes(answerArray[i])) {
                            console.log("this value: " + this.value);

                            //includes()는 문자열이 특정 문자열을 포함하는지 확인하는 메서드이다
                            ball++;
                        }
                    }
                    this.tries.push({
                        try: this.value,
                        result: `${strike} 스트라이크, ${ball} 볼입니다.`,
                    });
                    this.value = "";
                    this.$refs.answer.focus();  
                }
            }
        }
    }
</script>

<style>

</style>