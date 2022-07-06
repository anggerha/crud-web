<template>
    <div>
        <div>
            <h2>Daftar Item</h2>
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>Jenis Pemeriksaan</th>
                        <th>Satuan</th>
                        <th>Nilai Rujukan</th>
                        <th>Metode</th>
                        <th>Harga</th>
                        <th>Opsi</th>
                    </tr>
                </thead>
                <tbody v-if="daftarPemeriksaan.length !== 0">
                    <tr v-for="daftarpemeriksaan in daftarPemeriksaan" :key="daftarpemeriksaan.key">
                        <td>{{ daftarpemeriksaan.jenisPemeriksaan }}</td>
                        <td>{{ daftarpemeriksaan.satuan }}</td>
                        <td>{{ daftarpemeriksaan.nilaiRujukan }}</td>
                        <td>{{ daftarpemeriksaan.metode }}</td>
                        <td>Rp. {{ daftarpemeriksaan.harga }}</td>
                        <td>
                            <button class="btn btn-danger" @click.prevent="removePemeriksaan(daftarpemeriksaan.key, daftarpemeriksaan.harga)">Batal</button>
                        </td>
                    </tr>
                    <tr>
                        <td>Total: {{price}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div>
            <h2>Kimia Darah</h2>
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>Jenis Pemeriksaan</th>
                        <th>Satuan</th>
                        <th>Nilai Rujukan</th>
                        <th>Metode</th>
                        <th>Harga</th>
                        <th>Opsi</th>
                    </tr>
                </thead>
                <tbody v-if="kimiaDarah.length !== 0">
                    <tr v-for="kimiadarah in kimiaDarah" :key="kimiadarah.key">
                        <td>{{ kimiadarah.jenisPemeriksaan }}</td>
                        <td>{{ kimiadarah.satuan }}</td>
                        <td>{{ kimiadarah.nilaiRujukan }}</td>
                        <td>{{ kimiadarah.metode }}</td>
                        <td>Rp. {{ kimiadarah.harga }}</td>
                        <td>
                            <button class="btn btn-success" @click.prevent="addPemeriksaanKimiaDarah(kimiadarah.key)">Tambah</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div>
            <h2>Hematologi</h2>
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>Jenis Pemeriksaan</th>
                        <th>Satuan</th>
                        <th>Nilai Rujukan</th>
                        <th>Metode</th>
                        <th>Harga</th>
                        <th>Opsi</th>
                    </tr>
                </thead>
                <tbody v-if="hematologi.length !== 0">
                    <tr v-for="hematologis in hematologi" :key="hematologis.key">
                        <td>{{ hematologis.jenisPemeriksaan }}</td>
                        <td>{{ hematologis.satuan }}</td>
                        <td>{{ hematologis.nilaiRujukan }}</td>
                        <td>{{ hematologis.metode }}</td>
                        <td>Rp. {{ hematologis.harga }}</td>
                        <td>
                            <button class="btn btn-success" @click.prevent="addPemeriksaanHematologi(hematologis.key)">Tambah</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div>
            <h2>Urinologi</h2>
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>Jenis Pemeriksaan</th>
                        <th>Satuan</th>
                        <th>Nilai Rujukan</th>
                        <th>Metode</th>
                        <th>Harga</th>
                        <th>Opsi</th>
                    </tr>
                </thead>
                <tbody v-if="urinologi.length !== 0">
                    <tr v-for="urinologis in urinologi" :key="urinologis.key">
                        <td>{{ urinologis.jenisPemeriksaan }}</td>
                        <td>{{ urinologis.satuan }}</td>
                        <td>{{ urinologis.nilaiRujukan }}</td>
                        <td>{{ urinologis.metode }}</td>
                        <td>Rp. {{ urinologis.harga }}</td>
                        <td>
                            <button class="btn btn-success" @click.prevent="addPemeriksaanUrinologi(urinologis.key)">Tambah</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div>
            <h2>Lain Lain</h2>
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>Jenis Pemeriksaan</th>
                        <th>Satuan</th>
                        <th>Nilai Rujukan</th>
                        <th>Metode</th>
                        <th>Harga</th>
                        <th>Opsi</th>
                    </tr>
                </thead>
                <tbody v-if="lainLain.length !== 0">
                    <tr v-for="lainlain in lainLain" :key="lainlain.key">
                        <td>{{ lainlain.jenisPemeriksaan }}</td>
                        <td>{{ lainlain.satuan }}</td>
                        <td>{{ lainlain.nilaiRujukan }}</td>
                        <td>{{ lainlain.metode }}</td>
                        <td>Rp. {{ lainlain.harga }}</td>
                        <td>
                            <button class="btn btn-success" @click.prevent="addPemeriksaanLainLain(lainlain.key)">Tambah</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <b-button @click="sendData">Selesai</b-button>
    </div>
</template>

<script>
import { db } from '../components/firebase';
import { EventBus } from '../main.js'

export default {
    name: 'DaftarPemeriksaan',
    data() {
        return {
            kimiaDarah: [],
            hematologi: [],
            urinologi: [],
            lainLain: [],
            daftarPemeriksaan: [],

            pemeriksaanKimDar:[],
            pemeriksaanUrin:[],
            pemeriksaanHema:[],
            pemeriksaanLain:[],

            price: null,
        }
    },
    created() {
        db.collection('Kimia Darah').orderBy('jenisPemeriksaan', 'asc').onSnapshot((snapshotChange) => {
            this.kimiaDarah = [];
            snapshotChange.forEach((doc) => {
                this.kimiaDarah.push({
                    key: doc.id,
                    jenisPemeriksaan: doc.data().jenisPemeriksaan,
                    satuan: doc.data().satuan,
                    nilaiRujukan: doc.data().nilaiRujukan,
                    metode: doc.data().metode,
                    harga: doc.data().harga,
                })
            });
        });
        db.collection('Hematologi').orderBy('jenisPemeriksaan', 'asc').onSnapshot((snapshotChange) => {
            this.hematologi = [];
            snapshotChange.forEach((doc) => {
                this.hematologi.push({
                    key: doc.id,
                    jenisPemeriksaan: doc.data().jenisPemeriksaan,
                    satuan: doc.data().satuan,
                    nilaiRujukan: doc.data().nilaiRujukan,
                    metode: doc.data().metode,
                    harga: doc.data().harga,
                })
            });
        });
        db.collection('Urinologi').orderBy('jenisPemeriksaan', 'asc').onSnapshot((snapshotChange) => {
            this.urinologi = [];
            snapshotChange.forEach((doc) => {
                this.urinologi.push({
                    key: doc.id,
                    jenisPemeriksaan: doc.data().jenisPemeriksaan,
                    satuan: doc.data().satuan,
                    nilaiRujukan: doc.data().nilaiRujukan,
                    metode: doc.data().metode,
                    harga: doc.data().harga,
                })
            });
        });
        db.collection('Lain Lain').orderBy('jenisPemeriksaan', 'asc').onSnapshot((snapshotChange) => {
            this.lainLain = [];
            snapshotChange.forEach((doc) => {
                this.lainLain.push({
                    key: doc.id,
                    jenisPemeriksaan: doc.data().jenisPemeriksaan,
                    satuan: doc.data().satuan,
                    nilaiRujukan: doc.data().nilaiRujukan,
                    metode: doc.data().metode,
                    harga: doc.data().harga,
                })
            });
        });
    },
    methods: {
        async addPemeriksaanKimiaDarah(id) {
            const snapshot = await db.collection('Kimia Darah').doc(id).get()
            this.daftarPemeriksaan.push({
                jenisPemeriksaan: snapshot.data().jenisPemeriksaan,
                satuan: snapshot.data().satuan,
                nilaiRujukan: snapshot.data().nilaiRujukan,
                metode: snapshot.data().metode,
                harga: snapshot.data().harga
            })
            this.pemeriksaanKimDar.push({
                jenisPemeriksaan: snapshot.data().jenisPemeriksaan,
                satuan: snapshot.data().satuan,
                nilaiRujukan: snapshot.data().nilaiRujukan,
                metode: snapshot.data().metode,
                harga: snapshot.data().harga,
                prosesKimDar: 'Proses'
            })
            this.price = this.price + parseInt(snapshot.data().harga)
        },
        async addPemeriksaanHematologi(id) {
            const snapshot = await db.collection('Hematologi').doc(id).get()
            this.daftarPemeriksaan.push({
                jenisPemeriksaan: snapshot.data().jenisPemeriksaan,
                satuan: snapshot.data().satuan,
                nilaiRujukan: snapshot.data().nilaiRujukan,
                metode: snapshot.data().metode,
                harga: snapshot.data().harga
            })
            this.pemeriksaanHema.push({
                jenisPemeriksaan: snapshot.data().jenisPemeriksaan,
                satuan: snapshot.data().satuan,
                nilaiRujukan: snapshot.data().nilaiRujukan,
                metode: snapshot.data().metode,
                harga: snapshot.data().harga,
                prosesHema: 'Proses'
            })
            this.price = this.price + parseInt(snapshot.data().harga)
        },
        async addPemeriksaanUrinologi(id) {
            const snapshot = await db.collection('Urinologi').doc(id).get()
            this.daftarPemeriksaan.push({
                jenisPemeriksaan: snapshot.data().jenisPemeriksaan,
                satuan: snapshot.data().satuan,
                nilaiRujukan: snapshot.data().nilaiRujukan,
                metode: snapshot.data().metode,
                harga: snapshot.data().harga
            })
            this.pemeriksaanUrin.push({
                jenisPemeriksaan: snapshot.data().jenisPemeriksaan,
                satuan: snapshot.data().satuan,
                nilaiRujukan: snapshot.data().nilaiRujukan,
                metode: snapshot.data().metode,
                harga: snapshot.data().harga,
                prosesUrin: 'Proses'
            })
            this.price = this.price + parseInt(snapshot.data().harga)
        },
        async addPemeriksaanLainLain(id) {
            const snapshot = await db.collection('Lain Lain').doc(id).get()
            this.daftarPemeriksaan.push({
                jenisPemeriksaan: snapshot.data().jenisPemeriksaan,
                satuan: snapshot.data().satuan,
                nilaiRujukan: snapshot.data().nilaiRujukan,
                metode: snapshot.data().metode,
                harga: snapshot.data().harga
            })
            this.pemeriksaanLain.push({
                jenisPemeriksaan: snapshot.data().jenisPemeriksaan,
                satuan: snapshot.data().satuan,
                nilaiRujukan: snapshot.data().nilaiRujukan,
                metode: snapshot.data().metode,
                harga: snapshot.data().harga,
                prosesLain: 'Proses'
            })
            this.price = this.price + parseInt(snapshot.data().harga)
        },
        async removePemeriksaan() {
            var beforePrice = parseInt(this.daftarPemeriksaan[0].harga)
            this.daftarPemeriksaan.splice(0, 1)
            if(this.daftarPemeriksaan.length !== 0){
                this.price = this.price - beforePrice
                console.log(this.daftarPemeriksaan[0].harga)
            } else {
                this.price = 0
            }
        },
        sendData() {
            EventBus.$emit('daftarPemeriksaan', this.daftarPemeriksaan)
            EventBus.$emit('pemeriksaanKimDar', this.pemeriksaanKimDar)
            EventBus.$emit('pemeriksaanHema', this.pemeriksaanHema)
            EventBus.$emit('pemeriksaanUrin', this.pemeriksaanUrin)
            EventBus.$emit('pemeriksaanLain', this.pemeriksaanLain)
            EventBus.$emit('price', this.price)
            this.$bvModal.hide('daftar-pemeriksaan')
        },
    }
}
</script>