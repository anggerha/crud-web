<template>
    <div>
        <sidebar/>
        <div>
            <b-btn id="tambahBtn" variant="outline-primary" v-b-modal.modal-center>Tambah</b-btn>
            <b-modal id="modal-center" centered size="md" hide-footer hide-header>
                <add/>
            </b-modal>         
        </div>
        <div>
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
    components: { sidebar, add, displayData }
}
</script>

<style>
#tambahBtn{
    float: right;
    margin-right: 1rem;
}
</style>