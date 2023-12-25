<template>
    <div>
        当前 clicks 值: <span>{{ current }}⃣</span>
    </div>
</template>

<script setup lang="ts">
import { inject, Ref } from 'vue'

const current = inject('X-CLICKS') as Ref<number>
</script>

<style scoped lang="less">
span {
    font-family: 'Noto Color Emoji', system-ui;
}
</style>
