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
                    <h3>Urinologi Serologi</h3>
                    <div class="form-group">
                        <label>Jenis Pemeriksaan</label>
                        <input type="text" class="form-control" placeholder="Nama Pemeriksaan" v-model="urinologi.jenisPemeriksaan" required>
                    </div>
                    <div class="form-group">
                        <label>Kode Pemeriksaan</label>
                        <input type="text" class="form-control" placeholder="Kode Pemeriksaan" v-model="urinologi.kode" required>
                    </div>
                    <div class="form-group">
                        <label>Satuan</label>
                        <input type="text" class="form-control" placeholder="Satuan" v-model="urinologi.satuan" required>
                    </div>
                    <div class="form-group">
                        <label>Nilai Rujukan</label>
                        <input type="text" class="form-control" placeholder="Nilai Rujukan" v-model="urinologi.nilaiRujukan" required>
                    </div>
                    <div class="form-group">
                        <label>Metode</label>
                        <input type="text" class="form-control" placeholder="Nilai Rujukan" v-model="urinologi.metode" required>
                    </div>
                    <div class="form-group">
                        <label>Harga</label>
                        <input type="number" class="form-control" placeholder="Nilai Rujukan" v-model="urinologi.harga" required>
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
        name: 'UpdateImunologi',
        data() {
            return {
                urinologi: {},
                
                dismissSecs: 2,
                dismissCountDown: 0,
                showDismissibleAlert: false
            }
        },
        created() {
            let dbRef = db.collection('Urinologi').doc(this.$route.params.id);
            dbRef.get().then((doc) => {
                this.urinologi = doc.data();
            }).catch((error) => {
                console.log(error)
            })
        },
        methods: {
            onUpdateForm(event) {
                event.preventDefault()
                db.collection('Urinologi').doc(this.$route.params.id)
                .update(this.urinologi).then(() => {
                    this.$router.push('Urinologi')
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
                this.$router.push('Urinologi')
            }
        }
    }
</script>