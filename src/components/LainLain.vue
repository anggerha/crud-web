<template>
    <div>
        <sidebar/>
        <div>
            <b-btn v-if="loginAs === 'Manajer'" id="tambahBtn" variant="outline-primary" v-b-modal.modal-ll>Tambah <b-icon icon="plus-circle"></b-icon> </b-btn>
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
                            <b-btn v-if="loginAs === 'Manajer'" :to="{name: 'Update Lain Lain', params: { id: lainlain.key }}" variant="outline-primary"><b-icon icon="pencil"></b-icon></b-btn>
                            <button v-if="loginAs === 'Manajer'" @click.prevent="deleteUser(lainlain.key)" class="btn btn-danger"><b-icon icon="trash"></b-icon></button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div>
            <h3>Pasien Pemeriksaan Lain Lain</h3>
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
                        <td>{{ datapasien.pemeriksaanLain[0].prosesLain }}</td>
                        <td><b-btn :to="{name: 'Form Pemeriksaan', params: { id: datapasien.key }}" @click="sendPath" variant="outline-primary"><b-icon icon="pencil"></b-icon></b-btn></td>
                    </tr>
                </tbody>
            </table>
            <p v-if="dataPasien.length === 0">Pemeriksaan Kosong</p>
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
        this.getPasienKimDar()
        this.getRole()
    },
    methods: {
        sendPath() {
            localStorage.setItem('From', 'Lain')
        },
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
        async getPasienKimDar(){
            // let daftarPasien = db.collection('Pemeriksaan')
            // let query = await daftarPasien.where('pemeriksaanKimDar', '!=', []).get()
            // this.dataPasien = query.docs.map(doc => doc.data())
            db.collection('Pemeriksaan').where('pemeriksaanLain', '!=', []).onSnapshot((snapshotChange) => {
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