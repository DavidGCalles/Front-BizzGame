<template>
  <div class="modal show d-block" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Edit City</h5>
          <button type="button" class="btn-close" @click="$emit('close')"></button>
        </div>
        <div class="modal-body">
          <form>
            <div class="mb-3">
              <label for="editCityName" class="form-label">Name</label>
              <input
                type="text"
                class="form-control"
                id="editCityName"
                v-model="cityData.name"
              />
            </div>
            <div class="mb-3">
              <label for="editCityPopulation" class="form-label">Population</label>
              <input
                type="number"
                class="form-control"
                id="editCityPopulation"
                v-model="cityData.population"
              />
            </div>
            <div class="mb-3">
              <label for="editCityRegion" class="form-label">Region</label>
              <input
                type="text"
                class="form-control"
                id="editCityRegion"
                v-model="cityData.region"
              />
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="$emit('close')">Close</button>
          <button type="button" class="btn btn-primary" @click="saveChanges">Save Changes</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    city: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      cityData: { ...this.city },
    };
  },
  methods: {
    saveChanges() {
      this.$emit("save", this.cityData);
    },
  },
};
</script>