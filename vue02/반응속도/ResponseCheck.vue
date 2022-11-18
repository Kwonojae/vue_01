
<!-- 메인컴포넌트 -->
<template>
    <div>
        <div id="screen" v-bind:class="state">{{message}}</div>
        <div>
            <div>평균시간: {{}}</div>
            <button v-on:click="onReset">리셋</button>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                result: [],
                state: 'waiting',
                message: '클릭해서 시작하세요.',    
            }
        },
        methods: {
            onReset() {

            }
        }
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