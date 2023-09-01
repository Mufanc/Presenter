<template>
    <span class="cur-page" v-show='showPage'>{{ page }}</span>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

// @ts-ignore
const count = $slidev.nav.total

// @ts-ignore
const page = computed(() => $slidev.nav.currentPage)
const showPage = computed(() => {
    return page.value !== 1 && page.value !== count + 1
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
