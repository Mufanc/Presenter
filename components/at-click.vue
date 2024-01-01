<template>
    <div :style="style" class="at-click">
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
import { SlidevContextNavClicks } from '@slidev/client/modules/context'
import { computed, UnwrapNestedRefs } from 'vue'
import '@slidev/client/builtin/CodeBlockWrapper.vue'

const props = defineProps<{
    k: string
    gone?: boolean
}>()

// @ts-ignore
const nav: UnwrapNestedRefs<SlidevContextNavClicks> = $slidev.nav

const visible = {}
const hidden = props.gone ? { display: 'none' } : { visibility: 'hidden' }

const style = computed(() => {
    const k = props.k
    const groups = k.match(/^([<>]?=?|!)?(\d+)$/)

    if (!groups) {
        console.error(`invalid prop value: ${k}`)
        return
    }

    const [, op, v] = groups
    const value = parseInt(v)

    switch (op) {
        case '=':
            return nav.clicks === value ? visible : hidden
        case '!':
            return nav.clicks !== value ? visible : hidden
        case '<':
            return nav.clicks < value ? visible : hidden
        case '<=':
            return nav.clicks <= value ? visible : hidden
        case '>':
            return nav.clicks > value ? visible : hidden
        case '>=':
        default:
            return nav.clicks >= value ? visible : hidden
    }
})
</script>

<style scoped lang="less"></style>
