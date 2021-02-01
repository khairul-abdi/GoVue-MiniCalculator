<template>
  <div class="home">
    <v-card
      class="d-flex flex-wrap justify-center mt-16"
      tile
      flat
    >
      <v-card
        class="rounded-lg ma-2 pa-6"
        outlined
        tile
        elevation="2"
        width="300"
      >
        <validation-observer v-slot="{ invalid }" ref="observer">
          <v-card-title class="justify-center">Operate</v-card-title>
          <form @submit.prevent="postreq">
            <validation-provider
              v-slot="{ errors }"
              name="First Number"
              rules="numeric"
            >
              <v-text-field
                v-model="num1" 
                :error-messages="errors"
                label="First Number"
                required
                outlined
              />
            </validation-provider>
            <validation-provider
              v-slot="{ errors }"
              name="Second Number"
              rules="numeric"
            >
              <v-text-field
                v-model="num2" 
                :error-messages="errors"
                label="Second Number"
                required
                outlined
              />
            </validation-provider>
            <v-btn type="submit" color="info" block>
              Calculate
            </v-btn>
          </form>
        </validation-observer>
      </v-card>
      <v-card
        class="rounded-lg ma-2 pa-3"
        elevation="2"
        outlined
        tile
        width="300"
      >
        <v-card-title class="justify-center">Result</v-card-title>
          <v-list>
            <v-list-item>
              <v-list-item-title>Addition </v-list-item-title>
              <v-list-item-action>
                {{ add }}
              </v-list-item-action>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>Multiplication</v-list-item-title>
              <v-list-item-action>
                {{ mul }}
              </v-list-item-action>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>Subtraction</v-list-item-title>
              <v-list-item-action>
                {{ sub }}
              </v-list-item-action>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>Division </v-list-item-title>
              <v-list-item-action>
                {{ div }}
              </v-list-item-action>
            </v-list-item>
          </v-list>
      </v-card>
    </v-card>
  </div>
</template>

<script>
import axios from 'axios';
import { numeric } from 'vee-validate/dist/rules'
import { extend, ValidationObserver, ValidationProvider } from 'vee-validate'

extend('numeric', {
  ...numeric,
  message: '{_field_} does not number',
})

export default {
  name: 'Calculator',
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data: () => ({
    add: "", 
    mul: "", 
    sub: "", 
    div: "", 
    num1: null, 
    num2: null
  }),
  methods: {
    postreq: function() {
      var data = {"num1": parseFloat(this.num1), "num2": parseFloat(this.num2)}

      console.log(data) 

      axios({ method: "POST", url: "http://127.0.0.1:8090/calc", data: data, headers: {"content-type": "text/plain" } }).then(result => { 
        // this.response = result.data;
        this.add = result.data['add']
        this.mul = result.data['mul']
        this.sub = result.data['sub']
        this.div = result.data['div']
        
        console.log(result.data) 
      }).catch( error => {
        console.error(error);
      });
    }
  }
}
</script>
