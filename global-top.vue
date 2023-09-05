<template>
    <span class="cur-page" v-show="showPage">{{ page }}</span>
</template>

<script setup lang="ts">
import { computed, UnwrapNestedRefs } from 'vue'
import { SlidevContextNav } from '@slidev/client/modules/context'

// @ts-ignore
const nav: UnwrapNestedRefs<SlidevContextNav> = $slidev.nav

const page = computed(() => nav.currentPage)
const pageCount = computed(() => nav.total)

const showPage = computed(() => {
    console.log(page.value)
    return page.value !== 1 && page.value !== pageCount.value + 1
})
</script>

<style scoped>
.cur-page {
    color: #aaa;
    position: absolute;
    bottom: 1rem;
    right: 2rem;
    font-weight: bold;
    filter: brightness(0) invert(1);
    mix-blend-mode: difference;
}
</style>
