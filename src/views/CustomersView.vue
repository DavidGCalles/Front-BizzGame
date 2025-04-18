<template>
  <div class="container" style="width: 100%;">
    <h1 class="text-center mb-4">Customers Management</h1>
    <div class="d-flex justify-content-between mb-3">
      <button class="btn btn-success" @click="openCreateCustomerModal">Create Customer</button>
    </div>

    <!-- Search Form -->
    <div class="mb-3">
      <form @submit.prevent="searchCustomers">
        <div class="row">
          <div class="col-md-4">
            <input type="text" class="form-control" v-model="searchField" placeholder="Field (e.g., name)" />
          </div>
          <div class="col-md-4">
            <input type="text" class="form-control" v-model="searchValue" placeholder="Value" />
          </div>
          <div class="col-md-4">
            <button type="submit" class="btn btn-primary">Search</button>
          </div>
        </div>
      </form>
    </div>

    <table class="table table-bordered table-striped">
      <thead class="table-dark">
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>City</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="customer in customers" :key="customer.id">
          <td>{{ customer.id }}</td>
          <td>{{ customer.name }}</td>
          <td>{{ customer.email }}</td>
          <td>{{ customer.phone }}</td>
          <td>{{ customer.city_id || 'N/A' }}</td>
          <td>
            <button class="btn btn-danger btn-sm" @click="deleteCustomer(customer.id)">Delete</button>
            <button
              class="btn btn-primary btn-sm"
              @click="openEditModal(customer.id, customer.name, customer.email, customer.phone, customer.city_id)"
            >
              Edit
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modals -->
    <EditCustomerModal
      v-if="showEditModal"
      :customer="editCustomer"
      @close="showEditModal = false"
      @save="saveCustomerChanges"
    />
    <CreateCustomerModal
      v-if="showCreateModal"
      @close="showCreateModal = false"
      @create="createCustomer"
    />
  </div>
</template>

<script>
import axios from "axios";
import EditCustomerModal from "@/components/EditCustomerModal.vue";
import CreateCustomerModal from "@/components/CreateCustomerModal.vue";

export default {
  components: {
    EditCustomerModal,
    CreateCustomerModal,
  },
  data() {
    return {
      customers: [],
      searchField: "",
      searchValue: "",
      showEditModal: false,
      showCreateModal: false,
      editCustomer: null,
    };
  },
  methods: {
    async fetchCustomers() {
      try {
        const response = await axios.get("http://192.168.1.78:5000/customer/");
        this.customers = response.data;
      } catch (error) {
        console.error("Error fetching customers:", error);
        alert("Failed to fetch customers. Please try again later.");
      }
    },
    async deleteCustomer(customerId) {
      if (!confirm("Are you sure you want to delete this customer?")) return;

      try {
        await axios.delete(`http://192.168.1.78:5000/customer/${customerId}`);
        alert("Customer deleted successfully.");
        this.fetchCustomers();
      } catch (error) {
        console.error("Error deleting customer:", error);
        alert("Failed to delete customer. Please try again later.");
      }
    },
    openEditModal(id, name, email, phone, city_id) {
      this.editCustomer = { id, name, email, phone, city_id };
      this.showEditModal = true;
    },
    async saveCustomerChanges(updatedCustomer) {
      try {
        let customer_id = updatedCustomer.id;
        delete updatedCustomer.id; // Remove the id from the object to avoid sending it in the request body
        await axios.patch(`http://192.168.1.78:5000/customer/${customer_id}`, updatedCustomer);
        alert("Customer updated successfully.");
        this.fetchCustomers();
        this.showEditModal = false;
      } catch (error) {
        console.error("Error updating customer:", error);
        alert("Failed to update customer. Please try again later.");
      }
    },
    openCreateCustomerModal() {
      this.showCreateModal = true;
    },
    async createCustomer(newCustomer) {
      try {
        await axios.post("http://192.168.1.78:5000/customer/", newCustomer);
        alert("Customer created successfully.");
        this.fetchCustomers();
        this.showCreateModal = false;
      } catch (error) {
        console.error("Error creating customer:", error);
        alert("Failed to create customer. Please try again later.");
      }
    },
    async searchCustomers() {
      if (!this.searchField || !this.searchValue) {
        alert("Please provide both field and value for the search.");
        return;
      }

      try {
        const params = new URLSearchParams();
        params.append(this.searchField, this.searchValue);

        const response = await axios.get(`http://192.168.1.78:5000/customer/search?${params.toString()}`);
        this.customers = response.data;
      } catch (error) {
        console.error("Error searching customers:", error);
        alert("Failed to search customers. Please try again later.");
      }
    },
  },
  mounted() {
    this.fetchCustomers();
  },
};
</script>