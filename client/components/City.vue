<template>
    <div>
        <div class="container mt-5">
            <weather :woeid="this.woeid" :consolidated="true" />
        </div>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        woeid : this.$route.params.woeid
      }
    }
  }
</script>