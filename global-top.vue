<template>
    <div class="pointer-events-none">
        <span class="cur-page" v-show="showPage"
            >{{ page }}<sub class="page-count">/{{ pageCount }}</sub></span
        >
    </div>
</template>

<script setup lang="ts">
import { SlidevContextNav, SlidevContextNavClicks } from '@slidev/client/modules/context'
import { computed, UnwrapNestedRefs } from 'vue'

// @ts-ignore
const nav: UnwrapNestedRefs<SlidevContextNav & SlidevContextNavClicks> = $slidev.nav

const page = computed(() => nav.currentPage)
const pageCount = computed(() => nav.total)

const showPage = computed(() => {
    return page.value !== 1 && page.value !== pageCount.value + 1
})

const progress = computed(() => {
    return `${((nav.clicks + 1) / (nav.clicksTotal + 1)) * 100}%`
})
</script>

<style scoped lang="less">
.cur-page {
    position: absolute;
    bottom: 1rem;
    right: 2rem;
    font-weight: bold;
    filter: brightness(0);
    mix-blend-mode: difference;

    &::after {
        @scale: 1.2;
        @size: calc(0.7em / @scale);
        content: '';
        display: inline-block;
        width: @size;
        height: @size;
        margin-left: 0.5em;
        border-radius: @size;
        border: 1px solid;
        background: conic-gradient(black v-bind(progress), transparent v-bind(progress));
        transition: all 0.2s ease-in-out;
        transform: scale(@scale);
    }
}

.page-count {
    opacity: 0.2;
}
</style>
