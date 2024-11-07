<template>
    <div v-if="location" class="map-container">
      <iframe :src="location" width="100%" height="200" frameborder="0" style="border:0;"></iframe>
    </div>
  </template>
  
  <script>
  export default {
    name: 'EmbedMap',
    props: {
      location: {
        type: String,
        required: false,
        default: ''
      }
    }
  };
  </script>
  
  <style scoped>
  .map-container {
    margin-top: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 10px;
  }
  </style>
  