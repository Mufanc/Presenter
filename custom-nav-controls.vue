<template>
    <teleport to="body">
        <div class="zoom-tool" :style="{ opacity: !!display ^ 0 }">
            {{ display === 'scale' ? displayScale : displayScroll }}
        </div>
    </teleport>
</template>

<script setup lang="ts">
import { useCurrentElement, useEventListener } from '@vueuse/core'
import { computed, ComputedRef, Ref, ref, watch, watchEffect } from 'vue'

const current = useCurrentElement()
const container: ComputedRef<HTMLElement> = computed(() => {
    let el = current.value

    while (el && el.id != 'slide-container') {
        el = el.parentElement
    }

    return <HTMLElement>el
})

const scale = ref(1.5)
const scroll = ref(0)

const display: Ref<'scale' | 'scroll' | false> = ref(false)

const displayScale = computed(() => `缩放：${(scale.value * 100).toFixed()}%`)
const displayScroll = computed(() => `滚动：${scroll.value.toFixed()}%`)

let timer = 0

function reset() {
    timer && window.clearTimeout(timer)
    timer = window.setTimeout(() => (display.value = false), 1000)
}

watch(displayScale, () => {
    display.value = 'scale'
    reset()
})

watch(displayScroll, () => {
    display.value = 'scroll'
    reset()
})

useEventListener(
    document,
    'wheel',
    (ev: WheelEvent) => {
        ev.preventDefault()
        if (ev.ctrlKey) {
            if (ev.deltaY > 0) {
                scale.value -= 0.1
            } else {
                scale.value += 0.1
            }

            scale.value = Math.max(1, Math.min(2, scale.value))
        } else {
            if (ev.deltaY > 0) {
                scroll.value += 10
            } else {
                scroll.value -= 10
            }

            scroll.value = Math.max(0, Math.min(100, scroll.value))
        }
    },
    { passive: false },
)

watchEffect(() => {
    const el = container.value
    const transform = `scale(${scale.value})`
    const transformOrigin = `50% ${scroll.value}%`

    if (el && !navigator.webdriver) {
        el.style.transform = transform
        el.style.transformOrigin = transformOrigin
        el.style.transition = 'all .2s ease-out'
    }
})
</script>

<style scoped lang="less">
:global(#slide-content + div) {
    display: none;
}

.zoom-tool {
    position: absolute;
    top: 2em;
    left: 50%;
    transform: translate(-50%, 0);

    width: 8em;
    display: flex;
    justify-content: center;

    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 0.5em;
    color: white;
    padding: 0.25em 1em;

    font-weight: bold;
    transition: all 0.2s ease-in-out;
}
</style>
