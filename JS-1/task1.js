/**
 * Created by fq on 2017/6/2 0001.
 */
var num1;
var num2;
var num3;
var box = document.getElementsByClassName("box");
function randomNum() {
    //�������0-8�Ÿ�����
    num1 = Math.floor(Math.random() * 9);
    num2 = Math.floor(Math.random() * 9);
    num3 = Math.floor(Math.random() * 9);
    //ȥ��������������ȵ����
    if (num1 == num2 || num1 == num3 || num2 == num3) {
        randomNum()
    }
}
function start() {
//����box���飬��ʼ����ɫ
//    var box=new Array(9);
    for (var i = 0; i < box.length; i++) {
        box[i].style.background = "orange"
    }
    //��һ��color������
    var color = new Array(3);
    for (var j = 0; j < color.length; j++) {
        color[j] = '#' + Math.floor(Math.random() * 16777215).toString(16);
    }//16������ɫ��16��6�η������ֵ16777215
    //��ȡ�����ɫ��ԭ���ı�������
    //var a = Math.floor(Math.random() * 255);
    //b = Math.floor(Math.random() * 255);
    //c = Math.floor(Math.random() * 255);
    //var d = Math.floor(Math.random() * 255);
    //e = Math.floor(Math.random() * 255);
    //f = Math.floor(Math.random() * 255);
    //var g = Math.floor(Math.random() * 255);
    //h = Math.floor(Math.random() * 255);
    //z = Math.floor(Math.random() * 255);
    //
    //color[0] = "rgb("+a+","+b+","+c+")";
    //color[1] = "rgb("+e+","+f+","+d+")";
    //color[2] = "rgb("+g+","+h+","+z+")";
    //console.log("rgb(" + a + "," + b + "," + c + ")");
    randomNum();
    //��ȡ���������ɫ��ֵ������
    box[num1].style.background = color[0];
    box[num2].style.background = color[1];
    box[num3].style.background = color[2];
    run()
}
var x;
function run() {
    clearInterval(x);//�����ʱ��Ч��
    x = setInterval(
        //ÿ1000msִ��һ��start����
        function set() {
            start();
        }, 1000
    );
    //console.log("����һ");
}
function stop(){
    clearInterval(x);
    //����ԭʼ��ɫ
    for (var i = 0; i < box.length; i++) {
        box[i].style.background = "orange"
    }
}