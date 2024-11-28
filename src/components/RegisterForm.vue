<template>
    <div>
      <h2>ユーザー登録</h2>
      <form @submit.prevent="register">
        <input type="text" v-model="username" placeholder="ユーザー名" required />
        <input type="email" v-model="email" placeholder="メールアドレス" required />
        <input type="password" v-model="password" placeholder="パスワード" required />
        <button type="submit">登録</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        username: '',
        email: '',
        password: ''
      };
    },
    methods: {
      async register() {
        try {
          const response = await axios.post('http://localhost:5000/api/register', {
            username: this.username,
            email: this.email,
            password: this.password
          });
          alert('登録成功');
          console.log(response.data);
        } catch (error) {
          alert('エラーが発生しました');
          console.error(error);
        }
      }
    }
  };
  </script>
  