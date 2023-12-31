<template>
    <div class="slidev-layout catalog">
        <span class="title">目&nbsp;&nbsp;&nbsp;录</span>
        <slot></slot>
    </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="less">
@counter-style chinese-number {
    system: fixed;
    symbols: 壹 贰 叁 肆 伍 陆 柒 捌 玖 拾;
    suffix: '';
}

:deep(ul) {
    position: absolute;
    top: 2em;
    left: 4em;
    right: 5em;
    height: 40%;

    display: grid;
    grid-template-columns: 1fr 1fr;
    align-content: space-between;
    font-size: 1.8em;

    li {
        list-style: none;
        margin: 0;
        padding: 0;

        font-family: FzKai, system-ui;

        &::before {
            @border-width: 2px;
            display: inline-block;

            content: counter(list-item, chinese-number);
            font-family: HyZhongKai, system-ui;
            text-align: center;

            width: 2em;
            height: 2em;
            margin-right: 0.8em;

            border-left: @border-width solid var(--color-primary);
            border-right: @border-width solid var(--color-primary);
            border-top: @border-width solid transparent;
            border-bottom: @border-width solid transparent;
            border-radius: 0.5em;
        }
    }
}

.title {
    position: absolute;
    right: 1.5em;
    top: 2em;

    color: var(--color-primary);
    writing-mode: tb;
    font-size: 2.75em;
    font-family: HyYanKaiT, system-ui;

    &::before {
        content: '';
        position: absolute;
        top: -0.6em;
        width: 100%;
        height: 1px;

        border-top: 1px solid var(--color-primary);
        box-shadow: 0 3px 3px var(--color-primary);
    }

    &::after {
        content: '';
        position: absolute;
        bottom: -0.6em;
        width: 100%;
        height: 1px;

        border-bottom: 1px solid var(--color-primary);
        box-shadow: 0 -3px 3px var(--color-primary);
    }
}

.slidev-layout.catalog {
    background-image: url('/assets/images/bg-catalog.jpg');
    background-size: cover;
}
</style>
