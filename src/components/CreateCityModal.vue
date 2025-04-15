<template>
  <div class="modal show d-block" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Create City</h5>
          <button type="button" class="btn-close" @click="$emit('close')"></button>
        </div>
        <div class="modal-body">
          <form>
            <div class="mb-3">
              <label for="createCityName" class="form-label">Name</label>
              <input
                type="text"
                class="form-control"
                id="createCityName"
                v-model="cityData.name"
              />
            </div>
            <div class="mb-3">
              <label for="createCityPopulation" class="form-label">Population</label>
              <input
                type="number"
                class="form-control"
                id="createCityPopulation"
                v-model="cityData.population"
              />
            </div>
            <div class="mb-3">
              <label for="createCityRegion" class="form-label">Region</label>
              <input
                type="text"
                class="form-control"
                id="createCityRegion"
                v-model="cityData.region"
              />
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="$emit('close')">Close</button>
          <button type="button" class="btn btn-primary" @click="createCity">Create</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cityData: {
        name: "",
        population: null,
        region: "",
      },
    };
  },
  methods: {
    createCity() {
      this.$emit("create", this.cityData);
    },
  },
};
</script>

<style scoped>
.modal {
  background-color: rgba(0, 0, 0, 0.5);
}
</style>