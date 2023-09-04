<template>
    <div v-show="!!current">
        <ul>
            <li>比如这个组件</li>
        </ul>
        <div class="x-clicks">
            <span v-for="i in count">{{ i }}</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, inject, Ref } from 'vue'

const current = inject('X-CLICKS') as Ref<number>
const count = inject('X-CLICKS-COUNT')

const translate = computed(() => `translateX(${(current.value - 1) * 50}px)`)
</script>

<style scoped lang="less">
.x-clicks {
    position: relative;
    margin-top: 10px;

    span {
        display: inline-flex;
        width: 40px;
        height: 40px;
        justify-content: center;
        align-items: center;
        border: 1px dashed;
        margin-right: 10px;
    }

    &::before {
        content: '';
        position: absolute;
        width: 40px;
        height: 40px;
        transition: all 0.2s ease-out;
        background: rgba(0, 0, 0, 0.2);
        transform: v-bind(translate);
    }
}
</style>
