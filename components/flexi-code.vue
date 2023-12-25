<template>
    <x-clicks :k="ranges.length - 1" @clicks-change="(c) => (clicks = c)">
        <div ref="mirror" class="display-none">
            <slot></slot>
        </div>
        <div ref="container" class="flexi-code">
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

:deep(.slidev-code-wrapper) {
    &:first-child {
        pre {
            border-radius: var(--slidev-code-radius) var(--slidev-code-radius) 0 0 !important;
        }
    }

    &:not(:first-child) {
        margin-top: 0 !important;

        pre {
            margin-top: 0;
            padding-top: calc(var(--slidev-code-padding) / 2) !important;
            border-top: none;
        }
    }

    &:last-child {
        pre {
            border-radius: 0 0 var(--slidev-code-radius) var(--slidev-code-radius) !important;
        }
    }

    &:not(:last-child) {
        margin-bottom: 0 !important;

        pre {
            margin-bottom: 0;
            padding-bottom: calc(var(--slidev-code-padding) / 2) !important;
            border-bottom: none;
        }
    }

    &:not(:first-child, :last-child) {
        pre {
            border-radius: 0 !important;
        }
    }

    &:only-child {
        pre {
            border-radius: var(--slidev-code-radius) !important;
        }
    }
}
</style>
