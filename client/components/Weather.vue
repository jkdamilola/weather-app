<template>
    <div class="container">
        <div class="row" v-if="city_details[0] && consolidated">
            <div class="col-xs-12">
                <div><h1 class="text-center">{{city_details[0].title}}, {{city_details[0].parent.title}}</h1></div>
            </div>
        </div>
        <div class="row" v-if="city_details[0]" style="cursor: pointer;">
            <div class="col-xs-12" v-for="details in city_details" @click="gotoCity(details.woeid)">
                <div>
                  <div class="weather panel panel-primary">
                      <div class="panel-heading" v-if="!consolidated"><h3>{{details.title}}, {{details.parent.title}}</h3></div>
                      <div class="panel-heading text-center" v-if="consolidated"><strong>Today</strong></div>
                      <div class="panel-body">
                          <div>
                              <p class="lead">
                                  <img :src="`https://www.metaweather.com/static/img/weather/png/${details.consolidated_weather[0].weather_state_abbr}.png`" style="width: 50px; height: 50px;"/>
                                  {{Math.round(details.consolidated_weather[0].the_temp)}}&#176;C {{details.consolidated_weather[0].weather_state_name}}
                              </p>
                              <p>
                                  {{details.consolidated_weather[0].weather_state_name}}&nbsp;&#126;&nbsp;
                                  High: {{Math.round(details.consolidated_weather[0].max_temp)}}&#176;C&nbsp;&#126;&nbsp;
                                  Low: {{Math.round(details.consolidated_weather[0].min_temp)}}&#176;C
                              </p>
                          </div>
                      </div>
                      <div class="panel-footer">
                          <small>
                              Speed: {{Math.round(details.consolidated_weather[0].wind_speed)}}mph&nbsp;&#126;&nbsp;
                              Visibility: {{details.consolidated_weather[0].wind_direction.toFixed(1)}} miles&nbsp;&#126;&nbsp;
                              Pressure: {{Math.round(details.consolidated_weather[0].air_pressure)}}mb&nbsp;&#126;&nbsp;
                              Humidity: {{Math.round(details.consolidated_weather[0].humidity)}}%
                          </small>
                      </div>
                  </div>
                </div>
            </div>
        </div>

        <div class="row" v-if="consolidated">
            <div class="col-xs-4" v-for="day in consolidatedWeather">
                <div>
                  <div class="weather panel panel-primary">
                      <div class="panel-heading">{{getDate(day.applicable_date)}}</div>
                      <div class="panel-body">
                          <div>
                              <p class="lead">
                                  <img :src="`https://www.metaweather.com/static/img/weather/png/${day.weather_state_abbr}.png`" style="width: 50px; height: 50px;"/>
                                  {{Math.round(day.the_temp)}}&#176;C {{day.weather_state_name}}
                              </p>
                              <p>
                                  {{day.weather_state_name}}&nbsp;&#126;&nbsp;
                                  High: {{Math.round(day.max_temp)}}&#176;C&nbsp;&#126;&nbsp;
                                  Low: {{Math.round(day.min_temp)}}&#176;C
                              </p>
                          </div>
                      </div>
                      <div class="panel-footer">
                          <small>
                              Speed: {{Math.round(day.wind_speed)}}mph&nbsp;&#126;&nbsp;
                              Visibility: {{day.wind_direction.toFixed(1)}} miles&nbsp;&#126;&nbsp;
                              Pressure: {{Math.round(day.air_pressure)}}mb&nbsp;&#126;&nbsp;
                              Humidity: {{Math.round(day.humidity)}}%
                          </small>
                      </div>
                  </div>
                </div>
            </div>
        </div>

        <!--Not Found Exception-->
        <h2 v-if="noResult" class="text-center mt-3">No results were found. Try changing the keyword!</h2>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    props: ['city', 'woeid', 'multipleCities', 'consolidated'],
    data() {
        return {
            city_details: false,
            loading: true,
            consolidatedWeather: false,
            noResult: false,
        };
    },
    created() {
        if (this.city) {
            this.getWoeid(this.city);
        } else if (this.woeid) {
            this.city_details = [];
            this.getCityDetails(this.woeid);
        }
    },
    methods: {
        getCityDetails(woeid) {
            const self = this;
            axios.get(`/weather.php?command=location&woeid=${woeid}`)
                .then((response) => {
                    const arr = response.data.consolidated_weather;
                    self.consolidatedWeather = arr.splice(1, arr.length);
                    self.city_details.push(response.data);
                });
        },
        getWoeid(city) {
            const self = this;
            axios.get(`/weather.php?command=search&keyword=${city}`)
                .then((response) => {
                    if (response.data.length > 0) {
                        self.city_details = [];
                        if (self.multipleCities) {
                            for (let i = 0; i < response.data.length; i++) {
                                self.getCityDetails(response.data[i]['woeid']);
                            }
                        } else {
                            self.getCityDetails(response.data[0]['woeid']);
                        }
                    } else {
                        self.noResult = true;
                    }
                });
        },
        gotoCity(woeid) {
            this.$router.push(`/weather/${woeid}`)
        },
        getDate(date) {
            const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
            const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            let d = new Date(date);
            let year = date.slice(0, 4);
            let currentDate = date.slice(8, 10);
            return `${days[d.getDay()]}, ${currentDate} ${months[d.getMonth()]}, ${year}`;
        }
    },
}
</script>