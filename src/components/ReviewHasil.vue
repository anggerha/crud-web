<template>
    <div>
        <div>
            <sidebar/>
        </div>
        <div><edit/></div>
    </div>
</template>

<script>
import sidebar from '../layout/Sidebar'
import edit from '../layout/UpdateData.vue'

export default {
    name: 'Review Hasil',
    components: { sidebar, edit }
}
</script>