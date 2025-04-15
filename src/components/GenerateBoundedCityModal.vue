<template>
  <div class="modal show d-block" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Generate Bounded City</h5>
          <button type="button" class="btn-close" @click="$emit('close')"></button>
        </div>
        <div class="modal-body">
          <form>
            <div class="mb-3">
              <label for="difficultyLevel" class="form-label">Difficulty Level</label>
              <input
                type="text"
                class="form-control"
                id="difficultyLevel"
                v-model="difficultyLevel"
              />
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="$emit('close')">Close</button>
          <button type="button" class="btn btn-primary" @click="generate">Generate</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      difficultyLevel: "",
    };
  },
  methods: {
    generate() {
      this.$emit("generate", this.difficultyLevel);
    },
  },
};
</script>

<style scoped>
.modal {
  background-color: rgba(0, 0, 0, 0.5);
}
</style>