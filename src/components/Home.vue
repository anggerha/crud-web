<template>
    <div>
        <div>
            <sidebar/>
        </div>
        <b-card-group deck class="cardGroup">
            <b-card border-variant="dark" class="pasienCard" header="Jumlah Pasien" >
                <b-card-text>{{pasien}} Pasien</b-card-text>
            </b-card>
            <b-card border-variant="dark" class="pemeriksaanCard" header="Jumlah Pemeriksaan" >
                <b-card-text>{{pemeriksaan}} Pemeriksaan</b-card-text>
            </b-card>
        </b-card-group>
        
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
            hematologi: {
                jumlahPasien: 5
            },
            kimiaDarah: {
                jumlahPasien: 7
            },
            imunologiSerologi: {
                jumlahPasien: 3
            },
            pasien: null,
            pemeriksaan: null
        }
    },
    created() {
        db.collection('Pasien').get().then(snap => {
            this.pasien = snap.size // will return the collection size
        });
        db.collection('Pemeriksaan').get().then(snap => {
            this.pemeriksaan = snap.size // will return the collection size
        });
    },
}
</script>

<style scoped>
    .pasienCard{
        width: 10rem;
    }
    .pemeriksaanCard{
        width: 15rem;
    }
    .cardGroup{
        margin: auto;
        width: 30rem;
    }
</style>