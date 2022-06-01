<template>
    <div>
        <div>
            <sidebar/>
        </div>
        <div>
            <b-card classs="card" border-variant="dark" header="Jumlah Pasien" align="center">
                <b-card-text>{{pasien}} Pasien</b-card-text>
            </b-card>
            <br>
            <display/>
        </div>
    </div>
</template>

<script>
import sidebar from '../layout/Sidebar'
import display from '../layout/DisplayData'

export default {
    name: 'Home',
    components: { sidebar, display },
    created() {
        this.totalPasien()
    },
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
            pasien: 0,

        }
    },
    methods: {
        totalPasien() {
            this.pasien = this.hermatologi.jumlahPasien + this.kimiaDarah.jumlahPasien + this.imunologiSerologi.jumlahPasien
        }
    }
}
</script>

<style>
    .card{ 
        margin: auto;
        max-width: 15rem;
    }
</style>