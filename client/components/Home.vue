
<template>
    <div class="container">
        <search />
        <div  v-for="city in cities">
            <weather :city="city" :multipleCities="false" />
        </div>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        cities: ["Istanbul", "Berlin", "London", "Helsinki", "Dublin", "Vancouver"]
      };
    }
  }
</script>