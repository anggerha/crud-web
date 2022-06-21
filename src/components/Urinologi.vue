<template>
    <div>
        <sidebar/>
        <div>
            <b-btn v-if="loginAs === 'Registrasi' || loginAs === 'Laboran'" id="tambahBtn" variant="outline-primary" v-b-modal.modal-is>Tambah <b-icon icon="plus-circle"></b-icon> </b-btn>
            <b-modal id="modal-is" centered size="md" hide-footer hide-header>
                <add-urinologi/>
            </b-modal>
        </div>
        <br><br>
        <div>
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>Jenis Pemeriksaan</th>
                        <th>Satuan</th>
                        <th>Nilai Rujukan</th>
                        <th>Metode</th>
                        <th>Harga</th>
                        <th>Opsi</th>
                    </tr>
                </thead>
                <tbody v-if="Urinologi.length !== 0">
                    <tr v-for="urinologi in Urinologi" :key="urinologi.key">
                        <td>{{ urinologi.jenisPemeriksaan }}</td>
                        <td>{{ urinologi.satuan }}</td>
                        <td>{{ urinologi.nilaiRujukan }}</td>
                        <td>{{ urinologi.metode }}</td>
                        <td>Rp. {{ urinologi.harga }}</td>
                        <td>
                            <b-btn :to="{name: 'Update Urinologi', params: { id: urinologi.key }}" variant="outline-primary"><b-icon icon="pencil"></b-icon></b-btn>
                            <button v-if="loginAs === 'Registrasi' || loginAs === 'Manajer'" @click.prevent="deleteUser(urinologi.key)" class="btn btn-danger"><b-icon icon="trash"></b-icon></button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import { db } from './firebase';
import sidebar from '../layout/Sidebar'
import addUrinologi from '../layout/AddUrinologi';

export default {
    name: 'Urinologi',
    components: { sidebar, addUrinologi },
    data() {
        return {
            Urinologi: [],
            loginAs: null
        }
    },
    created() {
        db.collection('Urinologi').orderBy('jenisPemeriksaan', 'asc').onSnapshot((snapshotChange) => {
            this.Urinologi = [];
            snapshotChange.forEach((doc) => {
                this.Urinologi.push({
                    key: doc.id,
                    jenisPemeriksaan: doc.data().jenisPemeriksaan,
                    satuan: doc.data().satuan,
                    nilaiRujukan: doc.data().nilaiRujukan,
                    metode: doc.data().metode,
                    harga: doc.data().harga,
                })
            });
        });
        this.getRole()
    },
    methods: {
        getRole(){
            this.loginAs = localStorage.getItem('loginAs')
        },
        deleteUser(id){
            if (window.confirm("Konfirmasi menghapus jenis pemeriksaan?")) {
            db.collection("Urinologi").doc(id).delete().then(() => {
                console.log("Document deleted!");
            })
            .catch((error) => {
                console.error(error);
            })
            }
        },
    }
}
</script>

<style scoped>
#tambahBtn{
    float: right;
    border: none;
    margin-right: 1rem;
}

</style>