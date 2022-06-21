<template>
    <div id="login">
        <p id="title">Pro Lab Login</p>
        <b-form-group>
            <div id="formInput">
                <b-input-group id="email">
                    <b-icon class="prepend" icon="person"></b-icon>
                    <b-form-input blur v-model="email" size="lg" placeholder="Email"></b-form-input>
                </b-input-group>
                <b-input-group id="password">
                    <b-icon class="prepend" icon="key"></b-icon>
                    <b-form-input v-model="password" size="lg" :type="passwordFieldType" placeholder="Password"></b-form-input>
                    <b-icon id="eye" v-if="passwordFieldType==='password'" icon="eye" font-scale="1.5" @click="switchVisibility"></b-icon>
                    <b-icon id="eye" v-if="passwordFieldType==='text'" icon="eye-slash" font-scale="1.5" @click="switchVisibility"></b-icon>
                </b-input-group>
                <b-input-group id="loginAs">
                    <b-form-select id="role" type="text" v-model="loginAs" size="lg" :options="loginOption"></b-form-select>
                </b-input-group>
            </div>
            <b-button id="button" size="lg" @click="login">Login</b-button>

        </b-form-group>
        <b-alert id="alert"
            :show="dismissCountDown"
            dismissible
            variant="danger"
            @dismissed="dismissCountDown=0"
            @dismiss-count-down="countDownChanged"
            >
            <p>{{loginGagal}}</p>
        </b-alert>
    </div>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'

export default {
    name: 'Login',
    data() {
        return{
            email: '',
            password: '',
            passwordFieldType: 'password',

            dismissSecs: 2,
            dismissCountDown: 0,
            showDismissibleAlert: false,

            loginGagal: 'Email atau Password Salah !',

            loginAs: null,
            loginOption: [
                {value: null, text: 'Login As', disabled: true },
                {value: 'Registrasi', text: 'Registrasi'},
                {value: 'Manajer', text: 'Manajer'},
                {value: 'Laboran', text: 'Laboran'},
            ],
        }
    },
    methods: {
        switchVisibility() {
            this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password'
        },
        countDownChanged(dismissCountDown) {
            this.dismissCountDown = dismissCountDown
        },
        showAlert() {
            this.dismissCountDown = this.dismissSecs
        },
        login() {
            firebase.auth().signInWithEmailAndPassword(this.email, this.password)
            .then(() => {
                if(this.loginAs !== null){
                    localStorage.setItem('loginAs', this.loginAs)
                    this.$router.push('/Home')
                }else {
                    this.loginGagal = 'Role belum dipilih !'
                    this.showAlert()
                }        
            })
            // eslint-disable-next-line no-unused-vars
            .catch(error => {
                this.showAlert()
            })
        }
    }
}
</script>

<style scoped>
    #login{
        margin: auto;
        height: 100%;
        width: 100%;
        margin-top: 10%;
    }
    #formInput{
        margin: auto;
        padding: 2%;
    }
    #button{ 
        color: black;
        border: none;
        background-color: white;
    }
    #email{
        margin: auto;
        width: 22rem;
    }
    #password{ 
        margin: auto;
        width: 22rem;
        margin-top: 0.5%;
    }
    #loginAs{
        margin: auto;
        width: 22rem;
        margin-top: 0.5%;
    }
    #role{
        margin-left: 2.35rem;
    }
    #eye{ 
        margin: auto;
        margin-left: 0.5rem;
    }
    #title{ 
        font-size: 5rem;
        margin: 0%;
    }
    #alert{ 
        margin: auto;
        margin-top: 15rem;
        align-content: center;
        width: fit-content;
        height: fit-content;
        position: relative;
    }
    .prepend{ 
        margin: auto;
        margin-right: 2%;
        font-size: 2rem;
    }
</style>