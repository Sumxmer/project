<template>
  <div class="login-page">
    <div class="login-container">
      <div class="login-header">
        <h1 class="main-title">เข้าสู่ระบบ</h1>
        <p class="subtitle">เข้าสู่ระบบช่าง</p>
      </div>

      <form @submit.prevent="handleLogin" class="login-form" novalidate>
        <div class="form-group">
          <label for="email" class="form-label">
            <span class="label-icon">📧</span>
            อีเมล
          </label>
          <div class="input-group" :class="{ 'has-error': emailError }">
            <span class="icon">@</span>
            <input 
              type="email" 
              id="email"
              v-model.trim="email"
              @blur="validateEmail"
              @input="emailError = ''"
              placeholder="your@email.com" 
              class="form-input"
              autocomplete="email"
              required 
            />
          </div>
          <span v-if="emailError" class="error-message">{{ emailError }}</span>
        </div>

        <div class="form-group">
          <label for="password" class="form-label">
            <span class="label-icon">🔒</span>
            รหัสผ่าน
          </label>
          <div class="input-group" :class="{ 'has-error': passwordError }">
            <span class="icon">🔒</span>
            <input 
              :type="showPassword ? 'text' : 'password'" 
              id="password"
              v-model="password"
              @input="passwordError = ''"
              placeholder="รหัสผ่านของคุณ" 
              class="form-input"
              autocomplete="current-password"
              required 
            />
            <button 
              type="button"
              class="toggle" 
              @click="togglePasswordVisibility"
              :aria-label="showPassword ? 'ซ่อนรหัสผ่าน' : 'แสดงรหัสผ่าน'"
            >
              {{ showPassword ? '👁️' : '👁️‍🗨️' }}
            </button>
          </div>
          <span v-if="passwordError" class="error-message">{{ passwordError }}</span>
        </div>

        <div class="forgot-password">
          <router-link to="/forgot-password" class="forgot-link">
            ลืมรหัสผ่าน?
          </router-link>
        </div>

        <button type="submit" class="btn-login" :disabled="isLoading">
          <span class="button-content">
            <span v-if="!isLoading">เข้าสู่ระบบ</span>
            <span v-else class="loading-spinner">⏳ กำลังเข้าสู่ระบบ...</span>
          </span>
        </button>

        <div class="register-section">
          <p class="register-text">
            ยังไม่มีบัญชี? 
            <router-link to="/register" class="register-link">
              สมัครสมาชิก
            </router-link>
          </p>
        </div>

        <div class="navigation-buttons">
          <router-link to="/" class="nav-button back-home">
            <span class="nav-icon">🏠</span>
            <span>กลับไปหน้าแรก</span>
          </router-link>
          <router-link to="/login" class="nav-button login-tech">
            <span class="nav-icon">🧑‍💼</span>
            <span>เข้าสู่ระบบลูกค้า</span>
          </router-link>
        </div>
      </form>
    </div>

    <div class="background-particles"></div>
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
      isLoading: false,
      emailError: "",
      passwordError: ""
    };
  },
  methods: {
    validateEmail() {
      // ตรวจสอบว่าอีเมลว่างเปล่าหรือไม่
      if (!this.email) {
        this.emailError = "กรุณากรอกอีเมล";
        return false;
      }
      
      // ตรวจสอบรูปแบบอีเมลด้วย regular expression
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(this.email)) {
        this.emailError = "รูปแบบอีเมลไม่ถูกต้อง";
        return false;
      }
      
      this.emailError = "";
      return true;
    },
    
    validatePassword() {
      // ตรวจสอบว่ารหัสผ่านว่างเปล่าหรือไม่
      if (!this.password) {
        this.passwordError = "กรุณากรอกรหัสผ่าน";
        return false;
      }
      
      // ตรวจสอบความยาวรหัสผ่าน
      if (this.password.length < 6) {
        this.passwordError = "รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร";
        return false;
      }
      
      this.passwordError = "";
      return true;
    },
    
    togglePasswordVisibility() {
      // สลับการแสดง/ซ่อนรหัสผ่าน
      this.showPassword = !this.showPassword;
    },
    
    async handleLogin() {
      // ตรวจสอบความถูกต้องของข้อมูลทั้งหมดก่อนส่ง
      const isEmailValid = this.validateEmail();
      const isPasswordValid = this.validatePassword();
      
      if (!isEmailValid || !isPasswordValid) {
        return;
      }
      
      // แสดงสถานะกำลังโหลด
      this.isLoading = true;
      
      try {
        // ในการใช้งานจริง คุณจะเรียก API ที่นี่
        // ตัวอย่าง:
        // const response = await this.$axios.post('/api/login', {
        //   email: this.email,
        //   password: this.password
        // });
        
        // จำลองการเรียก API ด้วย setTimeout
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        console.log("กำลังเข้าสู่ระบบด้วยอีเมล:", this.email);
        
        // บันทึก token ลงใน localStorage (ในการใช้งานจริง)
        // localStorage.setItem('token', response.data.token);
        // localStorage.setItem('user', JSON.stringify(response.data.user));
        
        // redirect ไปหน้า home หลังจาก login สำเร็จ
        this.$router.push('/home-cust');
        
      } catch (error) {
        // จัดการกับ error ที่เกิดขึ้น
        console.error("Login error:", error);
        
        // แสดงข้อความ error ให้ผู้ใช้เห็น
        if (error.response && error.response.status === 401) {
          this.passwordError = "อีเมลหรือรหัสผ่านไม่ถูกต้อง";
        } else {
          this.passwordError = "เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง";
        }
        
      } finally {
        // ปิดสถานะกำลังโหลดไม่ว่าจะสำเร็จหรือไม่ก็ตาม
        this.isLoading = false;
      }
    }
  },
  
  // Lifecycle hook ที่จะทำงานเมื่อ component ถูกสร้าง
  created() {
    // ตรวจสอบว่าผู้ใช้ login อยู่แล้วหรือไม่
    // const token = localStorage.getItem('token');
    // if (token) {
    //   // ถ้า login อยู่แล้ว redirect ไปหน้า home ทันที
    //   this.$router.push('/home-cust');
    // }
  }
};
</script>

<style scoped>
.login-page {
  width: 100vw;
  min-height: 100vh;
  margin: 0;
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #000000 0%, #1a1a1a 100%);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', 
    'Prompt', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  position: relative;
  overflow-x: hidden;
  box-sizing: border-box;
}

.background-particles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: 
    radial-gradient(2px 2px at 20% 30%, rgba(255, 0, 127, 0.3), transparent),
    radial-gradient(2px 2px at 60% 70%, rgba(255, 196, 0, 0.3), transparent),
    radial-gradient(1px 1px at 50% 50%, rgba(41, 224, 131, 0.3), transparent),
    radial-gradient(2px 2px at 80% 10%, rgba(0, 123, 255, 0.3), transparent);
  background-size: 200% 200%;
  background-position: 0% 0%;
  animation: particles 20s ease infinite;
  pointer-events: none;
  opacity: 0.5;
  z-index: 0;
}

@keyframes particles {
  0%, 100% { 
    background-position: 0% 0%; 
  }
  50% { 
    background-position: 100% 100%; 
  }
}

.login-container {
  max-width: 450px;
  width: 100%;
  padding: 3rem 2.5rem;
  background: linear-gradient(
    135deg, 
    rgba(26, 26, 26, 0.95), 
    rgba(0, 0, 0, 0.95)
  );
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px); /* สำหรับ Safari */
  border-radius: 24px;
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.5),
    0 0 0 1px rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  position: relative;
  z-index: 1;
  animation: fadeInScale 0.6s ease;
  box-sizing: border-box;
}

@keyframes fadeInScale {
  from {
    opacity: 0;
    transform: scale(0.9) translateY(20px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.login-container:hover {
  box-shadow: 
    0 12px 48px rgba(0, 0, 0, 0.6),
    0 0 0 1px rgba(255, 0, 127, 0.3);
  border-color: rgba(255, 0, 127, 0.3);
}

.login-header {
  text-align: center;
  margin-bottom: 2.5rem;
}

.main-title {
  font-size: 2.5rem;
  font-weight: 900;
  margin: 0 0 0.5rem 0;
  background: linear-gradient(135deg, #ff007f 0%, #ff66b2 50%, #ffc400 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(0 0 20px rgba(255, 0, 127, 0.5));
  line-height: 1.2;
}

.subtitle {
  color: rgba(255, 255, 255, 0.7);
  font-size: 1.2rem;
  margin: 0;
  font-weight: 400;
}

.login-form {
  width: 100%;
}

.form-group {
  margin-bottom: 1.5rem;
  position: relative;
}

.form-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.6rem;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 600;
  font-size: 0.95rem;
  text-align: left;
}

.label-icon {
  font-size: 1.1rem;
  filter: drop-shadow(0 0 8px rgba(255, 0, 127, 0.4));
}

.input-group {
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.05);
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 0.8rem 1.2rem;
  transition: all 0.3s ease;
  box-sizing: border-box;
}

.input-group:focus-within {
  background: rgba(255, 255, 255, 0.08);
  border-color: #ff007f;
  box-shadow: 
    0 0 0 4px rgba(255, 0, 127, 0.1),
    0 8px 24px rgba(255, 0, 127, 0.2);
}

.input-group.has-error {
  border-color: #ff3838;
  background: rgba(255, 56, 56, 0.05);
}

.input-group.has-error:focus-within {
  box-shadow: 
    0 0 0 4px rgba(255, 56, 56, 0.1),
    0 8px 24px rgba(255, 56, 56, 0.2);
}

.input-group .icon {
  margin-right: 0.8rem;
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.6);
  filter: drop-shadow(0 0 8px rgba(255, 0, 127, 0.3));
  flex-shrink: 0;
}

.form-input {
  flex-grow: 1;
  border: none;
  outline: none;
  background: transparent;
  padding: 0.5rem;
  color: #ffffff;
  font-size: 1rem;
  box-sizing: border-box;
}

.form-input::placeholder {
  color: rgba(255, 255, 255, 0.4);
}

.form-input:-webkit-autofill,
.form-input:-webkit-autofill:hover,
.form-input:-webkit-autofill:focus {
  -webkit-text-fill-color: #ffffff;
  -webkit-box-shadow: 0 0 0 1000px rgba(26, 26, 26, 0.95) inset;
  transition: background-color 5000s ease-in-out 0s;
}

.toggle {
  flex-shrink: 0;
  margin-left: 0.8rem;
  font-size: 1.3rem;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.6);
  transition: all 0.3s ease;
  padding: 0.3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
}

.toggle:hover {
  color: #ff007f;
  transform: scale(1.1);
}

.error-message {
  display: block;
  margin-top: 0.5rem;
  color: #ff3838;
  font-size: 0.85rem;
  animation: shake 0.3s ease;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
}

.forgot-password {
  text-align: right;
  margin-top: 0.5rem;
  margin-bottom: 1rem;
}

.forgot-link {
  color: #ff007f;
  font-size: 0.9rem;
  text-decoration: none;
  transition: all 0.3s ease;
  display: inline-block;
}

.forgot-link:hover {
  color: #ff66b2;
  text-decoration: underline;
}

.btn-login {
  width: 100%;
  padding: 1.2rem;
  margin-top: 0.5rem;
  background: linear-gradient(135deg, #ff007f 0%, #ff4da6 100%);
  border: none;
  border-radius: 12px;
  color: #ffffff;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 
    0 0 20px rgba(255, 0, 127, 0.5), 
    0 0 40px rgba(255, 0, 127, 0.3);
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
}

.btn-login:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-login::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg, 
    transparent, 
    rgba(255, 255, 255, 0.3), 
    transparent
  );
  transition: left 0.5s;
}

.btn-login:hover:not(:disabled)::before {
  left: 100%;
}

.btn-login:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 
    0 0 30px rgba(255, 0, 127, 0.7), 
    0 0 60px rgba(255, 0, 127, 0.5);
}

.btn-login:active:not(:disabled) {
  transform: translateY(0);
}

.button-content {
  position: relative;
  z-index: 1;
}

.loading-spinner {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.register-section {
  margin-top: 1.5rem;
  text-align: center;
}

.register-text {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.95rem;
  margin: 0;
}

.register-link {
  color: #ff007f;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  margin-left: 0.3rem;
}

.register-link:hover {
  color: #ff66b2;
  text-decoration: underline;
}

.navigation-buttons {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.nav-button {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 0.8rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  font-size: 0.85rem;
  font-weight: 500;
  transition: all 0.3s ease;
  text-align: center;
  box-sizing: border-box;
}

.nav-button:hover {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.2);
  color: #ffffff;
  transform: translateY(-2px);
}

.back-home:hover {
  border-color: #29e083;
  color: #29e083;
  box-shadow: 0 4px 20px rgba(41, 224, 131, 0.2);
}

.login-tech:hover {
  border-color: #007bff;
  color: #007bff;
  box-shadow: 0 4px 20px rgba(0, 123, 255, 0.2);
}

.nav-icon {
  font-size: 1.5rem;
  display: block;
}

@media (max-width: 768px) {
  .login-page {
    padding: 1rem;
  }

  .login-container {
    max-width: 400px;
    padding: 2.5rem 2rem;
  }

  .main-title {
    font-size: 2.2rem;
  }

  .subtitle {
    font-size: 1.1rem;
  }
}

@media (max-width: 480px) {
  .login-page {
    padding: 0.5rem;
  }

  .login-container {
    max-width: 100%;
    padding: 2rem 1.5rem;
    border-radius: 20px;
  }

  .main-title {
    font-size: 2rem;
  }

  .subtitle {
    font-size: 1rem;
  }

  .form-group {
    margin-bottom: 1.2rem;
  }

  .input-group {
    padding: 0.7rem 1rem;
  }

  .form-input {
    font-size: 0.95rem;
  }

  .btn-login {
    padding: 1.1rem;
    font-size: 1rem;
  }

  .navigation-buttons {
    flex-direction: column;
    gap: 0.8rem;
  }

  .nav-button {
    flex-direction: row;
    justify-content: center;
    padding: 0.9rem;
  }

  .nav-icon {
    font-size: 1.3rem;
  }
}

@media (max-width: 375px) {
  .login-container {
    padding: 1.5rem 1.2rem;
  }

  .main-title {
    font-size: 1.8rem;
  }

  .subtitle {
    font-size: 0.95rem;
  }

  .input-group .icon {
    font-size: 1.1rem;
  }

  .form-input {
    font-size: 0.9rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .login-container,
  .background-particles,
  .btn-login::before,
  .error-message {
    animation: none;
  }

  * {
    transition-duration: 0.01ms !important;
  }
}
</style>
