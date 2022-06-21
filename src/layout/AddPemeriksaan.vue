<template>
  <div>
    <div class="row justify-content-center">
        <b-alert id="alert"
            :show="dismissCountDown"
            dismissible
            variant="danger"
            @dismissed="dismissCountDown=0"
            @dismiss-count-down="countDownChanged"
            >
            <p>{{alert}}</p>
        </b-alert>
        <div class="col-lg-5">
            
            <button class="btn btn-danger btn-block" @click="kembali" style="width:min-content; float: right;">Kembali</button>
            <h3 class="text-center" style="margin-left:5rem;">Add Pemeriksaan</h3>
            
                <div>
                    <div class="form-group">
                        <label>Nomor Rekam Medik</label>
                        <input type="text" class="form-control" v-model="user.nomor" disabled required>
                    </div>
                    <div class="form-group">
                        <label>Nomor Order Lab</label>
                        <input type="text" class="form-control" v-model="user.nomorOrderLab" disabled required>
                    </div>
                    <div class="form-group">
                        <label>Nama Pasien</label>
                        <input type="text" class="form-control" placeholder="Nama Pasien" v-model="user.namaPasien" disabled required>
                    </div>
                    <div class="form-group">
                        <label>Tempat Lahir</label>
                        <input type="text" class="form-control" placeholder="Tempat Lahir" v-model="user.tempatLahir" required disabled>
                    </div>
                    <div class="form-group">
                        <label>Tanggal</label>
                        <input type="text" class="form-control" v-model="user.tanggal" value-type="format" format="YYYY-MM-DD" required disabled>
                    </div>
                    <div class="form-group">
                        <label>Jenis Kelamin</label>
                        <input type="text" class="form-control" placeholder="Jenis Kelamin" v-model="user.jenisKelamin" required disabled>
                    </div>
                    <div class="form-group">
                        <label>Status Pasien</label>
                        <input type="text" class="form-control" placeholder="Status Pasien" v-model="user.statusPasien" required disabled>
                    </div>
                </div>
                <div>
                    <h3>Data Pengirim</h3>
                    <div class="form-group">
                        <label>Nama Dokter</label>
                        <b-form-select type="text" class="form-control" placeholder="Nama Dokter" v-model="user.namaDokter" :options="namaDokter" required></b-form-select>
                    </div>
                    <div class="form-group">
                        <label>Nama Ruangan</label>
                        <b-form-select type="text" class="form-control" placeholder="Nama Ruangan" @click="getRoomNumber" v-model="user.namaRuangan" :options="namaRuangan" required></b-form-select>
                    </div>
                    <div class="form-group">
                        <label>Nomor Telp Ruangan</label>
                        <input type="text" class="form-control" minlength="4" maxlength="4" onkeypress="return event.charCode >= 48 && event.charCode <=57" placeholder="Nomor Telp Ruangan" v-model="user.nomorTelpRuangan" disabled required>
                    </div>
                    <div class="form-group">
                        <label>Diagnosa</label>
                        <b-form-textarea v-model="user.diagnosa" placeholder="Diagnosa" required></b-form-textarea>
                    </div>
                </div>
                <div>
                    <h3>Item Pemeriksaan</h3>
                    <button style="width:min-content; float: inline-end; color: black; background-color: transparent; border-style: none;" v-b-modal.daftar-pemeriksaan><b-icon icon="plus-lg"></b-icon></button>
                    <b-modal id="daftar-pemeriksaan" centered size="lg" hide-footer hide-header>
                        <daftar-pemeriksaan/>
                    </b-modal>
                    <button style="width:min-content; float: inline-end; color: black; background-color: transparent; border-style: none;" @click="getData"><b-icon icon="arrow-clockwise"></b-icon></button>
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th>Jenis Pemeriksaan</th>
                                <th>Satuan</th>
                                <th>Nilai Rujukan</th>
                                <th>Metode</th>
                                <th>Harga</th>
                            </tr>
                        </thead>
                        <tbody v-if="user.daftarPemeriksaan.length !== 0">
                            <tr v-for="daftarpemeriksaan in user.daftarPemeriksaan" :key="daftarpemeriksaan.key">
                                <td>{{ daftarpemeriksaan.jenisPemeriksaan }}</td>
                                <td>{{ daftarpemeriksaan.satuan }}</td>
                                <td>{{ daftarpemeriksaan.nilaiRujukan }}</td>
                                <td>{{ daftarpemeriksaan.metode }}</td>
                                <td>Rp. {{ daftarpemeriksaan.harga }}</td>
                            </tr>
                        </tbody>
                    </table>
                    <p v-if="user.daftarPemeriksaan.length === 0"> Tidak Ada Pemeriksaan </p>
                </div>
                <p>Total: {{user.price}}</p>
                <div class="form-group">
                    <button class="btn btn-primary btn-block" @click="onUpdateForm">Tambah</button>
                </div>
        </div>
    </div>
  </div>
</template>

<script>
import 'vue2-datepicker/index.css';
import { db } from '../components/firebase'
import DaftarPemeriksaan from './DaftarPemeriksaan.vue';

export default {
    name: 'AddPemeriksaan',
    components:{
        DaftarPemeriksaan
    },
    data() {
        return {
            user: {
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
                price: 0
            },
            namaDokter: [
                {value: 'dr. Arifoel Hajat, Sp.PK', text: 'dr. Arifoel Hajat, Sp.PK'},
                {value: 'dr. Budiono Raharjo, Sp.PK', text: 'dr. Budiono Raharjo, Sp.PK'},
                {value: 'dr. Imee Sridenga Surbakti, Sp.PK', text: 'dr. Imee Sridengan Surbakti, Sp.PK'},
                {value: 'dr. Fitry Hamka, Sp.PK', text: 'dr. Fitry Hamka, Sp.PK'},
            ],
            namaRuangan:[
                {value: 'Mawar', text: 'Mawar'},
                {value: 'Melati', text: 'Melati'},
                {value: 'Singkong', text: 'Singkong'},
                {value: 'Edelweis', text: 'Edelweis'},
            ],
            dismissSecs: 2,
            dismissCountDown: 0,
            showDismissibleAlert: false,
            alert: 'Tambah Pemeriksaan Gagal'
        }
    },
    created() {
        let dbRef = db.collection('Pasien').doc(this.$route.params.id);
        dbRef.get().then((doc) => {
            this.user.nomor = doc.data().nomor
            this.user.namaPasien = doc.data().namaPasien
            this.user.tanggal = doc.data().tanggal
            this.user.tempatLahir = doc.data().tempatLahir
            this.user.jenisKelamin = doc.data().jenisKelamin
            this.user.statusPasien = doc.data().statusPasien
            this.user.nik = doc.data().nik
            this.user.nomorJamkes = doc.data().nomorJamkes
            this.user.nomorKontak = doc.data().nomorKontak
            this.user.alamatLengkap = doc.data().alamatLengkap
        }).catch((error) => {
            console.log(error)
        });
        this.countPasien()
        this.getData()
    },
    mounted() {
        this.$nextTick(function () {
            window.setInterval(() => {
                this.getRoomNumber()
            },100);
        })
    },
    methods: {
        onUpdateForm() {
            if(this.user.daftarPemeriksaan.length !== 0 && this.user.namaDokter !== '' && this.user.namaRuangan !== '' && this.user.nomorTelpRuangan != '' && this.user.diagnosa !== ''){
                db.collection('Pemeriksaan').doc(this.user.nomorOrderLab).set(this.user)
                this.$router.push('Registrasi')
            } else {
                this.alert = 'Tidak Boleh Ada Data yang Kosong'
                this.showAlert()
            }
            
        },
        countDownChanged(dismissCountDown) {
            this.dismissCountDown = dismissCountDown
        },
        showAlert() {
            this.dismissCountDown = this.dismissSecs
        },
        kembali() {
            this.$router.push('Registrasi')
        },
        countPasien(){
            db.collection('Pemeriksaan').get().then(snap => {
                this.user.nomorOrderLab = 'PK'+ this.user.tanggal + (snap.size + 1) // will return the collection size
            });
        },
        getData() {
            this.user.daftarPemeriksaan = JSON.parse(localStorage.getItem('DaftarPemeriksaan'))
            this.user.pemeriksaanKimDar = JSON.parse(localStorage.getItem('PemeriksaanKimDar'))
            this.user.pemeriksaanHema = JSON.parse(localStorage.getItem('PemeriksaanHema'))
            this.user.pemeriksaanUrin = JSON.parse(localStorage.getItem('PemeriksaanUrin'))
            this.user.pemeriksaanLain = JSON.parse(localStorage.getItem('PemeriksaanLain'))
            this.user.price = parseInt(localStorage.getItem('BiayaPemeriksaan'))
        },
        sendNomor() {
            localStorage.setItem('NomorPasien', JSON.stringify(this.user.nomor))
        },
        getRoomNumber() {
            if (this.user.namaRuangan !== '') {
                if (this.user.namaRuangan === 'Mawar'){
                    this.user.nomorTelpRuangan = '1234'
                } else if (this.user.namaRuangan === 'Melati'){
                    this.user.nomorTelpRuangan = '5678'
                } else if (this.user.namaRuangan === 'Singkong') {
                    this.user.nomorTelpRuangan = '2345'
                } else if (this.user.namaRuangan === 'Edelweis') {
                    this.user.nomorTelpRuangan = '6789'
                }
            } else {
                this.user.nomorTelpRuangan = ''
            }
        },
    }
}
</script>