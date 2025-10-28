<template>
  <Navcust/>
  <div class="container">
    <!-- Header -->
    <header class="header">
      <h1>แจ้งซ่อม</h1>
      <p>กรอกข้อมูลด้านล่างเพื่อเรียกช่างถึงที่</p>
    </header>

    <!-- Form Card -->
    <div class="card">
      <form @submit.prevent="submitRepair">
        <!-- Repair Category -->
        <div class="form-group">
          <label>ประเภทงานซ่อม</label>
          <select v-model="category" required>
            <option disabled value="">เลือกประเภทงานซ่อม</option>
            <option>ไฟฟ้า</option>
            <option>ประปา</option>
            <option>แอร์</option>
            <option>เครื่องใช้ไฟฟ้า</option>
            <option>อื่น ๆ</option>
          </select>
        </div>

        <!-- Description -->
        <div class="form-group">
          <label>รายละเอียดปัญหา</label>
          <textarea v-model="description" rows="4" placeholder="กรอกรายละเอียดปัญหา..." required></textarea>
        </div>

        <!-- Address -->
        <div class="form-group">
          <label>ที่อยู่</label>
          <input v-model="address" type="text" placeholder="กรอกที่อยู่" required/>
        </div>

        <!-- Image Upload -->
        <div class="form-group">
          <label>แนบรูปภาพ (ถ้ามี)</label>
          <input type="file" @change="handleImageUpload" multiple/>
        </div>

        <!-- Submit Button -->
        <button type="submit">ส่งงานซ่อม</button>
      </form>
    </div>
  </div>
</template>

<script>
import Navcust from '../../components/navcust.vue';

export default {
  
  name: 'RequestRepair',
  data() {
    return {
      category: '',
      description: '',
      address: '',
      images: []
    }
  },
  methods: {
    handleImageUpload(event) {
      this.images = Array.from(event.target.files)
    },
    submitRepair() {
      if (!this.category || !this.description || !this.address) {
        alert('กรุณากรอกข้อมูลให้ครบทุกช่อง')
        return
      }
      console.log({
        category: this.category,
        description: this.description,
        address: this.address,
        images: this.images
      })
      alert('ส่งงานซ่อมเรียบร้อยแล้ว!')

      // reset form
      this.category = ''
      this.description = ''
      this.address = ''
      this.images = []
    }
  }
}
</script>

<style scoped>
/* Container */
.container {
  max-width: 600px;
  margin: 40px auto;
  padding: 0 20px;
  font-family: Arial, sans-serif;
}

/* Header */
.header {
  text-align: center;
  margin-bottom: 30px;
}

.header h1 {
  font-size: 2em;
  margin-bottom: 5px;
}

.header p {
  color: #555;
}

/* Card */
.card {
  background-color: #fff;
  border-radius: 15px;
  padding: 25px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
}

/* Form group */
.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 1em;
  box-sizing: border-box;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  border-color: #007bff;
  outline: none;
}

/* Button */
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
