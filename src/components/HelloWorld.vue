<script setup>
defineProps({
  msg: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="greetings">
    <h1 class="green">{{ msg }}</h1>
    <h3>
      <p>O Fabulousk</p>
      <p><a href="https://flask.com/" target="_blank" rel="noopener">Flask</a></p>
      <p><a href="https://vuejs.org/" target="_blank" rel="noopener">Vue 3</a></p>
    </h3>
  </div>
</template>