<template>
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
        <div class="col-lg-5">
            <button class="btn btn-danger btn-block" @click="kembali" style="width:min-content; float: right;">Kembali</button>
            <h3 class="text-center" style="margin-left:5rem;">Update User</h3>
            <form @submit.prevent="onUpdateForm">
                <div class="form-group">
                    <label>Nomor Rekam Medik</label>
                    <input type="text" class="form-control" v-model="user.nomor" required>
                </div>
                <div class="form-group">
                    <label>Nama Pasien</label>
                    <input type="text" class="form-control" placeholder="Nama Pasien" v-model="user.namaPasien" required>
                </div>
                <div class="form-group">
                    <label>Tanggal Order</label>
                    <date-picker v-model="user.tanggal" value-type="format" format="YYYY-MM-DD"></date-picker>
                </div>
                <div class="form-group">
                    <label>Tempat Lahir</label>
                    <input type="text" class="form-control" placeholder="Tempat Lahir" v-model="user.tempatLahir" required>
                </div>
                <div class="form-group">
                    <label>Tanggal Lahir</label>
                    <date-picker v-model="user.tanggalLahir" value-type="format" format="YYYY-MM-DD"></date-picker>
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
                    <label>Nomor BPJS</label>
                    <input type="text" class="form-control" onkeypress="return event.charCode >= 48 && event.charCode <=57" placeholder="Nomor Jamkes/BPJS/Asuransi" v-model="user.nomorJamkes">
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
                    <button class="btn btn-primary btn-block">Update User</button>
                </div>
            </form>
        </div>
    </div>
</template>
<script>
    import { db } from '../components/firebase';
    import DatePicker from 'vue2-datepicker';
    import 'vue2-datepicker/index.css';

    export default {
        name: 'UpdateData',
        components: {
            DatePicker
        },
        data() {
            return {
                user: {},
                jenisKelamin: [
                    {value: 'Laki-Laki', text: 'Laki-Laki'},
                    {value: 'Perempuan', text: 'Perempuan'}
                ],
                statusPasien:[
                    {value: 'Umum', text: 'Umum'},
                    {value: 'BPJS', text: 'BPJS'},
                ],
                dismissSecs: 2,
                dismissCountDown: 0,
                showDismissibleAlert: false
            }
        },
        created() {
            let dbRef = db.collection('Pasien').doc(this.$route.params.id);
            dbRef.get().then((doc) => {
                this.user = doc.data();
            }).catch((error) => {
                console.log(error)
            })
        },
        methods: {
            onUpdateForm(event) {
                event.preventDefault()
                db.collection('Pasien').doc(this.user.nomor)
                .update(this.user).then(() => {
                    this.$router.push('Registrasi')
                }).catch(() => {
                    this.showAlert()
                });
                if(this.user.nomorOrderLab !== ''){
                    db.collection('Pemeriksaan').doc(this.user.nomorOrderLab)
                    .update(this.user).then(() => {
                        this.$router.push('Registrasi')
                    }).catch(() => {
                        this.showAlert()
                    });
                }
            },
            countDownChanged(dismissCountDown) {
                this.dismissCountDown = dismissCountDown
            },
            showAlert() {
                this.dismissCountDown = this.dismissSecs
            },
            kembali(){
                this.$router.push('Registrasi')
            }
        }
    }
</script>