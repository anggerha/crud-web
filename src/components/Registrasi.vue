<template>
    <div>
        <div>
            <sidebar/>
        </div>
        <div>
            <add/>
        </div>
    </div>
</template>

<script>
import sidebar from '../layout/Sidebar'
import add from '../layout/Add'

export default {
    name: 'Registrasi',
    components: { sidebar, add }
}
</script>