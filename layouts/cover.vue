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

    tr {
        border: none;
    }

    td:first-child::after {
        content: '：'
    }

    td:last-child {
        position: relative;
        min-width: 20em;

        &::after {
            content: '';
            position: absolute;

            left: 0;
            bottom: 0.4em;

            width: 100%;
            height: 1px;

            border-bottom: 1px solid rgba(0, 0, 0, 0.2);
        }
    }
}

:deep(.date) {
    position: absolute;
    bottom: 5%;
}
</style>
