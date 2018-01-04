/* ======================================================================= */
/* =                           js 对象创建模式                           = */
/* ======================================================================= */

//1、没对象，你new一个呀！ --- 要啥属性给啥属性
var gf = new Object(); //--->推荐的写法 var gf={};  literal notation
var gf = {};
gf.name = "tangwei";
gf.bar = "c++";
gf.sayWhat = function() {
    console.log(this.name + "said:love you forever");
};

//2、字面量创建 --- 直接量创建 --- 包在{}里面 literal notation
var gf = {
    name: "tangwei",
    bar: "c++",
    sayWhat: function() {
        console.log(this.name + "said:love you forever");
    }
};

//3、工厂模式 --- 产品是一个对象 --- 工厂函数里面见不到this的
function createGf(name, bar) {
    //此处表明是工厂模式 --- 区别于构造函数模式 --- 对象都是Object整出来的
    var o = new Object();
    o.name = name;
    o.bar = bar;
    o.sayWhat = function() {
        alert(this.name + "said:love you forever");
    };
    return o;
}
var gf1 = createGf("bingbing", "d");
var gf2 = createGf("mimi", "a");

//4、构造函数模式 --- 构造函数用于创建特定类型的对象 ---函数对象
//   构造函数模式 使用的时候要用 new 构造
function Gf(name, bar) {
    //不 new 一个object了 直接 this
    //在构造函数内部 this关键字引用的是新创建的对象 --- 只有在创建时才确定this的指向
    this.name = name;
    this.bar = bar;
    this.sayWhat = function() {
        alert(this.name + "said:love you forever");
    };
}
var gf1 = new Gf("vivian", "f");
var gf2 = new Gf("vivian2", "f");
console.log(gf1.sayWhat == gf2.sayWhat); //false 这个就是问题

//5、原型对象模式 --- 有问题的一种模式 --- 不实用 --- constructor的指向问题
//   在原型模式中 不必在构造函数中定义实例属性 可以将【属性】信息直接赋予【原型对象】
//   prototype只有和具体的构造函数放一起才有意义 谁的原型对象
function Gf() {
    //写在原型上的属性和方法是共享的 --- 一份 --- 所有人都用这个
    Gf.prototype.name = "vivian";
    Gf.prototype.bar = "c++";
    Gf.prototype.sayWhat = function() {
        alert(this.name + "said:love you forever");
    };
}
var gf1 = new Gf(); //gf1.__proto__ == GF.prototype
gf1.sayWhat();
var gf2 = new Gf(); // gf2.__proto__ == GF.prototype
/*
  所有对象都有一个__proto__属性 指向其构造函数的原型对象
  对象有一个constructor属性 指向其父构造函数
 */

//小改进 --- Gf.prototype 只写一遍 不是一个属性写一遍 原型对象须明确是谁的原型对象
//原型对象 是一个对象 往里面添加属性就够了
function Gf() {}
Gf.prototype = {
    name: "vivian",
    bar: "c++",
    sayWhat: function() {
        alert(this.name + "said:love you forever");
    }
};

//6、构造函数和原型组合模式 在实际开发中，我们可以使用构造函数来定义对象的属性，
//   使用原型来定义共享的属性和方法，
//   这样我们就可以传递不同的参数来创建出不同的对象，
//   同时又拥有了共享的方法和属性。
function Gf(name, bar) {
    this.name = name;
    this.bar = bar;
}
Gf.prototype = {
    constructor: Gf, //指向构造器 可以不写 最好写着
    sayWhat: function() {
        alert(this.name + "said:love you forever");
    }
};
var gf1 = new Gf("vivian", "f");
var gf2 = new Gf("vivian1", "c");



/* ==================================================================================== */
/*                                    第一部分 封装                                     */
/* ==================================================================================== */

/*
  将一种存在进行分类 --- 类的出现
  将类进行抽象       --- 类的特点
  类长啥样的描述     --- 比如 叫啥名 啥颜色 高矮胖瘦 等等
  类能干啥的描述     --- 比如 会跑 会叫 会咬 等等

  对抽象的描述       --- 键值对 key-value
  {}里面  不对外暴露 --- 封装
 */

/*
  参照对象 --- 抽象出一个对象作为参照对象 --- cat
  cat --- 是一类 是一种 --- 不是一个 --- 都是猫这种动物 --- 但是此猫非彼猫
  对一种存在的抽象 --- 就是将其都有的特性进行提取放到公共的一个对象里面 --- 参照对象
 */

//最简单的封装 把属性封装在一个对象里面------最原始的封装模式
var cat = {
    name: "",
    color: "",
};
//实例化参照对象的时候 --- 创建其具体的一个实例 --- 赋予具体的特性
//对象实例1
var cat1 = {};
cat1.name = "大毛"; //按照参照对象属性赋值 照猫画虎 猫还是猫 虎还是虎
cat1.color = "black";
//对象实例2
var cat1 = {};
cat2.name = "二毛"; //按照参照对象属性赋值
cat2.color = "brown";
/*
  问题
  1 每生成一个新的对象实例，都得将上述的代码写一遍 复用性差 代码冗余
  2 实例和参照对象没有半毛钱的关系 参照对象这样写 实例对象也这么写 参照对象是个鸟 没有存在的意义
    这样写 实例对象写了还能用 参照对象写了就是浪费空间
 */



// 最原始的封装模式 ---> 改进（初步提高代码复用，减少冗余）
// 创建构造函数 父构造函数 构造对象 js函数对象的本质还是对象 故此function也可以被new
function Cat(name, color) {
    /*
      返回一个对象
      父构造函数 可以理解为一个工厂函数 给啥材料 生成啥产品
      注意 是工厂函数 不是工厂模式
      用的时候要给原料 才能产出
      调用的时候传参数就 相当于 扔原料进去
     */
    return { name: name, color: color };
}
//然后调用函数，就等于是在生成实例对象
var cat1 = Cat("大毛", "black");
var cat2 = Cat("二毛", "brown");

/*
  问题依然存在 --- cat1和cat2有半毛钱关系 --- 和参照对象有半毛钱关系
  用原料生产 拿猫不太好理解(猫是生出来的) 换成生产汽车 工厂 扔红旗 产红旗 扔奇瑞 产奇瑞
  产出来的红旗和奇瑞 半毛钱关系
 */

/*
  顺带说一句 --- 工厂模式 和 构造函数模式 --- 不是一回事
  工厂模式 返回的是在工厂函数里面新new的object 给这个新new的obj塞属性 加功能
  工厂模式整出来的都是Object的实例 --- 无法区分具体的类型
  构造函数不是 构造函数里面的this 解决工厂模式无法区分对象具体类型的问题
  构造函数是对工厂模式的改进和优化 --- 工厂模式的变种？（方便记忆）
  约定 --- 构造函数首字母大写 --- 以便区分普通的函数
  构造函数本身不返回对象
 */

//继续改进 ---构造函数 --- 利用this
function Cat(name, color) {
    this.name = name;
    this.color = color;
}
//再通过这种方式生成新的实例
var cat1 = new Cat("大毛", "black"); //新生成的对象有两个属性 constructor 指向构造器 和__proto__ 指向构造器原型（对象）
var cat2 = new Cat("二毛", "brown"); //这时cat1和cat2会自动含有一个constructor属性，指向它们的构造函数
//属性访问方式
alert(cat1.name);
alert(cat1['name']); //推荐使用 dot notation
alert(cat1.color);
alert(cat1['color']);
//可以查看cat1的构造函数
alert(cat1.constructor);
alert(cat1.constructor == Cat); //true
//对象与实例的关系查看 --- instanceof操作符
alert(cat1 instanceof Cat); //true


/*
 构造函数 --- 问题 --- 内存浪费啊 --- 公共属性或者公共函数只需要写一遍就够了
 构造函数的问题就是 --- 公共属性或者公共函数实例化一次就写一次
 不环保
 不效率
 每个实例的引用指向还不同
 当构造函数初始化一个实例对象的时候
 构造函数就有了 prototype 属性 它是一个指针 指向了【构造函数的原型对象】
 *****非常重要(如果构造函数不去初始化 new 实例对象 那么它【不会有 prototype 属性】)

 prototype 属性是可读写的 【不是所有对象】都有此属性 只有构造函数有此属性

 不是所有函数都是构造函数 【只有 new 出实例的函数才是构造函数】.

 当一个函数可以new 实例对象的时候,这个函数就是构造函数

 被构造函数 new 出来的对象是 实例对象 【实例对象】的属性 【constructor】 指向了构造函数.
 当一个函数变成构造函数的时候 他的 prototype 指针指向的对象是原型对象
 实例对象的 __proto__ 指向了原型对象.
 */

/*
 构造函数 new 出来的实例对象 拥有一个属性 constructor
 此属性是一个指针 指向构造函数 (告诉我们是谁创造了它)
 同时 该实例对象 被 初始化以后有了一个【只读属性 __proto__ 】这个指针指向了其构造函数的原型对象
 实例对象.__porto__ 或者 构造函数.prototype 二者是等价的
 */
function Cat(name, color) {
    //通过判断 this 是不是 构造函数的实例来决定是返回 new Cat() 还是继续往下执行
    if (!(this instanceof Cat)) {
        return new Cat(name, color);
    }
    //标准的初始化内部属性/变量的语句,第一反应这应该是构造函数
    this.name = name; //私有属性 --- 都有属性 --- 你有我有大家都有
    this.color = color;
    this.type = "猫科动物"; //公共属性 --- 公用 --- 公有属性
    this.eat = function() { //公共函数（方法）
        alert("吃老鼠");
    };
}
/*
  加了构造函数内的 if 判断 保证在调用构造函数的时候有new 无new都能正常使用
 */

var cat1 = new Cat("大毛", "黄色");　　
var cat2 = new Cat("二毛", "黑色");　　
alert(cat1.type); // 猫科动物　　
cat1.eat(); // 吃老鼠
alert(cat1.eat == cat2.eat); //false --- 指向不同的引用

/*
  我们需要 --- 让type属性和eat()方法在内存中只生成一次，然后所有实例都指向那个内存地址
  Javascript规定 每一个构造函数都有一个prototype属性 指向构造函数的原型对象
  这个对象的所有属性和方法 都会被构造函数的实例继承
  这意味着 我们可以把那些不变的属性和方法 直接定义在prototype对象上
 */
//构造函数模式 + 原型模式
function Cat(name, color) {
    this.name = name;
    this.color = color;
}　　
Cat.prototype.type = "猫科动物";　　
Cat.prototype.eat = function() { alert("吃老鼠"); };
//相当于
Cat.prototype = {
    type: "猫科动物",
    eat: function() { alert("吃老鼠"); }
};

alert(cat1.eat == cat2.eat); //true --- 这时所有实例的type属性和eat()方法 其实都是同一个内存地址 指向prototype对象

//如何判断某个实例和原型对象之间的关系
alert(Cat.prototype.isPrototypeOf(cat1)); //true

/*
  判断某一个属性到底是本地属性，还是继承自prototype对象的属性。
  也即判断属性是共有属性(大家都有但是不一样，你有，我也有，你的是你的，我的是我的)
  还是公有属性（就一个，就一组，不是你的也不是我的，是大家的）
 */
alert(cat1.hasOwnProperty("name")); // true
alert(cat1.hasOwnProperty("type")); // false

//in运算符可以用来判断，某个实例是否含有某个属性，不管是不是本地属性。
alert("name" in cat1); // true　　
alert("type" in cat1); // true
//in运算符还可以用来遍历某个对象的所有属性
for (var prop in cat1) {
    alert("cat1[" + prop + "]=" + cat1[prop]);
}


/* ============================================================================ */
/*                               第二部分 实现继承                              */
/* ============================================================================ */

//有一个"动物"对象的构造函数
function Animal() {
    this.species = "动物";
}
//还有一个"猫"对象的构造函数
function Cat(name, color) {
    this.name = name;
    this.color = color;
}
/*
  问题 --- 怎样才能使"猫"继承"动物"呢？
       第一种 --- 【构造函数绑定】
       最简单的方法，使用call或apply方法 将父对象的构造函数绑定在子对象上
       即在子对象构造函数中加一行：
 */
function Cat(name, color) {
    Animal.apply(this, arguments);
    this.name = name;
    this.color = color;
}
var cat1 = new Cat("大毛", "黄色"); //cat1.__proto__ == Cat.prototype
alert(cat1.species); // 动物

/*
  第二种 --- 原型
  更常见，使用prototype属性
  如果"猫"的prototype对象 指向一个Animal的实例
  那么所有"猫"的实例，就能继承Animal了。
 */

/*
  将Cat的prototype对象指向一个Animal的实例
  相当于完全删除了prototype 对象原先的值，然后赋予一个新值
 */
Cat.prototype = new Animal();　 //Cat.prototype.__proto__ = Animal.prototype
// ------------------------------ Cat.prototype.constructor = Animal

/*
  将Cat.prototype对象的constructor值改为Cat === 必须的===
  任何一个prototype对象都有一个constructor属性，指向它的构造函数
  如果没有"Cat.prototype = new Animal();"这一行 Cat.prototype.constructor是指向Cat的
  new过之后 Cat.prototype相当于一个Animal的实例对象 该实例对象的构造器指向他的构造函数
  即 Cat.prototype.constructor指向Animal
 */
Cat.prototype.constructor = Cat;　 //修正构造器指向

var cat1 = new Cat("大毛", "黄色");　　
alert(cat1.species); // 动物

alert(Cat.prototype.constructor == Animal); //true
//更重要的是，每一个实例也有一个constructor属性，默认调用prototype对象的constructor属性。
alert(cat1.constructor == Cat.prototype.constructor); // true
//因此，在运行"Cat.prototype = new Animal();"这一行之后，cat1.constructor也指向Animal！
alert(cat1.constructor == Animal); // true


/*
  第三种 --- 直接继承prototype
  对第二种方法的改进
  由于Animal对象中 不变的属性都可以直接写入Animal.prototype
  所以 我们也可以让Cat()跳过 Animal() 直接继承Animal.prototype
 */

//第一步 先将Animal对象改写
function Animal() {}　　
Animal.prototype.species = "动物";
//第二步 将Cat的prototype对象 然后指向Animal的prototype对象 这样就完成了继承
Cat.prototype = Animal.prototype;　　 //对象保存的是一个引用 任何一方的改动都会导致对方的改变
Cat.prototype.constructor = Cat;　　 //这一句实际上把Animal.prototype对象的constructor属性也改掉了！
var cat1 = new Cat("大毛", "黄色");　　
alert(cat1.species); // 动物

/*
  与前一种方法相比 这样做的优点是效率比较高（不用执行和建立Animal的实例了） 比较省内存

  缺点是 Cat.prototype和Animal.prototype现在指向了同一个对象
  那么任何对Cat.prototype的修改 都会反映到Animal.prototype
  根源 吃的是同一笼包子 【obj.prototype】是个引用
  指向对象的原型对象
 */

//所以，上面这一段代码其实是有问题的。
alert(Animal.prototype.constructor); // Cat

/*
  第四种 --- 利用空对象作为中介
  由于"直接继承prototype"存在上述的缺点
  所以就有第四种方法 利用一个空对象作为中介
 */

//空对象 --- 几乎不占内存
var F = function() {};　
//空对象原型指向父构造函数的原型　
F.prototype = Animal.prototype;　　
//子构造函数的原型指向空对象的实例 进而继承父构造函数
//修改Cat的prototype对象，就不会影响到Animal的prototype对象
Cat.prototype = new F();　　 //Cat.prototype.__proto__ = F.prototype
alert(Animal.prototype.constructor); // Animal
Cat.prototype.constructor = Cat;

//将上面的方法，封装成一个函数，便于使用 --- 这个extend函数，就是YUI库如何实现继承的方法。
function extend(Child, Parent) {　　　　
    var F = function() {};　　　　
    F.prototype = Parent.prototype;　　　 //空对象的原型对象指向父构造函数的原型对象　
    Child.prototype = new F();　　　　 //Child.prototype.__prpto__ = F.prototype 不再是Child.prototype = F.prototype
    Child.prototype.constructor = Child;　　 //子构造函数原型对象的构造函数指向子构造函数　　

    Child.uber = Parent.prototype;　
    /*
      意思是为子对象设一个uber属性，这个属性直接指向父对象的prototype属性
      uber是一个德语词 意思是"向上"、"上一层"。
      这等于在子对象上打开一条通道 可以直接调用父对象的方法
      这一行放在这里，只是为了实现继承的完备性，纯属备用性质。
     */
    　

}
//使用的时候，方法如下
extend(Cat, Animal);　　
var cat1 = new Cat("大毛", "黄色");　　
alert(cat1.species); // 动物


/*
  第五种 --- 拷贝继承
  换一种思路，纯粹采用"拷贝"方法实现继承。
  简单说，如果把父对象的所有属性和方法，拷贝进子对象
 */

//第一步 首先，还是把Animal的所有不变属性，都放到它的prototype对象上
function Animal() {}　　
Animal.prototype.species = "动物";

//第二步 然后，再写一个函数，实现属性拷贝的目的
function extend2(Child, Parent) {　　　　
    var p = Parent.prototype;　　　　
    var c = Child.prototype;

    //父对象的prototype对象中的属性，一一拷贝给Child对象的prototype对象　　　　
    for (var i in p) {
        c[i] = p[i];　
    }　　　　
    c.uber = p;　　
}
//使用的时候，这样写
extend2(Cat, Animal);　　
var cat1 = new Cat("大毛", "黄色");　　
alert(cat1.species); // 动物



/* ============================================================================ */
/*                       第三部分 不使用构造函数实现继承                        */
/* ============================================================================ */

var Chinese = {
    nation: '中国'
};
var Doctor = {
    career: '医生'
};

/*
 怎样才能生成一个"中国医生"的对象？
 对象的继承
 不是构造函数 实现方式不同于 构造函数继承
 原型链 --- 实现继承
 只做一件事，就是把子对象的prototype属性 指向父对象 从而使得子对象与父对象连在一起
 */
function object(o) {
    function F() {}
    F.prototype = o; //这一步 发生了什么 新建一个空对象 修改他的原型对象 直接指向父对象
    return new F();
}
//使用 第一步先在父对象的基础上，生成子对象
var Doctor = object(Chinese);
//然后，再加上子对象本身的属性
Doctor.career = '医生';
//这时，子对象已经继承了父对象的属性了
alert(Doctor.nation); //中国


/*
 第二种思路 使用拷贝的方式 将父对象的属性按个拷贝进子对象
 */
function extendCopy(p) {
    var c = {};
    for (var i in p) {
        c[i] = p[i];
    }
    c.uber = p;
    return c;
}
//使用方式
var Doctor = extendCopy(Chinese);　　
Doctor.career = '医生';　　
alert(Doctor.nation); // 中国

/*
 问题
 浅拷贝 --- 吃一笼包子
 如果父对象的属性值是对象 或者 数组
 拷贝进子对象的仅仅是 属性的引用 一个内存地址而已 而不是真真的拷贝
 父对象有被篡改的风险
 */
Chinese.birthPlaces = ['北京', '上海', '香港'];
var Doctor = extendCopy(Chinese); //原型链上的属性就是那一笼包子
Doctor.birthPlaces.push('厦门');
alert(Doctor.birthPlaces); //北京, 上海, 香港, 厦门　　
alert(Chinese.birthPlaces); //北京, 上海, 香港, 厦门
//extendCopy()只是拷贝基本类型的数据 我们把这种拷贝叫做"浅拷贝"

/*
 深拷贝 --- 新上了一笼包子
 能够实现真正意义上的数组和对象的拷贝
 它的实现并不难，只要递归调用"浅拷贝"就行了
 */
function deepCopy(p, c) {
    c = c || {};　　　　
    for (var i in p) {
        if (typeof p[i] === 'object') { //先确定是引用类型
            //操作符typeof 并不能准确区分对象类型和数组类型
            //进一步区分是数组还是对象
            c[i] = (p[i].constructor === Array) ? [] : {};
            deepCopy(p[i], c[i]);
        } else { //基本类型 浅拷贝
            c[i] = p[i];
        }
    }　　　　
    return c;　　
}
//使用方式
var Doctor = deepCopy(Chinese);
Chinese.birthPlaces = ['北京', '上海', '香港'];　　
Doctor.birthPlaces.push('厦门');
alert(Doctor.birthPlaces); //北京, 上海, 香港, 厦门　　
alert(Chinese.birthPlaces); //北京, 上海, 香港



/* ============================================================================ */
/*                                对 this 的理解                                */
/* ============================================================================ */


//js 中的函数其实是对象，函数名是对 Function 对象的引用
/*
 this 的由来   --- this是个【引用】
 为什么使用this
   衍生 理解
   问题 如果有同一类型的两个对象，分别是a和b
        想知道，如何才能让过这两个对象都能调用类的peel()方法
        【如果只有一个peel方法，它如何知道是被a还是b所调用的】-------->为了解决 【是谁调用的】
        如何发送 或者说 传递 消息给对象
        编译器的幕后工作 --- 偷偷把对 所操作对象的引用 作为第一个参数传给了peel()
        可以理解为  Foo.peel(a,1);  错误的写法
                    Foo.peel(b,2);  只为理解方便 --- 或者说是内部表示形式
        实际发生的事情的表述
        这个引用是 【编译器】 "偷偷"传入的 是没有标识符标识的
        由此 关键字 this 出现了
        this 关键字 【只能】 在 【方法内部】 使用，表示对“调用方法的那个对象”的引用
 */

/*
 this的指向在函数定义的时候是确定不了的
 【只有】【函数执行的时候】才能确定this到底指向谁
 调用的时候才使用它
 所以也只有在调用的时候才知道它是谁
 */

/*
 js 全局函数 全局变量 实际是被Window对象所【点出来的】
 是 window （全局对象）的属性
 */
var o = {
    user: "追梦子",
    fn: function() {
        console.log(this.user); //追梦子
    }
};
o.fn();
/*
 这里的this指向的是对象o
 因为你调用这个fn是通过o.fn()执行的
 那自然指向就是对象o
 这里再次强调一点
 this的指向在函数创建的时候是决定不了的
 在调用的时候才能决定，谁调用的就指向谁
 一定要搞清楚这个
 */

/*
 情况1：如果一个函数中有this，
 但是它没有被上一级的对象所调用，
 那么this指向的就是window，
 这里需要说明的是在js的【严格】版中this指向的【不是window】
 而是undefined
 */

/*
 情况2：如果一个函数中有this，这个函数有【被上一级的对象】所调用，那么this指向的就是上一级的对象
 */

/*
 情况3：如果一个函数中有this，
 这个函数中包含多个对象，
 尽管这个函数是被最外层的对象所调用，
 this指向的也只是它上一级的对象
 */
var o = {
    a: 10,
    b: {
        // a:12,
        fn: function() {
            console.log(this.a); //undefined
        }
    }
};
o.b.fn();

/*
 this永远指向的是【最后调用】它的对象
 也就是看它执行的时候是谁调用的
 */
/*
 例子4
 */
var o = {
    a: 10,
    b: {
        a: 12,
        fn: function() {
            console.log(this.a); //undefined
            console.log(this); //window
        }
    }
};
var j = o.b.fn; //只是赋值 未发生调用 this指向【不明确】
j();

/*
 【构造函数版this】
 这里之所以对象a可以点出函数Fn里面的user
 是因为new关键字【可以改变】this的指向，
 将这个this指向对象a，
 为什么我说a是对象，因为用了new关键字就是创建一个对象实例
 用了new关键字就等同于复制了一份

 可以自行改变this的指向
 注意
 如果call和apply的【第一个参数】写的是null，那么【this指向的是window对象】
 call和apply都是【改变上下文中的this】并 【立即执行】 这个函数，
 bind方法返回的是一个修改过后的 函数
 bind也可以有多个参数，并且参数可以执行的时候 再次添加
 bind方法可以让对应的函数想什么时候调就什么时候调用，
 并且可以将参数在执行的时候添加，这是它们的区别，
 */
function Fn() {
    this.user = "追梦子";
}
var a = new Fn();
console.log(a.user); //追梦子

/*
 奇怪现象
 this 碰到 return 时
 */
function fn() {
    this.user = '追梦子';
    return function() {};
    //如果返回值是一个对象，那么this指向的就是那个返回的对象
}
var a = new fn();
console.log(a.user); //undefined

function fn() {
    this.user = '追梦子';
    return 1;
    //如果返回值不是一个对象那么this还是指向函数的实例
}
var a = new fn;
console.log(a.user); //追梦子

function fn() {
    this.user = '追梦子';
    return undefined;
    //如果返回值不是一个对象那么this还是指向函数的实例
}
var a = new fn;
console.log(a.user); //追梦子

function fn() {
    this.user = '追梦子';
    return undefined;
}
var a = new fn;
console.log(a); //fn {user: "追梦子"}

function fn() {
    this.user = '追梦子';
    return null;
    //虽然null也是对象，但是在这里this还是指向那个函数的实例
}
var a = new fn;
console.log(a.user); //追梦子

/*
 首先new关键字会【创建】【一个空的对象】，
 然后会【自动调用】一个函数apply方法，
 将this【指向】这个空对象，
 这样的话函数内部的this就会被这个空的对象替代
 */


/*
 拷贝构造函数的prototype 给 实例对象的 __proto__
 */
// 对于var o = new Foo();
var o = new Foo();
//相当于
var o = new Object();
o.__proto__ = A.prototype; //这里还记得之那个function里面的默认的属性么?
A.call(o) //由于这里this是指向o,可以把什么this.name/getName绑定到o上
    //把这个o返回给a;完成var a = new A()的过程.



/* ============================================================================ */
/*                         __proto__   and   prototype                          */
/* ============================================================================ */

/*
 理解什么叫 js里面一切皆对象
 最后，其实prototype只是一个假象，他在实现原型链中只是起到了一个辅助作用
 换句话说，他只是在new的时候有着一定的价值，而原型链的本质，其实在于__proto__！
 prototype只是个“容器” 只能往里面装东西 用到的时候在里面找东西 【链起来是靠 __proto__】(其实是隐藏的属性)
 */

//原型链
var Person = function() {};
var p = new Person();
//new 实际做了三件事 如下
/*
 1  var p = {};                     //也就是说， 初始化一个对象p。
 2  p.__proto__ = Person.prototype; //p的__proto__ 指向 Person的prototype
 3  Person.call(p);                 //也就是说构造p， 也可以称之为初始化p。
*/
/*
 复杂代码拆解 理解原型链
 */
var Person = function() {};
Person.prototype.Say = function() {
    alert("Person say");
};
Person.prototype.Salary = 50000;

var Programmer = function() {};
Programmer.prototype = new Person(); //new 可知 Programmer.prototype.__proto__ = Person.prototype ===
Programmer.prototype.WriteCode = function() { //-------------------------------------------------- ||
    alert("programmer writes code"); //----------------------------------------------------------- ||
}; //--------------------------------------------------------------------------------------------- ||
Programmer.prototype.Salary = 500; //------------------------------------------------------------- ||

var p = new Programmer(); //new 可知 p.__proto__ = Programmer.prototype--------------------------- ||
p.Say(); //----------------------------------p.__proto__.__proto__ = Person.prototype ----------<==||
p.WriteCode();
alert(p.Salary);

/*
 一、所有构造器/函数的__proto__属性都指向Function.prototype Function的原型对象 它是一个空函数（Empty function）
     Function的原型对象的__proto__指向Object的原型对象
     Function.prototype.__proto__ = Object.prototype
     内置构造器
     自定义构造器
 */
Number.__proto__ === Function.prototype // true Function.prototype.__proto__ === Object.prototype
Boolean.__proto__ === Function.prototype // true
String.__proto__ === Function.prototype // true
Object.__proto__ === Function.prototype // true
Function.__proto__ === Function.prototype // true
Array.__proto__ === Function.prototype // true
RegExp.__proto__ === Function.prototype // true
Error.__proto__ === Function.prototype // true
Date.__proto__ === Function.prototype // true
    //JavaScript中有内置(build-in)构造器/对象共计12个（ES5中新加了JSON）
    //可访问的8个构造器。
    //剩下如Global不能直接访问，
    //Arguments仅在函数调用时由JS引擎创建，
    //Math，JSON是以对象形式存在的，无需new。
    //它们的__proto__是Object.prototype
Math.__proto__ === Object.prototype // true
JSON.__proto__ === Object.prototype // true
    //“所有构造器/函数”当然包括自定义的

// 函数声明
function Person() {}
// 函数表达式
var Man = function() {};
console.log(Person.__proto__ === Function.prototype); // true
console.log(Man.__proto__ === Function.prototype); // true

/*
 所有的构造器都来自于Function.prototype，
 甚至包括根构造器Object及Function自身。
 所有构造器都继承了Function.prototype的属性及方法
 Function.prototype也是唯一一个typeof XXX.prototype为 “function”的prototype
 */

console.log(typeof Function.prototype); // function
console.log(typeof Object.prototype); // object
console.log(typeof Number.prototype); // object
console.log(typeof Boolean.prototype); // object
console.log(typeof String.prototype); // object
console.log(typeof Array.prototype); // object
console.log(typeof RegExp.prototype); // object
console.log(typeof Error.prototype); // object
console.log(typeof Date.prototype); // object
console.log(typeof Object.prototype); // object


//所有构造器（含内置及自定义）的__proto__都是Function.prototype，那Function.prototype的__proto__是谁
console.log(Function.prototype.__proto__ === Object.prototype); // true

/*
 一等公民 --- first-class
 这说明所有的构造器也都是一个普通JS对象，
 可以给构造器添加/删除属性等。
 同时它也继承了Object.prototype上的所有方法：toString、valueOf、hasOwnProperty等
 */

/*
 最后Object.prototype的__proto__是谁
 */
Object.prototype.__proto__ === null; // true


/*
 二、构造器实例的 __proto__
 */
var obj = { name: 'jack' };
var arr = [1, 2, 3];
var reg = /hello/g;
var date = new Date();
var err = new Error('exception');

console.log(obj.__proto__ === Object.prototype); // true
console.log(arr.__proto__ === Array.prototype); // true
console.log(reg.__proto__ === RegExp.prototype); // true
console.log(date.__proto__ === Date.prototype); // true
console.log(err.__proto__ === Error.prototype); // true

function Person(name) {
    this.name = name
}
var p = new Person('jack');
console.log(p.__proto__ === Person.prototype) // true

//每个对象都有一个constructor属性，可以获取它的构造器
function Person(name) {
    this.name = name
}
var p = new Person('jack')
console.log(p.__proto__ === p.constructor.prototype) // true

function Person(name) {
    this.name = name
}
// 修改原型 --- 修改
Person.prototype.getName = function() {}
var p = new Person('jack')
console.log(p.__proto__ === Person.prototype) // true
console.log(p.__proto__ === p.constructor.prototype) // true
console.log(Person.prototype === p.constructor.prototype) // true
    //恒等的三个值

function Person(name) {
    this.name = name
}
// 重写原型 --- 重写
Person.prototype = {
    getName: function() {}
}
var p = new Person('jack')
console.log(p.__proto__ === Person.prototype) // true
console.log(p.__proto__ === p.constructor.prototype) // false

/*
 给Person.prototype赋值的是一个对象直接量{getName: function(){}}
 使用对象直接量方式定义的对象其构造器（constructor）指向的是根构造器Object，
 Object.prototype是一个空对象{}，
 {}自然与{getName: function(){}}不等
 */



/* ============================================================================ */
/*                               js 执行细节分析                                */
/* ============================================================================ */


var x = 1; // ---     定义一个全局变量 x
function A(y) { //    这是一个闭包
    var x = 2; //     定义一个局部变量 x
    function B(z) { //定义一个内部函数 B
        console.log(x + y + z);
    }
    return B; //      返回函数B的引用
}
var C = A(1); //      执行A,返回B
C(1); //              执行函数B 结果是4
// 一、全局初始化
/*
 JS引擎在进入一段可执行的代码时，需要完成以下三个初始化工作：

 首先，创建一个全局对象(Global Object)
       这个对象全局只存在【一份】，
       它的属性在任何地方都可以访问，
       它的存在伴随着应用程序的【整个生命周期】。
       全局对象在创建时，将Math,String,Date,document 等常用的JS对象作为其属性。
       由于这个全局对象不能通过名字直接访问，
       因此还有另外一个【属性window】,
       并将【window指向了自身】，
       这样就可以通过window访问这个全局对象了。
       用伪代码模拟全局对象的大体结构如下：
 */
//创建一个全局对象
var globalObject = {
    Math: {},
    String: {},
    Date: {},
    document: {}, //DOM操作
    ...
    window: this //让window属性指向了自身
}

/*
 然后，JS引擎需要构建一个【执行环境栈】( Execution Context Stack) ，
       与此同时，也要创建一个【全局执行环境】（Execution Context）EC ，
       并将这个全局执行环境EC压入执行环境栈中。
       执行环境栈的【作用】是为了保证程序能够按照【正确的顺序被执行】。
       【在javascript中，每个函数【都有】自己的执行环境】，
       当执行一个函数时，
       该【函数的执行环境】就会被推入执行环境栈的【顶部】并获取【执行权】。
       当这个函数执行完毕，
       它的执行环境又从这个栈的顶部被删除，

       并把【执行权】并还给之前执行环境。

       我们用伪代码来模拟执行环境栈和EC的关系：
 */
var ECStack = []; //定义一个执行环境栈，类似于数组

var EC = {}; //     创建一个执行空间，

//ECMA-262规范并没有对【EC的数据结构】做明确的定义，你可以理解为在【内存】中分配的一块【空间】

ECStack.push(EC); //进入函数，压入执行环境
ECStack.pop(EC); // 函数返回后，删除执行环境

/*
 最后，JS引擎还要创建一个 与EC关联 的【全局变量对象】(Varibale Object) VO,
       并把【VO指向全局对象】，
       VO中不仅包含了全局对象的原有属性，
       还包括在全局定义的变量x 和函数 A，
       与此同时，在定义函数A的时候，
       还为 A 添加了一个内部属性scope，
       并将scope指向了VO。
       每个函数在【定义的时候】，
       【都会】创建一个与之关联的scope属性，
       scope【总是指向】定义函数时所在的环境。
       此时的ECStack结构如下：
 */
ECStack = [ //                       执行环境栈
    EC(G) = { //                     全局执行环境
        VO(G): { //                  定义全局变量对象
            ... //                   包含全局对象原有的属性
            x = 1; //                定义变量x
            A = function() {... }; //定义函数A
            A[[scope]] = this; //    定义A的scope，并赋值为VO本身
        }
    }
];

//二、 执行函数A

/*
 当执行进入A(1) 时，JS引擎需要完成以下工作：

 首先，JS引擎会 创建 函数【A的】执行环境EC，
       然后 EC推入 执行环境栈的顶部并 【获取执行权】。
       此时执行环境栈中有两个执行环境，
       分别是 全局执行环境 和 函数A执行环境，
       A的执行环境在栈顶，全局执行环境在栈的底部。
 然后，创建 函数A的 作用域链(Scope Chain) ，
       【在javascript中，【每个】执行环境【都有】自己的作用域链】，
       用于 【标识符解析】，当执行环境被创建时，
       它的 作用域链 就初始化为 当前运行函数的scope所包含的对象。
 接着，JS引擎会创建一个当前函数的活动对象(Activation Object) AO，
       这里的活动对象扮演着变量对象的角色，
       只是在函数中的叫法不同而已（你可以认为变量对象是一个总的概念，
       而活动对象是它的一个分支），
       AO中包含了函数的形参、arguments对象、this对象、以及局部变量和内部函数的定义，
       然后AO会被推入【作用域链的顶端】。
       需要注意的是，在定义函数B的时候，
       JS引擎同样也会为B添加了一个scope属性,
       并将scope指向了定义函数B时所在的环境，
       【定义函数B的【环境】就是A的活动对象AO】，
       而AO位于链表的前端，由于【链表】具有首尾相连的特点，
       因此函数B的scope指向了A的整个作用域链。
       我们再看看此时的ECStack结构：
 */
ECStack = [ //                       执行环境栈
    EC(A) = { //                     A的执行环境
        [scope]: VO(G), //           VO是全局变量对象
        AO(A): { //                  创建函数A的活动对象
            y: 1,
            x: 2, //                 定义局部变量x
            B: function() {... }, // 定义函数B
            B[[scope]] = this; //    this指代AO本身，而AO位于scopeChain的顶端，因此B[[scope]]指向整个作用域链
            arguments: [], //        平时我们在函数中访问的arguments就是AO中的arguments
            this: window //          函数中的this指向调用者window对象
        },
        scopeChain: < AO(A),
        A[[scope]] > //              链表初始化为A[[scope]],然后再把AO加入该作用域链的顶端,此时A的作用域链：AO(A)->VO(G)
    },
    EC(G) = { //                     全局执行环境
        VO(G): { //                  创建全局变量对象
            ... //                   包含全局对象原有的属性
            x = 1; //                定义变量x
            A = function() {... }; //定义函数A
            A[[scope]] = this; //    定义A的scope，A[[scope]] == VO(G)
        }
    }
];


//三、 执行函数B

/*
 函数A被执行以后，返回了B的引用，
 并赋值给了变量C，执行 C(1) 就相当于执行B(1)，
 JS引擎需要完成以下工作：

 首先，还和上面一样，
       创建函数B的执行环境EC，
       然后EC推入执行环境栈的顶部并获取执行权。
       此时执行环境栈中有两个执行环境，
       分别是全局执行环境和函数B的执行环境，
       B的执行环境在栈顶，全局执行环境在栈的底部。
      （注意：当函数A返回后，A的执行环境就会从栈中被删除，只留下全局执行环境）
 然后，创建函数B的作用域链，
       并初始化为函数B的scope所包含的对象，
       即包含了A的作用域链。
 最后，创建函数B的活动对象AO,
       并将B的形参z, arguments对象 和 this对象作为AO的属性。
       此时ECStack将会变成这样：
 */
ECStack = [ //            执行环境栈
    EC(B) = { //          创建B的执行环境,并处于作用域链的顶端
        [scope]: AO(A), //指向函数A的作用域链,AO(A)->VO(G)
        AO(B) = { //      创建函数B的活动对象
            z: 1,
            arguments: [],
            this: window
        }
        scopeChain: < AO(B),
        B[[scope]] > //   链表初始化为B[[scope]],再将AO(B)加入链表表头，此时B的作用域链：AO(B)->AO(A)-VO(G)
    },
    EC(A), //                        A的执行环境已经从栈顶被删除,
    EC(G) = { //                     全局执行环境
        VO: { //                     定义全局变量对象
            ... //                   包含全局对象原有的属性
            x = 1; //                定义变量x
            A = function() {... }; //定义函数A
            A[[scope]] = this; //    定义A的scope，A[[scope]] == VO(G)
        }
    }
];
