<template>
    <div>
        <span class="cur-page" v-show="showPage"
            >{{ page }}<sub class="page-count">/{{ pageCount }}</sub></span
        >
    </div>
</template>

<script setup lang="ts">
import { computed, UnwrapNestedRefs } from 'vue'
import { SlidevContextNav, SlidevContextNavClicks } from '@slidev/client/modules/context'

// @ts-ignore
const nav: UnwrapNestedRefs<SlidevContextNav & SlidevContextNavClicks> = $slidev.nav

const page = computed(() => nav.currentPage)
const pageCount = computed(() => nav.total)

const showPage = computed(() => {
    return page.value !== 1 && page.value !== pageCount.value + 1
})

const progress = computed(() => {
    return `${(((nav.clicks + 1) / (nav.clicksTotal + 1)) * 100).toFixed(2)}%`
})
</script>

<style scoped lang="less">
.cur-page {
    color: #aaa;
    position: absolute;
    bottom: 1rem;
    right: 2rem;
    font-weight: bold;
    filter: brightness(0) invert(1);
    mix-blend-mode: difference;

    &::after {
        @size: 0.7em;
        content: '';
        display: inline-block;
        width: @size;
        height: @size;
        margin-left: 0.5em;
        border-radius: @size;
        border: 1px solid;
        background: conic-gradient(black v-bind(progress), transparent v-bind(progress));
        transition: all 0.2s ease-in-out;
    }
}

.page-count {
    opacity: 0.2;
}
</style>
