<template>
    <div class="row">
        <div class="col-md-12">
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Nomor Rekam</th>
                        <th>Nama Pasien</th>
                        <th>Tempat, Tanggal Lahir</th>
                        <th>Jenis Kelamin</th>
                        <th>Status</th>
                        <th>Kontak</th>
                        <th>Cetak</th>
                        <th>Opsi</th>
                    </tr>
                </thead>
                <tbody v-if="Users.length !== 0">
                    <tr v-for="user in Users" :key="user.key">
                        <td></td>
                        <td>{{ user.nomor }}</td>
                        <td>{{ user.namaPasien }}</td>
                        <td>{{ user.tanggal }}</td>
                        <td>{{ user.jenisKelamin }}</td>
                        <td>{{ user.statusPasien }}</td>
                        <td>{{ user.nomorKontak }}</td>
                        <td>Opsi Cetak belum tersedia</td>
                        <td>
                            <!-- <router-link :to="{name: 'Update Data', params: { id: user.key }}" class="btn btn-primary"><b-icon icon="pencil"></b-icon></router-link> -->
                            <b-btn :to="{name: 'Update Data', params: { id: user.key }}" variant="outline-primary"><b-icon icon="pencil"></b-icon></b-btn>
                            <button v-if="loginAs === 'Registrasi' || loginAs === 'Manajer'" @click.prevent="deleteUser(user.key)" class="btn btn-danger"><b-icon icon="trash"></b-icon></button>
                            <b-btn variant="outline-primary" :to="{name: 'AddPemeriksaan', params: { id: user.key }}">Permintaan Pemeriksaan Laboratorium</b-btn> 
                        </td>
                    </tr>
                </tbody>
            </table>
            <h1 v-if="Users.length === 0">Belum Ada Data Pasien</h1>
        </div>
    </div>
</template>
<script>
    import { db } from '../components/firebase';
    
    export default {
        name: 'DisplayData',
        data() {
            return {
                Users: [],
                loginAs: '',
            }
        },
        created() {
            db.collection('Pasien').orderBy("nomor", "desc").onSnapshot((snapshotChange) => {
                this.Users = [];
                snapshotChange.forEach((doc) => {
                    this.Users.push({
                        key: doc.id,
                        nomor: doc.data().nomor,
                        namaPasien: doc.data().namaPasien,
                        tanggal: doc.data().tanggal,
                        jenisKelamin: doc.data().jenisKelamin,
                        statusPasien: doc.data().statusPasien,
                        nik: doc.data().nik,
                        nomorJamkes: doc.data().nomorJamkes,
                        nomorKontak: doc.data().nomorKontak,
                        alamatLengkap: doc.data().alamatLengkap,
                    })
                });
            });
            this.getRole()
        },
        methods: {
            deleteUser(id){
              if (window.confirm("Konfirmasi menghapus pasien?")) {
                db.collection("Pasien").doc(id).delete().then(() => {})
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