<template>
    <div class="pad"></div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
    h?: number
}

const props = withDefaults(defineProps<Props>(), {
    h: 10
})

const height = computed(() => `${props.h}px`)
</script>

<style scoped>
.pad {
    height: v-bind(height);
}
</style>
