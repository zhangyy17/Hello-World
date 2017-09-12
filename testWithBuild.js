var a = 1;

function insrease(a) {
    var name = "abao";
    return name + "is" + a++;
}

console.log(insrease(a));
console.log([]);

function Class1() {
    this.name = "class1";
    this.showNam = function() {
        console.log(this.name);
    };
}

function Class2() {
    this.name = "class2";
}

var c1 = new Class1();
var c2 = new Class2();

c1.showNam.call(c2);

var list = [1, 2, 3];
var newArr = [];
for (var i = 0; i < list.length; i++) {
    newArr.push(list[i]);
}
console.log(newArr);

/*
 当某个函数被调用时，
 会创建一个执行环境（execution context）及相应的作用域链。
 然后，使用arguments 和其他命名参数的值来初始化函数的活动对象（activation object）
 但在作用域链中，
 外部函数的活动对象始终处于第二位，
 外部函数的外部函数的活动对象处于第三位，……直至作为作用域链终点的全局执行环境。
 在函数执行过程中，
 为读取和写入变量的值，就需要在作用域链中查找变量
 */

function createFunctions_closure() {
    var result = new Array();
    for (var i = 0; i < 10; i++) {
        result[i] = function() {
            return i;
        };
    }
    return result; //返回一个函数数组
    /*
    因为每个函数的作用域链中
    都保存着createFunctions() 函数的活动对象，
    所以它们引用的都是同一个变量i
    当createFunctions()函数返回后，变量i 的值是10，
    此时每个函数都引用着保存变量i 的同一个变量对象，
    所以在每个函数内部i 的值都是10
     */
}
//console.log(createFunctions_closure());

function createFunctions() {
    var result = [];
    for (var i = 0; i < 10; i++) {
        result[i] = function(num) {
            /*
            没有直接把闭包赋值给数组，而是定义了一个匿名函数
            并将立即执行该匿名函数的结果赋给数组
             */
            return function() {
                return num;
            };
        }(i);
        /*
        匿名函数有一个参数num，
        也就是最终的函数要返回的值。
        在调用每个匿名函数时，
        传入了变量i
        由于函数参数是按值传递的，
        所以就会将变量i 的当前值复制给参数num。
        而在这个匿名函数内部，
        又创建并返回了一个访问 num 的闭包。
        这样一来，result 数组中的每个函数都有自己num 变量的一个副本，
        因此就可以返回各自不同的数值了。
         */
    }
    return result;
}
//console.log(createFunctions());

//闭包
var x = 1;

function A(y) {
    var x = 2;

    function B(z) {
        console.log(x + y + z);
    }
    return B;
}
var C = A(1);
C(1);
console.log(C);



function isSimilar(oldPwd, newPwd) {
    var noRepeatArr = [];
    for (var i = 0; i < oldPwd.length; i++) {
        var stra = oldPwd[i];
        var count = 0;
        for (var j = 0; j < newPwd.length; j++) {
            var strb = newPwd[j];
            //在内层循环判断是否重复
            if (stra === strb) {
                count++;
            }
        }
        //在外层循环判断是否入栈
        if (count === 0) {
            noRepeatArr.push(stra);
        }
    }
    return noRepeatArr;
}
console.log(isSimilar([1, 2, 3, 4, 5], [2, 4]));

//重复字符判断 字符出现次数判断
function countRepeatChars(spring) {
    var obj = {};
    var str = spring;
    var char = "";
    for (var i = 0; i < str.length; i++) {
        char = str[i];
        if (!obj[char]) {
            obj[char] = 1;
        } else {
            obj[char]++;
        }
    }
    var max_num = -1;
    var max_key = "";
    for (var key in obj) {
        if (obj[char] > max_num) {
            max_num = obj[char];
            max_key = key;
        }
    }
    return obj;
}
console.log(countRepeatChars("maytoday"));

//数组遍历
[0, 1, 2, 3, 4, 5, ].forEach(function(n) {
    console.log(n + "10");
});
["a", "b", "c", "d", 1, 2, 3, 4, 5, ].forEach(function(n) {
    console.log(n + "10");
});


//for - of 循环
var arr = [1, 2, 3];
for (var val of arr) {
    console.log(val);
}

var str = "string";
for (var val of str) {
    console.log(val);
}
//还可遍历map
// new Map([["a", 1], ["b", 2], ["c", 3]]);
var m = new Map();
m.set(1, "black");
m.set(2, "red");
m.set("colors", 2);
m.set({ x: 1 }, 3);
for (var value of m) {
    console.log(value);
}

//set对象
// new Set([1, 1, 2, 2, 3, 3]);
var s = new Set();
s.add("Thomas Jefferson");
s.add(1776);
s.add("founding father");
for (var value of s) {
    console.log(value.toString() + ",");
}

//vscode modify