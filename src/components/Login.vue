<template>
    <div id="login">
        <!-- <p id="title">Pro Lab Login</p>
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
            <b-button id="button" size="lg" variant="outline-primary" @click="login">Login</b-button>

        </b-form-group> -->

        <div class="login-box">
            <h2>ProLab Login</h2>
            <form>
                <div class="user-box">
                    <input type="text" v-model="email" name="" required="">
                    <label>Username</label>
                </div>
                <div class="user-box">
                    <input type="password" v-model="password" name="" required="">
                    <label>Password</label>
                </div>
                <div class="user-box">
                    <b-form-select type="text" v-model="loginAs" :options="loginOption"></b-form-select>
                </div>
                <a @click="login">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                Login
                </a>
            </form>
        </div>
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
    /* #login{
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
    #button:hover{
        color: white;
        background-color: blue;
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
    } */
    #alert{ 
    margin: auto;
    margin-top: 10rem;
    align-content: center;
    width: fit-content;
    height: fit-content;
    position: relative;
    }
    html {
    height: 100%;
    }
    body {
    margin:0;
    padding:0;
    font-family: sans-serif;
    background: linear-gradient(#141e30, #243b55);
    }

    .login-box {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 400px;
    padding: 40px;
    transform: translate(-50%, -50%);
    background: rgba(0,0,0,.5);
    box-sizing: border-box;
    box-shadow: 0 15px 25px rgba(0,0,0,.6);
    border-radius: 10px;
    }

    .login-box h2 {
    margin: 0 0 30px;
    padding: 0;
    color: #fff;
    text-align: center;
    }

    .login-box .user-box {
    position: relative;
    }

    .login-box .user-box input {
    width: 100%;
    padding: 10px 0;
    font-size: 16px;
    color: #fff;
    margin-bottom: 30px;
    border: none;
    border-bottom: 1px solid #fff;
    outline: none;
    background: transparent;
    }
    .login-box .user-box label {
    position: absolute;
    top:0;
    left: 0;
    padding: 10px 0;
    font-size: 16px;
    color: #fff;
    pointer-events: none;
    transition: .5s;
    }

    .login-box .user-box input:focus ~ label,
    .login-box .user-box input:valid ~ label {
    top: -20px;
    left: 0;
    color: #03e9f4;
    font-size: 12px;
    }

    .login-box form a {
    position: relative;
    display: inline-block;
    padding: 10px 20px;
    color: #03e9f4;
    font-size: 16px;
    text-decoration: none;
    text-transform: uppercase;
    overflow: hidden;
    transition: .5s;
    margin-top: 40px;
    letter-spacing: 4px
    }

    .login-box a:hover {
    background: #03e9f4;
    color: #fff;
    border-radius: 5px;
    box-shadow: 0 0 5px #03e9f4,
                0 0 25px #03e9f4,
                0 0 50px #03e9f4,
                0 0 100px #03e9f4;
    }

    .login-box a span {
    position: absolute;
    display: block;
    }

    .login-box a span:nth-child(1) {
    top: 0;
    left: -100%;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, transparent, #03e9f4);
    animation: btn-anim1 1s linear infinite;
    }

    @keyframes btn-anim1 {
    0% {
        left: -100%;
    }
    50%,100% {
        left: 100%;
    }
    }

    .login-box a span:nth-child(2) {
    top: -100%;
    right: 0;
    width: 2px;
    height: 100%;
    background: linear-gradient(180deg, transparent, #03e9f4);
    animation: btn-anim2 1s linear infinite;
    animation-delay: .25s
    }

    @keyframes btn-anim2 {
    0% {
        top: -100%;
    }
    50%,100% {
        top: 100%;
    }
    }

    .login-box a span:nth-child(3) {
    bottom: 0;
    right: -100%;
    width: 100%;
    height: 2px;
    background: linear-gradient(270deg, transparent, #03e9f4);
    animation: btn-anim3 1s linear infinite;
    animation-delay: .5s
    }

    @keyframes btn-anim3 {
    0% {
        right: -100%;
    }
    50%,100% {
        right: 100%;
    }
    }

    .login-box a span:nth-child(4) {
    bottom: -100%;
    left: 0;
    width: 2px;
    height: 100%;
    background: linear-gradient(360deg, transparent, #03e9f4);
    animation: btn-anim4 1s linear infinite;
    animation-delay: .75s
    }

    @keyframes btn-anim4 {
    0% {
        bottom: -100%;
    }
    50%,100% {
        bottom: 100%;
    }
    }
</style>