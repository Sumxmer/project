<template>
  <div class="register-container">
    <h1>สมัครสมาชิก</h1>

    <form @submit.prevent="register">
      <!-- ชื่อผู้ใช้ -->
      <div class="form-group">
        <label>ชื่อผู้ใช้</label>
        <input v-model="username" type="text" required placeholder="กรอกชื่อผู้ใช้" />
      </div>

      <!-- อีเมล -->
      <div class="form-group">
        <label>อีเมล</label>
        <input v-model="email" type="email" required placeholder="กรอกอีเมล" />
      </div>

      <!-- รหัสผ่าน -->
      <div class="form-group">
        <label>รหัสผ่าน</label>
        <input v-model="password" type="password" required placeholder="กรอกรหัสผ่าน" />
      </div>

      <!-- ประเภทผู้ใช้ -->
      <div class="form-group role-select">
        <label>สมัครเป็น:</label>
        <div class="role-options">
          <label>
            <input
              type="checkbox"
              :checked="selectedRole === 'customer'"
              @change="handleRoleChange('customer')"
            />
            <span>ลูกค้า</span>
          </label>
          <label>
            <input
              type="checkbox"
              :checked="selectedRole === 'technician'"
              @change="handleRoleChange('technician')"
            />
            <span>ช่าง</span>
          </label>
        </div>
      </div>

      <button type="submit">สมัครสมาชิก</button>
    </form>
    <a href="/home" class="back-to-friend">กลับสู่หน้าหลัก</a>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      username: "",
      email: "",
      password: "",
      selectedRole: "", // 'customer' หรือ 'technician'
    };
  },
  methods: {
    handleRoleChange(role) {
      // ถ้าเลือกอันเดิม -> ยกเลิก
      if (this.selectedRole === role) {
        this.selectedRole = "";
      } else {
        this.selectedRole = role;
      }
    },
    register() {
      if (!this.username || !this.email || !this.password) {
        alert("กรุณากรอกข้อมูลให้ครบทุกช่อง");
        return;
      }
      if (!this.selectedRole) {
        alert("กรุณาเลือกประเภทผู้ใช้");
        return;
      }

      console.log({
        username: this.username,
        email: this.email,
        password: this.password,
        role: this.selectedRole,
      });

      alert(`สมัครสมาชิกเป็น "${this.selectedRole === 'customer' ? 'ลูกค้า' : 'ช่าง'}" เรียบร้อย!`);

      this.username = "";
      this.email = "";
      this.password = "";
      this.selectedRole = "";
    },
  },
};
</script>

<style scoped>
.register-container {
  max-width: 400px;
  margin: 60px auto;
  padding: 25px;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  background-color: #fff;
  font-family: "Prompt", sans-serif;
}

h1 {
  text-align: center;
  margin-bottom: 25px;
  color: #000; /* ตัวหนังสือดำ */
}

.form-group {
  margin-bottom: 20px;
  color: #000; /* ตัวหนังสือดำ */
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
  color: #000; /* ตัวหนังสือดำ */
}

input[type="text"],
input[type="email"],
input[type="password"] {
  width: 100%;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 1em;
  color: white;
}

.role-options {
  display: flex;
  justify-content: space-around;
  margin-top: 10px;
}

.role-options label {
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  color: #000; /* ตัวหนังสือดำ */
}

button {
  width: 100%;
  background-color: #007bff;
  color: white;
  padding: 12px;
  font-size: 1em;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background 0.3s;
}

button:hover {
  background-color: #0056b3;
}
</style>
