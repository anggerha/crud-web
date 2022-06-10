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
                        <button class="btn btn-primary btn-block">Update</button>
                    </div>
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
        name: 'Update Data',
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
            let dbRef = db.collection('Pemeriksaan').doc(this.$route.params.id);
            dbRef.get().then((doc) => {
                this.user = doc.data();
            }).catch((error) => {
                console.log(error)
            })
        },
        methods: {
            onUpdateForm(event) {
                event.preventDefault()
                db.collection('Pemeriksaan').doc(this.$route.params.id)
                .update(this.user).then(() => {
                    this.$router.push('PemeriksaanPasien')
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
                this.$router.push('PemeriksaanPasien')
            }
        }
    }
</script>