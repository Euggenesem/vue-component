<template>
  <div id="app">
    <DropDown 
      :items="countries"
      @changed="changed_county"
    />
    <DropDown 
      :items="states"
      @changed="changed_state"
    />
    <DropDown 
      :items="cities"
    />
  </div>
</template>

<script>
import DropDown from './components/DropDown.vue'
export default {
  name: 'App',
  components: {
    DropDown
  },
  data(){
    return {
      token: null,
      countries: [],
      states: [],
      cities: [],
    }
  },
  mounted(){
    this.$http.http.get('getaccesstoken', {
      headers: {
        "api-token": "kiTQ9qzpJf2HNgnBYVbtHNZpt3loDnVdgDQJ8c-hfR4TBbGt-gBqSrdrv0CSahDy3-4",
        "user-email": "yevgen.sokolov.9007@gmail.com"
      }
    }).then(response => {
      this.token = response.data.auth_token
      this.getItems('countries')
    });

  },
  methods: {

    /**
     * make a request to api by items
     */
    getItems: function(options, param = ""){
      this.$http.http.get(options + "/" + param, {
        headers: {
          "Authorization": `Bearer ${this.token}`,
        }
      })
      .then(response => {
        switch(options){
          case 'countries': 
            this.setCountryOptions(response.data);
            break;
          case 'states':
            this.setStateOptions(response.data);
            break;
          case 'cities':
            this.setCityOptions(response.data);
            break;
          default: 
            break;  
        }
      })
      .catch(error => console.log(error))
    },

    setCountryOptions(countries){
      this.countries = countries.map((item, index) => {
        return {id: index + 1, text: item.country_name, value: item.country_name}
      })
    },

    setStateOptions(states){
      this.states = states.map((item, index) => {
        return {id: index + 1, text: item.state_name, value: item.state_name}
      })
    },

    setCityOptions(cities){
      this.cities = cities.map((item, index) => {
        return {id: index + 1, text: item.city_name, value: item.city_name}
      })
    },

    changed_county(payload){
      this.states = [];
      this.cities = [];
      if(payload){
        this.getItems('states', payload)
      }
    },
    changed_state(payload){
      this.cities = [];
      if(payload){
        this.getItems('cities', payload)
      }
    },
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
