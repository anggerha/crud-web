<template>
    <div>
        <sidebar/>
        <div>
            <b-btn v-if="loginAs === 'Registrasi' || loginAs === 'Laboran'" id="tambahBtn" variant="outline-primary" v-b-modal.modal-center>Tambah <b-icon icon="plus-circle"></b-icon> </b-btn>
            <b-modal id="modal-center" centered size="md" hide-footer hide-header>
                <add/>
            </b-modal>
            <b-btn variant="outline-primary" style="float:left;" :to="{name: 'Pemeriksaan Pasien'}">Permintaan Pemeriksaan Laboratorium</b-btn>     
        </div>
        <br><br>
        <div class="displayData">
            <displayData/>
        </div>
        
    </div>
</template>

<script>
import sidebar from '../layout/Sidebar'
import add from '../layout/Add'
import displayData from '../layout/DisplayData'

export default {
    name: 'Registrasi',
    components: { sidebar, add, displayData },
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
</style>