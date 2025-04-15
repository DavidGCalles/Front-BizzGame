<template>
  <div>
    <h1>Admin Menu</h1>
    <nav>
      <RouterLink to="/admin-menu/cities">Cities</RouterLink>
      <RouterLink to="/admin-menu/streets">Streets</RouterLink>
    </nav>
    <RouterView /> <!-- This will render the nested routes -->
  </div>
</template>

<script setup>
// Add any necessary logic here
</script>

<style scoped>
nav {
  margin: 1rem 0;
}

nav a {
  margin-right: 1rem;
  text-decoration: none;
  color: blue;
}

nav a.router-link-exact-active {
  font-weight: bold;
}
</style>