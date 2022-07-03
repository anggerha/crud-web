<template>
    <div>
        <div>
            <sidebar/>
        </div>
        <div id="outer">
            <div v-for="user in Users" :key="user.key" class="container">
            <h3 style="float:left;">Review Hasil Laboratorium {{user.key}}</h3>
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
                                    <td><b-form-input id="hasil" v-model="pemeriksaankimdar.hasil" placeholder="Hasil"></b-form-input></td>
                                    <td>{{pemeriksaankimdar.satuan}}</td>
                                    <td>{{pemeriksaankimdar.nilaiRujukan}}</td>
                                </tr>
                            </tbody>
                            <tbody v-if="user.from === 'Hema'">
                                <tr v-for="pemeriksaanhema in user.pemeriksaanHema" :key="pemeriksaanhema.key">
                                    <td></td>
                                    <td>{{pemeriksaanhema.jenisPemeriksaan}}</td>
                                    <td><b-form-input id="hasil" v-model="pemeriksaanhema.hasil" placeholder="Hasil"></b-form-input></td>
                                    <td>{{pemeriksaanhema.satuan}}</td>
                                    <td>{{pemeriksaanhema.nilaiRujukan}}</td>
                                </tr>
                            </tbody>
                            <tbody v-if="user.from === 'Urin'">
                                <tr v-for="pemeriksaanurin in user.pemeriksaanUrin" :key="pemeriksaanurin.key">
                                    <td></td>
                                    <td>{{pemeriksaanurin.jenisPemeriksaan}}</td>
                                    <td><b-form-input id="hasil" v-model="pemeriksaanurin.hasil" placeholder="Hasil"></b-form-input></td>
                                    <td>{{pemeriksaanurin.satuan}}</td>
                                    <td>{{pemeriksaanurin.nilaiRujukan}}</td>
                                </tr>
                            </tbody>
                            <tbody v-if="user.from === 'Lain'">
                                <tr v-for="pemeriksaanlain in user.pemeriksaanLain" :key="pemeriksaanlain.key">
                                    <td></td>
                                    <td>{{pemeriksaanlain.jenisPemeriksaan}}</td>
                                    <td><b-form-input id="hasil" v-model="pemeriksaanlain.hasil" placeholder="Hasil"></b-form-input></td>
                                    <td>{{pemeriksaanlain.satuan}}</td>
                                    <td>{{pemeriksaanlain.nilaiRujukan}}</td>
                                </tr>
                            </tbody>
                        </table>
                        <div>
                            <h3 style="float:left">Catatan</h3>
                            <b-form-textarea v-model="user.catatan" placeholder="Catatan"></b-form-textarea>
                        </div>
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
            Users: []
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
                    catatan: doc.data().catatan,
                    from: doc.data().from,
                    price : doc.data().price
                })
            })
        })
    },
    methods: {
        
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