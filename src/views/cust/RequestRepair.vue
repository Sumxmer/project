<template>
  <div class="page-container">
    <Navcust />
    <div class="content-wrapper">
      <header class="header">
        <h1 class="gradient-text">แจ้งซ่อม</h1>
        <p class="subtitle">กรอกข้อมูลด้านล่างเพื่อเรียกช่างถึงที่</p>
      </header>

      <div class="form-card">
        <form @submit.prevent="submitRepair">
          <!-- Repair Category -->
          <div class="form-group">
            <label class="form-label">
              <span class="label-icon">🔧</span>
              <span>ประเภทงานซ่อม</span>
            </label>
            <select v-model="category" required class="form-select">
              <option disabled value="">เลือกประเภทงานซ่อม</option>
              <option>เครื่องใช้ไฟฟ้า/อิเล็กทรอนิกส์</option>
              <option>ซ่อมยานยนต์/เครื่องจักร</option>
              <option>ซ่อมอาคาร/ก่อสร้าง</option>
              <option>ซ่อมระบบไอที/เครือข่าย</option>
              <option>ซ่อมทั่วไป/อื่น ๆ</option>
            </select>
          </div>

          <!-- Description -->
          <div class="form-group">
            <label class="form-label">
              <span class="label-icon">📝</span>
              <span>รายละเอียดปัญหา</span>
            </label>
            <textarea 
              v-model="description" 
              rows="5" 
              placeholder="กรอกรายละเอียดปัญหา เช่น อาการเสีย สาเหตุที่พบ..." 
              required
              class="form-textarea"
            ></textarea>
          </div>

          <!-- Address -->
          <div class="form-group">
            <label class="form-label">
              <span class="label-icon">📍</span>
              <span>ที่อยู่</span>
            </label>
            <input 
              v-model="address" 
              type="text" 
              placeholder="กรอกที่อยู่สำหรับให้ช่างไปซ่อม" 
              required
              class="form-input"
            />
          </div>

          <!-- Date & Time -->
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">
                <span class="label-icon">📅</span>
                <span>วันที่</span>
              </label>
              <input 
                v-model="date" 
                type="date" 
                required
                class="form-input"
              />
            </div>

            <div class="form-group">
              <label class="form-label">
                <span class="label-icon">🕐</span>
                <span>เวลา</span>
              </label>
              <input 
                v-model="time" 
                type="time" 
                required
                class="form-input"
              />
            </div>
          </div>

          <!-- Image Upload -->
          <div class="form-group">
            <label class="form-label">
              <span class="label-icon">📷</span>
              <span>แนบรูปภาพ (ถ้ามี)</span>
            </label>
            <div class="upload-area" @click="$refs.fileInput.click()">
              <input 
                type="file" 
                ref="fileInput"
                @change="handleImageUpload" 
                multiple
                accept="image/*"
                style="display: none;"
              />
              <div v-if="images.length === 0" class="upload-placeholder">
                <span class="upload-icon">📁</span>
                <p>คลิกเพื่อเลือกรูปภาพ</p>
                <p class="upload-hint">รองรับไฟล์ JPG, PNG (สูงสุด 5 ไฟล์)</p>
              </div>
              <div v-else class="uploaded-files">
                <div v-for="(image, index) in images" :key="index" class="file-item">
                  <span>📷 {{ image.name }}</span>
                  <button type="button" @click.stop="removeImage(index)" class="remove-btn">✕</button>
                </div>
              </div>
            </div>
          </div>

          <!-- Submit Button -->
          <button type="submit" class="submit-button">
            <span class="button-icon">🚀</span>
            <span>ส่งงานซ่อม</span>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Navcust from '../../components/Navcust.vue';

export default {
  name: 'RequestRepair',
  components: { Navcust },
  data() {
    return {
      category: '',
      description: '',
      address: '',
      date: '',
      time: '',
      images: []
    }
  },
  methods: {
    handleImageUpload(event) {
      const files = Array.from(event.target.files);
      if (this.images.length + files.length > 5) {
        alert('สามารถอัพโหลดได้สูงสุด 5 ไฟล์');
        return;
      }
      this.images.push(...files);
    },
    removeImage(index) {
      this.images.splice(index, 1);
    },
    submitRepair() {
      if (!this.category || !this.description || !this.address || !this.date || !this.time) {
        alert('กรุณากรอกข้อมูลให้ครบทุกช่อง');
        return;
      }
      
      console.log({
        category: this.category,
        description: this.description,
        address: this.address,
        date: this.date,
        time: this.time,
        images: this.images
      });
      
      alert('✅ ส่งงานซ่อมเรียบร้อยแล้ว!\nช่างจะติดต่อกลับเร็วๆ นี้');

      // Reset form
      this.category = '';
      this.description = '';
      this.address = '';
      this.date = '';
      this.time = '';
      this.images = [];
      this.$refs.fileInput.value = '';
    }
  }
}
</script>

<style scoped>
/* Page Container */
.page-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #000000 0%, #1a1a1a 100%);
  font-family: 'Space Grotesk', sans-serif;
}

/* Content Wrapper */
.content-wrapper {
  margin-left: 250px;
  padding: 3rem 2rem;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Header */
.header {
  text-align: center;
  margin-bottom: 3rem;
  animation: fadeInDown 0.8s ease;
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.gradient-text {
  font-size: 3rem;
  font-weight: 900;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #ff007f 0%, #ff66b2 50%, #ffc400 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(0 0 20px rgba(255, 0, 127, 0.5));
}

.subtitle {
  color: rgba(255, 255, 255, 0.8);
  font-size: 1.2rem;
}

/* Form Card */
.form-card {
  width: 100%;
  max-width: 700px;
  background: linear-gradient(135deg, rgba(26, 26, 26, 0.9), rgba(0, 0, 0, 0.9));
  backdrop-filter: blur(10px);
  border-radius: 25px;
  padding: 3rem 2.5rem;
  box-shadow: 0 15px 50px rgba(255, 0, 127, 0.2);
  border: 1px solid rgba(255, 0, 127, 0.3);
  animation: fadeInUp 0.8s ease;
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

/* Form Group */
.form-group {
  margin-bottom: 2rem;
}

.form-label {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin-bottom: 0.8rem;
  color: #fff;
  font-weight: 600;
  font-size: 1.05rem;
}

.label-icon {
  font-size: 1.4rem;
}

/* Form Row */
.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

/* Form Inputs */
.form-input,
.form-select,
.form-textarea {
  width: 100%;
  padding: 1rem 1.2rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  color: #fff;
  font-size: 1rem;
  font-family: 'Space Grotesk', sans-serif;
  transition: all 0.3s ease;
}

.form-input::placeholder,
.form-textarea::placeholder {
  color: rgba(255, 255, 255, 0.4);
}

.form-input:focus,
.form-select:focus,
.form-textarea:focus {
  outline: none;
  border-color: #ff007f;
  background: rgba(255, 0, 127, 0.05);
  box-shadow: 0 0 20px rgba(255, 0, 127, 0.2);
}

.form-select {
  cursor: pointer;
}

.form-textarea {
  resize: vertical;
  min-height: 120px;
}

/* Upload Area */
.upload-area {
  width: 100%;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.03);
  border: 2px dashed rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.upload-area:hover {
  border-color: #ff007f;
  background: rgba(255, 0, 127, 0.05);
}

.upload-placeholder {
  text-align: center;
}

.upload-icon {
  font-size: 3rem;
  display: block;
  margin-bottom: 1rem;
}

.upload-placeholder p {
  color: rgba(255, 255, 255, 0.7);
  margin: 0.5rem 0;
}

.upload-hint {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.5);
}

/* Uploaded Files */
.uploaded-files {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.file-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.8rem 1rem;
  background: rgba(255, 0, 127, 0.1);
  border-radius: 8px;
  color: #fff;
}

.remove-btn {
  background: rgba(255, 0, 0, 0.2);
  color: #ff4081;
  border: 1px solid rgba(255, 0, 0, 0.3);
  border-radius: 50%;
  width: 30px;
  height: 30px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.remove-btn:hover {
  background: rgba(255, 0, 0, 0.4);
  transform: scale(1.1);
}

/* Submit Button */
.submit-button {
  width: 100%;
  padding: 1.2rem;
  background: linear-gradient(135deg, #ff007f, #ff4da6);
  color: #fff;
  font-size: 1.2rem;
  font-weight: 700;
  border: none;
  border-radius: 15px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  transition: all 0.3s ease;
  box-shadow: 0 0 20px rgba(255, 0, 127, 0.4);
  margin-top: 1rem;
}

.submit-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 30px rgba(255, 0, 127, 0.6);
  background: linear-gradient(135deg, #ff4da6, #ff007f);
}

.button-icon {
  font-size: 1.5rem;
}

/* Responsive */
@media (max-width: 768px) {
  .content-wrapper {
    margin-left: 0;
    padding: 2rem 1rem;
    padding-bottom: 100px;
  }

  .gradient-text {
    font-size: 2rem;
  }

  .form-card {
    padding: 2rem 1.5rem;
  }

  .form-row {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .upload-area {
    padding: 1.5rem;
  }
}
</style>