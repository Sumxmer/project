<template>
  <!-- 
    คอนเทนเนอร์หลักของหน้า Login 
    เราจะใช้ class login-page เป็น wrapper นอกสุดเพื่อครอบคลุมทั้งหน้าจอ
    และกำหนดพื้นหลังเป็นสีดำแบบเดียวกับหน้าอื่นๆ
  -->
  <div class="login-page">
    <!-- กล่อง Login Card ที่บรรจุฟอร์มทั้งหมด -->
    <div class="login-container">
      <!-- ส่วนหัวของฟอร์ม -->
      <div class="login-header">
        <h1 class="main-title">เข้าสู่ระบบ</h1>
        <p class="subtitle">เข้าสู่ระบบ ลูกค้า</p>
      </div>

      <!-- ฟอร์ม Login -->
      <form @submit.prevent="handleLogin" class="login-form">
        <!-- ช่องกรอกอีเมล -->
        <div class="form-group">
          <label for="email" class="form-label">อีเมล</label>
          <div class="input-group">
            <span class="icon">@</span>
            <input 
              type="email" 
              id="email"
              v-model="email" 
              placeholder="your@email.com" 
              class="form-input"
              required 
            />
          </div>
        </div>

        <!-- ช่องกรอกรหัสผ่าน -->
        <div class="form-group">
          <label for="password" class="form-label">รหัสผ่าน</label>
          <div class="input-group">
            <span class="icon">🔒</span>
            <input 
              :type="showPassword ? 'text' : 'password'" 
              id="password"
              v-model="password" 
              placeholder="รหัสผ่านของคุณ" 
              class="form-input"
              required 
            />
            <span class="toggle" @click="showPassword = !showPassword">
              {{ showPassword ? '👁️' : '👁️‍🗨️' }}
            </span>
          </div>
        </div>

        <!-- ลิงก์ลืมรหัสผ่าน -->
        <div class="forgot-password">
          <router-link to="/forgot-password" class="forgot-link">
            ลืมรหัสผ่าน?
          </router-link>
        </div>

        <!-- ปุ่มเข้าสู่ระบบ -->
        <button type="submit" class="btn-login">
          <span class="button-content">เข้าสู่ระบบ</span>
        </button>

        <!-- ลิงก์สมัครสมาชิก -->
        <div class="register-section">
          <p class="register-text">
            ยังไม่มีบัญชี? 
            <router-link to="/register" class="register-link">
              สมัครสมาชิก
            </router-link>
          </p>
        </div>

        <!-- ปุ่มนำทางเพิ่มเติม -->
        <div class="navigation-buttons">
          <router-link to="/home" class="nav-button back-home">
            <span class="nav-icon">🏠</span>
            <span>กลับไปหน้าแรก</span>
          </router-link>
          <router-link to="/logintech" class="nav-button login-tech">
            <span class="nav-icon">🔧</span>
            <span>เข้าสู่ระบบช่าง</span>
          </router-link>
        </div>
      </form>
    </div>

    <!-- เอฟเฟกต์พื้นหลังแบบ particle -->
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
    };
  },
  methods: {
    handleLogin() {
      // ฟังก์ชันสำหรับจัดการการเข้าสู่ระบบ
      // ในที่นี่คุณจะเรียก API เพื่อตรวจสอบข้อมูลผู้ใช้
      console.log("กำลังเข้าสู่ระบบด้วยอีเมล:", this.email);
      
      // ตัวอย่างการ validate ข้อมูลก่อนส่ง
      if (!this.email || !this.password) {
        alert("กรุณากรอกอีเมลและรหัสผ่าน");
        return;
      }

      // ในการใช้งานจริง คุณจะเรียก API ประมาณนี้:
      // this.$axios.post('/api/login', {
      //   email: this.email,
      //   password: this.password
      // }).then(response => {
      //   // บันทึก token และ redirect ไปหน้า home
      //   localStorage.setItem('token', response.data.token);
      //   this.$router.push('/home-cust');
      // }).catch(error => {
      //   alert('อีเมลหรือรหัสผ่านไม่ถูกต้อง');
      // });

      // สำหรับการทดสอบ เราจะ redirect ไปหน้า home ทันที
      this.$router.push('/home-cust');
    },
  },
};
</script>

<style scoped>
/* 
  ===============================================================================
  SECTION: หน้า Login หลัก - พื้นหลังสีดำครอบคลุมทั้งหน้าจอ
  ===============================================================================
  
  นี่คือ element ที่สำคัญที่สุดที่จะแก้ปัญหาสีขาวที่คุณพบ
  เราจะกำหนดให้หน้าจอทั้งหมดเป็นสีดำ และวาง login card ไว้ตรงกลาง
*/
.login-page {
  /* ให้ครอบคลุมทั้งความกว้างและความสูงของหน้าจอ */
  width: 100vw;
  min-height: 100vh;
  
  /* ลบ margin และ padding เพื่อไม่ให้มีช่องว่าง */
  margin: 0;
  padding: 0;
  
  /* ใช้ flexbox เพื่อจัดวาง login card ให้อยู่กึ่งกลาง */
  display: flex;
  justify-content: center;
  align-items: center;
  
  /* พื้นหลังสีดำแบบ gradient เหมือนหน้าอื่นๆ */
  background: linear-gradient(135deg, #000000 0%, #1a1a1a 100%);
  
  /* กำหนด font family ให้เป็นแบบเดียวกับทั้งเว็บไซต์ */
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', 
    'Prompt', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  
  /* position relative เพื่อให้ background particles วางตำแหน่งได้ */
  position: relative;
  
  /* ป้องกันการ scroll แนวนอน */
  overflow-x: hidden;
  
  /* เพิ่ม padding เล็กน้อยเพื่อให้มีระยะห่างจากขอบหน้าจอ */
  padding: 1rem;
  
  /* กำหนด box-sizing เพื่อให้การคำนวณขนาดถูกต้อง */
  box-sizing: border-box;
}

/* 
  ===============================================================================
  SECTION: เอฟเฟกต์พื้นหลังแบบ Particle
  ===============================================================================
  
  เอฟเฟกต์นี้จะสร้างจุดสีเคลื่อนไหวเบาๆ เพื่อเพิ่มความน่าสนใจให้กับหน้า
  โดยไม่รบกวนการมองเห็นเนื้อหาหลัก
*/
.background-particles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  
  /* สร้างจุดสีหลายจุดด้วย radial-gradient */
  background-image: 
    radial-gradient(2px 2px at 20% 30%, rgba(255, 0, 127, 0.3), transparent),
    radial-gradient(2px 2px at 60% 70%, rgba(255, 196, 0, 0.3), transparent),
    radial-gradient(1px 1px at 50% 50%, rgba(41, 224, 131, 0.3), transparent),
    radial-gradient(2px 2px at 80% 10%, rgba(0, 123, 255, 0.3), transparent);
  
  /* ขยาย background ให้ใหญ่กว่าพื้นที่จริงเพื่อให้ animate ได้ */
  background-size: 200% 200%;
  background-position: 0% 0%;
  
  /* เรียกใช้ animation ที่จะทำให้จุดสีเคลื่อนไหว */
  animation: particles 20s ease infinite;
  
  /* ทำให้ไม่สามารถคลิกได้ เพื่อไม่ให้ขวางการคลิกปุ่มหรือ input */
  pointer-events: none;
  
  /* ปรับความโปร่งแสงให้เห็นเบาๆ */
  opacity: 0.5;
  
  /* วางไว้ด้านหลังเนื้อหาหลัก */
  z-index: 0;
}

/* Animation สำหรับ particle effect */
@keyframes particles {
  0%, 100% { 
    background-position: 0% 0%; 
  }
  50% { 
    background-position: 100% 100%; 
  }
}

/* 
  ===============================================================================
  SECTION: Login Container - กล่องหลักที่บรรจุฟอร์ม
  ===============================================================================
  
  นี่คือกล่องที่เดิมคุณกำหนดเป็นสีขาว เราจะเปลี่ยนเป็นสีเข้มแบบโปร่งแสง
  เพื่อให้เข้ากับธีมสีดำของเว็บไซต์
*/
.login-container {
  /* จำกัดความกว้างสูงสุดเพื่อไม่ให้กล่องกว้างเกินไป */
  max-width: 450px;
  width: 100%;
  
  /* เพิ่ม padding ภายในกล่อง */
  padding: 3rem 2.5rem;
  
  /* พื้นหลังสีเข้มแบบโปร่งแสง แทนที่จะเป็นสีขาว */
  background: linear-gradient(
    135deg, 
    rgba(26, 26, 26, 0.95), 
    rgba(0, 0, 0, 0.95)
  );
  
  /* เพิ่ม backdrop blur เพื่อสร้างเอฟเฟกต์กระจกฝ้า */
  backdrop-filter: blur(20px);
  
  /* ขอบมนเพื่อให้ดูนุ่มนวลและทันสมัย */
  border-radius: 24px;
  
  /* เพิ่มเงาเพื่อให้กล่องดูมีมิติและลอยขึ้นมา */
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.5),
    0 0 0 1px rgba(255, 255, 255, 0.1);
  
  /* เพิ่มเส้นขอบบางๆ สีขาวโปร่งแสง */
  border: 1px solid rgba(255, 255, 255, 0.1);
  
  /* transition เพื่อให้การเปลี่ยนแปลงดูนุ่มนวล */
  transition: all 0.3s ease;
  
  /* ให้อยู่เหนือ background particles */
  position: relative;
  z-index: 1;
  
  /* เพิ่ม animation เมื่อโหลดหน้า */
  animation: fadeInScale 0.6s ease;
  
  /* กำหนด box-sizing */
  box-sizing: border-box;
}

/* Animation สำหรับ login container */
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

/* เอฟเฟกต์เมื่อ hover บนกล่อง */
.login-container:hover {
  /* เพิ่มเงาและเปลี่ยนสีขอบเป็นชมพูเล็กน้อย */
  box-shadow: 
    0 12px 48px rgba(0, 0, 0, 0.6),
    0 0 0 1px rgba(255, 0, 127, 0.3);
  border-color: rgba(255, 0, 127, 0.3);
}

/* 
  ===============================================================================
  SECTION: Login Header - ส่วนหัวของฟอร์ม
  ===============================================================================
*/
.login-header {
  text-align: center;
  margin-bottom: 2.5rem;
}

/* หัวข้อหลัก "เข้าสู่ระบบ" */
.main-title {
  font-size: 2.5rem;
  font-weight: 900;
  margin: 0 0 0.5rem 0;
  
  /* สร้างเอฟเฟกต์ตัวอักษรสีรุ้งแบบ gradient */
  background: linear-gradient(135deg, #ff007f 0%, #ff66b2 50%, #ffc400 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  
  /* เพิ่มเงาเรืองแสง */
  filter: drop-shadow(0 0 20px rgba(255, 0, 127, 0.5));
  line-height: 1.2;
}

/* ข้อความรอง "เข้าสู่ระบบ ลูกค้า" */
.subtitle {
  color: rgba(255, 255, 255, 0.7);
  font-size: 1.2rem;
  margin: 0;
  font-weight: 400;
}

/* 
  ===============================================================================
  SECTION: Login Form - ฟอร์มหลัก
  ===============================================================================
*/
.login-form {
  width: 100%;
}

/* 
  Form Group - wrapper สำหรับแต่ละ input field
  ช่วยในการจัด spacing ระหว่าง input แต่ละตัว
*/
.form-group {
  margin-bottom: 1.5rem;
}

/* Label สำหรับแต่ละ input */
.form-label {
  display: block;
  margin-bottom: 0.6rem;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 600;
  font-size: 0.95rem;
  text-align: left;
}

/* 
  Input Group - wrapper ที่ห่อหุ้ม icon, input และ toggle button
  ออกแบบให้มีพื้นหลังโปร่งแสงและเส้นขอบที่สวยงาม
*/
.input-group {
  display: flex;
  align-items: center;
  
  /* พื้นหลังโปร่งแสงสีขาว แทนที่จะเป็นสีดำ */
  background: rgba(255, 255, 255, 0.05);
  
  /* เส้นขอบโปร่งแสง */
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  
  /* padding ภายใน */
  padding: 0.8rem 1.2rem;
  
  /* transition สำหรับ animation */
  transition: all 0.3s ease;
  
  /* กำหนด box-sizing */
  box-sizing: border-box;
}

/* เมื่อ input ภายใน group ได้รับ focus */
.input-group:focus-within {
  /* เปลี่ยนพื้นหลังให้ขาวขึ้นเล็กน้อย */
  background: rgba(255, 255, 255, 0.08);
  
  /* เปลี่ยนสีขอบเป็นชมพู */
  border-color: #ff007f;
  
  /* เพิ่มเงาเรืองแสงรอบๆ */
  box-shadow: 
    0 0 0 4px rgba(255, 0, 127, 0.1),
    0 8px 24px rgba(255, 0, 127, 0.2);
}

/* Icon ภายใน input group */
.input-group .icon {
  /* เพิ่มระยะห่างด้านขวา */
  margin-right: 0.8rem;
  
  /* ขนาดของไอคอน */
  font-size: 1.2rem;
  
  /* สีของไอคอน */
  color: rgba(255, 255, 255, 0.6);
  
  /* เพิ่มเงาเรืองแสงเล็กน้อย */
  filter: drop-shadow(0 0 8px rgba(255, 0, 127, 0.3));
  
  /* ป้องกันไม่ให้ไอคอนย่อหรือขยาย */
  flex-shrink: 0;
}

/* 
  Form Input - ช่องกรอกข้อมูลจริง
  นี่คือส่วนที่สำคัญที่ต้องกำหนดสีตัวอักษรให้ชัดเจน
*/
.form-input {
  /* ให้ขยายเต็มพื้นที่ที่เหลือ */
  flex-grow: 1;
  
  /* ลบ border และ outline ที่มากับ default style */
  border: none;
  outline: none;
  
  /* พื้นหลังโปร่งใส เพราะเรามี background จาก input-group แล้ว */
  background: transparent;
  
  /* padding ภายใน */
  padding: 0.5rem;
  
  /* สีตัวอักษรเป็นสีขาว - นี่สำคัญมาก! */
  color: #ffffff;
  
  /* ขนาดตัวอักษร */
  font-size: 1rem;
  
  /* กำหนด box-sizing */
  box-sizing: border-box;
}

/* สไตล์สำหรับ placeholder text */
.form-input::placeholder {
  color: rgba(255, 255, 255, 0.4);
}

/* 
  Toggle Button - ปุ่มสำหรับแสดง/ซ่อนรหัสผ่าน
  วางไว้ด้านขวาสุดของ input group
*/
.toggle {
  /* ป้องกันไม่ให้ย่อหรือขยาย */
  flex-shrink: 0;
  
  /* เพิ่มระยะห่างด้านซ้าย */
  margin-left: 0.8rem;
  
  /* ขนาดของไอคอน */
  font-size: 1.3rem;
  
  /* เปลี่ยน cursor เป็นรูปมือเมื่อ hover */
  cursor: pointer;
  
  /* สีของไอคอน */
  color: rgba(255, 255, 255, 0.6);
  
  /* transition สำหรับ animation */
  transition: all 0.3s ease;
  
  /* padding เพื่อให้กดง่ายขึ้น */
  padding: 0.3rem;
  
  /* จัดให้อยู่กึ่งกลาง */
  display: flex;
  align-items: center;
  justify-content: center;
}

/* เมื่อ hover บนปุ่ม toggle */
.toggle:hover {
  color: #ff007f;
  transform: scale(1.1);
}

/* 
  ===============================================================================
  SECTION: Forgot Password - ส่วนลืมรหัสผ่าน
  ===============================================================================
*/
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

/* 
  ===============================================================================
  SECTION: Login Button - ปุ่มเข้าสู่ระบบหลัก
  ===============================================================================
*/
.btn-login {
  /* ให้กว้างเต็มพื้นที่ */
  width: 100%;
  
  /* padding ภายใน */
  padding: 1.2rem;
  
  /* เว้นระยะด้านบน */
  margin-top: 0.5rem;
  
  /* พื้นหลังเป็น gradient สีชมพู */
  background: linear-gradient(135deg, #ff007f 0%, #ff4da6 100%);
  
  /* ลบ border */
  border: none;
  
  /* ขอบมน */
  border-radius: 12px;
  
  /* สีตัวอักษร */
  color: #ffffff;
  
  /* ขนาดและน้ำหนักตัวอักษร */
  font-size: 1.1rem;
  font-weight: 700;
  
  /* เปลี่ยน cursor เป็นรูปมือ */
  cursor: pointer;
  
  /* transition สำหรับ animation */
  transition: all 0.3s ease;
  
  /* เพิ่มเงาเรืองแสง */
  box-shadow: 
    0 0 20px rgba(255, 0, 127, 0.5), 
    0 0 40px rgba(255, 0, 127, 0.3);
  
  /* position relative เพื่อวาง pseudo-element */
  position: relative;
  overflow: hidden;
  
  /* กำหนด box-sizing */
  box-sizing: border-box;
}

/* เอฟเฟกต์แสงวิ่งผ่านด้วย pseudo-element */
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

/* เมื่อ hover บนปุ่ม แสงจะวิ่งผ่าน */
.btn-login:hover::before {
  left: 100%;
}

/* เมื่อ hover บนปุ่ม */
.btn-login:hover {
  transform: translateY(-2px);
  box-shadow: 
    0 0 30px rgba(255, 0, 127, 0.7), 
    0 0 60px rgba(255, 0, 127, 0.5);
}

/* เมื่อกดปุ่ม */
.btn-login:active {
  transform: translateY(0);
}

/* เนื้อหาภายในปุ่ม */
.button-content {
  position: relative;
  z-index: 1;
}

/* 
  ===============================================================================
  SECTION: Register Section - ส่วนสมัครสมาชิก
  ===============================================================================
*/
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

/* 
  ===============================================================================
  SECTION: Navigation Buttons - ปุ่มนำทางเพิ่มเติม
  ===============================================================================
*/
.navigation-buttons {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

/* ปุ่มนำทางแต่ละปุ่ม */
.nav-button {
  /* ให้ปุ่มแต่ละอันมีขนาดเท่ากัน */
  flex: 1;
  
  /* จัดเรียงไอคอนและข้อความ */
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  
  /* padding ภายใน */
  padding: 1rem 0.8rem;
  
  /* พื้นหลังโปร่งแสง */
  background: rgba(255, 255, 255, 0.03);
  
  /* เส้นขอบ */
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  
  /* สีข้อความ */
  color: rgba(255, 255, 255, 0.7);
  
  /* ลบเส้นใต้ของลิงก์ */
  text-decoration: none;
  
  /* ขนาดตัวอักษร */
  font-size: 0.85rem;
  font-weight: 500;
  
  /* transition สำหรับ animation */
  transition: all 0.3s ease;
  
  /* จัดข้อความให้อยู่กึ่งกลาง */
  text-align: center;
  
  /* กำหนด box-sizing */
  box-sizing: border-box;
}

/* เมื่อ hover บนปุ่มนำทาง */
.nav-button:hover {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.2);
  color: #ffffff;
  transform: translateY(-2px);
}

/* ปุ่มกลับหน้าแรกมีสีเขียว */
.back-home:hover {
  border-color: #29e083;
  color: #29e083;
  box-shadow: 0 4px 20px rgba(41, 224, 131, 0.2);
}

/* ปุ่มเข้าสู่ระบบช่างมีสีน้ำเงิน */
.login-tech:hover {
  border-color: #007bff;
  color: #007bff;
  box-shadow: 0 4px 20px rgba(0, 123, 255, 0.2);
}

/* ไอคอนในปุ่มนำทาง */
.nav-icon {
  font-size: 1.5rem;
  display: block;
}

/* 
  ===============================================================================
  SECTION: Responsive Design
  ===============================================================================
*/

/* สำหรับ Tablet และหน้าจอขนาดกลาง */
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

/* สำหรับมือถือ */
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

/* สำหรับหน้าจอขนาดพิเศษเล็ก */
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

/* 
  ===============================================================================
  SECTION: Accessibility - Reduced Motion
  ===============================================================================
  
  สำหรับผู้ใช้ที่เปิดโหมด reduced motion ในระบบปฏิบัติการ
  เราจะปิด animation ทั้งหมดเพื่อไม่ให้เกิดอาการไม่สบาย
*/
@media (prefers-reduced-motion: reduce) {
  .login-container,
  .background-particles,
  .btn-login::before {
    animation: none;
  }

  * {
    transition-duration: 0.01ms !important;
  }
}
</style>
