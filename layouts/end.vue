<template xmlns="http://www.w3.org/1999/html">
    <div class="slidev-layout end flex justify-center items-center">
        <div class="box flex flex-col w-60%">
            <span class="title">谢谢观赏</span>
            <span class="subtitle">THANKS FOR WATCHING</span>
        </div>
    </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="less">
.box {
    transform: translateY(-20%);
}

.title {
    display: inline-block;
    font-size: 3.5em;
    font-family: HyYanKaiT, system-ui;
    text-align-last: justify;
}

.subtitle {
    font-size: 2em;
    font-family: 'Kabel Xlight', system-ui;
    text-align-last: justify;
    letter-spacing: 0.15em;
}

.slidev-layout.end {
    background-image: url('/assets/images/bg-end.jpg');
    background-size: cover;
}
</style>
