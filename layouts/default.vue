<template>
    <div class="slidev-layout default">
        <slot></slot>
    </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="less">
.slidev-layout > :deep(:is(h1, h2, h3)) {
    color: var(--color-secondary);
}

.slidev-layout > :deep(h1:first-child) {
    @decoration-color: color-mix(in srgb, var(--color-primary) 50%, transparent);

    width: fit-content;
    margin-left: 0.8em;
    margin-bottom: 1em;
    padding-bottom: 0.15em;

    font-size: 1.8em;
    font-weight: 400;

    margin-top: -0.4em;

    background-image: linear-gradient(@decoration-color, @decoration-color);
    background-size: 100vw 1px;
    background-repeat: no-repeat;
    background-position: calc(100% + 0.4em) 100%;
    background-clip: padding-box;
    padding-right: 100vw;
    white-space: nowrap;

    &::before {
        content: '';
        position: absolute;
        left: 0;
        margin-top: 0.9em;
        width: 2.1em;
        height: 1px;
        border-bottom: 1px solid @decoration-color;
    }

    &::after {
        content: '';
        position: absolute;
        right: 0;
        margin-top: 1em;
        width: 25%;
        height: 0.4em;
        background-color: @decoration-color;
        clip-path: polygon(0% 100%, 0.3em 0%, 100% 0%, 100% 100%);
    }
}
</style>
