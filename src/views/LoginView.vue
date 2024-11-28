<template>
    <div class="login-container">
      <h1 v-if="isRegistering">新規会員登録</h1>
      <h1 v-else>ログイン</h1>
  
      <!-- フォーム -->
      <form @submit.prevent="handleSubmit">
        <div v-if="isRegistering">
          <input v-model="formData.username" type="text" placeholder="ユーザー名" required />
          <input v-model="formData.password" type="password" placeholder="パスワード" required />
          <input v-model="formData.confirmPassword" type="password" placeholder="パスワード再入力" required />
        </div>
        <div v-else>
          <input v-model="formData.username" type="text" placeholder="ユーザー名" required />
          <input v-model="formData.password" type="password" placeholder="パスワード" required />
        </div>
        <button type="submit">{{ isRegistering ? "登録する" : "ログイン" }}</button>
      </form>
  
      <!-- 切り替えボタン -->
      <p>
        {{ isRegistering ? "既にアカウントをお持ちですか？" : "アカウントをお持ちでないですか？" }}
        <button @click="toggleForm">{{ isRegistering ? "ログインはこちら" : "新規登録はこちら" }}</button>
      </p>
  
      <p v-if="message" :class="messageClass">{{ message }}</p>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        isRegistering: false, // ログインフォームか新規登録フォームかを切り替え
        formData: {
          username: "",
          password: "",
          confirmPassword: "",
        },
        message: "",
        messageClass: "error-message", // メッセージのCSSクラス
      };
    },
    methods: {
      toggleForm() {
        this.isRegistering = !this.isRegistering;
        this.message = ""; // メッセージをリセット
        this.formData = {
          username: "",
          password: "",
          confirmPassword: "",
        };
      },
      async handleSubmit() {
        if (this.isRegistering) {
          // 新規登録処理
          if (this.formData.password !== this.formData.confirmPassword) {
            this.message = "パスワードが一致しません。";
            this.messageClass = "error-message";
            return;
          }
          try {
            const response = await fetch("http://localhost:3000/register", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                username: this.formData.username,
                password: this.formData.password,
              }),
            });
            if (!response.ok) throw new Error("登録に失敗しました。");
            this.message = "登録が完了しました！ログインしてください。";
            this.messageClass = "success-message"; // 成功時のスタイル
            this.isRegistering = false; // ログインフォームに切り替え
          } catch (err) {
            this.message = "そのユーザー名は既に使用されています。";
            this.messageClass = "error-message";
          }
        } else {
          // ログイン処理
          try {
            const response = await fetch("http://localhost:3000/login", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                username: this.formData.username,
                password: this.formData.password,
              }),
            });
            if (!response.ok) throw new Error("ログインに失敗しました。");
            const data = await response.json();
            localStorage.setItem("token", data.token);
            this.message = "ログインに成功しました！";
            this.messageClass = "success-message";
            this.$router.push("/"); // ログイン成功後にリダイレクト
          } catch (err) {
            this.message = "ユーザー名またはパスワードが無効です。";
            this.messageClass = "error-message";
          }
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .login-container {
    max-width: 400px;
    margin: 50px auto;
    text-align: center;
    font-family: Arial, sans-serif;
  }
  
  form input {
    display: block;
    width: 100%;
    margin: 10px 0;
    padding: 10px;
    font-size: 1rem;
  }
  
  button {
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  
  .error-message {
    color: red;
    margin-top: 10px;
  }
  
  .success-message {
    color: green;
    margin-top: 10px;
  }
  </style>
  