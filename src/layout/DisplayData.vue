<template>
    <div class="row">
        <div class="col-md-12">
            <table class="table table-striped">
                <thead>
                    <tr>
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
                <tbody v-if="Users !== null">
                    <tr v-for="user in Users" :key="user.key">
                        <td>{{ user.nomor }}</td>
                        <td>{{ user.namaPasien }}</td>
                        <td>{{ user.tanggal }}</td>
                        <td>{{ user.jenisKelamin }}</td>
                        <td>{{ user.statusPasien }}</td>
                        <td>{{ user.nomorKontak }}</td>
                        <td>Opsi Cetak belum tersedia</td>
                        <td>
                            <router-link v-b-modal.modal-center :to="{name: 'Update Data', params: { id: user.key }}" class="btn btn-primary">Edit</router-link>
                            <button @click.prevent="deleteUser(user.key)" class="btn btn-danger">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>
    import { db } from '../components/firebase';
    
    export default {
        name: 'DisplayData',
        data() {
            return {
                Users: []
            }
        },
        created() {
            db.collection('Pasien').onSnapshot((snapshotChange) => {
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
        },
        methods: {
            deleteUser(id){
              if (window.confirm("Do you really want to delete?")) {
                db.collection("Pasien").doc(id).delete().then(() => {
                    console.log("Document deleted!");
                })
                .catch((error) => {
                    console.error(error);
                })
              }
            },
        },
    }
</script>
<style>
    .btn-primary {
        margin-right: 12px;
    }
</style>