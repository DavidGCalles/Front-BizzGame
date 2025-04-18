<template>
  <div class="modal show d-block" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Edit Customer</h5>
          <button type="button" class="btn-close" @click="$emit('close')"></button>
        </div>
        <div class="modal-body">
          <form>
            <div class="mb-3">
              <label for="editCustomerName" class="form-label">Name</label>
              <input
                type="text"
                class="form-control"
                id="editCustomerName"
                v-model="customerData.name"
              />
            </div>
            <div class="mb-3">
              <label for="editCustomerEmail" class="form-label">Email</label>
              <input
                type="email"
                class="form-control"
                id="editCustomerEmail"
                v-model="customerData.email"
              />
            </div>
            <div class="mb-3">
              <label for="editCustomerPhone" class="form-label">Phone</label>
              <input
                type="text"
                class="form-control"
                id="editCustomerPhone"
                v-model="customerData.phone"
              />
            </div>
            <div class="mb-3">
              <label for="editCustomerCity" class="form-label">City ID</label>
              <input
                type="number"
                class="form-control"
                id="editCustomerCity"
                v-model="customerData.city_id"
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
    customer: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      customerData: { ...this.customer },
    };
  },
  methods: {
    saveChanges() {
      this.$emit("save", this.customerData);
    },
  },
};
</script>