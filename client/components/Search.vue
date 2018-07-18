<template>
    <div>
        <div class="weather-search col-md-12" style="margin-bottom: 20px;">
            <div class="row">
                <form class="form-inline col-md-10 pull-right" @submit.prevent="search">
                    <span class="form-group col-md-6">
                        <input v-model="keyword" type="search" class="form-control w-75" id="location" placeholder="Filter by city">
                    </span>
                    <button type="submit" class="btn btn-primary w-25">Search</button>
                </form>
            </div>
        </div>
        <weather v-if="query" :city="query" :multipleCities="true" />
    </div>
</template>

<script>
  export default {
    data() {
      return {
        query: this.$route.params.keyword,
        keyword: this.$route.params.keyword
      }
    },
    methods: {
      search() {
        const self = this;
        if (self.keyword.length > 0) {
            this.$router.push(`/search/${self.keyword}`);
        }
      }
    }
  }
</script>