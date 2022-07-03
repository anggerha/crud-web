<template>
    <div class="container">
        <button class="btn btn-danger btn-block" @click="kembali" style="width:min-content; float: right;">Kembali</button>
        <h2>Input Hasil Laboratorium {{user.nomorOrderLab}}</h2>
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
                        <th>Grup Tes</th>
                        <th>Parameter</th>
                        <th>Hasil</th>
                        <th>Satuan</th>
                        <th>Nilai Rujukan</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody v-if="from === 'KimDar'">
                    <tr v-for="pemeriksaankimdar in user.pemeriksaanKimDar" :key="pemeriksaankimdar.key">
                        <td></td>
                        <td>Kimia Darah</td>
                        <td>{{pemeriksaankimdar.jenisPemeriksaan}}</td>
                        <td><b-form-input id="hasil" v-model="pemeriksaankimdar.hasil" placeholder="Hasil"></b-form-input></td>
                        <td>{{pemeriksaankimdar.satuan}}</td>
                        <td>{{pemeriksaankimdar.nilaiRujukan}}</td>
                        <td><b-form-checkbox v-model="pemeriksaankimdar.status" value=true unchecked-value=false></b-form-checkbox></td>
                    </tr>
                </tbody>
                <tbody v-if="from === 'Hema'">
                    <tr v-for="pemeriksaanhema in user.pemeriksaanHema" :key="pemeriksaanhema.key">
                        <td></td>
                        <td>Hematologi</td>
                        <td>{{pemeriksaanhema.jenisPemeriksaan}}</td>
                        <td><b-form-input id="hasil" v-model="pemeriksaanhema.hasil" placeholder="Hasil"></b-form-input></td>
                        <td>{{pemeriksaanhema.satuan}}</td>
                        <td>{{pemeriksaanhema.nilaiRujukan}}</td>
                        <td><b-form-checkbox v-model="pemeriksaanhema.status" value=true unchecked-value=false></b-form-checkbox></td>
                    </tr>
                </tbody>
                <tbody v-if="from === 'Urin'">
                    <tr v-for="pemeriksaanurin in user.pemeriksaanUrin" :key="pemeriksaanurin.key">
                        <td></td>
                        <td>Urinologi</td>
                        <td>{{pemeriksaanurin.jenisPemeriksaan}}</td>
                        <td><b-form-input id="hasil" v-model="pemeriksaanurin.hasil" placeholder="Hasil"></b-form-input></td>
                        <td>{{pemeriksaanurin.satuan}}</td>
                        <td>{{pemeriksaanurin.nilaiRujukan}}</td>
                        <td><b-form-checkbox v-model="pemeriksaanurin.status" value=true unchecked-value=false></b-form-checkbox></td>
                    </tr>
                </tbody>
                <tbody v-if="from === 'Lain'">
                    <tr v-for="pemeriksaanlain in user.pemeriksaanLain" :key="pemeriksaanlain.key">
                        <td></td>
                        <td>Lain Lain</td>
                        <td>{{pemeriksaanlain.jenisPemeriksaan}}</td>
                        <td><b-form-input id="hasil" v-model="pemeriksaanlain.hasil" placeholder="Hasil"></b-form-input></td>
                        <td>{{pemeriksaanlain.satuan}}</td>
                        <td>{{pemeriksaanlain.nilaiRujukan}}</td>
                        <td><b-form-checkbox v-model="pemeriksaanlain.status" value=true unchecked-value=false></b-form-checkbox></td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div>
            <b-btn id="reviewHasil" variant="outline-primary" :to="{name: 'PreReview', params: { id: this.user.id }}" @click="addData">Review Hasil</b-btn> 
        </div>
    </div>
</template>

<script>
import { db } from '../components/firebase';

export default {
    name: 'FormPemeriksaan',
    data() {
        return {
            user: {
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

                daftarPemeriksaan: [],
                pemeriksaanKimDar:[],
                pemeriksaanUrin:[],
                pemeriksaanHema:[],
                pemeriksaanLain:[],
                price: 0
            },
            pemeriksaanKimDar: [],
            pemeriksaanHema: [],
            pemeriksaanUrin: [],
            pemeriksaanLain: [],
            from: ''
        }
    },
    created() {
        let dbRef = db.collection('Pemeriksaan').doc(this.$route.params.id);
        dbRef.get().then((doc) => {
            this.user.id = doc.id
            this.user.nomor = doc.data().nomor
            this.user.namaPasien = doc.data().namaPasien
            this.user.tanggal = doc.data().tanggal
            this.user.tanggalLahir = doc.data().tanggalLahir
            this.user.tempatLahir = doc.data().tempatLahir
            this.user.jenisKelamin = doc.data().jenisKelamin
            this.user.statusPasien = doc.data().statusPasien
            this.user.nik = doc.data().nik
            this.user.nomorJamkes = doc.data().nomorJamkes
            this.user.nomorKontak = doc.data().nomorKontak
            this.user.alamatLengkap = doc.data().alamatLengkap
            this.user.nomorOrderLab = doc.data().nomorOrderLab
            this.user.namaDokter = doc.data().namaDokter
            this.user.namaRuangan = doc.data().namaRuangan
            this.user.nomorTelpRuangan = doc.data().nomorTelpRuangan
            this.user.diagnosa = doc.data().diagnosa
            this.user.daftarPemeriksaan = doc.data().daftarPemeriksaan
            this.user.pemeriksaanKimDar = doc.data().pemeriksaanKimDar
            this.user.pemeriksaanHema = doc.data().pemeriksaanHema
            this.user.pemeriksaanUrin = doc.data().pemeriksaanUrin
            this.user.pemeriksaanLain = doc.data().pemeriksaanLain
            this.user.price = doc.data().price

            this.pemeriksaanKimDar = doc.data().pemeriksaanKimDar
            this.pemeriksaanHema = doc.data().pemeriksaanHema
            this.pemeriksaanUrin = doc.data().pemeriksaanUrin
            this.pemeriksaanLain = doc.data().pemeriksaanLain

            this.from = localStorage.getItem('From')
        }).catch((error) => {
            console.log(error)
        });
    },
    methods: {
        kembali() {
            if(this.from === 'KimDar'){
                this.$router.push('KimiaDarah')
            } else if (this.from === 'Hema'){
                this.$router.push('Hematologi')
            } else if (this.from === 'Urin'){
                this.$router.push('Urinologi')
            } else if (this.from === 'Lain'){
                this.$router.push('LainLain')
            }
        },
        addData() {
            db.collection('PreReview').doc(this.user.nomorOrderLab).set(this.user)
        }
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
#reviewHasil{
    margin-top: 2rem;
}
</style>