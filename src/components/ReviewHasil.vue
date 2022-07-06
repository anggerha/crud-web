<template>
    <div>
        <div>
            <sidebar/>
        </div>
        <div class="container" ref="content">
            <div v-for="user in Users" :key="user.key" id="outer">
                <b-button variant="outline-danger" style="display:flex; float: right;" @click.prevent="deleteReview(user.key)">Hapus</b-button>
                <b-button variant="outline-primary" style="display:flex; float: right; margin-right: 0.5rem;" @click="cetak(user.key)">Cetak</b-button>
                <h3 style="float:left;">Review Hasil Laboratorium {{user.nomorOrderLab}}</h3>
                <br><br>
                    <div>
                        <div id="top">
                            <tr>
                                <td id="left">
                                    <tr>Nomor RM: {{user.nomor}}</tr>
                                    <tr>Nama Pasien: {{user.namaPasien}}</tr>
                                    <tr>Tanggal Lahir: {{user.tanggalLahir}}</tr>
                                    <tr>Status: {{user.statusPasien}}</tr>
                                </td>
                                <td id="right">
                                    <tr>Nomor Order Laboratorium: {{user.nomorOrderLab}}</tr>
                                    <tr>Waktu Order: {{user.tanggal}}</tr>
                                    <tr>Dokter Pengirim: {{user.namaDokter}}</tr>
                                    <tr>Ruangan: {{user.namaRuangan}}</tr>
                                    <tr>Kontak: {{user.nomorKontak}}</tr>
                                    <tr>Diagnosa: {{user.diagnosa}}</tr>
                                </td>
                            </tr>
                        </div>
                        <div>
                            <table id="table" class="table table-striped">
                                <thead>
                                    <tr>
                                        <th>No.</th>
                                        <th>Parameter</th>
                                        <th>Hasil</th>
                                        <th>Satuan</th>
                                        <th>Nilai Rujukan</th>
                                    </tr>
                                </thead>
                                <tbody v-if="user.from === 'KimDar'">
                                    <tr v-for="pemeriksaankimdar in user.pemeriksaanKimDar" :key="pemeriksaankimdar.key">
                                        <td></td>
                                        <td>{{pemeriksaankimdar.jenisPemeriksaan}}</td>
                                        <td><b-form-input id="hasil" v-model="pemeriksaankimdar.hasil" placeholder="Hasil" disabled></b-form-input></td>
                                        <td>{{pemeriksaankimdar.satuan}}</td>
                                        <td>{{pemeriksaankimdar.nilaiRujukan}}</td>
                                    </tr>
                                </tbody>
                                <tbody v-if="user.from === 'Hema'">
                                    <tr v-for="pemeriksaanhema in user.pemeriksaanHema" :key="pemeriksaanhema.key">
                                        <td></td>
                                        <td>{{pemeriksaanhema.jenisPemeriksaan}}</td>
                                        <td><b-form-input id="hasil" v-model="pemeriksaanhema.hasil" placeholder="Hasil" disabled></b-form-input></td>
                                        <td>{{pemeriksaanhema.satuan}}</td>
                                        <td>{{pemeriksaanhema.nilaiRujukan}}</td>
                                    </tr>
                                </tbody>
                                <tbody v-if="user.from === 'Urin'">
                                    <tr v-for="pemeriksaanurin in user.pemeriksaanUrin" :key="pemeriksaanurin.key">
                                        <td></td>
                                        <td>{{pemeriksaanurin.jenisPemeriksaan}}</td>
                                        <td><b-form-input id="hasil" v-model="pemeriksaanurin.hasil" placeholder="Hasil" disabled></b-form-input></td>
                                        <td>{{pemeriksaanurin.satuan}}</td>
                                        <td>{{pemeriksaanurin.nilaiRujukan}}</td>
                                    </tr>
                                </tbody>
                                <tbody v-if="user.from === 'Lain'">
                                    <tr v-for="pemeriksaanlain in user.pemeriksaanLain" :key="pemeriksaanlain.key">
                                        <td></td>
                                        <td>{{pemeriksaanlain.jenisPemeriksaan}}</td>
                                        <td><b-form-input id="hasil" v-model="pemeriksaanlain.hasil" placeholder="Hasil" disabled></b-form-input></td>
                                        <td>{{pemeriksaanlain.satuan}}</td>
                                        <td>{{pemeriksaanlain.nilaiRujukan}}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <b-form-checkbox v-model="user.review" value='true' unchecked-value='false' @change="validate(user.key, user.nomorOrderLab, user.review)">Validasi Review Hasil</b-form-checkbox>
                        </div>
                    </div>
                </div>
            </div>
        <div v-if="Users.length === 0"><h1>Review Hasil Kosong</h1></div>
    </div>
</template>

<script>
import sidebar from '../layout/Sidebar'
import { db } from '../components/firebase';

export default {
    name: 'ReviewHasil',
    components: { sidebar },
    data() {
        return{
            Users: [],
            tempData: {
                id: '',
                nomor: '',
                namaPasien: '',
                tanggal:'',
                tanggalLahir: '',
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
                from: '',
                review: 'false',
                proses: ''
            },
        }
    },
    created() {
        db.collection('ReviewHasil').onSnapshot((snapshotChange) => {
            this.Users = [];
            snapshotChange.forEach((doc) => {
                this.Users.push({
                    key : doc.id,
                    nomor : doc.data().nomor,
                    namaPasien : doc.data().namaPasien,
                    tanggal : doc.data().tanggal,
                    tanggalLahir : doc.data().tanggalLahir,
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
                    daftarPemeriksaan : doc.data().daftarPemeriksaan,
                    pemeriksaanKimDar : doc.data().pemeriksaanKimDar,
                    pemeriksaanHema : doc.data().pemeriksaanHema,
                    pemeriksaanUrin : doc.data().pemeriksaanUrin,
                    pemeriksaanLain : doc.data().pemeriksaanLain,
                    review: doc.data().review,
                    from: doc.data().from,
                    price : doc.data().price,
                    proses: doc.data().proses
                })
            })
        })
    },
    methods: {
        validate(id, nomorOrderLab, valid){
            db.collection('Pemeriksaan').doc(nomorOrderLab).get().then((doc) => {
                this.tempData.id = doc.id
                this.tempData.nomor = doc.data().nomor
                this.tempData.namaPasien = doc.data().namaPasien
                this.tempData.tanggal = doc.data().tanggal
                this.tempData.tanggalLahir = doc.data().tanggalLahir
                this.tempData.tempatLahir = doc.data().tempatLahir
                this.tempData.jenisKelamin = doc.data().jenisKelamin
                this.tempData.statusPasien = doc.data().statusPasien
                this.tempData.nik = doc.data().nik
                this.tempData.nomorJamkes = doc.data().nomorJamkes
                this.tempData.nomorKontak = doc.data().nomorKontak
                this.tempData.alamatLengkap = doc.data().alamatLengkap
                this.tempData.nomorOrderLab = doc.data().nomorOrderLab
                this.tempData.namaDokter = doc.data().namaDokter
                this.tempData.namaRuangan = doc.data().namaRuangan
                this.tempData.nomorTelpRuangan = doc.data().nomorTelpRuangan
                this.tempData.diagnosa = doc.data().diagnosa
                this.tempData.daftarPemeriksaan = doc.data().daftarPemeriksaan
                this.tempData.pemeriksaanKimDar = doc.data().pemeriksaanKimDar
                this.tempData.pemeriksaanHema = doc.data().pemeriksaanHema
                this.tempData.pemeriksaanUrin = doc.data().pemeriksaanUrin
                this.tempData.pemeriksaanLain = doc.data().pemeriksaanLain
                this.tempData.price = doc.data().price
                this.tempData.proses = doc.data().proses
                if(valid === 'true'){
                    this.tempData.review = 'true'
                } else if (valid === 'false') {
                    this.tempData.review = 'false'
                }
                this.tempData.pemeriksaanKimDar = doc.data().pemeriksaanKimDar
                this.tempData.pemeriksaanHema = doc.data().pemeriksaanHema
                this.tempData.pemeriksaanUrin = doc.data().pemeriksaanUrin
                this.tempData.pemeriksaanLain = doc.data().pemeriksaanLain

                this.tempData.from = doc.data().from
                if(valid === 'true'){
                    if(this.tempData.from === 'KimDar'){
                        this.tempData.pemeriksaanKimDar[0].prosesKimDar = 'Selesai'
                    } else if(this.tempData.from === 'Hema'){
                        this.tempData.pemeriksaanHema[0].prosesHema = 'Selesai'
                    } else if(this.tempData.from === 'Urin'){
                        this.tempData.pemeriksaanUrin[0].prosesUrin = 'Selesai'
                    } else if(this.tempData.from === 'Lain'){
                        this.tempData.pemeriksaanLain[0].prosesLain = 'Selesai'
                    }
                } else if (valid === 'false'){
                    if(this.tempData.from === 'KimDar'){
                        this.tempData.pemeriksaanKimDar[0].prosesKimDar = 'Menunggu Validasi'
                    } else if(this.tempData.from === 'Hema'){
                        this.tempData.pemeriksaanHema[0].prosesHema = 'Menunggu Validasi'
                    } else if(this.tempData.from === 'Urin'){
                        this.tempData.pemeriksaanUrin[0].prosesUrin = 'Menunggu Validasi'
                    } else if(this.tempData.from === 'Lain'){
                        this.tempData.pemeriksaanLain[0].prosesLain = 'Menunggu Validasi'
                    }
                }
            }).then(() => {
                db.collection('ReviewHasil').doc(id).update(this.tempData).then(() => {
                    db.collection('Pemeriksaan').doc(nomorOrderLab).update(this.tempData).then(() => {
                        this.tempData.id = ''
                        this.tempData.nomor= '',
                        this.tempData.namaPasien= ''
                        this.tempData.tanggal='',
                        this.tempData.tanggalLahir= '',
                        this.tempData.tempatLahir= '',
                        this.tempData.jenisKelamin='',
                        this.tempData.statusPasien='',
                        this.tempData.nik='',
                        this.tempData.nomorJamkes='',
                        this.tempData.nomorKontak='',
                        this.tempData.alamatLengkap='',

                        this.tempData.nomorOrderLab= '',
                        this.tempData.namaDokter= '',
                        this.tempData.namaRuangan= '',
                        this.tempData.nomorTelpRuangan= '',
                        this.tempData.diagnosa= '',

                        this.tempData.daftarPemeriksaan=[],
                        this.tempData.pemeriksaanKimDar=[],
                        this.tempData.pemeriksaanUrin=[],
                        this.tempData.pemeriksaanHema=[],
                        this.tempData.pemeriksaanLain=[],
                        this.tempData.price= 0,
                        this.tempData.from= '',
                        this.tempData.review= 'false',
                        this.tempData.proses= ''
                    })
                })
            })
        },
        deleteReview(id){
            if (window.confirm("Konfirmasi menghapus review?")) {
            db.collection("ReviewHasil").doc(id).delete().then(() => {})
            .catch((error) => {
                console.error(error);
            })
            }
        },
        
    }
}
</script>

<style scoped>
#top{
    margin: auto;
    border: 2px solid black;
    text-align: left;
}
#left{
    border-right: 2px solid black;
    padding-right: 20rem;
}
h2{
    text-align: left;
}
#table{
    width: 100%;
}
#hasil{
    border: none;
}
table {
    counter-reset: row-num - 1;
}
table tr {
    counter-increment: row-num;
}
table tr td:first-child::before {
    content: counter(row-num);
}
#simpanHasil{
    margin-top: 2rem;
}
#outer{
    border: 2px solid black;
    padding: 1rem;
    margin: 2rem;
}
</style>