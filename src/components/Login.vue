<template>
    <div id="login">
        <p id="title">Pro Lab Login</p>
        <b-form-group>
            <div id="formInput">
                <b-input-group id="email">
                    <b-icon class="prepend" icon="person"></b-icon>
                    <b-form-input v-model="email" size="lg" placeholder="Email"></b-form-input>
                </b-input-group>
                <b-input-group id="password">
                    <b-icon class="prepend" icon="key"></b-icon>
                    <b-form-input v-model="password" size="lg" :type="passwordFieldType" placeholder="Password"></b-form-input>
                    <b-icon id="eye" v-if="passwordFieldType==='password'" icon="eye" font-scale="1.5" @click="switchVisibility"></b-icon>
                    <b-icon id="eye" v-if="passwordFieldType==='text'" icon="eye-slash" font-scale="1.5" @click="switchVisibility"></b-icon>
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
            <p>Email dan Password Salah</p>
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
            showDismissibleAlert: false
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
                this.$router.push('/Home')
            })
            // eslint-disable-next-line no-unused-vars
            .catch(error => {
                this.showAlert()
            })
        }
    }
}
</script>

<style>
    #login{
        margin: auto;
        height: 100%;
        width: 100%;
        margin-top: 10%;
    }
    #formInput{
        margin: auto;
        background-color: blanchedalmond;
        padding: 2%;
    }
    #button{ 
        margin-top: 1rem;
        color: black;
        background-color: white;
    }
    #email{
        margin: auto;
        width: 22rem;
        border-style: none;
    }
    #password{ 
        margin: auto;
        width: 22rem;
        margin-top: 0.5%;
    }
    #eye{ 
        margin: auto;
        margin-left: 0.5rem;
    }
    #title{ 
        font-size: 5rem;
        font-family: 'Courier New', Courier, monospace;
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