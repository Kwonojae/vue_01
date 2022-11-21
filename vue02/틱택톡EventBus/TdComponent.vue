<template>
    <td @click="onClickTd">{{cellData}}</td>
</template>

<script>
    import EventBus from './EventBus';
    export default {
        props: {
            cellData : String, // o x 또는 빈칸
            rowIndex: Number,
            cellIndex: Number,
        },
        methods: {
            onClickTd() {
                if(this.cellData) return;
                EventBus.$emit('clickTd', this.rowIndex, this.cellIndex); //$emit  === on이랑 같음 onClicktd가 실행됨


            }
        }
    }
</script>