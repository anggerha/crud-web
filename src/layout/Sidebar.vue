<template>
    <div>
        <BootstrapSidebar
            :initial-show="initialShow"
            :links="links"
            :header="header"
            :fa="true"
            >
            
            <template v-slot:navbar>
                <b-navbar
                id="mainNavbar"
                toggleable="lg"
                type="light"
                variant="light"
                fixed="top"
                >
                <b-navbar-nav>
                    <b-nav-item>
                        <router-link style="text-decoration: none; color: inherit;" :to="'/Home'">ProLab</router-link>
                    </b-nav-item>
                    <b-button id="logout" variant="danger" @click="logout">Logout</b-button>
                </b-navbar-nav>
                </b-navbar>
            </template>

            <template v-slot:content>
                <b-container style="margin-top: 56px">
                    <router-view />
                </b-container>
            </template>
            
        </BootstrapSidebar>
        <!-- <div>
            <div class="hamburger-menu">
                <input id="menu__toggle" type="checkbox" />
                <label class="menu__btn" for="menu__toggle">
                <span></span>
                </label>

                <ul class="menu__box">
                    <li><a class="menu__item" href="#">Home</a></li>
                    <li><a class="menu__item" href="#">About</a></li>
                    <li><a class="menu__item" href="#">Team</a></li>
                    <li><a class="menu__item" href="#">Contact</a></li>
                    <li><a class="menu__item" href="#">Instagram</a></li>
                </ul>
            </div>
        </div> -->
    </div>
</template>

<script>
import BootstrapSidebar from "vue-bootstrap-sidebar";
import firebase from 'firebase/app'

export default {
    name: 'Sidebar',
    components: {
        BootstrapSidebar,
    },
    mounted() {
        this.$nextTick(function () {
            window.setInterval(() => {
                this.clear()
            },100);
        })
    },
    data() {
      return {
        variant: 'dark',
        variants: [
          'dark',
        ],
        initialShow: false,
        header: "<h3>Menu</h3>",
        links: [
            { name: "Home", href: { name: "Home"}},
            {
            name: "Pemeriksaan",
            children: [
                {
                    name: "Kimia Darah",
                    href: {
                        name: "Kimia Darah", 
                    }
                },
                {
                    name: "Hematologi",
                    href: {
                        name: "Hematologi",
                    }
                },
                {
                    name: "Urinologi",
                    href: {
                        name: "Urinologi",
                    }
                },
                {
                    name: "Lain-Lain",
                    href: {
                        name: "Lain Lain",
                    }
                },
            ],
            },
            { name: "Registrasi", href: { name: "Registrasi" }},
            { name: "Review Hasil", href: { name: "Review Hasil" }},
        ],
      }
    },
    methods: {
        logout(){
            firebase.auth().signOut().then(() => {
                localStorage.clear()
                this.$router.push('/')
            }, function(error) {
                console.log(error)
            });
        },
        clear(){
                // console.clear()
            },
    }
}
</script>

<style lang="scss">

@import "node_modules/vue-bootstrap-sidebar/src/scss/default-theme";
</style>

<style>
    #logout{
        position: absolute;
        margin-right: 2rem;
        right: 0%;
    }
    /* #menu__toggle {
    opacity: 0;
    }
    #menu__toggle:checked + .menu__btn > span {
    transform: rotate(45deg);
    }
    #menu__toggle:checked + .menu__btn > span::before {
    top: 0;
    transform: rotate(0deg);
    }
    #menu__toggle:checked + .menu__btn > span::after {
    top: 0;
    transform: rotate(90deg);
    }
    #menu__toggle:checked ~ .menu__box {
    left: 0 !important;
    }
    .menu__btn {
    position: fixed;
    top: 20px;
    left: 20px;
    width: 26px;
    height: 26px;
    cursor: pointer;
    z-index: 1;
    }
    .menu__btn > span,
    .menu__btn > span::before,
    .menu__btn > span::after {
    display: block;
    position: absolute;
    width: 100%;
    height: 2px;
    background-color: #616161;
    transition-duration: .25s;
    }
    .menu__btn > span::before {
    content: '';
    top: -8px;
    }
    .menu__btn > span::after {
    content: '';
    top: 8px;
    }
    .menu__box {
    display: block;
    position: fixed;
    top: 0;
    left: -100%;
    width: 300px;
    height: 100%;
    margin: 0;
    padding: 80px 0;
    list-style: none;
    background-color: #ECEFF1;
    box-shadow: 2px 2px 6px rgba(0, 0, 0, .4);
    transition-duration: .25s;
    }
    .menu__item {
    display: block;
    padding: 12px 24px;
    color: #333;
    font-family: 'Roboto', sans-serif;
    font-size: 20px;
    font-weight: 600;
    text-decoration: none;
    transition-duration: .25s;
    }
    .menu__item:hover {
    background-color: #CFD8DC;
    } */
</style>