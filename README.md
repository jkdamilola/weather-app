# Weather App

Weather app using Vue.js, PHP and MetaWeather API.

![alt tag](https://raw.githubusercontent.com/jkdamilola/weather-app/master/Screen%20Shot%202018-07-19%20at%209.12.37%20AM.png)

## Getting Started

``` bash
# clone repo and API submodule
git clone https://github.com/jkdamilola/weather-app.git --recursive
```

## API Backend

The API backend for this project is a REST API using PHP. It's included in this project as a `weather.php` and located in the `root` directory. This backend API fetches weather data from MetaWeather and returns it to the Weather app. 

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:4000
npm run dev

# build for production with minification
npm run build
```

For detailed explanation on how things work, checkout the [Vue.js Webpack guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## Built With
* [Vue.js](https://vuejs.org/)
* [MetaWeather API](https://www.metaweather.com/api/)
