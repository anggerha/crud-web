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
            <h3 class="text-center" style="margin-left:5rem;">Update Jenis Pemeriksaan</h3>
            <form @submit.prevent="onUpdateForm">
                <div>
                    <h3>{{ lainLain.jenisPemeriksaan }}</h3>
                    <div class="form-group">
                        <label>Jenis Pemeriksaan</label>
                        <input type="text" class="form-control" placeholder="Nama Pemeriksaan" v-model="lainLain.jenisPemeriksaan" required>
                    </div>
                    <div class="form-group">
                        <label>Kode Pemeriksaan</label>
                        <input type="text" class="form-control" placeholder="Kode Pemeriksaan" v-model="lainLain.kode" required>
                    </div>
                    <div class="form-group">
                        <label>Satuan</label>
                        <input type="text" class="form-control" placeholder="Satuan" v-model="lainLain.satuan" required>
                    </div>
                    <div class="form-group">
                        <label>Nilai Rujukan</label>
                        <input type="text" class="form-control" placeholder="Nilai Rujukan" v-model="lainLain.nilaiRujukan" required>
                    </div>
                    <div class="form-group">
                        <label>Metode</label>
                        <input type="text" class="form-control" placeholder="Nilai Rujukan" v-model="lainLain.metode" required>
                    </div>
                    <div class="form-group">
                        <label>Harga</label>
                        <input type="number" class="form-control" placeholder="Nilai Rujukan" v-model="lainLain.harga" required>
                    </div>
                </div>
                <div class="form-group">
                    <button class="btn btn-primary btn-block">Update</button>
                </div>
            </form>
        </div>
    </div>
</template>
<script>
    import { db } from '../components/firebase';
    import 'vue2-datepicker/index.css';

    export default {
        name: 'UpdateDataKimiaDarah',
        data() {
            return {
                lainLain: {},
                
                dismissSecs: 2,
                dismissCountDown: 0,
                showDismissibleAlert: false
            }
        },
        created() {
            let dbRef = db.collection('Lain Lain').doc(this.$route.params.id);
            dbRef.get().then((doc) => {
                this.lainLain = doc.data();
            }).catch((error) => {
                console.log(error)
            })
        },
        methods: {
            onUpdateForm(event) {
                event.preventDefault()
                db.collection('Lain Lain').doc(this.$route.params.id)
                .update(this.lainLain).then(() => {
                    this.$router.push('LainLain')
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
                this.$router.push('LainLain')
            }
        }
    }
</script>