---
theme: default
css: unocss
fonts:
  sans: "'Noto Sans SC', 'Open Sans', 'Noto Color Emoji'"
  mono: "'Fira Code', monospace"
routerMode: hash
canvasWidth: 1920
---

<div style="transform: translateY(-30%)">

# Presenter

## 报告模板

</div>

<div class="absolute right-3em bottom-2em"><b>Mufanc</b></div>

<!--
* 封面页
-->

---

### 代码框

<pad/>

<v-click>

* 代码段

```c {all|3-5|7-8|9-10|11-13|15|all}
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

<!--

#### 这里有一些笔记

* 支持部分 Markdown 格式

* 比如：**加粗** ~斜体~ ~~删除~~

-->

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

---

<style scoped>
    .at-click {
        display: inline;
    }
</style>

### `<at-click>` 组件

<pad/>

* 感知页面 clicks 变化，并显示隐藏一些内容

```html
<at-click k="=3">仅当 clicks 为 3 时显示</at-click>
<at-click k="!3">仅当 clicks 不为 3 时显示</at-click>
<at-click k="3">当 clicks >= 3 时显示</at-click>
<at-click k=">=3" gone>同上，且隐藏时不占用布局空间</at-click>
<at-click k="<3">当 clicks < 3 时显示</at-click>
```

<pad/>

<x-clicks :k="5">
    <at-click-example />
</x-clicks>

* <span>➡️ <at-click k="=3">仅当 clicks 为 3 时显示</at-click> ⬅️</span> 

* <span>➡️ <at-click k="!3">仅当 clicks 不为 3 时显示</at-click> ⬅️</span>

* <span>➡️ <at-click k="3">当 clicks &gt;= 3 时显示</at-click> ⬅️</span>

* <span>➡️ <at-click k=">=3" gone>同上，且隐藏时不占用文档空间</at-click> ⬅️</span>

* <span>➡️ <at-click k="<3">当 clicks &lt; 3 时显示</at-click> ⬅️</span> 

---

### `<flexi-code>` 组件

<br/>

* 支持动态增删的代码框，可以用来实现一些动效
 
<flexi-code class="absolute top-2em right-2em w-45%" ranges="none|1-2|1,6|1,4,5|1,3,5">

```python
class Scheduler(object):
```

```python
    def __init__(self, timer_id: int):
        self._timer = Timer(timer_id)
        self._pending_tasks = PriorityQueue()
        self._running_tasks = []
        self._lock = ThreadSafeFlag()
        asyncio.create_task(self._loop())
```

```python
    async def _loop(self):
        while True:  
            await self._lock.wait()
            self._lock.clear()
            self._running_tasks.pop(0)()
```

```python
    def _refresh(self):
        current_time = ticks_ms()
        delay = self._pending_tasks.peek()[0] - current_time
        self._timer.init(
            mode=Timer.ONE_SHOT, 
            period=delay, 
            callback=self._callback
        )
```

```python
    def _callback(self, *_):
        _, callback, in_irq = self._pending_tasks.pop()

        if in_irq:
            callback()
        else:
            self._running_tasks.append(callback)
            self._lock.set()

        if len(self._pending_tasks) != 0:
            self._refresh()
```

```python
    def call_later(self, callback, delay_ms, in_irq=False):
        current_time = ticks_ms()
        
        self._pending_tasks.add((
            ticks_add(current_time, delay_ms), 
            callback, 
            in_irq
        ))
        
        self._refresh()
```

</flexi-code>
