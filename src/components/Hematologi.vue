<template>
    <div>
        <sidebar/>
        <div>
            <b-btn v-if="loginAs === 'Registrasi' || loginAs === 'Laboran'" id="tambahBtn" variant="outline-primary" v-b-modal.modal-ht>Tambah <b-icon icon="plus-circle"></b-icon> </b-btn>
            <b-modal id="modal-ht" centered size="md" hide-footer hide-header>
                <addhematologi/>
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
                <tbody v-if="hematologis.length !== 0">
                    <tr v-for="hematologi in hematologis" :key="hematologi.key">
                        <td>{{ hematologi.jenisPemeriksaan }}</td>
                        <td>{{ hematologi.satuan }}</td>
                        <td>{{ hematologi.nilaiRujukan }}</td>
                        <td>{{ hematologi.metode }}</td>
                        <td>Rp. {{ hematologi.harga }}</td>
                        <td>
                            <b-btn :to="{name: 'Update Hematologi', params: { id: hematologi.key }}" variant="outline-primary"><b-icon icon="pencil"></b-icon></b-btn>
                            <button v-if="loginAs === 'Registrasi' || loginAs === 'Manajer'" @click.prevent="deleteUser(hematologi.key)" class="btn btn-danger"><b-icon icon="trash"></b-icon></button>
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
import addhematologi from '../layout/AddHematologi'

export default {
    name: 'Hematologi',
    components: { sidebar, addhematologi },
    data() {
        return {
            hematologis: [],
            loginAs: null
        }
    },
    created() {
        db.collection('Hematologi').orderBy('jenisPemeriksaan', 'asc').onSnapshot((snapshotChange) => {
            this.hematologis = [];
            snapshotChange.forEach((doc) => {
                this.hematologis.push({
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
            db.collection("Hematologi").doc(id).delete().then(() => {
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