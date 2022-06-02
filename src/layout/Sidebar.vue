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
        initialShow: true,
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
                    name: "Hermatologi",
                    href: {
                        name: "Hermatologi",
                    }
                },
                {
                    name: "Imunologi Serologi",
                    href: {
                        name: "Imunologi Serologi",
                    }
                },
                {
                    name: "Lain-Lain",
                    href: {
                        name: "",
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
                this.$router.push('/')
            }, function(error) {
                console.log(error)
            });
        },
        clear(){
                console.clear()
            },
    }
}
</script>

<style lang="scss">
/* @import "node_modules/bootstrap/scss/bootstrap";
@import "node_modules/bootstrap-vue/src/index.scss"; */
@import "node_modules/vue-bootstrap-sidebar/src/scss/default-theme";
</style>

<style>
    #logout{
        position: absolute;
        margin-right: 2rem;
        right: 0%;
    }
    
</style>