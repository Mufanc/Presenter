---
theme: default
css: unocss
fonts:
  sans: 'Noto Sans SC, Noto Color Emoji'
  mono: 'Fira Code, monospace'
routerMode: hash
---

<div style="transform: translateY(-30%)">

# Presenter

## 报告模板

</div>

<div class="absolute right-3em bottom-2em"><b>Mufanc</b></div>

---

### 代码框

<pad/>

<v-click>

* 代码段

```c
float Q_rsqrt( float number ) 
{
    long i;
    float x2, y;
    const float threeHalfs = 1.5f;

    x2 = number * 0.5f;
    y  = number;
    i  = * ( long * ) &y;                       // evil floating point bit level hacking
    i  = 0x5f3759df - ( i >> 1 );               // What the fuck? 
    y  = * ( float * ) &i;
    y  = y * ( threeHalfs - ( x2 * y * y ) );   // 1st iteration
//  y  = y * ( threeHalfs - ( x2 * y * y ) );   // 2nd iteration, this can be removed

    return y;
}
```

</v-click>

<v-click>

* 行内代码

SQL 查询： ``SELECT `username` FROM users;``

</v-click>

---

### `<x-clicks>` 组件

<br/>

* 允许在组件内感知页面 `clicks` 变化

```html
<x-clicks :k='5'>
    <some-component />
</x-clicks>
```

<pad/>

<x-clicks :k="5">
    <x-clicks-example type="x-clicks"/>
</x-clicks>

<pad/>

<v-clicks>

* 后面也还可以再接其它 `v-click`

* 就像这样

</v-clicks>