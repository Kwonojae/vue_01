import Vue from 'vue';//모듈 시스템 
import NumberBaseball from  './NumberBaseball';// <- 두개의 파일을 하나로 합침

new Vue(NumberBaseball).$mount('#root');
