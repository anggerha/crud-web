<template>
    <div>
        <sidebar/>
        <div>
            <b-btn v-if="loginAs === 'Manajer'" id="tambahBtn" variant="outline-primary" v-b-modal.modal-is>Tambah <b-icon icon="plus-circle"></b-icon> </b-btn>
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
                            <b-btn v-if="loginAs === 'Manajer'" :to="{name: 'Update Urinologi', params: { id: urinologi.key }}" variant="outline-primary"><b-icon icon="pencil"></b-icon></b-btn>
                            <button v-if="loginAs === 'Manajer'" @click.prevent="deleteUser(urinologi.key)" class="btn btn-danger"><b-icon icon="trash"></b-icon></button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div>
            <h3>Pasien Pemeriksaan Urinologi</h3>
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>Tanggal</th>
                        <th>Nomor Order Lab</th>
                        <th>Nama Pasien</th>
                        <th>Dokter</th>
                        <th>Ruangan</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody v-if="dataPasien.length !== 0">
                    <tr v-for="datapasien in dataPasien" :key="datapasien.key">
                        <td>{{ datapasien.tanggal }}</td>
                        <td>{{ datapasien.nomorOrderLab }}</td>
                        <td>{{ datapasien.namaPasien }}</td>
                        <td>{{ datapasien.namaDokter }}</td>
                        <td>{{ datapasien.namaRuangan }}</td>
                        <td><b-btn :to="{name: 'Form Pemeriksaan', params: { id: datapasien.key }}" @click="sendPath" variant="outline-primary"><b-icon icon="pencil"></b-icon></b-btn></td>
                    </tr>
                </tbody>
            </table>
            <p v-if="dataPasien.length === 0">Pemeriksaan Kosong</p>
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
            dataPasien: {
                nomor: '',
                namaPasien: '',
                tanggal:'',
                tempatLahir: '',
                jenisKelamin:'',
                statusPasien:'',
                nik:'',
                nomorJamkes:'',
                nomorKontak:'',
                alamatLengkap:'',

                nomorOrderLab: '',
                namaDokter: '',
                namaRuangan: '',
                nomorTelpRuangan: '',
                diagnosa: '',

                daftarPemeriksaan: [],
                pemeriksaanKimDar:[],
                pemeriksaanUrin:[],
                pemeriksaanHema:[],
                pemeriksaanLain:[],
                price: 0,
                proses: ''
            },
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
        this.getPasienUrin()
        this.getRole()
    },
    methods: {
        sendPath() {
            localStorage.setItem('From', 'Urin')
        },
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
        async getPasienUrin(){
            // let daftarPasien = db.collection('Pemeriksaan')
            // let query = await daftarPasien.where('pemeriksaanKimDar', '!=', []).get()
            // this.dataPasien = query.docs.map(doc => doc.data())
            db.collection('Pemeriksaan').where('pemeriksaanUrin', '!=', []).onSnapshot((snapshotChange) => {
                this.dataPasien = []
                snapshotChange.forEach((doc) => {
                    this.dataPasien.push({
                        key : doc.id,
                        nomor : doc.data().nomor,
                        namaPasien : doc.data().namaPasien,
                        tanggal : doc.data().tanggal,
                        tempatLahir : doc.data().tempatLahir,
                        jenisKelamin : doc.data().jenisKelamin,
                        statusPasien : doc.data().statusPasien,
                        nik : doc.data().nik,
                        nomorJamkes : doc.data().nomorJamkes,
                        nomorKontak : doc.data().nomorKontak,
                        alamatLengkap : doc.data().alamatLengkap,
                        nomorOrderLab : doc.data().nomorOrderLab,
                        namaDokter : doc.data().namaDokter,
                        namaRuangan : doc.data().namaRuangan,
                        nomorTelpRuangan : doc.data().nomorTelpRuangan,
                        diagnosa : doc.data().diagnosa,
                        proses : doc.data().proses,
                        daftarPemeriksaan : doc.data().daftarPemeriksaan,
                        pemeriksaanKimDar : doc.data().pemeriksaanKimDar,
                        pemeriksaanHema : doc.data().pemeriksaanHema,
                        pemeriksaanUrin : doc.data().pemeriksaanUrin,
                        pemeriksaanLain : doc.data().pemeriksaanLain
                    })
                })
            })
        }
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