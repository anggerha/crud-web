<template>
    <div class="row">
        <div class="col-md-12">
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Tanggal</th>
                        <th>No Order Lab</th>
                        <th>Nama Pasien</th>
                        <th>Dokter</th>
                        <th>Ruangan</th>
                        <th>Proses</th>
                        <th>Opsi</th>
                    </tr>
                </thead>
                <tbody v-if="UsersPemeriksaan.length !== 0">
                    <tr v-for="user in UsersPemeriksaan" :key="user.key">
                        <td></td>
                        <td>{{ user.tanggal }}</td>
                        <td>{{ user.nomorOrderLab }}</td>
                        <td>{{ user.namaPasien}}</td>
                        <td>{{ user.namaDokter }}</td>
                        <td>{{ user.namaRuangan }}</td>
                        <td>Proses</td>
                        <td>
                            <b-btn :to="{name: 'Update Pemeriksaan', params: { id: user.key }}" variant="outline-primary"><b-icon icon="pencil"></b-icon></b-btn>
                            <button v-if="loginAs === 'Registrasi' || loginAs === 'Manajer'" @click.prevent="deleteUser(user.nomorOrderLab)" class="btn btn-danger"><b-icon icon="trash"></b-icon></button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <h1 v-if="UsersPemeriksaan.length === 0">Belum Ada Data Pasien</h1>
        </div>
    </div>
</template>
<script>
    import { db } from '../components/firebase';
    
    export default {
        name: 'DisplayPemeriksaan',
        components: {
            
        },
        data() {
            return {
                UsersPemeriksaan: [],
                loginAs: '',
            }
        },
        created() {
            db.collection('Pemeriksaan').orderBy("nomor", "desc").onSnapshot((snapshotChange) => {
                this.UsersPemeriksaan = [];
                snapshotChange.forEach((doc) => {
                    this.UsersPemeriksaan.push({
                        key: doc.id,
                        nomor: doc.data().nomor,
                        nomorOrderLab: doc.data().nomorOrderLab,
                        namaPasien: doc.data().namaPasien,
                        tanggal: doc.data().tanggal,
                        jenisKelamin: doc.data().jenisKelamin,
                        statusPasien: doc.data().statusPasien,
                        namaDokter: doc.data().namaDokter,
                        namaRuangan: doc.data().namaRuangan,
                        nomorTelpRuangan: doc.data().nomorTelpRuangan,
                        diagnosa: doc.data().diagnosa,
                    })
                });
            });
            this.getRole()
        },
        methods: {
            deleteUser(nomorOrderLab){
              if (window.confirm("Konfirmasi menghapus pemeriksaan pasien?")) {
                db.collection('Pemeriksaan').doc(nomorOrderLab).delete().then(() => {})
                .catch((error) => {
                    console.error(error);
                })
              }
            },
            getRole(){
                this.loginAs = localStorage.getItem('loginAs')
            },
        },
    }
</script>

<style scoped>
    .btn-primary {
        margin-right: 12px;
    }
    table {
        counter-reset: row-num - 1;
    }
    table tr {
        counter-increment: row-num;
    }
    table tr td:first-child::before {
        content: counter(row-num);
    }
</style>