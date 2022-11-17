const VueLoaderPlugin = require('vue-loader/lib/plugin');
const path = require('path');//<-- 노드에서 제공하는 모듈 경로를 쉽게 찾게 해줌  require : import와 똑같음 node 환견에서 require사용함


// 웹팩에대한 설정을 적는곳  스크립트가 많아져서 하나로 합치기위해
module.exports = { //노드의 모듈을 만듬
    //웹패킹 :  웹팩 처리를 할 때 사용함
    //웹팩 핵심 4가지 
    mode: 'development',
    devtoll: 'eval',//eval 웹펙이 빨라짐 배포할때 hidden슴
    resolve: { //확장자 처리 해줌 
        extensions: ['.js','.vue'], //처리해주면 import할때 .js 안써줘도됨
    },
    entry: { //진입
        app: path.join(__dirname,'main.js'), // 하나로 합쳐질 파일의 이름
    },
    module:{
        //웹팩의 핵심 
        rules: [{ //자바스크립트 파일을 합칠때 어떻게 합칠지 적는곳
            test: /\.vue$/,// 파일명이 .vue로 끝나는 파일 $ 는 끝을 의미함 
            loader: 'vue-loader',
        }],
    },
    plugins:[
        new VueLoaderPlugin(),
    ],
    output: {
        filename: '[name].js',
        path: path.join(__dirname,'dist'), //dirname :디렉터리 네임
    },
};