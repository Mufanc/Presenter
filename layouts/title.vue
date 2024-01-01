<template>
    <div class="slidev-layout title relative">
        <div class="flex items-center justify-center mt-2em">
            <span class="index">{{ `${computedIndex}`.padStart(2, '0') }}</span>
            <div class="flex flex-col ml-2em">
                <h1 class="name">{{ props.name }}</h1>
                <span class="description"><slot></slot></span>
            </div>
        </div>
        <img class="type-1" src="/assets/images/title01.png" alt="" v-if="computedType === 1" />
        <img class="type-2" src="/assets/images/title02.png" alt="" v-if="computedType === 2" />
        <img class="type-3" src="/assets/images/title03.png" alt="" v-if="computedType === 3" />
        <img class="type-4" src="/assets/images/title04.png" alt="" v-if="computedType === 4" />
    </div>
</template>

<script setup lang="ts">
import { useCurrentElement } from '@vueuse/core'
import { computed, nextTick } from 'vue'

interface Props {
    name: string
    index?: number | null
    type?: number | null
}

const props = withDefaults(defineProps<Props>(), {
    index: null,
    type: null,
})

const self = useCurrentElement()

let cache: number | null = null
const defaultIndex = computed(() => {
    if (cache !== null) return cache

    const el = self.value
    if (!el) return null

    const cl = Array.from(el.classList).find((cl) => cl.match(/slidev-page-\d+/))
    if (!cl) return null

    const selector = `.slides-overview > div *:has(.slidev-layout.title):has(~ * .slidev-layout.${cl})`
    cache = document.querySelectorAll(selector).length + 1

    nextTick(() => {
        cache = null
    })

    return cache
})

const computedIndex = computed(() => {
    if (props.index === null) {
        return defaultIndex.value
    } else {
        return props.index
    }
})

const computedType = computed(() => {
    if (props.type === null) {
        return ((computedIndex.value - 1) % 4) + 1
    } else {
        return props.type
    }
})
</script>

<style scoped lang="less">
.index {
    @clip-from: 54%;
    @clip-to: 68%;

    color: var(--color-primary);
    font-size: 8em;
    font-family: MsYaHei, system-ui;
    clip-path: polygon(0% 0%, 100% 0%, 100% @clip-from, 0% @clip-from, 0% @clip-to, 100% @clip-to, 100% 100%, 0% 100%)
        content-box;
}

.name {
    position: relative;
    min-width: 6em;

    color: var(--color-secondary);
    font-size: 3em;
    font-family: HyShuHun, system-ui;

    margin: 0;
    padding-top: 0.5em;
    padding-bottom: 0.4em;

    &::after {
        content: '';

        position: absolute;
        inset: 0;

        border-bottom: 1px solid color-mix(in srgb, var(--color-primary) 60%, transparent);
    }
}

.description {
    margin-top: 0.4em;
    color: var(--color-secondary);
    font-family: FzKai, system-ui;

    :deep(p) {
        margin: 0;
    }
}

.type-1 {
    position: absolute;
    left: 50%;
    bottom: 0;
    width: 56%;
    transform: translate(-50%, 28%);
}

.type-2 {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 60%;
    transform: translate(-5%, 8%);
}

.type-3 {
    position: absolute;
    right: 0;
    bottom: 0;
    width: 50%;
    transform: translate(-5%, 0%);
}

.type-4 {
    position: absolute;
    left: 50%;
    bottom: 0;
    width: 65%;
    transform: translate(-50%, 18%);
}
</style>
