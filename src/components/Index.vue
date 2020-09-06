<template>
    <div id = "index">
        <h1 id = "main-heading">Currency Converter Node API with Vue.JS</h1>
        <div id = "input-container">
            <span class = "input-text">Convert</span>
            <select id = "from-currency" v-model = "fromCurrency">
                <option value = "">Select currency</option>
                <option value = "USD">US Dollar (USD)</option>
                <option value = "MYR">Ringgit Malaysia (MYR)</option>
                <option value = "EUR">Euro (EUR)</option>
                <option value = "BDT">Bangladeshi Taka (BDT)</option>
            </select>
            <input type = "number" id = "amount" placeholder="Amount" v-model = "amount">
            <span class = "input-text">To</span>
            <select id = "to-currency" v-model = "toCurrency">
                <option value = "">Select currency</option>
                <option value = "BDT">Bangladeshi Taka (BDT)</option>
                <option value = "EUR">Euro (EUR)</option>
                <option value = "MYR">Ringgit Malaysia (MYR)</option>
                <option value = "USD">US Dollar (USD)</option>
            </select>
          
            <button type = "button" id = "convert-btn" @click = "clickConvert()">Convert</button>
            <!-- <button type = "button" id = "clear-btn" @click = "clear()">Clear</button> -->
        </div>
        <div id = "result-container" v-if = "convertClicked">
            <h2 id = "result" v-if = "!loading">
                <span id = "from-span">{{amount}} {{fromCurrency}}</span> = <span id = "to-span">{{result}} {{toCurrency}}</span>
            </h2>
            <h2 v-else>Loading...</h2>
        </div>
        <History v-if = "getHistory"/>
    </div>
</template>

<script>
import History from './History'
import { mapGetters } from 'vuex'
export default {
    name: 'Index', 
    components: {
        History,
    },
    data() {
        return {
            fromCurrency: '',
            toCurrency: '',
            amount: 0,
            result: 0,
            convertClicked: false,
            loading: false,
        }
    },
    methods: {
        clickConvert() {
            if(!(this.fromCurrency == '' || this.toCurrency == '' || (this.amount <= 0) || this.fromCurrency == this.toCurrency)) {
                this.convertClicked = true
                
            }
            this.convert()
        },
        convert() {
            if(this.fromCurrency == '' || this.toCurrency == '' || (this.amount <= 0) || this.fromCurrency == this.toCurrency) {
                alert("Please check your inputs and try again")
            }
            else {
                this.loading = true
                let uri = 'http://localhost:3000/dev/convert?from=' + this.fromCurrency + '&to=' + this.toCurrency + '&amount=' + this.amount
                fetch(uri, {
                    "method": "GET"
                })
                .then(response => {
                    if(response.ok) {
                        response.json()
                        .then(response1 => {
                            this.result = response1.results.convertedAmount
                            this.loading = false
                            this.$store.commit('addToHistory',{fromCurrency: this.fromCurrency, toCurrency: this.toCurrency, amount: this.amount, result: this.result})
                        })
                    }
                })
                .catch(err => {
                    alert("There was a problem fetching the results. Please try again." + err)
                })
            } 
        },
        clear() {
            this.amount = 0
            this.fromCurrency = ''
            this.toCurrency = ''
            this.convertClicked = false
        }
    },
     watch: {
        amount: function() {
            this.convertClicked = false
        },
        fromCurrency: function() {
             this.convertClicked = false
        },
        toCurrency: function() {
             this.convertClicked = false
        }
    },  
    computed: {
        ...mapGetters([
            'getHistory'
        ])
    } 
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Sen&display=swap');
@import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');
* {
    margin: 0;
    padding: 0;
}
#index {
    width: 80%;
    margin: auto;
    text-align: center;
    padding: 50px;
}
#main-heading {
    padding: 15px;
    border-bottom: 2px solid #000;
    width: 80%;
    margin: auto;
    font-family: 'Sen', sans-serif;
}
#input-container {
    padding: 30px;
    text-align: center;
}
#from-currency, #to-currency {
    border: 1px solid #ccc;
    padding: 10px;
    width: 200px;
    margin: 5px;
}
#amount {
    border: 1px solid #ccc;
    padding: 11px;
}
#result-container {
    padding: 15px;
    margin-top: 20px;
    font-family: 'Roboto', sans-serif;
}
#from-span {
    color: #DA3732;
}
#to-span {
    color: #008000;
}
#convert-btn, #clear-btn {
    padding: 11px 15px;
    border: none;
    color: #f4f4f4;
    margin-top: 15px;
    border-radius: 5px;
}
#convert-btn {
    background-color: #008000;
    color: #fff
}
#clear-btn {
    color: #000;
}
.input-text  {
    font-family: 'Roboto', sans-serif;
}
@media screen and (max-width: 768px) {
    #index {
        width: 100%;
        padding: 10px;
        overflow-x: hidden !important;
    }
    #main-heading {
        width: 80%;
        font-size: 18px;
        margin: auto;
    }
    #input-container {
        padding: 5px;
    }
    #from-currency, #to-currency {
        display: block;
        text-align: center;
        width: 50%;
        margin: 10px auto;
    }
    .input-text {
        display: block;
        margin-top: 10px;
    }
    #amount {
        width: 45%; 
        margin: auto;
    }
}
</style>