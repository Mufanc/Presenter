<template>
    <div>
        <div ref="el" class="display-none">
            <span v-for="_ in props.k" v-click></span>
        </div>
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
import { useMutationObserver } from '@vueuse/core'
import { provide, ref, watch } from 'vue'

const props = defineProps<{ k: number }>()

const emit = defineEmits<{ (ev: 'clicks-change', clicks: number): void }>()

const el = ref<HTMLElement>()
const clicks = ref(0)

provide('X-CLICKS', clicks)
provide('X-CLICKS-COUNT', props.k)

watch(clicks, (value) => emit('clicks-change', value))

useMutationObserver(
    el,
    () => {
        const count = el.value.children.length
        const hidden = el.value.querySelectorAll('.slidev-vclick-hidden').length
        clicks.value = count - hidden
    },
    { attributes: true, subtree: true },
)
</script>
