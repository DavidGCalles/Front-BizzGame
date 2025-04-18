<template>
  <div class="container" style="width: 100%;">
    <h1 class="text-center mb-4">Streets Management</h1>
    <div class="d-flex justify-content-between mb-3">
      <button class="btn btn-success" @click="openCreateStreetModal">Create Street</button>
    </div>

    <!-- Search Form -->
    <div class="mb-3">
      <form @submit.prevent="searchStreets">
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
          <th>Length</th>
          <th>City</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="street in streets" :key="street.id">
          <td>{{ street.id }}</td>
          <td>{{ street.name }}</td>
          <td>{{ street.length.toFixed(2) }}</td>
          <td>{{ street.city_id || 'N/A' }}</td>
          <td>
            <button class="btn btn-danger btn-sm" @click="deleteStreet(street.id)">Delete</button>
            <button
              class="btn btn-primary btn-sm"
              @click="openEditModal(street.id, street.name, street.length, street.city_id)"
            >
              Edit
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modals -->
    <EditStreetModal
      v-if="showEditModal"
      :street="editStreet"
      @close="showEditModal = false"
      @save="saveStreetChanges"
    />
    <CreateStreetModal
      v-if="showCreateModal"
      @close="showCreateModal = false"
      @create="createStreet"
    />
  </div>
</template>

<script setup>
import axios from "axios";
import EditStreetModal from "@/components/EditStreetModal.vue";
import CreateStreetModal from "@/components/CreateStreetModal.vue";
import { ref, onMounted } from "vue";

const streets = ref([]);
const searchField = ref("");
const searchValue = ref("");
const showEditModal = ref(false);
const showCreateModal = ref(false);
const editStreet = ref(null);

const fetchStreets = async () => {
  try {
    const response = await axios.get("http://192.168.1.78:5000/street/");
    streets.value = response.data;
  } catch (error) {
    console.error("Error fetching streets:", error);
    alert("Failed to fetch streets. Please try again later.");
  }
};

const deleteStreet = async (streetId) => {
  if (!confirm("Are you sure you want to delete this street?")) return;

  try {
    await axios.delete(`http://192.168.1.78:5000/street/${streetId}`);
    alert("Street deleted successfully.");
    fetchStreets();
  } catch (error) {
    console.error("Error deleting street:", error);
    alert("Failed to delete street. Please try again later.");
  }
};

const openEditModal = (id, name, length, city_id) => {
  editStreet.value = { id, name, length, city_id };
  showEditModal.value = true;
};

const saveStreetChanges = async (updatedStreet) => {
  try {
    let street_id = updatedStreet.id;
    delete updatedStreet.id; // Remove id from the object to avoid sending it in the request body
    await axios.patch(`http://192.168.1.78:5000/street/${street_id}`, updatedStreet);
    alert("Street updated successfully.");
    fetchStreets();
    showEditModal.value = false;
  } catch (error) {
    console.error("Error updating street:", error);
    alert("Failed to update street. Please try again later.");
  }
};

const openCreateStreetModal = () => {
  showCreateModal.value = true;
};

const createStreet = async (newStreet) => {
  try {
    await axios.post("http://192.168.1.78:5000/street/", newStreet);
    alert("Street created successfully.");
    fetchStreets();
    showCreateModal.value = false;
  } catch (error) {
    console.error("Error creating street:", error);
    alert("Failed to create street. Please try again later.");
  }
};

const searchStreets = async () => {
  if (!searchField.value || !searchValue.value) {
    alert("Please provide both field and value for the search.");
    return;
  }

  try {
    const params = new URLSearchParams();
    params.append(searchField.value, searchValue.value);

    const response = await axios.get(`http://192.168.1.78:5000/street/search?${params.toString()}`);
    streets.value = response.data;
  } catch (error) {
    console.error("Error searching streets:", error);
    alert("Failed to search streets. Please try again later.");
  }
};

onMounted(() => {
  fetchStreets();
});
</script>
