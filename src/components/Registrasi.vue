<template>
    <div>
        <sidebar/>
        <div>
            <h1>Daftar Pasien</h1>
            <b-btn v-if="loginAs === 'Registrasi' || loginAs === 'Laboran'" id="tambahBtn" variant="outline-primary" v-b-modal.modal-center>Tambah <b-icon icon="plus-circle"></b-icon> </b-btn>
            <b-modal id="modal-center" centered size="md" hide-footer hide-header>
                <add/>
            </b-modal>    
        </div>
        <br><br>
        <div class="displayData">
            <displayData/>
        </div>
        <div>
            <h1 id="daftarPemeriksaan">Daftar Pemeriksaan Pasien</h1>
            <display-pemeriksaan/>
        </div>
    </div>
</template>

<script>
import sidebar from '../layout/Sidebar'
import add from '../layout/Add'
import displayData from '../layout/DisplayData'
import DisplayPemeriksaan from '../layout/DisplayPemeriksaan'

export default {
    name: 'Registrasi',
    components: { sidebar, add, displayData, DisplayPemeriksaan },
    data() {
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
#daftarPemeriksaan{
    border-top: 10px grey solid;
    padding: 3rem;
    margin-top: 5rem;
}

</style>