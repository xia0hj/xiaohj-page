# JavaScript

## 1. js 的数据类型

1. 基本数据类型有 String、Number、Boolean、Undefined、Null，还有 es6 新增的 Symbol，<font color="orange">参考 2</font>。
2. 引用类型有对象、数组、函数 3 种。
3. 区别是存储位置不同：
   1. 基本数据类型直接存储在栈中的简单数据段，因为它占据空间小，而且会频繁使用。
   2. 引用类型保存在堆中，因为占据空间大，且大小不固定；在栈中保存了指针指向它在堆中的地址。

## 2. Symbol

1. Symbol 表示一个独一无二的值，Symbol() 的参数只是描述，即使描述相同，Symbol 值也是不相等的；而且 Symbol 不是对象。
2. 用途：
   1. 定义对象的唯一属性名：如果要给对象新增一个属性，用 Symbol 当作属性名，可以保证不会属性名重复，避免原有属性被覆盖。
   2. 私有属性：用 Symbol 作为对象的属性名，且不对外暴露，这样使用者无法在外部创建出一个相同的 Symbol。

## 3. es6 的新特性

1. const、let：
   1. 为了解决 var 的 3 个问题：变量提升、重复声明、没有块级作用域只能用函数作用域。
   2. const、let 存在暂时性死区，等到声明那一行代码出现后才能使用该变量，且不能重复声明
   3. const、let 支持大括号包起来的块级作用域，var 只能借助函数包起来
2. 模板字符串：用反引号，里面可以用 $\{ \} 放 js 表达式，会将返回值放到字符串中，并且会保留换行和空格
3. 剩余参数：在参数前面加 3 个点表示，只能放在最后面，把剩余没有对应形参的参数放到一个数组中，<font color="orange">参考 17</font>
4. Set 和 Map
5. 箭头函数：普通函数的 this 是可变的，而箭头函数没有自己的 this，在箭头函数中使用 this 实际是上一层作用域中的 this，<font color="orange">参考 6</font>。
6. Generator 函数：支持暂停分段执行的函数，在 function 和函数名中间加一个星号，在函数体里面用 yield 将函数分段，调用该函数返回一个控制器，每次调用 next() 方法都会执行到 yield；可以用来将异步代码写成同步的形式，将异步后要执行的代码放在下一个分段，在异步任务中调用 next() 去执行下一段。
7. Promise：用来包装一个异步调用，目的是解决层层嵌套的异步回调函数，<font color="orange">参考 22</font>.
8. async / await：用来写异步代码的关键字，async 函数会将 return 值通过 Promise.resolve() 方法包装成 Promise 对象再返回；await 后跟一个 Promise 对象，那么就会阻塞后续的代码，直到 Promise resolve 之后再执行。
9. class：生成实例时必须用 new，实例会继承类中定义的属性，类之间也能通过 extends 关键字继承
10. 模块化：<font color="orange">参考 9</font>

## 4. var、let、const 之间的区别

1. 块级作用域：var 声明的变量不支持大括号表示的块级作用域，只能用函数作用域代替，而 const 和 let 支持。
2. 变量提升：var 声明的变量会提升到所有代码执行之前被声明，但不会赋值；let 和 const 存在暂时性死区，等到声明那一行代码出现后才能使用该变量。
3. 重复声明：var 可以，const 和 let 不允许。
4. const 声明同时必须赋值，此后不能修改；const 对象不能修改引用地址，但可以修改对象中的值。

## 5. 原型、原型链

1. 每个构造函数内部都有一个 prototype 属性值，它是一个对象，包含了一些共享的属性和方法，由构造函数创建的对象都会共享这些属性。
2. 使用构造函数创建的对象，内部有 \_\_proto\_\_ 指针指向构造函数的 prototype 来让我们访问原型，也可以使用 Object.getPrototypeOf() 方法来获取原型。
3. 当我们访问一个对象的属性时，如果对象内部不存在这个属性，就会到它的原型对象上去寻找属性，原型对象又会有自己的原型，这样一直找下去就是原型链。
4. 原型链的尽头一般是 Object.prototype，我们新建的对象可以用到它上面的 toString 等常用方法。
5. Object.prototype 的原型是 null，null 表示空对象，用 null 来表示尽头比较合理。

## 6. js this 指向

1. 普通函数直接调用：指向 window。
2. 普通函数作为对象方法调用：指向所属对象。
3. 通过 new 来调用构造函数：指向创建的新对象
4. 箭头函数：没有自己的 this，会使用外层的 this

## 7. Map 和 Object 的区别

1. Object 属性的键只能是字符串或者 Symbol；Map 的键可以是任意值。
2. Map 的键值对是有序的，按照插入顺序；而 Object 的属性在遍历时是无序的。
3. Object 有原型对象，有的键是默认存在的，可能会与自定义的键重复；Map 就不会有默认的键
4. Map.size 属性可以获取键值对的数量；而 Object 需要通过 Object.keys(obj) 方法来获取键的数组，从而得到键值对数量。

## 8. 遍历

1. for(let i=0)：最基础的遍历数组的方法。
2. forEach()：回调函数有 3 个参数：当前元素、下标、数组；无法使用 break 跳出循环，在回调中 return 相当于普通遍历的 continue，不能用于对象遍历。
3. for of：遍历数组的每个元素，不支持遍历对象，只能用于遍历实现了 Iterator 接口的数据类型
4. for in：遍历数组的下标，一般不会用来遍历数组；遍历对象的 key，但是会遍历原型上的 key，需要用 obj.hasOwnProperty() 来判断 key 是否属于当前对象
5. Object.keys()、values()、entries()：分别返回对象的 key 数组、属性值数组、包含键值对的二维数组

## 9. js 模块化的 4 种方案

1. CommonJS：require 引入模块，module.exports 暴露模块，它是同步引入模块的，所以不适用于浏览器端，因为浏览器请求是异步的。
2. AMD：这种方案会异步加载模块，require.js 实现了 AMD 规范。
3. CMD：也是异步加载的，与 AMD 的区别是：AMD 加载模块完成后就会执行，所有模块执行完毕后才会执行主要逻辑；而 CMD 加载后不会执行，在主要逻辑中遇到 require 语句才会执行模块。
4. ES6 Module：用 import 和 export 的形式来导入导出，与 CommonJS 的区别：CommonJS 加载模块后生成一个对象，然后从这个对象上取值和方法；es6 模块生成一个引用，运行时再根据这个引用去模块中取值

## 10. 如何判断 js 变量的类型

1. typeof
2. instanceof：用来检查右侧构造函数的原型对象是否出现在左侧实例对象的原型链上。
3. constructor：构造函数的原型对象上有 constructor 属性指向该函数，可访问对象的原型上的 constructor，但这种方法不能检查 null 和 undefined，它们没有原型。
4. Object.prototype.toString.call()：Object 的原型上的 toString() 方法，返回内部属性 \[\[class\]\]，一般是 \[object Number\] 这种样式的字符串。

## 11. == 和 === 的区别

1. == 比较基本类型，如果类型不同，会先强制转换后再比较。
2. === 比较基本类型，先比较类型再比较值，如果类型不同就返回 false，不进行转换。
3. 在比较引用类型时，== 和 === 都是比较地址。

## 12. use strict 严格模式

1. use strict 指的是严格运行模式，在这种模式对 js 的使用添加了一些限制，目的是消除代码中一些不合理的使用方式。
2. 严格模式的限制：
   1. 不允许使用未声明的变量；
   2. 不允许用 delete 关键字删除变量；
   3. 不允许变量重名；
   4. 禁止 this 关键字指向全局对象；
   5. ...

## 13. undefined 和 null 的区别

1. undefined 表示未定义，变量声明后但没有赋值就是 undefined；null 表示空对象，一般是赋值给对象作为初始值。
2. 用 typeof 判断，null = 'object'，undefined = 'undefined'。
3. 转换成 Number 类型，null = 0，undefined = NaN。
4. null 是保留的关键字，而 undefined 不是。

## 14. window.isNaN() 和 Number.isNaN() 的区别

1. window.isNaN() 会尝试去将参数的类型转换成数字，如果不能被转换成数字都返回 true；所以，只是判断参数能否转换成数组，不会严格判断 NaN。
2. Number.isNaN() 会先判断参数的类型是不是 Number，如果不是 Number 都返回 false；NaN 表示不合法的数字，如 -1 开方。

## 15. 其他类型隐式转 Boolean

1. undefined
2. null
3. 0
4. NaN
5. ""
6. 其余都转换成 true

## 16. new 操作符做了什么及其代码实现

1. 首先创建一个空对象，并将空对象的原型设为构造函数的 prototype。
2. 让构造函数的 this 指向这个新对象，然后执行。
3. 如果构造函数返回的是引用类型，就直接将它返回；否则返回新对象。

```js
function newOperation(constructor, ...args){
   if(typeof constructor !== 'function'){
      throw new TypeError('constructor is not a function')
   }
   const obj = Object.create(constructor.prototype) // obj.__proto__ = constructor.prototype
   const fnReturn = constructor.apply(obj, args)
   if(typeof fnReturn === 'object' || typeof fnReturn === 'function'){
      return fnReturn
   }else{
      return obj
   }
}
// 自测
function fn(msg){this.msg=msg}
const a = new fn('aaa')
const b = newOperation(fn, 'bbb')
```

## 17. arguments 对象和剩余参数 ...args 的区别

1. arguments 对象包含所有参数，剩余参数只能放在最后且只包含没有对应形参的参数
2. arguments 对象不是数组，不能直接使用数组的方法，需要这样才能用数组的方法 `Array.prototype.push.call(arguments, newVal)`
3. 剩余参数是真正的数组

## 18. 函数的 call，apply，bind 区别

1. 它们都是用来重定义this对象的。
2. call 和 apply 都会执行该函数并将 this 指向第一个参数的对象，区别是apply 的剩余参数开始要放到一个数组中，而 call 的参数直接用逗号分隔
3. bind 的参数跟 call 一样用逗号分隔，但它返回的是调整了 this 指向的函数，并没有执行。

## 19. 闭包

1. 闭包是指有权访问另一个函数作用域中的变量的函数，创建闭包的常见方式是在函数中创建另一个函数，通过这个函数访问到当前函数中的局部变量
2. 用途：
   1. 能在外部通过闭包函数去访问函数内部的变量，可以用这种方法来创建私有变量。
   2. 使已经运行结束的函数上下文中的变量继续保留在内存中，因为闭包函数保留了对这个变量的引用，所以不会被回收。

## 20. event loop 事件循环

1. js 是单线程运行的，在运行时会将函数的上下文放入执行栈 call stack 中保证代码的有序执行；
2. event loop 流程：
   1. 宏任务放入执行栈，执行同步代码
   2. 把微任务放入执行栈，直至微任务队列为空
   3. DOM 渲染，这一步由浏览器判断是否需要，可能会不执行
   4. 回到第一步，把下一个宏任务放入执行栈，开启下一轮的宏任务
3. 宏任务包括：js 脚本代码、setTimeout、setInterval 等，所以当遇到 setTimeout 时，延迟之后会将其回调函数放入宏任务队列，最快也要等当前这一轮宏任务的同步代码执行完后才有机会去执行它
4. 微任务包括：Promise 的回调函数、async/await 语法、fetch 等；当前宏任务产生的微任务，会在宏任务执行完毕后，下一轮宏任务开启前，全部按序执行直到清空微任务队列。

## 21. 内存泄漏

1. 全局变量：设置了不必要的全局变量，且没有及时清理。
2. DOM 引用：引用了一个 DOM，假如这个元素被删除了，但如果我们一直保留了对这个元素的引用，它也是无法被回收一直留在内存里。
3. 定时器：setInterval 和 setTimeout 不使用时忘记 clear，会导致它回调函数中依赖的变量都不能被回收。
4. 事件监听：`DOM.addEventListener('click', callback)` 添加了事件监听，垃圾回收机制不好判断事件解除，回调函数没法回收，这时需要手动解除监听 `DOM.removeEventListener(callback)`。
5. console：`console.log(obj)` 打印的对象无法被回收。

## 22. Promise

1. 它用来包装一个异步调用，目的是解决层层嵌套的异步回调函数
2. Promise 构造函数会接收一个函数作为参数，返回一个 Promise 实例。
3. Promise 有 3 种状态：pending、resolved 和 rejected，分别代表进行中、已成功、已失败；状态只能有 pending 变为其他 2 个，且不能再次更改。
4. 我们可以在异步操作结束后，调用 resolve() 方法或者 reject() 方法来修改状态。
5. 通过 Promise 原型上定义的 then 方法来为两个状态注册回调函数，这个回调函数会在本轮事件循环的末尾执行，属于微任务。

## 23. 防抖、节流

1. 防抖：在事件触发 n 秒之后执行回调函数，如果在 n 秒之内再次触发事件，则重新计时。
2. 节流：在规定的单位时间内，只能有一次触发事件的回调函数执行，如果事件被触发多次，只有一次能生效。

```js
// 防抖
function debounce(fn, delay){
  let timeoutId = 0
  return function wrappedFn (){
    if(timeoutId > 0){
      clearTimeout(timeoutId)
      timeoutId = 0
    }
    const self = this
    const args = arguments
    timeoutId = setTimeout(()=>{
      // 注意要取的是 wrappedFn 的 this 和参数
      fn.apply(self, args)
    }, delay)
  }
}
// 节流
function throttle (fn, interval) {
  let timeoutId = 0
  let lastRun = 0
  return function wrappedFn () {
    if (timeoutId > 0) {
      return
    }
    const self = this
    const args = arguments
    const pastTimeSinceLastRun = Date.now() - lastRun
    function runFn () {
      lastRun = Date.now()
      timeoutId = 0
      // 注意要取的是 wrappedFn 的 this 和参数
      fn.apply(self, args)
    }
    if (pastTimeSinceLastRun >= interval) {
      runFn()
    } else {
      timeoutId = window.setTimeout(runFn, interval)
    }
  }
}

const say = (str) => {console.log('I say: ', str)}
 
const debounceSay = debounce(say, 3000)
const throttleSay = throttle(say, 3000)
// <button onclick="throttleSay('节流')">节流按钮</button>
// <button onclick="debounceSay('防抖')">防抖按钮</button>
```

## 24. 函数柯里化

1. 将使用多个参数的函数转换成一系列只有一个参数的函数
2. 在多次调用一个函数，并且大部分参数相同的情况下使用

```js
function curry(fn, savedArgs = []) {
  return function () {
    // 获取先前已保存的参数数组
    const curArgs = savedArgs.slice(0)
    // 将当前参数放入数组
    for (let i = 0; i < arguments.length; i++) {
      curArgs.push(arguments[i])
    }
    // 如果参数已足够，则执行函数
    if (curArgs.length >= fn.length) {
      return fn.apply(this, curArgs)
    } else {
      // 参数不足，则将当前参数继续保存
      return curry.call(this, fn, curArgs)
    }
  }
}
const output = (v1, v2, v3)=>{console.log(`${v1},${v2},${v3}`)}
const curryFn = curry(output)
curryFn(1)(2)(3)
```

## 25. 数组扁平化

```js
function flattenArray(array) {
  if (!Array.isArray(array)) return
  const result = array.reduce(function (total, cur) {
    if (Array.isArray(cur)) {
      return total.concat(flattenArray(cur))
    } else {
      return total.concat(cur)
    }
  }, [])
  return result ? result : []
}
```

## 26. V8 引擎垃圾回收

1. v8 的垃圾回收是分代回收的，将对象分为新生代和老年代，存放于不同的空间。
2. 在新生代空间中被划分为 From 和 To 两个区域，To 空间一般是闲置的，当From 空间满了就会执行垃圾回收
3. 进行回收时首先会检查 From 空间中的存活对象，存活对象判断满足晋升到老年代的条件，满足条件的对象会复制到老年代空间中，不满足条件的对象则复制到 To 空间；然后 From 和 To 空间交换，原来的 To 空间变为 From 空间。
4. 晋升为老年代有两个条件：当对象从 From 空间复制到 To 空间时，假如该对象已经经历过一次回收，并且此时 To 空间使用已经超过了 25%，那么就会将该对象晋升为老年代
5. 晋升条件设置为 To 空间 25% 的原因是，回收结束后两个空间会交换，如果To空间剩余内存太小，变为From会影响后续内存分配。
6. 老年代的存活对象多且存活时间长，不适合使用新生代的那种回收方法，老年年用的是标记清除法和标记压缩法。
7. 标记清除法会先标记存活的对象，然后清除掉没标记的对象，由于标记清除后会造成很多的内存碎片，不便于后面的内存分配。所以了解决内存碎片的问题引入了标记压缩法。
8. 标记压缩法也是先标记，然后将存活对象都挪到一边，最后清理边界外的内存。
9. 由于标记压缩法需要移动对象，执行速度比标记清除要慢，所以V8主要使用标记清除法，当内存空间不足时采用标记压缩法。

## 27. 图片懒加载的实现

1. 先将图片的 src 设为默认的图片，判断图片如果出现在视图中才将 src 设为原本的图片
2. 判断图片是否在视图中的两种方法：
   1. 监听图片的第一个可滚动父元素和 window 对象的滚动相关事件（scroll、resize、touchmove 等），回调函数中通过 getBoundingClientRect() 方法获取元素离视图的顶部和左侧的距离，再与视图宽高 innerWidth、innerHeight 作比较，如果距离在宽高之内说明出现在视图中了
   2. IntersectionObserver：创建一个 IntersectionObserver 对象去 observe 图片元素，假如元素的可见性发生变化就会执行回调函数

## 28. 歌词解析器

1. 正则表达式解析标签，记录 曲名、歌手 等信息
2. 正则解析时间标签，将每一句歌词和对应的时间保存到数组中
3. 播放时计算当前时间离下一句歌词的时间差，通过 setTimeout() 在对应时间执行该行歌词的回调函数，然后递归继续播放
4. 暂停时先记录以下暂停的时间戳，下次播放从暂停处开始

## 29. 封装 Axios

统一上下文请求路径、统一超时时间、统一错误处理

## 30. TypeScript

给动态类型的 js 添加了一套静态类型系统，可以在编译期间检查出类型的错误，保证类型安全，编译后还是转换成 js 的。

## 31. 前端中的设计模式

[看 CSDN 文章](https://blog.csdn.net/zhangjing0320/article/details/112472548)

## 32. 类数组 TODO

## 33. async / await TODO
