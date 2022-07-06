<template>
    <div>
        <sidebar/>
        <div>
            <b-btn v-if="loginAs === 'Manajer'" id="tambahBtn" variant="outline-primary" v-b-modal.modal-kd>Tambah <b-icon icon="plus-circle"></b-icon> </b-btn>
            <b-modal id="modal-kd" centered size="md" hide-footer hide-header>
                <add-kimia-darah/>
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
                <tbody v-if="kimiaDarah.length !== 0">
                    <tr v-for="kimiadarah in kimiaDarah" :key="kimiadarah.key">
                        <td>{{ kimiadarah.jenisPemeriksaan }}</td>
                        <td>{{ kimiadarah.satuan }}</td>
                        <td>{{ kimiadarah.nilaiRujukan }}</td>
                        <td>{{ kimiadarah.metode }}</td>
                        <td>Rp. {{ kimiadarah.harga }}</td>
                        <td>
                            <b-btn v-if="loginAs === 'Manajer'" :to="{name: 'Update Kimia Darah', params: { id: kimiadarah.key }}" variant="outline-primary"><b-icon icon="pencil"></b-icon></b-btn>
                            <button v-if="loginAs === 'Manajer'" @click.prevent="deleteUser(kimiadarah.key)" class="btn btn-danger"><b-icon icon="trash"></b-icon></button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <br><br>
        <div>
            <h3>Pasien Pemeriksaan Kimia Darah</h3>
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>Tanggal</th>
                        <th>Nomor Order Lab</th>
                        <th>Nama Pasien</th>
                        <th>Dokter</th>
                        <th>Ruangan</th>
                        <th>Proses</th>
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
                        <td>{{ datapasien.pemeriksaanKimDar[0].prosesKimDar}}</td>
                        <td><b-btn :to="{name: 'Form Pemeriksaan', params: { id: datapasien.key }}" @click="sendPath" variant="outline-primary"><b-icon icon="pencil"></b-icon></b-btn></td>
                    </tr>
                </tbody>
            </table>
            <p v-if="dataPasien.length === 0">Pemeriksaan Kosong</p>
        </div>
    </div>
</template>

<script>
import { db } from '../components/firebase'
import sidebar from '../layout/Sidebar'
import addKimiaDarah from '../layout/AddKimiaDarah'

export default {
    name: 'KimiaDarah',
    components: { sidebar, addKimiaDarah },
    data() {
        return {
            kimiaDarah: [],
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

                daftarPemeriksaan:[],
                pemeriksaanKimDar:[],
                pemeriksaanUrin:[],
                pemeriksaanHema:[],
                pemeriksaanLain:[],
                price: 0,
                proses: ''
            },
            loginAs: null,
            temp: []
        }
    },
    created() {
        db.collection('Kimia Darah').orderBy('jenisPemeriksaan', 'asc').onSnapshot((snapshotChange) => {
            this.kimiaDarah = [];
            snapshotChange.forEach((doc) => {
                this.kimiaDarah.push({
                    key: doc.id,
                    jenisPemeriksaan: doc.data().jenisPemeriksaan,
                    satuan: doc.data().satuan,
                    nilaiRujukan: doc.data().nilaiRujukan,
                    metode: doc.data().metode,
                    harga: doc.data().harga,
                })
            });
        });
        this.getPasienKimDar()
        this.getRole()
    },
    methods: {
        sendPath() {
            localStorage.setItem('From', 'KimDar')
        },
        getRole(){
            this.loginAs = localStorage.getItem('loginAs')
        },
        deleteUser(id){
            if (window.confirm("Konfirmasi menghapus jenis pemeriksaan?")) {
            db.collection("Kimia Darah").doc(id).delete().then(() => {
                console.log("Document deleted!");
            })
            .catch((error) => {
                console.error(error);
            })
            }
        },
        getPasienKimDar(){
            // let daftarPasien = db.collection('Pemeriksaan')
            // let query = await daftarPasien.where('pemeriksaanKimDar', '!=', []).get()
            // this.dataPasien = query.docs.map(doc => doc.data())
            db.collection('Pemeriksaan').where('pemeriksaanKimDar', '!=', []).onSnapshot((snapshotChange) => {
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
                        proses : doc.data().pemeriksaanKimDar[0].proses,
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