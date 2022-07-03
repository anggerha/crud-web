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
            <h3 class="text-center">Tambah Jenis Pemeriksaan Hematologi</h3>
            <form @submit.prevent="onFormSubmit">
                <div>
                    <div class="form-group">
                        <label>Jenis Pemeriksaan</label>
                        <input type="text" class="form-control" placeholder="Jenis Pemeriksaan Hematologi" v-model="hematologi.jenisPemeriksaan" required>
                    </div>
                    <div class="form-group">
                        <label>Kode Pemeriksaan</label>
                        <input type="text" class="form-control" placeholder="Kode Pemeriksaan" v-model="hematologi.kode" required>
                    </div>
                    <div class="form-group">
                        <label>Satuan</label>
                        <input type="text" class="form-control" placeholder="Satuan" v-model="hematologi.satuan" required>
                    </div>
                    <div class="form-group">
                        <label>Nilai Rujukan</label>
                        <input type="text" class="form-control" placeholder="Nilai Rujukan" v-model="hematologi.nilaiRujukan" required>
                    </div>
                    <div class="form-group">
                        <label>Metode</label>
                        <input type="text" class="form-control" placeholder="Metode" v-model="hematologi.metode" required>
                    </div>
                    <div class="form-group">
                        <label>Harga</label>
                        <input type="number" class="form-control" placeholder="Harga" v-model="hematologi.harga" required>
                    </div>
                </div>
                <div class="form-group">
                    <button class="btn btn-primary btn-block">Tambah</button>
                </div>
            </form>
            <button class="btn btn-danger btn-block" @click="$bvModal.hide('modal-ht')">Batal</button>
        </div>
    </div>
  </div>
</template>

<script>

import { db } from '../components/firebase'
export default {
    name: 'Addhematologi',
    data() {
        return {
            hematologi: {
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
            db.collection('Hematologi').doc(this.hematologi.jenisPemeriksaan).set(this.hematologi).then(() => {
                this.hematologi.jenisPemeriksaan = '',
                this.hematologi.kode = '',
                this.hematologi.satuan = '',
                this.hematologi.nilaiRujukan = '',
                this.hematologi.metode = '',
                this.hematologi.harga = null
                this.$bvModal.hide('modal-ht')
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