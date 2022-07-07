# CSS

## 1. 盒子模型

1. 盒子模型分为标准盒子和 IE 盒子，都是由 margin，border，padding，content 组成。
2. 区别是宽度和高度所对应的范围不同，标准盒子的宽高只包含 content，IE 盒子包含 border，padding，content，不包括 margin。
3. 一般来说，我们可以通过修改元素的 box-sizing 属性来改变元素的盒模型。

## 2. CSS 居中方法

```scss
// 第一种方法，水平居中
// 给div设置一个宽度，并加上 margin: 0 auto
// 通过让它的外边距自适应，来实现水平居中
.div1 {
  width: 100px;
  margin: 0 auto;
}

// 第二种方法，水平居中
// 给容器元素加上 text-align: center，然后让要居中的元素变为行内元素
.container {
  text-align: center;
  .div2 {
    display: inline-block;
  }
}

// 第三种方法，水平垂直居中
// 绝对定位，上下左右的间距设为 0，让它占满父容器，然后 margin:auto 自动调整外边距实现居中
.div3{
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
}

// 第四种方法，水平垂直居中
// 绝对定位，left=top=50% 让元素的左上角与中心重合，然后要调整元素自身的位置去居中
// 已知元素宽高，可以将 margin 设为负值使其往左上方移动
// 未知元素宽高，可以用 transform: translate()
.div4 {
  width: $w;
  height: $h;
  position: absolute;
  left: 50%;
  top: 50%;
  /* left 和 top 将 div 左上角移至中心 */

  /* 已知容器宽高，通过 margin 设为负值让div往左上方移动，使div中心和视图中心重合 */
  margin-left: -0.5 * $w;
  margin-top: -0.5 * $h;

  /* 未知容器宽高 */
  transform: translate(-50%, -50%)
}

// 第五种方法，水平垂直居中
// flex 布局，修改容器的 align-items 和 justify-content
.container {
  display: flex;
  align-items: center; // 垂直居中
  justify-content: center; // 水平居中
}
```

## 3. position 定位

1. static：默认值，未定位
2. absolute：相对于离它最近的非 static 父元素定位，如果没有则相对于 body 定位，受滚动影响，会被父元素的 padding 影响初始点
3. fixed：相对于视图定位，不受滚动影响
4. relative：相对于元素自身的原位置定位
5. inherit: 从父元素继承 position 属性值

## 4. CSS 选择器

1. id选择器（#id）
2. 类选择器（.class）
3. 标签选择器（div, h1, p）
4. 后代选择器（div p）：空格隔开，表示选择后代
5. 子元素选择器（div>p）：必须是div的直接子元素，不能相隔
6. 属性选择器（a[src]）：选择带有src属性的a元素，可指定src的值，这也是 vue scoped 的实现原理
7. 伪类选择器（a:hover）：单冒号，匹配元素的一些特殊状态
8. 伪元素选择器（a::before）：匹配特殊的位置，在该位置添加一个特殊子元素
9. 通配符选择器（*）：所有元素

## 5. CSS 选择器优先级

1. 当两个规则都作用到同一 DOM 上，且其中的属性发生冲突，首先会判断是否有 !important 最高优先级，否则会使用选择器优先级高的样式属性
2. 选择器可以分为 4 个权重
   1. 行内样式（1,0,0,0）
   2. id 选择器（0,1,0,0）
   3. class 选择器、属性选择器、伪类选择器（0,0,1,0）
   4. 标签选择器、伪元素选择器（0,0,0,1）
3. 样式规则每出现一个选择器，就将它们的权重进行同等级的叠加，不能进位
4. 比较优先级时从左到右开始比较叠加权重大小，如果两个优先级相同，则最后出现的优先级更高，!important 也是这样
5. ！important 优先级最高，通配符选择器和继承样式是最低的优先级，但通配符比继承高一级

## 6. BFC

1. BFC 指的是块级格式化上下文，一个元素形成了 BFC 之后，那么它内部元素产生的布局不会影响到外部元素，外部元素的布局也不会影响到 BFC 中的内部元素。一个 BFC 就像是一个隔离区域，和其他区域互不影响。BFC 元素不会被外部浮动元素影响。
2. 触发 BFC：
   1. 一般来说根元素是一个 BFC 区域
   2. 浮动，float 不为 none
   3. 绝对定位
   4. display 为 inline-block 或 flex
   5. overflow 不为 visiable

## 7. 高度坍塌 / 清除浮动

1. 父元素没有设置高度，而子元素设为浮动脱离了文档流，没法撑开父元素的高度，导致父元素高度变为 0，发生高度坍塌。
2. 用 clear 属性来清除浮动，clear 属性不允许左侧或右侧出现浮动元素，否则自己就移动下一行。
3. 在子元素的末尾添加一个伪元素，让它由于 clear 导致不能与浮动元素同一行，挪到下一行，实现了撑开父元素高度。

```css
/* after在子元素的最后添加一个伪元素 */
.parent::after { 
  content: ''; /* 必需 */
  display: block; /* 伪元素默认是行内元素，clear只生效于块级元素 */
  clear: both;
}
```

## 8. flex 弹性布局

1. flex 是 CSS3 新增的布局方式，将一个元素的display 属性设为 flex 从而使它成为 flex 布局容器。
2. 容器有两条轴，一个是水平的主轴，一个与主轴垂直的交叉轴，可通过 flex-direction 属性指定主轴的方向。
3. justify-content 可指定元素在主轴上的排列方式；align-items 可指定元素在交叉轴上的排列方式。
4. 可通过 flex-grow、flex-shrink 来指定当排列空间有剩余时，元素的放大缩小比例。
5. 定义在容器上的属性：
   1. justify-content: 子元素在主轴上的排列方式，居中 = center
   2. align-items: 定义主轴上的元素在交叉轴上如何对齐，居中 = center
   3. flex-direction: 主轴方向
   4. flex-wrap: 当一根主轴放不下时该如何换行
   5. flex-flow: 简写 方向+换行
   6. align-content: 多根主轴在容器中如何对齐
6. 定义在元素上的属性：
   1. flex-grow: 主轴空间有余时元素放大比例，默认 0 不放大
   2. flex-shrink: 主轴空间有余时元素缩小比例，默认 0 不缩小
   3. flex-basis: 主轴空间大小，根据这个属性判断是否有多余空间让元素缩放，默认占满容器
   4. flex: 简写=放大+缩小+主轴空间，`flex: 1` 表示该子元素根据剩余空间自动放大缩小
   5. align-self: 覆盖容器的 align-items，允许单个元素有不同的交叉轴对齐方式
   6. order: 排列顺序，默认 0，小的在前

## 9. grid 网格布局

1. 定义在容器上的属性：
   1. grid-template-columns：划分列，属性值可使用关键字 repeat，auto-fill，auto，fr，minmax
   2. grid-template-rows：划分行
   3. grid-auto-flow：row=先行后列，column=先列后行
   4. justify-items：单元格内容水平对齐方式
   5. align-items：单元格内容垂直对齐方式
   6. justify-content：整个内容区域在容器内的水平对齐方式
   7. align-content：整个内容区域在容器内的垂直对齐方式
   8. place-content：简写，整个内容区域在容器内的水平对齐 + 垂直对齐
2. 定义在单元格上的属性：
   1. grid-column-start：从哪一列开始，可使用关键字 span 表示跨多少个格
   2. grid-column-end：从哪一列结束
   3. grid-column：简写，所占列的开始和结束，中间要加斜杠 /
   4. grid-row-start：从哪一行开始
   5. grid-row-end：从哪一行结束
   6. grid-row：简写，所占行的开始和结束，中间要加斜杠 /
   7. justify-self：单元格内容的水平对齐方式，覆盖容器的 justify-item
   8. align-self：单元格内容的垂直对齐方式，覆盖容器的 align-item
   9. place-self：单元格内容的水平+垂直对齐方式

## 10. 圣杯布局和双飞翼布局

1. 相同点：
   1. 都是实现三列布局，两边固定中间自适应
   2. 都是让三列浮动，然后通过负外边距形成三列布局
   3. 都是主列 dom 放在最前面，让它优先加载
2. 不同之处在于如何处理中间主列：
   1. 圣杯布局是利用父容器的内边距 + 左右两列相对定位；
   2. 双飞翼布局是把主列内容放在主列子元素中，利用这个子元素的外边距进行调整
3. 缺点：
   1. 圣杯布局缺点：center 部分的最小宽度不能小于 left 部分的宽度，否则会 left 部分掉到下一行
   2. 双飞翼布局缺点：多加了一层 dom 节点，增加了渲染的计算量
4. 圣杯布局步骤
   1. 为容器和左中右分别设置统一高度和左右固定宽度，中宽度 100%，若容器不设高度会因为子元素全部浮动导致高度坍塌
   2. 左中右全部 float:left，此时中间独占一行，左右被挤到下一行
   3. 左列的 margin-left 设为 -100% 贴着主列的左边缘；右列的 margin-left 设为负的自身宽度，贴着主列的右边缘；此时左右列都在主列内部，遮挡了主列内容
   4. 为左和右设置相对定位，并分别通过 left 和 right 设负值，使其不与中间部分相交
   5. 由于中间 100% 宽度将左右挤到视图外，为容器设置内边距为左右列的宽度，为左右腾出位置
5. 双飞翼布局步骤
   1. 同圣杯布局前3步，使 left 和 right 与 center 同一行，此时 left 和 right 会遮挡 center 部分内容
   2. 为 center 设置子元素，并设置 margin 让子元素不被左右列遮挡

```scss
$h: 500px; //  统一高度
$lw: 100px; // 左固定宽度
$rw: 200px; // 右固定宽度

.container{
  height: $h; // （1）设定高度
  padding-left: $lw; // （5）通过设置内边距压缩center宽度，为left腾出空间
  padding-right: $rw; // （5）通过设置内边距压缩center宽度，为right腾出空间
}
.left{
  height: $h; // （1）设定高度
  width: $lw; // （1）设定左固定宽度
  float: left; // （2）左中右全部向左浮动
  margin-left: -100%; // （3）center宽度100%，使left的左边缘与center的左边缘重合
  position: relative; // （4）相对定位left属性才会生效
  left: (-$lw); // （4）left设负值向左移动，使left的右边缘与center左边缘重合
}
.right{
  height: $h; // （1）设定高度
  width: $rw; // （1）设定右固定宽度
  float: left; // （2）左中右全部向左浮动
  margin-left: (-$rw); // （3）向左移动right的宽度，使right的右边缘与center的右边缘重合
  position: relative; // （4）相对定位right属性才会生效
  right: (-$rw); // （4）right设负值向右移动，使right的左边缘与center的右边缘重合
}
.center{
  height: $h; // （1）设定高度
  width: 100%; // （1）center自适应宽度
  float: left; // （2）左中右全部向左浮动
}
// 如果使用双飞翼布局，需要为center添加一个子元素，且不执行（4）（5）这两步
.center .inner{
  margin-left: $lw;
  margin-right: $rw;
}
```

## 11. CSS 画三角形

利用了当宽高为 0 时，四个边框就变成了四个三角形

```css
.triangle {
  /* 宽高设为 0 */
  /* 设边界的宽度并设为透明 */
  /* 设置想要的三角形的颜色 */
  width: 0;
  height: 0;
  border: 60px solid transparent;
  border-bottom-color: lightblue;
}
```

## 12. margin 重叠问题

1. 指的是垂直方向上两个相邻元素的 margin 发生重叠，分为四种情况
2. 第一种情况：相邻兄弟元素的 margin 重叠，可以只设置一个想要的外边距，也可以将其中一个元素放入 BFC，多加一层 div 并设新的 div 为 `overflow:auto`，但这样会改变结构
3. 第二种情况：父元素和子元素的 margin-top 重叠，可以让父元素形成BFC，也可以为父元素设置 padding-top、border-top 来将它们分隔开
4. 第三种情况：高度为 auto 的父元素与子元素的 margin-bottom 重叠，可以激活父元素的BFC，也可以为父元素设置 padding-bottom、border-bottom 来将它们分隔开
5. 第四种情况：没有内容的元素，自身的 margin-top 和 margin-bottom 重叠，可以给它设置 border、padding-top、padding-bottom 或者 height 来解决

## 13. SASS / SCSS 用法

```scss
// 声明变量
$width: 100px;

// 嵌套选择器
.parent {
   // 用 & 引用父类
   // 相当于 .parent:hover
   &:hover {

   }
}

// 支持双斜杠注释

// mixin 声明一段可重用的样式
@mixin center {}
// include 引入可重用的样式
.div {
   @include center
}
```
