<template>
    <table>
        <slot/> 
    </table>
</template>


<script>
    export default {
    };
</script>

<style>
    table {
        border-collapse: collapse;
    }
    td {
        border: 1px solid black;
        width: 40px;
        height: 40px;
        text-align: center;
    }
</style>