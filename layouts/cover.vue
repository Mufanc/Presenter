<template>
    <div class="slidev-layout cover">
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
import { useCurrentElement } from '@vueuse/core'
import { watch } from 'vue'

const current = useCurrentElement()

watch(current, (el) => {
    if (!el) return

    const h1 = el.querySelector('h1')!

    if (h1) {
        h1.innerHTML = h1.innerHTML.replace(/(.)/g, '<span class="has-frame">$1</span>')
    }
})
</script>

<style scoped lang="less">
:deep(.cover) {
    position: absolute;
    left: 3em;
    bottom: 8em;
}

:deep(h1) {
    display: flex;
    font-family: YeGenYouGuKeTi, system-ui;
}

:deep(.name) {
    font-family: FzKai, system-ui;
}

:deep(.has-frame) {
    position: relative;

    color: var(--color-primary);
    @border-color: color-mix(in srgb, var(--color-primary) 60%, transparent);

    display: flex;
    align-items: center;
    justify-content: center;

    font-size: 1em;
    padding-top: 0.1em;

    width: 1.1em;
    height: 1.1em;

    border: 1px solid @border-color;

    &:not(:first-child) {
        margin-left: 0.1em;
    }

    &::before {
        content: '';

        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        transform: translate(0, 50%);

        border-top: 1px dashed @border-color;
    }

    &::after {
        content: '';

        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        transform: translate(50%, 0);

        border-left: 1px dashed @border-color;
    }
}

.slidev-layout.cover {
    background-image: url('/assets/images/cover01.png');
    background-size: cover;
}
</style>
