<template>
    <div>
        <div>
            <sidebar/>
        </div>
        <div>
            <b-card classs="card" border-variant="dark" header="Jumlah Pasien" align="center">
                <b-card-text>{{pasien}} Pasien</b-card-text>
            </b-card>
        </div>
    </div>
</template>

<script>
import sidebar from '../layout/Sidebar'
import { db } from '../components/firebase';

export default {
    name: 'Home',
    components: { sidebar },
    data() {
        return {
            hermatologi: {
                jumlahPasien: 5
            },
            kimiaDarah: {
                jumlahPasien: 7
            },
            imunologiSerologi: {
                jumlahPasien: 3
            },
            pasien: null,
        }
    },
    created() {
        db.collection('Pasien').get().then(snap => {
            this.pasien = snap.size // will return the collection size
        });
    },
}
</script>

<style>
    .card{ 
        margin: auto;
        max-width: 15rem;
    }
</style>