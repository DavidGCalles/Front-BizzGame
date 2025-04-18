<template>
  <div class="modal" tabindex="-1" style="display: block;">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Create Street</h5>
          <button type="button" class="btn-close" @click="$emit('close')"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="createStreet">
            <div class="mb-3">
              <label for="streetName" class="form-label">Name</label>
              <input
                type="text"
                id="streetName"
                class="form-control"
                v-model="newStreet.name"
                required
              />
            </div>
            <div class="mb-3">
              <label for="streetLength" class="form-label">Length</label>
              <input
                type="number"
                id="streetLength"
                class="form-control"
                v-model="newStreet.length"
                required
              />
            </div>
            <div class="mb-3">
              <label for="streetCity" class="form-label">City</label>
              <input
                type="text"
                id="streetCity"
                class="form-control"
                v-model="newStreet.city_id"
              />
            </div>
            <button type="submit" class="btn btn-success">Create</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newStreet: {
        name: "",
        length: 0,
        city: "",
      },
    };
  },
  methods: {
    createStreet() {
      this.$emit("create", { ...this.newStreet });
    },
  },
};
</script>