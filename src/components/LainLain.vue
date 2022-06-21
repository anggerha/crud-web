<template>
    <div>
        <sidebar/>
        <div>
            <b-btn v-if="loginAs === 'Registrasi' || loginAs === 'Laboran'" id="tambahBtn" variant="outline-primary" v-b-modal.modal-ll>Tambah <b-icon icon="plus-circle"></b-icon> </b-btn>
            <b-modal id="modal-ll" centered size="md" hide-footer hide-header>
                <add-lain-lain/>
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
                <tbody v-if="lainLain.length !== 0">
                    <tr v-for="lainlain in lainLain" :key="lainlain.key">
                        <td>{{ lainlain.jenisPemeriksaan }}</td>
                        <td>{{ lainlain.satuan }}</td>
                        <td>{{ lainlain.nilaiRujukan }}</td>
                        <td>{{ lainlain.metode }}</td>
                        <td>Rp. {{ lainlain.harga }}</td>
                        <td>
                            <b-btn :to="{name: 'Update Lain Lain', params: { id: lainlain.key }}" variant="outline-primary"><b-icon icon="pencil"></b-icon></b-btn>
                            <button v-if="loginAs === 'Registrasi' || loginAs === 'Manajer'" @click.prevent="deleteUser(lainlain.key)" class="btn btn-danger"><b-icon icon="trash"></b-icon></button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import { db } from '../components/firebase';
import AddLainLain from '../layout/AddLainLain';
import sidebar from '../layout/Sidebar'

export default {
    name: 'LainLain',
    components: { sidebar, AddLainLain },
    data() {
        return {
            lainLain: [],
            loginAs: null
        }
    },
    created() {
        db.collection('Lain Lain').orderBy('jenisPemeriksaan', 'asc').onSnapshot((snapshotChange) => {
            this.lainLain = [];
            snapshotChange.forEach((doc) => {
                this.lainLain.push({
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
            db.collection("Lain Lain").doc(id).delete().then(() => {
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