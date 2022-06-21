<template>
    <div>
        <sidebar/>
        <div>
            <b-btn v-if="loginAs === 'Registrasi' || loginAs === 'Laboran'" id="tambahBtn" variant="outline-primary" v-b-modal.modal-pp>Tambah <b-icon icon="plus-circle"></b-icon> </b-btn>
            <b-modal id="modal-pp" centered size="md" hide-footer hide-header>
                <add-pemeriksaan/>
            </b-modal>         
            <b-btn class="backBtn" variant="danger" @click="back">Kembali <b-icon icon="arrow90deg-left"></b-icon> </b-btn>
        </div>
        <br><br>
        <div>
            <display-pemeriksaan/>
        </div>
    </div>
</template>

<script>
import AddPemeriksaan from '../layout/AddPemeriksaan'
import displayPemeriksaan from '../layout/DisplayPemeriksaan'
import Sidebar from '../layout/Sidebar'

export default {
    name: 'PemeriksaanPasien',
    components: { displayPemeriksaan, Sidebar, AddPemeriksaan },
    data(){
        return{
            loginAs: null
        }
    },
    created() {
        this.getRole()
    },
    methods: {
        getRole(){
            this.loginAs = localStorage.getItem('loginAs')
        },
        back(){
            this.$router.push('/Registrasi')
        }
    }
}
</script>

<style scoped>
#tambahBtn{
    float: right;
    margin-right: 1rem;
    border: none;
}
.backBtn{
    float: right;
    color: red;
    background-color: transparent;
    margin-right: 1rem;
    border: none;
}
</style>