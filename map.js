/*
jquery map 经典的写法 key value key就是引用 寻址用
 */


// arg is for internal usage only
//  仅供内部使用 arg参数是此方法内部使用的参数
// map最多接收3个参数
// 第一个 map 映射 的对象 对谁进行映射
// 第二个 map 映射 用的回调函数 如何映射
// 第三个 map 映射 回调用的参数 仅供内部使用？
// map 有返回值 返回一个数组
map: function(elems, callback, arg) {
    //声明几个变量为接下来的遍历做准备
    //代码简化 能不写就不写 能不写就不写 如下 一个var
    //遍历总归会结束
    //所以需要明确遍历"对象"的长度 有结束
    //需要区分遍历的目标是 数组 还是对象
    var value, key, ret = [],
        i = 0,
        length = elems.length,
        //遍历先决条件 是jQuery对象 或者length存在 是0也行
        //第一组判断成立 说明是jQuery对象 判断不继续 短路逻辑

        //isArray变量用来 简单区分 对象和数组
        //布尔复合表达式比较长 记住js运算符的优先顺序
        //括号优先执行然后就是逻辑与---->逻辑或---->全等---->赋值
        //首先圆括号里先计算
        //然后结果加上 length !== undefined 、 typeof length === "number这两个必要条件最后的结果
        //再跟elems instanceof jQuery进行逻辑或的运算
        //elems instanceof jQuery 判断elems是否为jQuery对象的一个实例
        //jQuery对象 类数组集合
        isArray = elems instanceof jQuery || length !== undefined && typeof length === "number" && ((length > 0 && elems[0] && elems[length - 1]) || length === 0 || jQuery.isArray(elems));
    // isArray为真的情况有
    // 1 、elems instanceof jQuery  为true 换言之就是jquery对象
    // length !== undefined && typeof length === "number" 和
    // length > 0 && elems[ 0 ] && elems[ length -1 ] ) || length === 0 || jQuery.isArray( elems )这三个至少成立一个
    // 可以拆分为3个小情况
    // 1、length存在 且是数字 而且待遍历的数组或者类数组等length属性大于0 length-1存在  这样就保证了是能遍历的，比如对于jquery对象  domList对象等
    // 2、length存在 且是数字 且length属性等于0  如果是0也没关系就是不会遍历
    // 3、length存在 且是数字 且待遍历对象是纯数组
    // 满足这些条件之后开始根据isArray的结果分开遍历
    // 对于“数组”采用for循环
    // 对于对象采用for...in循环
    // 是数组或者类数组的时候直接把循环的每一项的值和指针以及arg参数传入回调函数中执行
    // arg参数是此方法内部使用的参数
    // 跟each以及一些其他jquery方法很相似
    // 只要在执行回调函数时不返回null就把执行返回的结果添加到新数组中

    // Go through the array, translating each of the items to their
    if (isArray) {
        for (; i < length; i++) {
            value = callback(elems[i], i, arg);

            if (value != null) {
                ret[ret.length] = value;
            }
        }

        // Go through every key on the object,
    } else {
        for (key in elems) {
            value = callback(elems[key], key, arg);

            if (value != null) {
                ret[ret.length] = value;
            }
        }
    }

    // Flatten any nested arrays
    return ret.concat.apply([], ret);
    //最后将结果集扁平化，为什么有这一步呢？因为map是可以扩展数组的
    /*
    $.map( [0,1,2], function(n){
        return [ n, n + 1 ];
    });
    //[[0,1],[1,2],[2,3]] nested array
     */
    //如果是这样使用的话得到的新数组是一个二维数组，所以必须降维
    /*
    ret.concat.apply( [], ret )
     */
    //等价于[].concat.apply([],ret)关键作用的是apply,
    //因为apply的第二个参数把ret的数组分成多个参数传入给concat
    //把二维数组转化为一维数组这个用法还是值得收藏的
}
