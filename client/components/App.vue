<template>
    <div class="container">
        <header-bar />
        <router-view :key="$route.fullPath" />
    </div>
</template>
