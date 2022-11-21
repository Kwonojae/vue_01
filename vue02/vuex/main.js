import Vue from 'vue';//모듈 시스템 
import TicTacToc from  './TicTacToc';// <- 두개의 파일을 하나로 합침

new Vue(TicTacToc).$mount('#root');
