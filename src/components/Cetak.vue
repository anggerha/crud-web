<template>
    <div class="container" >
        <b-button variant="outline-danger" @click="kembali" style="display:flex; float: right;">Kembali</b-button>
        <b-button variant="outline-success" @click="cetak(user.key)" style="display:flex; float: right;">Cetak Halaman</b-button>
        <div ref="content">
            <table style="width: 75%; text-align: justify;">
            <tr>
                <td rowspan="5" class="kop"><img src="../assets/ProLab.png" alt="ProLab Logo" style="display:flex"></td>
                <td class="kop"><h4>PEMERINTAHAN KOTA YOGYAKARTA</h4></td>
            </tr>
            <tr>
                <td class="kop"><h1>PRO LABORATORIUM</h1></td>
            </tr>
            <tr>
                <td class="kop">Jl. Ngadinegaran MJ 99</td>
            </tr>
            <tr>
                <td class="kop">Telp. (0867) 030117 Email: prolaboratorium@gmail.go.id</td>
            </tr>
            <tr>
                <td class="kop">Kota Yogyakarta</td>
            </tr>
        </table>
        
        <h3 style="text-align: center; border-top: 2px solid black; border-bottom: 1px solid black; padding: 2%; margin-top: 2rem;">Review Hasil Laboratorium {{user.nomorOrderLab}}</h3>
        <br>
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
                                <th>Parameter</th>
                                <th>Hasil</th>
                                <th>Satuan</th>
                                <th>Nilai Rujukan</th>
                            </tr>
                        </thead>
                        <tbody v-if="user.from === 'KimDar'">
                            <tr v-for="pemeriksaankimdar in user.pemeriksaanKimDar" :key="pemeriksaankimdar.key">
                                <td>{{pemeriksaankimdar.jenisPemeriksaan}}</td>
                                <td>{{pemeriksaankimdar.hasil}}</td>
                                <td>{{pemeriksaankimdar.satuan}}</td>
                                <td>{{pemeriksaankimdar.nilaiRujukan}}</td>
                            </tr>
                        </tbody>
                        <tbody v-if="user.from === 'Hema'">
                            <tr v-for="pemeriksaanhema in user.pemeriksaanHema" :key="pemeriksaanhema.key">
                                <td>{{pemeriksaanhema.jenisPemeriksaan}}</td>
                                <td>{{pemeriksaanhema.hasil}}</td>
                                <td>{{pemeriksaanhema.satuan}}</td>
                                <td>{{pemeriksaanhema.nilaiRujukan}}</td>
                            </tr>
                        </tbody>
                        <tbody v-if="user.from === 'Urin'">
                            <tr v-for="pemeriksaanurin in user.pemeriksaanUrin" :key="pemeriksaanurin.key">
                                <td>{{pemeriksaanurin.jenisPemeriksaan}}</td>
                                <td>{{pemeriksaanurin.hasil}}</td>
                                <td>{{pemeriksaanurin.satuan}}</td>
                                <td>{{pemeriksaanurin.nilaiRujukan}}</td>
                            </tr>
                        </tbody>
                        <tbody v-if="user.from === 'Lain'">
                            <tr v-for="pemeriksaanlain in user.pemeriksaanLain" :key="pemeriksaanlain.key">
                                <td>{{pemeriksaanlain.jenisPemeriksaan}}</td>
                                <td>{{pemeriksaanlain.hasil}}</td>
                                <td>{{pemeriksaanlain.satuan}}</td>
                                <td>{{pemeriksaanlain.nilaiRujukan}}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { db } from '../components/firebase'
// import jsPDF from 'jspdf'
import html2pdf from 'html2pdf.js'

export default {
    name: 'Cetak',
    components: {},
    data() {
        return {
            user: {}
        }
    },
    created() {
        let dbRef = db.collection('ReviewHasil').doc(this.$route.params.id);
        dbRef.get().then((doc) => {
            this.user = doc.data();
        }).catch((error) => {
            console.log(error)
        })
    },
    methods: {
        kembali() {
            this.$router.push('/ReviewHasil')
        },
        cetak(id) {
            // var doc = new jsPDF('l', 'pt', 'A2');
            // var img = new Image()
            // img.src = '../assets/ProLab.png'
            // doc.addImage(img, 'png')
            // let margins = {
            //     top: 60,
            //     bottom: 60,
            //     left: 40,
            //     width: 500
            // };
            
            // doc.fromHTML(this.$refs.content, margins.left, margins.top,{
            //     'width' : margins.width,
            //     'font-size' : 120
            // });
            
            // doc.save(id+'.pdf');
            html2pdf(this.$refs.content, {
                margin: 0.5,
                filename: id+'.pdf',
                image: { type: 'jpeg', quality: 1 },
                html2canvas: { dpi: 192, letterRendering: true, scale: 2},
                jsPDF: { unit: 'in', format: 'letter', orientation: 'landscape' }

            })
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
#simpanHasil{
    margin-top: 2rem;
}
#outer{
    border: 2px solid black;
    padding: 1rem;
    margin: 2rem;
}
.kop{
    text-align: center;
}
</style>