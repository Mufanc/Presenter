<template>
    <div>
        <div ref="observe" class="display-none">
            <span v-for="_ in props.k" v-click></span>
        </div>
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
import { ref, provide, onMounted, onUnmounted } from 'vue'

const props = defineProps<{ k: number }>()

const clicks = ref(0)
const observe = ref<HTMLElement>()

provide('X-CLICKS', clicks)
provide('X-CLICKS-COUNT', props.k)

const observer = new MutationObserver(() => {
    const count = observe.value.children.length
    const hidden = observe.value.querySelectorAll('.slidev-vclick-hidden').length
    clicks.value = count - hidden
})

onMounted(() => observer.observe(observe.value, { attributes: true, subtree: true }))
onUnmounted(() => observer.disconnect())
</script>
