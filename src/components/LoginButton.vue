<template>
    <button @click="navigateToLogin" class="login-button">
      ログイン
    </button>
  </template>
  
  <script>
  export default {
    methods: {
      navigateToLogin() {
        this.$router.push('/login');
      },
    },
  };
  </script>
  
  <style scoped>
  .login-button {
    position: fixed;
    top: 10px;
    right: 10px;
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  .login-button:hover {
    background-color: #0056b3;
  }
  </style>
  