<template>
    <div class="slidev-layout cover">
        <slot></slot>
    </div>
</template>

<style scoped lang="less">
.slidev-layout.cover {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.hstyle {
    height: 1em;
}

:deep(h2) {
    .hstyle();
    margin-top: 40%;
    font-size: 3rem !important;
}

:deep(h1) {
    .hstyle();
    margin-top: 1em;
}

:deep(table) {
    position: absolute;
    bottom: 20%;
    width: fit-content !important;
    min-width: 50%;

    td:first-child::after {
        content: '：'
    }
}

:deep(.date) {
    position: absolute;
    bottom: 5%;
}
</style>
