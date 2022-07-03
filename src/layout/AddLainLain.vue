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
            <p>Tambah Pemeriksaan Gagal</p>
        </b-alert>
        <div >
            <h3 class="text-center">Tambah Jenis Pemeriksaan Lain Lain</h3>
            <form @submit.prevent="onFormSubmit">
                <div>
                    <div class="form-group">
                        <label>Jenis Pemeriksaan</label>
                        <input type="text" class="form-control" placeholder="Jenis Pemeriksaan Lain Lain" v-model="lainLain.jenisPemeriksaan" required>
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
                        <input type="text" class="form-control" placeholder="Metode" v-model="lainLain.metode" required>
                    </div>
                    <div class="form-group">
                        <label>Harga</label>
                        <input type="number" class="form-control" placeholder="Harga" v-model="lainLain.harga" required>
                    </div>
                </div>
                <div class="form-group">
                    <button class="btn btn-primary btn-block">Tambah</button>
                </div>
            </form>
            <button class="btn btn-danger btn-block" @click="$bvModal.hide('modal-ll')">Batal</button>
        </div>
    </div>
  </div>
</template>

<script>

import { db } from '../components/firebase'
export default {
    name: 'AddLainLain',
    data() {
        return {
            lainLain: {
                jenisPemeriksaan: '',
                kode: '',
                satuan: '',
                nilaiRujukan: '',
                metode: '',
                harga: null,
                status: false,
                hasil: ''
            },
        
            dismissSecs: 2,
            dismissCountDown: 0,
            showDismissibleAlert: false
        }
    },
    methods: {
        onFormSubmit(event) {
            event.preventDefault()
            db.collection('Lain Lain').doc(this.lainLain.jenisPemeriksaan).set(this.lainLain).then(() => {
                this.lainLain.jenisPemeriksaan = '',
                this.lainLain.kode = '',
                this.lainLain.satuan = '',
                this.lainLain.nilaiRujukan = '',
                this.lainLain.metode = '',
                this.lainLain.harga = null
                this.$bvModal.hide('modal-ll')
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
    }
}
</script>