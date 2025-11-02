<template>
  <div class="login-container">
    <div class="login-card">
      <div class="login-header">
        <div class="icon">🔐</div>
        <h1>Admin Login</h1>
        <p>ระบบจัดการแอดมิน Fix ถึงใจ</p>
      </div>

      <form @submit.prevent="handleLogin" class="login-form">
        <div class="form-group">
          <label>Username</label>
          <input 
            type="text" 
            v-model="username" 
            placeholder="admin"
            required
            autocomplete="username"
          />
        </div>

        <div class="form-group">
          <label>Password</label>
          <input 
            type="password" 
            v-model="password" 
            placeholder="••••••••"
            required
            autocomplete="current-password"
          />
        </div>

        <button type="submit" :disabled="loading" class="login-btn">
          {{ loading ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ' }}
        </button>

        <p v-if="error" class="error-msg">{{ error }}</p>
        <p v-if="success" class="success-msg">{{ success }}</p>
      </form>

      <div class="back-home">
        <router-link to="/home">← กลับหน้าหลัก</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();

const username = ref('admin');
const password = ref('admin123');
const error = ref('');
const success = ref('');
const loading = ref(false);

async function handleLogin() {
  error.value = '';
  success.value = '';
  loading.value = true;

  console.log('🔐 Attempting login...');
  console.log('Username:', username.value);

  try {
    const response = await axios.post(
      'http://localhost:3000/api/admin/login',
      { 
        username: username.value, 
        password: password.value 
      },
      { 
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    console.log('✅ Login Response:', response.data);

    if (response.data.success) {
      success.value = response.data.message;
      
      // บันทึกข้อมูล User ลง localStorage
      localStorage.setItem('user', JSON.stringify(response.data.user));
      console.log('✅ User saved to localStorage:', response.data.user);
      
      // Redirect ไป Dashboard
      setTimeout(() => {
        router.push('/admin/dashboard');
      }, 500);
    }

  } catch (err) {
    console.error('❌ Login error:', err);
    console.error('Response:', err.response?.data);
    error.value = err.response?.data?.message || 'เกิดข้อผิดพลาดในการเข้าสู่ระบบ';
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
  font-family: 'Sarabun', sans-serif;
}

.login-card {
  background: white;
  border-radius: 24px;
  padding: 3rem;
  width: 100%;
  max-width: 450px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  animation: slideUp 0.5s ease;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.login-header {
  text-align: center;
  margin-bottom: 2.5rem;
}

.icon {
  font-size: 4.5rem;
  margin-bottom: 1rem;
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.login-header h1 {
  font-size: 2.2rem;
  color: #333;
  margin: 0 0 0.5rem;
  font-weight: 700;
}

.login-header p {
  color: #666;
  font-size: 1rem;
  margin: 0;
}

.login-form {
  margin-bottom: 1.5rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: #333;
  font-weight: 600;
  font-size: 0.95rem;
}

.form-group input {
  width: 100%;
  padding: 1rem 1.2rem;
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  font-size: 1rem;
  font-family: inherit;
  transition: all 0.3s;
  outline: none;
}

.form-group input:focus {
  border-color: #667eea;
  box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
}

.form-group input::placeholder {
  color: #999;
}

.login-btn {
  width: 100%;
  padding: 1.1rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  color: white;
  font-size: 1.1rem;
  font-weight: 700;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s;
  margin-top: 0.5rem;
}

.login-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
}

.login-btn:active:not(:disabled) {
  transform: translateY(0);
}

.login-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.error-msg {
  color: #e74c3c;
  background: rgba(231, 76, 60, 0.1);
  padding: 0.8rem;
  border-radius: 8px;
  text-align: center;
  margin-top: 1rem;
  font-weight: 600;
  font-size: 0.9rem;
}

.success-msg {
  color: #27ae60;
  background: rgba(39, 174, 96, 0.1);
  padding: 0.8rem;
  border-radius: 8px;
  text-align: center;
  margin-top: 1rem;
  font-weight: 600;
  font-size: 0.9rem;
}

.back-home {
  text-align: center;
  margin-top: 1.5rem;
}

.back-home a {
  color: #667eea;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s;
}

.back-home a:hover {
  color: #764ba2;
  text-decoration: underline;
}

@media (max-width: 500px) {
  .login-card {
    padding: 2rem 1.5rem;
  }

  .login-header h1 {
    font-size: 1.8rem;
  }

  .icon {
    font-size: 3.5rem;
  }
}
</style>