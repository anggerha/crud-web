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
            <h3 class="text-center">Tambah Jenis Pemeriksaan Kimia Darah</h3>
            <form @submit.prevent="onFormSubmit">
                <div>
                    <div class="form-group">
                        <label>Jenis Pemeriksaan</label>
                        <input type="text" class="form-control" placeholder="Jenis Pemeriksaan Kimia Darah" v-model="kimiaDarah.jenisPemeriksaan" required>
                    </div>
                    <div class="form-group">
                        <label>Kode Pemeriksaan</label>
                        <input type="text" class="form-control" placeholder="Kode Pemeriksaan" v-model="kimiaDarah.kode" required>
                    </div>
                    <div class="form-group">
                        <label>Satuan</label>
                        <input type="text" class="form-control" placeholder="Satuan" v-model="kimiaDarah.satuan" required>
                    </div>
                    <div class="form-group">
                        <label>Nilai Rujukan</label>
                        <input type="text" class="form-control" placeholder="Nilai Rujukan" v-model="kimiaDarah.nilaiRujukan" required>
                    </div>
                    <div class="form-group">
                        <label>Metode</label>
                        <input type="text" class="form-control" placeholder="Nilai Rujukan" v-model="kimiaDarah.metode" required>
                    </div>
                    <div class="form-group">
                        <label>Harga</label>
                        <input type="number" class="form-control" placeholder="Nilai Rujukan" v-model="kimiaDarah.harga" required>
                    </div>
                </div>
                <div class="form-group">
                    <button class="btn btn-primary btn-block">Tambah</button>
                </div>
            </form>
            <button class="btn btn-danger btn-block" @click="$bvModal.hide('modal-kd')">Batal</button>
        </div>
    </div>
  </div>
</template>

<script>

import { db } from '../components/firebase'
export default {
    name: 'AddKimiaDarah',
    data() {
        return {
            kimiaDarah: {
                jenisPemeriksaan: '',
                kode: '',
                satuan: '',
                nilaiRujukan: '',
                metode: '',
                harga: null,
                status: false
            },
        
            dismissSecs: 2,
            dismissCountDown: 0,
            showDismissibleAlert: false
        }
    },
    methods: {
        onFormSubmit(event) {
            event.preventDefault()
            db.collection('Kimia Darah').doc(this.kimiaDarah.jenisPemeriksaan).set(this.kimiaDarah).then(() => {
                this.kimiaDarah.jenisPemeriksaan = '',
                this.kimiaDarah.kode = '',
                this.kimiaDarah.satuan = '',
                this.kimiaDarah.nilaiRujukan = '',
                this.kimiaDarah.metode = '',
                this.kimiaDarah.harga = null
                this.$bvModal.hide('modal-kd')
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