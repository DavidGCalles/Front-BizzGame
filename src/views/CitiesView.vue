<template>
  <div class="container my-4">
    <h1 class="text-center mb-4">Cities Management</h1>
    <div class="d-flex justify-content-between mb-3">
      <button class="btn btn-success" @click="openCreateCityModal">Create City</button>
      <div>
        <button class="btn btn-warning" @click="openGenerateRandomCityModal">Generate Random City</button>
        <button class="btn btn-info" @click="openGenerateBoundedCityModal">Generate Bounded City</button>
      </div>
    </div>

    <!-- Search Form -->
    <div class="mb-3">
      <form @submit.prevent="searchCities">
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
          <th>Population</th>
          <th>Region</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="city in cities" :key="city.id">
          <td>{{ city.id }}</td>
          <td>{{ city.name }}</td>
          <td>{{ city.population.toFixed(2) }}</td>
          <td>{{ city.region || 'N/A' }}</td>
          <td>
            <button class="btn btn-danger btn-sm" @click="deleteCity(city.id)">Delete</button>
            <button
              class="btn btn-primary btn-sm"
              @click="openEditModal(city.id, city.name, city.population, city.region)"
            >
              Edit
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modals -->
    <EditCityModal
      v-if="showEditModal"
      :city="editCity"
      @close="showEditModal = false"
      @save="saveCityChanges"
    />
    <CreateCityModal
      v-if="showCreateModal"
      @close="showCreateModal = false"
      @create="createCity"
    />
    <GenerateRandomCityModal
      v-if="showGenerateRandomModal"
      @close="showGenerateRandomModal = false"
      @generate="generateRandomCity"
    />
    <GenerateBoundedCityModal
      v-if="showGenerateBoundedModal"
      @close="showGenerateBoundedModal = false"
      @generate="generateBoundedCity"
    />
  </div>
</template>

<script>
import axios from "axios";
import EditCityModal from "@/components/EditCityModal.vue";
import CreateCityModal from "@/components/CreateCityModal.vue";
import GenerateRandomCityModal from "@/components/GenerateRandomCityModal.vue";
import GenerateBoundedCityModal from "@/components/GenerateBoundedCityModal.vue";

export default {
  components: {
    EditCityModal,
    CreateCityModal,
    GenerateRandomCityModal,
    GenerateBoundedCityModal,
  },
  data() {
    return {
      cities: [],
      searchField: "",
      searchValue: "",
      showEditModal: false,
      showCreateModal: false,
      showGenerateRandomModal: false,
      showGenerateBoundedModal: false,
      editCity: null,
    };
  },
  methods: {
    async fetchCities() {
      try {
        const response = await axios.get("http://192.168.1.78:5000/city/");
        this.cities = response.data;
      } catch (error) {
        console.error("Error fetching cities:", error);
        alert("Failed to fetch cities. Please try again later.");
      }
    },
    async deleteCity(cityId) {
      if (!confirm("Are you sure you want to delete this city?")) return;

      try {
        await axios.delete(`http://192.168.1.78:5000/city/${cityId}`);
        alert("City deleted successfully.");
        this.fetchCities();
      } catch (error) {
        console.error("Error deleting city:", error);
        alert("Failed to delete city. Please try again later.");
      }
    },
    openEditModal(id, name, population, region) {
      this.editCity = { id, name, population, region };
      this.showEditModal = true;
    },
    async saveCityChanges(updatedCity) {
      try {
        await axios.patch(`http://192.168.1.78:5000/city/${updatedCity.id}`, updatedCity);
        alert("City updated successfully.");
        this.fetchCities();
        this.showEditModal = false;
      } catch (error) {
        console.error("Error updating city:", error);
        alert("Failed to update city. Please try again later.");
      }
    },
    openCreateCityModal() {
      this.showCreateModal = true;
    },
    async createCity(newCity) {
      try {
        await axios.post("http://192.168.1.78:5000/city/", newCity);
        alert("City created successfully.");
        this.fetchCities();
        this.showCreateModal = false;
      } catch (error) {
        console.error("Error creating city:", error);
        alert("Failed to create city. Please try again later.");
      }
    },
    openGenerateRandomCityModal() {
      this.showGenerateRandomModal = true;
    },
    async generateRandomCity(numCities) {
      try {
        await axios.post("http://192.168.1.78:5000/generate/random-city", { num_cities: numCities });
        alert("Random city generated successfully.");
        this.fetchCities();
        this.showGenerateRandomModal = false;
      } catch (error) {
        console.error("Error generating random city:", error);
        alert("Failed to generate random city. Please try again later.");
      }
    },
    openGenerateBoundedCityModal() {
      this.showGenerateBoundedModal = true;
    },
    async generateBoundedCity(difficultyLevel) {
      try {
        await axios.post("http://192.168.1.78:5000/generate/bounded-city", { difficulty_level: difficultyLevel });
        alert("Bounded city generated successfully.");
        this.fetchCities();
        this.showGenerateBoundedModal = false;
      } catch (error) {
        console.error("Error generating bounded city:", error);
        alert("Failed to generate bounded city. Please try again later.");
      }
    },
    async searchCities() {
      if (!this.searchField || !this.searchValue) {
        alert("Please provide both field and value for the search.");
        return;
      }

      try {
        const params = new URLSearchParams();
        params.append(this.searchField, this.searchValue);

        const response = await axios.get(`http://192.168.1.78:5000/city/search?${params.toString()}`);
        this.cities = response.data;
      } catch (error) {
        console.error("Error searching cities:", error);
        alert("Failed to search cities. Please try again later.");
      }
    },
  },
  mounted() {
    this.fetchCities();
  },
};
</script>

<style scoped>
/* Add styles specific to this view */
</style>