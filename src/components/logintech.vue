<template>
  <div class="login-container">
    <h1>เข้าสู่ระบบ</h1>
    <p class="subtitle">เข้าสู่ระบบ ช่าง</p>

    <form @submit.prevent="handleLogin" class="login-form">
      <label for="email">อีเมล</label>
      <div class="input-group">
        <span class="icon">@</span>
        <input type="email" v-model="email" placeholder="your@email.com" required />
      </div>

      <label for="password">รหัสผ่าน</label>
      <div class="input-group">
        <span class="icon">🔒</span>
        <input :type="showPassword ? 'text' : 'password'" v-model="password" placeholder="รหัสผ่านของคุณ" required />
        <span class="toggle" @click="showPassword = !showPassword">👁️</span>
      </div>

      <div class="forgot-password">
        <a href="#">ลืมรหัสผ่าน?</a>
      </div>

      <button type="submit" class="btn-login">เข้าสู่ระบบ</button>

      <p class="register-text">
        ยังไม่มีบัญชี? <a href="/dashboard">สมัครสมาชิก</a>
      </p>
    
      <div class="btnt">
        <router-link to="/home" class="back-home">กลับไปหน้าแรก</router-link>
        <router-link to="/login" class="login-cust">ถ้าคุณเป็นลูกค้า</router-link>
        </div>

    </form>
  </div>
</template>

<script>
export default {
  name: "LoginForm",
  data() {
    return {
      email: "",
      password: "",
      showPassword: false,
    };
  },
  methods: {
    handleLogin() {
      // ทำการเข้าสู่ระบบ
      console.log("อีเมล:", this.email);
      console.log("รหัสผ่าน:", this.password);
    },
  },
};
</script>

<style scoped>
.btnt {
  display: flex;
  justify-content: space-between;
}

.login-cust {
  display: block;
  margin-top: 1rem;
  
  text-decoration: none;
}

.back-home {
  display: block;
  margin-top: 1rem;
  
  text-decoration: none;
  
}

:global(body) {
  margin: 0;
  background-color: #ffffff;
  font-family: 'Prompt', sans-serif;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* เพิ่ม width และ flex-shrink: 0 */
.login-container {
  max-width: 400px;
  width: 100%;
  padding: 2rem;
  text-align: center;
  background-color: #ffffff;
  box-shadow: 0 4px 20px rgba(0,0,0,0.05);
  border-radius: 12px;

  flex-shrink: 0; /* ป้องกันการย่อ */
}

.subtitle {
  color: #666;
  margin-bottom: 1.5rem;
  font-size: 2rem;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  text-align: left;
}

.input-group {
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 0.5rem;
  background-color:black;
}

.input-group input {
  border: none;
  outline: none;
  flex-grow: 1;
  background: none;
  padding: 0.5rem;
}

.input-group .icon {
  margin-right: 0.5rem;
}

.toggle {
  cursor: pointer;
  margin-left: 0.5rem;
}

.forgot-password {
  text-align: right;
  font-size: 0.9rem;
}

.btn-login {
  background-color: #000;
  color: white;
  padding: 0.8rem;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
}
</style>