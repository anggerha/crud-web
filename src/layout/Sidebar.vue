<template>
    <div>
        <BootstrapSidebar
            :initial-show="initialShow"
            :links="links"
            :header="header"
            :fa="true"
            >
            <b-button variant="danger">Logout</b-button>
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

export default {
    name: 'Sidebar',
    components: {
        BootstrapSidebar,
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
            ],
            },
            { name: "Registrasi", href: { name: "Registrasi" }},
            { name: "Review Hasil", href: { name: "Review Hasil" }},
        ],
      }
    },
    method:{
    }
}
</script>

<style lang="scss">
/* @import "node_modules/bootstrap/scss/bootstrap";
@import "node_modules/bootstrap-vue/src/index.scss"; */
@import "node_modules/vue-bootstrap-sidebar/src/scss/default-theme";
</style>

<style>
    #button{ 
        margin: auto;
        margin-left: 1rem;
        margin-top: 0.5rem;
        font-size: 2rem;
        color: black;
        width: max-content;
        border: none;
        background-color: transparent;
    }
</style>