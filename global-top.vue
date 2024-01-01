<template>
    <div class="pointer-events-none">
        <span class="cur-page" v-show="showPage"
            >{{ page }}<sub class="page-count">/{{ pageCount }}</sub></span
        >
    </div>
</template>

<script setup lang="ts">
import { SlidevContextNav } from '@slidev/client/modules/context'
import { computed, UnwrapNestedRefs } from 'vue'

// @ts-ignore
const nav: UnwrapNestedRefs<SlidevContextNav> = $slidev.nav

const page = computed(() => nav.currentPage)
const pageCount = computed(() => nav.total)

const showPage = computed(() => {
    return page.value !== 1 && page.value !== pageCount.value + 1
})
</script>

<style scoped lang="less">
.cur-page {
    position: absolute;
    bottom: 1rem;
    right: 2rem;
    color: var(--color-primary);
    font-weight: bold;
}

.page-count {
    color: var(--color-secondary);
    opacity: 0.5;
}
</style>
