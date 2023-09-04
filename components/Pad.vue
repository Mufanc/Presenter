<template>
    <div class="pad"></div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
    h?: string
}

const props = withDefaults(defineProps<Props>(), {
    h: '10px',
})

const height = computed(() => props.h)
</script>

<style scoped>
.pad {
    height: v-bind(height);
}
</style>
