# vue

## 1. vue 生命周期

1. beforeCreate 创建前：在实例初始化之后触发，此时 data 是获取不到的。
2. created 创建后：在实例创建完成后触发，此时可以访问 data、methods 等属性，但这个时候组件还没有被挂载到页面中去，一般可以在这里做一些初始化的工作，例如请求接口数据。
3. beforeMount 挂载前：在组件被挂载到页面之前触发，beforeMount 之前会编译 template，渲染为内存中的 DOM。
4. mounted 挂载后：在组件挂载到页面后触发，这是就可以通过 DOM API 获取到页面的 DOM 了。
5. beforeUpdate 更新前：在响应式数据更新后触发，发生在 DOM 重新渲染之前，这时可以对将会被移除的元素做一些操作，例如移除事件监听器。
6. updated 更新后：DOM 重新渲染之后调用，此时页面和 data 数据同步，都是最新的。
7. beforeDestroy 销毁前：在实例销毁之前调用，一般可以在这里清除定时器等操作。
8. destroyed 销毁后：此时实例已经销毁。
9. 当使用 keep-alive 时还有 2 个钩子函数：
   1. deactivated：用 keep-alive 包裹的组件在切换时不会销毁，而是缓存到内存中，然后执行 deactivated 钩子。
   2. activated：在被缓存组件需要重新渲染之后，会执行 activated 钩子。

## 2. v-show 和 v-if 区别

1. v-show 只是通过 CSS 样式来控制元素是否隐藏，元素是会渲染出来的。
2. v-if 会真正的去销毁和重新创建元素。
3. v-if 切换起来开销更大，v-show 初始渲染开销更大。

## 3. v-for 和 v-if 优先级

1. 在 vue2 中 v-for 优先于 v-if 被解析，在 vue3 中 v-if 优先级高于 v-for。
2. 如果是为了隐藏整个列表，可以把 v-if 放在 v-for 的容器元素上，例如 ul, ol。
3. 如果是为了过滤列表中的某些项目，可以定义计算属性，返回过滤后的列表让 v-for 使用。

## 4. vue 属性重名时的优先级

props > methods > data > computed > watch

## 5. 为什么 data 是一个函数

对象为引用类型，当重用组件时，由于数据对象都指向同一个 data 对象，当在一个组件中修改 data 时，其他重用的组件中的 data 会同时被修改；而使用返回对象的函数，由于每次返回的都是一个新对象，引用地址不同，则不会出现这个问题。

## 6. vue 组件之间的通信方式

1. 父子组件之间通信：
   1. 子组件通过 props 接收父组件传递的数据；子组件 emit 触发事件，父组件监听事件接收子组件传递的数据。
   2. 父组件通过 ref 给子组件设一个名字，然后通过 $refs 来获取子组件实例；子组件也可以用 $parent 来获取父组件实例
2. 兄弟组件之间：
   1. 事件总线：创建一个空的 Vue 组件来进行消息传递，在这个空组件上进行触发和监听事件来实现通信，调用该组件的 $emit 触发事件，调用 $on 监听该组件触发的事件。
   2. 通过 \$parent.\$refs 来获取兄弟组件实例
3. vuex

## 7. computed 和 watch 的区别

1. computed 是计算一个新的属性，并将该属性挂载到 Vue 实例上，而 watch 是监听已经存在且已挂载到 Vue 实例上的数据。
2. computed本质是惰性求值的 watch，只有当依赖属性变化后第一次访问 computed 才会计算新的值；而 watch 则是数据一旦发生变化就会执行回调函数。
3. 从使用上来说，computed 适用一个数据被多个数据影响，而 watch 适用一个数据影响多个数据。

## 8. v-model

1. v-model 用于表单数据的双向绑定，它做了 2 个操作：
   1. v-bind 绑定一个 value 属性，将当前组件的值赋予子组件。
   2. v-on 监听 input 事件，根据子组件的事件修改当前组件的值。
2. 代码实现

```html
对于原生元素，将 msg 赋值给子组件的 value，当子组件触发 input 事件时修改当前组件的 msg
<input v-model="msg" /> 相当于
<input v-bind:value="msg" v-on:input="msg=$event.target.value" />
对于自定义 vue 组件
<my-component v-model="msg"/> 相当于
<my-component v-bind:value="msg" v-on:input="msg=argument[0]" />
```

## 9. vue 实现过渡动画

1. 使用 vue 的 transition 标签结合 css 样式实现，在 transition 标签中可通过 name 属性替换过渡 css 类名前缀的 v。
   1. v-enter：元素进入动画的初始样式
   2. v-enter-to：元素进入动画最后的样式，一般不去定义这个 class，因为一般来说进入动画的结果就是元素本来的样式
   3. v-enter-active：定义了元素从 v-enter 到 v-enter-to 过渡变化所需时间及变化方式等
   4. v-leave：元素离开动画的初始样式，一般不去定义这个 class，因为一般来说离开动画的初始样式就是元素本来的样式
   5. v-leave-to
   6. v-leave-active
2. 使用 vue 的钩子函数实现动画，通过 v-on 监听 transition 标签的 before-enter，enter，after-enter，leave 事件。

## 10. vue router 原理

1. 路由就是用来解析 URL 实现不同页面之间的跳转，要求更新视图但不重新请求页面，vue-router 通过 hash 和 history 两个方式实现路由。
2. hash：
   1. 在 url 最后的 \# 开头的字符串就是哈希值，它是记录在 window.localtion.hash 中的。
   2. 改变哈希值不会重新加载页面，但会触发 hashchange 事件，可以根据哈希值来切换路由。
3. history：
   1. HTML 提供了 pushState() 和 replaceState() 方法修改浏览器的历史记录栈，修改后虽然当前 URL 变了但不会发送请求，这就可以用来实现路由。
   2. 通过浏览器前进后退修改 url 会触发 popstate 事件，我们可以监听这个事件以及在 pushState 和 replaceState 的时候去触发 router-view 的视图更新。
4. 对比：
   1. 哈希模式在 url 有个井号，而 history 模式没有，更美观
   2. pushState 可以设置与当前 url 同源的任意 url，而哈希模式只能修改井号后边的内容
   3. pushState 设置的新 url 与当前的相同时也会放入历史记录栈里面，而哈希模式只有新的和旧的不同才会放入栈中

## 11. vue router 路由跳转方式

1. 声明式的标签跳转，通过 router-link 来创建 a 标签实现跳转：
   1. `<router-link :to="{name:'home'}"></router-link>`
   2. `<router-link :to="{path:'/home'}"></router-link>`
2. 编程式跳转：
   1. `this.$router.push('/home')`
   2. `this.$router.push({name:'home'})`
   3. `this.$router.push({path:'/home'})`

## 12. vue 响应式原理

1. 响应式指的是数据发生改变时，视图会重新渲染，匹配最新的值。
2. vue2 实现响应式的原理是通过 Object.defineProperty() 为每一个 data 数据进行数据劫持，会为对象的每一个属性添加 get 和 set 方法进行拦截，数组则拦截数组原型上的几个变更方法：push、pop、shift、unshift、splice、sort、reverse，<font color="orange">参考 13</font>。
3. 当页面使用到某个属性时，会触发进行拦截的 get()函数，将对应的 watcher 放到该属性的依赖收集数组中。
4. 当数据发生改变时，会触发进行拦截的 set() 函数，会遍历依赖收集数组，通知 watcher 进行更新。
5. vue2 这样实现响应式存在一些问题：（1）初始化时需要遍历对象所有属性，如果对象层级较深，性能不好；（2）通知更新过程需要维护大量 dep 实例和 watcher 实例，额外占用内存较多；（3）动态新增、删除对象属性无法拦截，只能用特定 set/delete api代替；（4）不支持 Map、Set 等数据结构
6. vue3 使用 Proxy Api 来代替 defineProperty。

## 13. vue 响应式数组

1. vue 拦截了 Array.prototype 上的 7 个方法：push、pop、shift、unshift、splice、sort、reverse。
2. 所以通过下标去修改数组是没有被监听的，能修改数据但不会自动更新视图，我在 github 上的 issue 里面看到作者的回复，是因为性能问题所以没有监听下标修改操作，相关链接：[为什么vue没有提供对数组属性的监听 #8562](https://github.com/vuejs/vue/issues/8562)。
3. 可以通过 vue 提供的 this.$set() 方法为对象或数组新增属性并监听。

## 14. 事件冒泡修饰符

1. stop：阻止事件冒泡。例如给子组件的 click 事件加上 stop 修饰 `v-on:click.stop`，将不会触发父组件的 click 事件。
2. prevent：阻止提交。form 表单和 a 链接都会导致页面的刷新，加上 prevent 阻止这种默认的刷新。
3. capture：优先触发。事件冒泡是先子组件后父组件的顺序触发，而加上 capture 的会优先触发，例如给父组件加上 capture 会优于子组件触发。
4. once：只触发一次
5. self：只当在 event.target 是当前元素自身时触发处理函数，即事件不是从内部元素触发的。
6. passive：不执行回调函数中的 preventDefault()，<font color="orange">参考 15</font>

## 15. addEventListener passive

1. 在 addEventListener 的回调函数中可以通过 preventDefault() 方法来阻止事件得默认行为。
2. 因为浏览器不知道回调函数中有没有调用 preventDefault，所以会等回调函数执行完，才去决定要不要执行默认行为，这样是有一定的延迟的。
3. 在第 3 个参数中可设 passive: true，这样能告诉浏览器忽略回调函数中的 preventDefault，就是说不用等了直接执行默认行为就行。

## 16. vue router 配置 404 页面

在路由配置的最后设一个 * 号，路由是从上到下开始匹配的，星号表示全匹配，如果前面的路由都匹配不上，就用最后的这个星号兜底。

```js
routes: [
   {path:'/a', compnent: a},
   {path:'/b', compnent: b},
   {
      path: '*',
      component: NotFound
   }
]
```

## 17. $route 和 $router 的区别

1. \$router 用来操作路由，\$route 用来获取路由信息。
2. \$route 是当前激活的路由信息对象，每个路由都有一个自己的 route 对象，包含了当前路由的路径、参数、名字等信息。
3. \$router 可以看做是管理一组 route 的容器，包含了很多关键的属性，例如跳转方法、history 对象。

## 18. vue router 导航守卫钩子

1. 全局守卫，在 createRouter 返回的实例上注册
   1. beforeEach：前置守卫
   2. beforeResolve：类似于 beforeEach，但会在组件内守卫之后调用
   3. afterEach
2. 路由独享守卫，直接在路由配置上定义
   1. beforeEnter
3. 组件内守卫，直接在组件上定义
   1. beforeRouteEnter：在渲染该组件的对应路由被验证前调用，不能访问 this，因为当守卫执行时，组件实例还没被创建。
   2. beforeRouteUpdate：在当前路由改变，但是该组件被复用时调用，例如跳转路由 users/:id，虽然 id 不同还是会渲染同样的组件，在复用组件时就会调用这个钩子；因为组件已经挂载好了，导航守卫可以访问 this。
   3. beforeRouteLeave：可以访问 this。

## 19. vue router 导航守卫钩子触发流程

1. 导航被触发。
2. 在失活的组件里调用 beforeRouteLeave 守卫。
3. 调用全局的 beforeEach 守卫。
4. 在重用的组件里调用 beforeRouteUpdate 守卫(2.2+)。
5. 在路由配置里调用 beforeEnter。
6. 解析异步路由组件。
7. 在被激活的组件里调用 beforeRouteEnter。
8. 调用全局的 beforeResolve 守卫(2.5+)。
9. 导航被确认。
10. 调用全局的 afterEach 钩子。
11. 触发 DOM 更新。
12. 调用 beforeRouteEnter 守卫中传给 next 的回调函数，创建好的组件实例会作为回调函数的参数传入。

## 20. key 的作用

1. 第一种情况是在 v-if 中使用 key，假如 v-if v-else 的元素类型相同，vue 会在切换时复用，假如是相同的 input，由于复用切换后用户的输入不会被清除，这时就可以加上 key，对于 key 不同的元素 vue 是不会进行复用的。
2. 第二种情况是 v-for 中使用 key，v-for 更新已渲染的元素列表时，默认就地复用，假如数据项顺序改变，vue 不会移动元素位置匹配新的顺序，而是简单复用每个元素；如果能够为列表每个元素提供 key，让 vue 能够追踪元素的身份，从而重用和重新排序现有元素。

## 21. vue 的 diff 算法

1. 新旧虚拟 DOM 对比更新，只会比较同一级节点，从首尾开始向中间进行比较
2. 对比流程，分为 5 种情况，按顺序作比较，比较时会通过 key 来判断节点是否相同：
   1. 比较旧开始节点和新开始节点，如果相同则旧开始指针和新开始指针都往后移
   2. 比较旧末尾节点和新末尾节点，如果相同则旧末尾指针和新末尾指针都往前移
   3. 比较旧开始和新末尾，如果相同，则将旧开始节点移动到旧末尾的后面，因为它匹配到的新位置是在旧末尾的后面
   4. 比较旧末尾和新开始，如果相同，则将旧末尾节点移动到旧开始的前面，因为它匹配到的新位置是在旧开始的前面
   5. 在旧节点列表中遍历寻找新开始节点，找到后将它移动到旧开始的前面；找不到则创建节点插入到旧开始的前面
3. 假如不设置 key，会认为都是同一个节点，会循环第一步比较旧开始和新开始
4. 假如对比结束后，旧开始和旧末尾指针之间还有节点，说明这些是被删除的节点，直接删掉
5. 假如对比结束后，新开始和新末尾指针之间还有节点，说明这些是新增的节点，将它们插入到旧开始节点的前面

## 23. vue 的 keep-alive

1. 作用：如果你需要在组件切换的时候，保存一些组件的状态防止多次渲染，就可以使用 keep-alive 组件包裹需要保存的组件，包裹时会缓存不活动的组件实例，而不是销毁它们。
2. 当使用 keep-alive 时还有 2 个钩子函数：
   1. deactivated：用 keep-alive 包裹的组件在切换时不会销毁，而是缓存到内存中，然后执行 deactivated 钩子。
   2. activated：在被缓存组件需要重新渲染之后，会执行 activated 钩子。

## 24. $nextTick

vue 响应式地改变一个值以后，此时的 dom 并不会立即更新，如果需要在数据改变以后立即通过 dom 做一些操作，可以使用 $nextTick 获得更新后的 dom。

## 25. vue 样式隔离 scoped 原理

给组件的 DOM 都加了用于确保唯一性的属性 data-v- 后面再加上 8 位随机数，然后给对应的 CSS 的选择器加上属性选择器，这样来实现样式隔离。

## 26. vue 样式穿透 / 深度选择器

1. 样式穿透含义：就是在父级组件中强制去修改子级组件的内部样式，注意这里的父子层次并不一定是一级，可能是很多级。
2. 使用原因：需要在组件中局部修改第三方组件的样式，而又不想去除scoped属性造成组件之间的样式污染。此时只能通过特殊的方式，穿透scoped。
3. 使用方法：

```scss
.a :deep(.b) {
  /* ... */
}
// 会被编译成
.a[data-v-f3f3eg9] .b {
  /* ... */
}
```

## 27. vue 自定义指令

```js
// 1. 创建包含钩子函数的指令对象
loadingDirective {
  mounted (el, binding) {
    // 指令绑定值binding.value就是下面传入的v
    // 指令参数binding.arg就是下面传入的a
  }
  updated (el,binding) {...}
}

// 2. 在main.js中注册指令
app.directive('loading', loadingDirective)

// 3. 根据注册的指令名字，在其前面加上v-使用
<img v-loading:[a]="v">
```

## 28. vuex 使用 / 组成

1. state：定义状态的初始值。
2. getters：相当于计算属性
3. mutation：通过 commit() 方法触发，可以直接修改  state，但只能是同步操作，原因<font color="orange">参考 29</font>。
4. action：通过 dispatch() 方法触发，可以在 action 中提交 mutation 去修改 state，，支持异步操作。

## 29. vuex mutation 为什么不支持异步

1. 用 devtool 调试时，每当一条 mutation 被记录时，devtool 都需要捕捉到前一状态和后一状态的快照，但如果在 mutation 中进行了异步操作就没法这么干了；
2. 因为当 mutation 触发的时候，回调函数还没有被调用，devtools 不知道什么时候回调函数实际上被调用；
3. 实质上任何在回调函数中进行的状态的改变都是不可追踪的。

## 30. 组合式 API 优点

1. 选项式 API 的缺点：选项式 API 将数据和逻辑分离，拆分到 data、method 里面去了，写一个功能的代码时需要上下跳转；逻辑复用不太方便。
2. 组合式 API 可以把数据和逻辑集中在 setup 里面，也可以将这些集中的代码抽离成一个单独的 js 让不同的组件来复用。
