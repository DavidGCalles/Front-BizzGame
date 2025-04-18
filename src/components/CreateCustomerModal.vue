<template>
  <div class="modal show d-block" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Create Customer</h5>
          <button type="button" class="btn-close" @click="$emit('close')"></button>
        </div>
        <div class="modal-body">
          <form>
            <div class="mb-3">
              <label for="createCustomerName" class="form-label">Name</label>
              <input
                type="text"
                class="form-control"
                id="createCustomerName"
                v-model="customerData.name"
              />
            </div>
            <div class="mb-3">
              <label for="createCustomerEmail" class="form-label">Email</label>
              <input
                type="email"
                class="form-control"
                id="createCustomerEmail"
                v-model="customerData.email"
              />
            </div>
            <div class="mb-3">
              <label for="createCustomerPhone" class="form-label">Phone</label>
              <input
                type="text"
                class="form-control"
                id="createCustomerPhone"
                v-model="customerData.phone"
              />
            </div>
            <div class="mb-3">
              <label for="createCustomerCity" class="form-label">City ID</label>
              <input
                type="number"
                class="form-control"
                id="createCustomerCity"
                v-model="customerData.city_id"
              />
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="$emit('close')">Close</button>
          <button type="button" class="btn btn-primary" @click="createCustomer">Create</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      customerData: {
        name: "",
        email: "",
        phone: "",
        city_id: null,
      },
    };
  },
  methods: {
    createCustomer() {
      this.$emit("create", this.customerData);
    },
  },
};
</script>