<template>
    <div>
        <div class="container">
            <div>
               <b-button type="button" variant="success" @click="onReset">Add</b-button>
                  <b-table
                     id="my-table"
                     :items="items"
                     :fields="fields"
                     :per-page="perPage"
                     :current-page="currentPage"
                     striped 
                     hover
                  >
                     <template v-slot:cell(actions)="row">
                     <b-button size="sm" @click="edit(row.item, row.index, $event.target)" class="mr-1 btn btn-warning">
                        Edit
                     </b-button>
                     <b-button size="sm" @click="del(row.item, row.index, $event.target)" class="mr-1 btn btn-danger">
                        Del
                     </b-button>
                     </template>
                  </b-table>
                  <b-pagination
                     v-model="currentPage"
                     :total-rows="rows"
                     :per-page="perPage"
                     aria-controls="my-table"
                  ></b-pagination>

                  <p class="mt-3">Current Page: {{ currentPage }}</p>
                  <b-form @submit="onSubmit" @reset="onReset" v-if="show">
                     <b-form-group
                     id="input-group-1"
                     label="Id:"
                     label-for="input-1"
                     >
                     <b-form-input
                        id="input-1"
                        v-model="form.id"
                        type="text"
                        required
                        placeholder=""
                     ></b-form-input>
                     </b-form-group>

                     <b-form-group
                     id="input-group-2"
                     label="First Name:"
                     label-for="input-2"
                     >
                     <b-form-input
                        id="input-2"
                        v-model="form.first_name"
                        type="text"
                        required
                        placeholder=""
                     ></b-form-input>
                     </b-form-group>

                     <b-form-group
                     id="input-group-3"
                     label="Last Name:"
                     label-for="input-3"
                     >
                     <b-form-input
                        id="input-3"
                        v-model="form.last_name"
                        type="text"
                        required
                        placeholder=""
                     ></b-form-input>
                     </b-form-group>

                     <b-button type="submit" variant="primary">{{ form_action }}</b-button>
                     <b-button type="reset" variant="danger">Reset</b-button>
                  </b-form>
                  <b-card class="mt-3" header="Form Data Result">
                     <pre class="m-0">{{ form }}</pre>
                  </b-card>
             </div>
         </div>
    </div>
</template>

<script>
export default {
    name: 'Table',
    data() {
      return {
        perPage: 3,
        currentPage: 1,
        fields: [
          'id', 
          'first_name', 
          'last_name',
          { key: 'actions', label: 'Actions' }
        ],
        items: [
          { id: 1, first_name: 'Dickerson', last_name: 'Macdonald' },
          { id: 2, first_name: 'Larsen', last_name: 'Shaw' },
          { id: 3, first_name: 'Geneva', last_name: 'Wilson' },
          { id: 4, first_name: 'Jami', last_name: 'Carney' }
        ],
        form: {
          id: '',
          first_name: '',
          last_name: '',
        },
        show: true,
        form_action : 'Insert',
        form_index : 0,
      }
    },
    computed: {
      rows() {
        return this.items.length
      }
    },
    methods: {
      // eslint-disable-next-line no-unused-vars
      info(item, index, button) {
        alert(JSON.stringify(item, null, 2))
      },
      // eslint-disable-next-line no-unused-vars
      edit(item, index, button) {
        alert(JSON.stringify(item, null, 2))
        this.form.id = item.id
        this.form.first_name = item.first_name
        this.form.last_name = item.last_name
        this.form_action = 'Update'
        this.form_index = index + ((this.currentPage - 1) * this.perPage)
      },
      // eslint-disable-next-line no-unused-vars
      del(item, index, button) {
        this.items.splice(index + ((this.currentPage - 1) * this.perPage), 1)
      },
      onSubmit(evt) {
        evt.preventDefault()
        alert(JSON.stringify(this.form))
        if (this.form_action == 'Update'){
          this.items[this.form_index].id = this.form.id
          this.items[this.form_index].first_name = this.form.first_name
          this.items[this.form_index].last_name = this.form.last_name
        } else { //Insert
          this.items.push({ id: this.form.id, first_name: this.form.first_name, last_name: this.form.last_name })
        }
        this.form.id = ''
        this.form.first_name = ''
        this.form.last_name = ''
        this.form_action = 'Insert'
      },
      onReset(evt) {
        evt.preventDefault()
        // Reset our form values
        this.form.id = ''
        this.form.first_name = ''
        this.form.last_name = ''
        this.form_action = 'Insert'
        // Trick to reset/clear native browser form validation state
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      }
    }
}
</script>