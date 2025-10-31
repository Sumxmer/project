<template>
  <div class="login-page">
    <!-- Background Particles Effect -->
    <div class="particles-bg"></div>

    <!-- Login Card Container -->
    <div class="login-container">
      <div class="login-card">
        <!-- Header Section -->
        <div class="login-header">
          <div class="logo-icon">🔧</div>
          <h1 class="login-title">เข้าสู่ระบบ</h1>
          <p class="login-subtitle">ช่างเทคนิค</p>
        </div>

        <!-- Login Form -->
        <form @submit.prevent="handleLogin" class="login-form">
          <!-- Email Input -->
          <div class="form-group">
            <label class="form-label">
              <span class="label-icon">📧</span>
              <span>อีเมล</span>
            </label>
            <div class="input-wrapper">
              <span class="input-icon">@</span>
              <input 
                type="email" 
                v-model="email" 
                placeholder="your@email.com" 
                required 
                class="form-input"
              />
            </div>
          </div>

          <!-- Password Input -->
          <div class="form-group">
            <label class="form-label">
              <span class="label-icon">🔒</span>
              <span>รหัสผ่าน</span>
            </label>
            <div class="input-wrapper">
              <span class="input-icon">🔐</span>
              <input 
                :type="showPassword ? 'text' : 'password'" 
                v-model="password" 
                placeholder="รหัสผ่านของคุณ" 
                required
                class="form-input"
              />
              <button 
                type="button" 
                @click="showPassword = !showPassword" 
                class="toggle-password"
                :aria-label="showPassword ? 'ซ่อนรหัสผ่าน' : 'แสดงรหัสผ่าน'"
              >
                {{ showPassword ? '👁️' : '👁️‍🗨️' }}
              </button>
            </div>
          </div>

          <!-- Forgot Password Link -->
          <div class="forgot-password">
            <router-link to="/forgot-password" class="forgot-link">
              ลืมรหัสผ่าน?
            </router-link>
          </div>

          <!-- Login Button -->
          <button type="submit" class="btn-login">
            <span>เข้าสู่ระบบ</span>
            <span class="btn-arrow">→</span>
          </button>

          <!-- Register Link -->
          <p class="register-text">
            ยังไม่มีบัญชี? 
            <router-link to="/register" class="register-link">
              สมัครสมาชิก
            </router-link>
          </p>

          <!-- Navigation Links -->
          <div class="nav-links">
            <router-link to="/home" class="nav-link">
              <span class="link-icon">🏠</span>
              <span>กลับหน้าแรก</span>
            </router-link>
            <router-link to="/login" class="nav-link">
              <span class="link-icon">👤</span>
              <span>เข้าสู่ระบบลูกค้า</span>
            </router-link>
          </div>
        </form>
      </div>
    </div>

    <!-- Gradient Footer Bar -->
    <div class="gradient-footer"></div>
  </div>
</template>

<script>
export default {
  name: "LoginTech",
  data() {
    return {
      email: "",
      password: "",
      showPassword: false,
    };
  },
  methods: {
    handleLogin() {
      console.log("อีเมล:", this.email);
      console.log("รหัสผ่าน:", this.password);
      
      // Simulate login success
      alert("✅ เข้าสู่ระบบสำเร็จ!");
      this.$router.push('/dashboard');
    },
  },
};
</script>

<style scoped>
/* ================================================= */
/* Page Setup */
:global(html),
:global(body) {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  font-family: 'Space Grotesk', 'Sarabun', sans-serif;
}

.login-page {
  min-height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #000000 0%, #1a1a1a 100%);
  padding: 2rem;
  position: absolute;
  overflow: hidden;
}

/* ================================================= */
/* Background Particles */
.particles-bg {
  position: fixed;
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
  animation: particles 20s ease infinite;
  pointer-events: none;
  opacity: 0.5;
  z-index: 0;
}

@keyframes particles {
  0%, 100% { background-position: 0% 0%; }
  50% { background-position: 100% 100%; }
}

/* ================================================= */
/* Login Container */
.login-container {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 480px;
  animation: fadeInUp 0.6s ease;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* ================================================= */
/* Login Card */
.login-card {
  background: rgba(20, 20, 20, 0.9);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 0, 127, 0.3);
  border-radius: 24px;
  padding: 3rem 2.5rem;
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.5),
    0 0 60px rgba(255, 0, 127, 0.2);
  transition: all 0.3s ease;
}

.login-card:hover {
  border-color: rgba(255, 0, 127, 0.5);
  box-shadow: 
    0 12px 48px rgba(0, 0, 0, 0.6),
    0 0 80px rgba(255, 0, 127, 0.3);
}

/* ================================================= */
/* Header Section */
.login-header {
  text-align: center;
  margin-bottom: 2.5rem;
}

.logo-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
  filter: drop-shadow(0 0 20px rgba(255, 196, 0, 0.5));
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.login-title {
  font-size: 2.5rem;
  font-weight: 900;
  margin: 0 0 0.5rem;
  background: linear-gradient(135deg, #ffc400 0%, #ff9100 50%, #ff007f 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(0 0 20px rgba(255, 196, 0, 0.3));
}

.login-subtitle {
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.7);
  margin: 0;
  font-weight: 300;
}

/* ================================================= */
/* Form Styling */
.login-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.form-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.95rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.label-icon {
  font-size: 1.2rem;
}

/* ================================================= */
/* Input Wrapper */
.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.input-icon {
  position: absolute;
  left: 1.2rem;
  font-size: 1.2rem;
  color: rgba(255, 196, 0, 0.6);
  pointer-events: none;
  z-index: 1;
}

.form-input {
  width: 100%;
  padding: 1rem 1.2rem 1rem 3rem;
  background: rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(255, 196, 0, 0.3);
  border-radius: 12px;
  color: #ffffff;
  font-size: 1rem;
  font-family: inherit;
  transition: all 0.3s ease;
  outline: none;
}

.form-input::placeholder {
  color: rgba(255, 255, 255, 0.3);
}

.form-input:focus {
  background: rgba(0, 0, 0, 0.5);
  border-color: #ffc400;
  box-shadow: 
    0 0 0 3px rgba(255, 196, 0, 0.1),
    0 0 20px rgba(255, 196, 0, 0.2);
}

.form-input:hover:not(:focus) {
  border-color: rgba(255, 196, 0, 0.5);
}

/* ================================================= */
/* Toggle Password Button */
.toggle-password {
  position: absolute;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.3rem;
  cursor: pointer;
  padding: 0.5rem;
  color: rgba(255, 255, 255, 0.6);
  transition: all 0.3s ease;
  z-index: 1;
}

.toggle-password:hover {
  color: #ffc400;
  transform: scale(1.1);
}

/* ================================================= */
/* Forgot Password */
.forgot-password {
  text-align: right;
  margin-top: -0.5rem;
}

.forgot-link {
  color: rgba(255, 196, 0, 0.8);
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.3s ease;
}

.forgot-link:hover {
  color: #ffc400;
  text-decoration: underline;
}

/* ================================================= */
/* Login Button */
.btn-login {
  width: 100%;
  padding: 1.2rem;
  background: linear-gradient(135deg, #ffc400 0%, #ff9100 100%);
  border: none;
  color: #000000;
  font-size: 1.1rem;
  font-weight: 700;
  letter-spacing: 0.5px;
  cursor: pointer;
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.6rem;
  transition: all 0.3s ease;
  text-transform: uppercase;
  box-shadow: 0 4px 20px rgba(255, 196, 0, 0.4);
  margin-top: 0.5rem;
}

.btn-login:hover {
  background: linear-gradient(135deg, #ff9100 0%, #ffc400 100%);
  box-shadow: 0 6px 30px rgba(255, 196, 0, 0.6);
  transform: translateY(-2px);
}

.btn-login:active {
  transform: translateY(0);
}

.btn-arrow {
  font-size: 1.3rem;
  transition: transform 0.3s ease;
}

.btn-login:hover .btn-arrow {
  transform: translateX(5px);
}

/* ================================================= */
/* Register Text */
.register-text {
  text-align: center;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.95rem;
  margin: 0.5rem 0 0;
}

.register-link {
  color: #ffc400;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
}

.register-link:hover {
  color: #ff9100;
  text-decoration: underline;
}

/* ================================================= */
/* Navigation Links */
.nav-links {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255, 196, 0, 0.2);
}

.nav-link {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.9rem;
  background: rgba(255, 196, 0, 0.1);
  border: 1px solid rgba(255, 196, 0, 0.3);
  border-radius: 10px;
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  font-size: 0.85rem;
  font-weight: 600;
  transition: all 0.3s ease;
}

.nav-link:hover {
  background: rgba(255, 196, 0, 0.2);
  border-color: rgba(255, 196, 0, 0.5);
  color: #ffc400;
  transform: translateY(-2px);
}

.link-icon {
  font-size: 1.1rem;
}

/* ================================================= */
/* Gradient Footer */
.gradient-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background: linear-gradient(90deg, 
    #ff007f 0%, 
    #ff9100 25%, 
    #ffc400 50%, 
    #29e083 75%, 
    #007bff 100%
  );
  background-size: 200% 100%;
  animation: gradientMove 5s linear infinite;
  z-index: 1000;
}

@keyframes gradientMove {
  0% { background-position: 0% 0; }
  100% { background-position: 200% 0; }
}

/* ================================================= */
/* Responsive Design */
@media (max-width: 768px) {
  .login-page {
    padding: 1.5rem;
  }

  .login-card {
    padding: 2.5rem 2rem;
  }

  .login-title {
    font-size: 2rem;
  }

  .logo-icon {
    font-size: 3rem;
  }                   
}

@media (max-width: 480px) {
  .login-page {
    padding: 1rem;
  }

  .login-card {
    padding: 2rem 1.5rem;
  }

  .login-title {
    font-size: 1.8rem;
  }

  .nav-links {
    flex-direction: column;
  }

  .form-input {
    padding: 0.9rem 1rem 0.9rem 2.8rem;
  }
}
</style>