<template>
    <div class="row justify-content-center">
        <b-alert id="alert"
            :show="dismissCountDown"
            dismissible
            variant="danger"
            @dismissed="dismissCountDown=0"
            @dismiss-count-down="countDownChanged"
            >
            <p>Update Pemeriksaan Pasien Gagal</p>
        </b-alert>
        <div class="col-lg-5">
            <button class="btn btn-danger btn-block" @click="kembali" style="width:min-content; float: right;">Kembali</button>
            <h3 class="text-center" style="margin-left:5rem;">Update</h3>
                <div>
                    <h3>Pemeriksaan Pasien</h3>
                    <div class="form-group">
                        <label>Nomor Rekam Medik</label>
                        <input type="text" class="form-control" v-model="user.nomor" disabled required>
                    </div>
                    <div class="form-group">
                        <label>Nama Pasien</label>
                        <input type="text" class="form-control" placeholder="Nama Pasien" v-model="user.namaPasien" required>
                    </div>
                    <div class="form-group">
                        <label>Tempat Lahir</label>
                        <input type="text" class="form-control" placeholder="Tempat Lahir" v-model="user.tempatLahir" required>
                    </div>
                    <div class="form-group">
                        <label>Tanggal</label>
                        <date-picker v-model="user.tanggal" value-type="format" format="YYYY-MM-DD"></date-picker>
                    </div>
                    <div class="form-group">
                        <label>Jenis Kelamin</label>
                        <b-form-select type="text" class="form-control" placeholder="Jenis Kelamin" v-model="user.jenisKelamin" required :options="jenisKelamin"></b-form-select>
                    </div>
                    <div class="form-group">
                        <label>Status Pasien</label>
                        <b-form-select type="text" class="form-control" placeholder="Status Pasien" v-model="user.statusPasien" :options="statusPasien"></b-form-select>
                    </div>
                </div>
                <div>
                    <h3>Data Pengirim</h3>
                    <div class="form-group">
                        <label>Nama Dokter</label>
                        <b-form-select type="text" class="form-control" placeholder="Nama Dokter" v-model="user.namaDokter" :options="namaDokter"></b-form-select>
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
                        <b-form-textarea
                            id="textarea"
                            v-model="user.diagnosa"
                            placeholder="Diagnosa"
                            required
                        ></b-form-textarea>
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
                                <tr>
                                    <td><p>Total: {{user.price}}</p></td>
                                </tr>
                            </tbody>
                        </table>
                        <p v-if="user.daftarPemeriksaan.length === 0"> Tidak Ada Pemeriksaan </p>
                    </div>
                    <div class="form-group">
                        <button class="btn btn-primary btn-block" @click="onUpdateForm">Update</button>
                    </div>
                </div>
        </div>
    </div>
</template>
<script>
    import { db } from '../components/firebase';
    import DatePicker from 'vue2-datepicker';
    import 'vue2-datepicker/index.css';
    import DaftarPemeriksaan from '../layout/DaftarPemeriksaan'

    export default {
        name: 'UpdateData',
        components: {
            DatePicker,
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
                jenisKelamin: [
                    {value: 'Laki-Laki', text: 'Laki-Laki'},
                    {value: 'Perempuan', text: 'Perempuan'}
                ],
                statusPasien:[
                    {value: 'Umum', text: 'Umum'},
                    {value: 'BPJS', text: 'BPJS'},
                    {value: 'Asuransi', text: 'Asuransi'},
                    {value: 'MCU', text: 'MCU'}
                ],
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
                showDismissibleAlert: false
            }
        },
        created() {
            let dbRef = db.collection('Pemeriksaan').doc(this.$route.params.id);
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
            }).catch((error) => {
                console.log(error)
            });
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
                db.collection('Pemeriksaan').doc(this.user.nomorOrderLab)
                .update(this.user).then(() => {
                    this.$router.push('Registrasi')
                }).catch(() => {
                    this.showAlert()
                });
            },
            countDownChanged(dismissCountDown) {
                this.dismissCountDown = dismissCountDown
            },
            showAlert() {
                this.dismissCountDown = this.dismissSecs
            },
            kembali(){
                this.$router.push('Registrasi')
            },
            getData() {
                if(this.user.daftarPemeriksaan === null){
                    this.user.daftarPemeriksaan = JSON.parse(localStorage.getItem('DaftarPemeriksaan'))
                    this.user.pemeriksaanKimDar = JSON.parse(localStorage.getItem('PemeriksaanKimDar'))
                    this.user.pemeriksaanHema = JSON.parse(localStorage.getItem('PemeriksaanHema'))
                    this.user.pemeriksaanUrin = JSON.parse(localStorage.getItem('PemeriksaanUrin'))
                    this.user.pemeriksaanLain = JSON.parse(localStorage.getItem('PemeriksaanLain'))
                    this.user.price = parseInt(JSON.parse(localStorage.getItem('BiayaPemeriksaan')))
                }
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