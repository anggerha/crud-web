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
            <p>Tambah Permintaan Pemeriksaan Gagal</p>
        </b-alert>
        <div >
            <h3 class="text-center">Pasien</h3>
            <form @submit.prevent="onFormSubmit">
                <div>
                    <h3>Data Pasien</h3>
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
                        <input type="text" class="form-control" placeholder="Nama Ruangan" v-model="user.namaRuangan" required>
                    </div>
                    <div class="form-group">
                        <label>Nomor Telp Ruangan</label>
                        <input type="text" class="form-control" minlength="11" maxlength="12" onkeypress="return event.charCode >= 48 && event.charCode <=57" placeholder="Nomor Telp Ruangan" v-model="user.nomorTelpRuangan" required>
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
                    <div class="form-group">
                        <button class="btn btn-primary btn-block">Tambah</button>
                    </div>
                </div>
            </form>
            <button class="btn btn-danger btn-block" @click="$bvModal.hide('modal-pp')">Batal</button>
        </div>
    </div>
  </div>
</template>

<script>
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';

import { db } from '../components/firebase'
export default {
    name: 'Add',
    components:{
        DatePicker
    },
    data() {
        return {
            user: {
                nomor: '',
                namaPasien: '',
                tempatLahir: '',
                tanggal:'',
                jenisKelamin:'',
                statusPasien:'',

                namaDokter:'',
                namaRuangan:'',
                nomorTelpRuangan:'',
                diagnosa:''
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

            dismissSecs: 2,
            dismissCountDown: 0,
            showDismissibleAlert: false
        }
    },
    created() {
        this.countPasien()
    },
    methods: {
        onFormSubmit(event) {
            event.preventDefault()
            db.collection('Pemeriksaan').add(this.user).then(() => {
                this.user.nomor = 
                this.user.namaPasien = ''
                this.user.tempatLahir = ''
                this.user.tanggal = ''
                this.user.jenisKelamin = ''
                this.user.statusPasien = ''
                this.user.namaDokter = ''
                this.user.namaRuangan = ''
                this.user.nomorTelpRuangan = ''
                this.user.diagnosa = ''
                this.$bvModal.hide('modal-pp')
            }).catch(() => {
                this.showAlert()
            });
        },
        countPasien(){
            db.collection('Pemeriksaan').get().then(snap => {
            this.user.nomor = snap.size + 1 // will return the collection size
            });
        },
        countDownChanged(dismissCountDown) {
            this.dismissCountDown = dismissCountDown
        },
        showAlert() {
            this.dismissCountDown = this.dismissSecs
        },
    }
}
</script>