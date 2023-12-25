<template>
    <x-clicks :k="ranges.length - 1" @clicks-change="(c) => (clicks = c)">
        <div ref="mirror" class="display-none">
            <slot></slot>
        </div>
        <div ref="container" class="flexi-code" v-show="display.length">
            <transition-group name="list">
                <div
                    v-for="index in display"
                    :key="index"
                    :class="Array.from(children[index - 1].classList)"
                    v-html="children[index - 1].innerHTML"
                ></div>
            </transition-group>
        </div>
    </x-clicks>
</template>

<script setup lang="ts">
import { parseRangeString } from '@slidev/parser'
import { computed, onMounted, ref } from 'vue'
import XClicks from './x-clicks.vue'

const props = defineProps<{
    ranges: string
}>()

const container = ref<HTMLElement>()

const mirror = ref<HTMLElement>()
const children = ref<HTMLElement[]>([])

const ranges = props.ranges.split('|').map((r) => r.trim())

const clicks = ref(0)
const display = computed(() => {
    if (children.value.length) {
        const range = ranges[clicks.value]

        if (range !== 'none') {
            return parseRangeString(children.value.length, ranges[clicks.value])
        }
    }

    return []
})

onMounted(() => {
    const tmp = mirror.value?.children

    if (tmp) {
        children.value = <any>Array.from(tmp)
    }
})
</script>

<style scoped lang="less">
.list-move,
.list-enter-active,
.list-leave-active {
    transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
    opacity: 0;
    transform: translateX(2em);
}

.list-leave-active {
    position: absolute;
}

.flexi-code {
    margin: calc(var(--prism-block-margin-y) + var(--slidev-code-margin)) var(--prism-block-margin-x);
    padding: calc(var(--slidev-code-padding) / 2) calc(var(--slidev-code-padding) / 2) !important;
    transition: all 0.5s ease;
}

:deep(.slidev-code-wrapper) {
    margin: 0 !important;

    pre {
        margin: 0 !important;
        padding: calc(var(--slidev-code-padding) / 2) var(--slidev-code-padding) !important;
        border: none;

        &::before {
            display: none;
        }
    }
}
</style>
