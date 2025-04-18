<template>
  <div class="modal" tabindex="-1" style="display: block;">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Edit Street</h5>
          <button type="button" class="btn-close" @click="$emit('close')"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="saveChanges">
            <div class="mb-3">
              <label for="streetName" class="form-label">Name</label>
              <input
                type="text"
                id="streetName"
                class="form-control"
                v-model="street.name"
                required
              />
            </div>
            <div class="mb-3">
              <label for="streetLength" class="form-label">Length</label>
              <input
                type="number"
                id="streetLength"
                class="form-control"
                v-model="street.length"
                required
              />
            </div>
            <div class="mb-3">
              <label for="streetCity" class="form-label">City</label>
              <input
                type="text"
                id="streetCity"
                class="form-control"
                v-model="street.city_id"
              />
            </div>
            <button type="submit" class="btn btn-primary">Save</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    street: {
      type: Object,
      required: true,
    },
  },
  methods: {
    saveChanges() {
      this.$emit("save", { ...this.street });
    },
  },
};
</script>