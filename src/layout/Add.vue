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
            <p>Tambah Pasien Gagal</p>
        </b-alert>
        <div >
            <h3 class="text-center">Pasien</h3>
            <form @submit.prevent="onFormSubmit">
                <div class="form-group">
                    <label>Nomor Rekam Medik</label>
                    <input type="text" class="form-control" v-model="user.nomor" disabled required>
                </div>
                <div class="form-group">
                    <label>Nama Pasien</label>
                    <input type="text" class="form-control" placeholder="Nama Pasien" v-model="user.namaPasien" required>
                </div>
                <div class="form-group">
                    <label>Tanggal</label>
                    <date-picker v-model="user.tanggal" value-type="format" format="YYYY-MM-DD"></date-picker>
                </div>
                 <div class="form-group">
                    <label>Tempat Lahir</label>
                    <input type="text" class="form-control" placeholder="Tempat Lahir" v-model="user.tempatLahir" required>
                </div>
                <div class="form-group">
                    <label>Jenis Kelamin</label>
                    <b-form-select type="text" class="form-control" placeholder="Jenis Kelamin" v-model="user.jenisKelamin" required :options="jenisKelamin"></b-form-select>
                </div>
                <div class="form-group">
                    <label>Status Pasien</label>
                    <b-form-select type="text" class="form-control" placeholder="Status Pasien" v-model="user.statusPasien" :options="statusPasien"></b-form-select>
                </div>
                <div class="form-group">
                    <label>NIK</label>
                    <input type="text" class="form-control" minlength="16" maxlength="16" onkeypress="return event.charCode >= 48 && event.charCode <=57" placeholder="Nomor Induk Kependudukan" v-model="user.nik" required>
                </div>
                <div class="form-group">
                    <label>Nomor Jamkes/BPJS/Asuransi</label>
                    <input type="text" class="form-control" onkeypress="return event.charCode >= 48 && event.charCode <=57" placeholder="Nomor Jamkes/BPJS/Asuransi" v-model="user.nomorJamkes" required>
                </div>
                <div class="form-group">
                    <label>Nomor Kontak</label>
                    <input type="text" class="form-control" minlength="11" maxlength="12" onkeypress="return event.charCode >= 48 && event.charCode <=57" placeholder="Nomor Kontak" v-model="user.nomorKontak" required>
                </div>
                <div class="form-group">
                    <label>Alamat Lengkap</label>
                    <input type="text" class="form-control" placeholder="Alamat Lengkap" v-model="user.alamatLengkap" required>
                </div>
                <div class="form-group">
                    <button class="btn btn-primary btn-block">Tambah</button>
                </div>
            </form>
            <button class="btn btn-danger btn-block" @click="$bvModal.hide('modal-center')">Batal</button>
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
                tanggal:'',
                tempatLahir:'',
                jenisKelamin:'',
                statusPasien:'',
                nik:'',
                nomorJamkes:'',
                nomorKontak:'',
                alamatLengkap:'',
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
            db.collection('Pasien').doc(this.user.nomor).set(this.user).then(() => {
                this.user.nomor = 
                this.user.namaPasien = ''
                this.user.tanggal = ''
                this.user.jenisKelamin = ''
                this.user.statusPasien = ''
                this.user.nik = ''
                this.user.nomorJamkes = ''
                this.user.nomorKontak = ''
                this.user.alamatLengkap = ''
                this.$bvModal.hide('modal-center')
            }).catch(() => {
                this.showAlert()
            });
        },
        countPasien(){
            db.collection('Pasien').get().then(snap => {
                var today = new Date()
                var date = today.getFullYear()+''+(today.getMonth()+1)+''+today.getDate();
                this.user.nomor = '0' + date + (snap.size + 1) // will return the collection size
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