<template>
  <div class="about-page">
    <header class="header">
      <h1>About Us - ทีม Dev Fixถึงใจ</h1>
      <button class="back-btn" @click="goBack">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
             class="bi bi-arrow-left" viewBox="0 0 16 16">
          <path fill-rule="evenodd"
                d="M15 8a.5.5 0 0 1-.5.5H2.707l3.147 3.146a.5.5 0 0 1-.708.708l-4-4a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 7.5H14.5A.5.5 0 0 1 15 8z"/>
        </svg>
        Back
      </button>
    </header>

    <div class="team-container">
      <div class="team-member" v-for="dev in devs" :key="dev.id">
        <img :src="dev.image" :alt="dev.name" />
        <h3>{{ dev.name }}</h3>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "About",
  data() {
    return {
      devs: [
        { id: 1, name: "PM", image: "/devteam/boss.png" },
        { id: 2, name: "Dev", image: "/devteam/chaina.png" },
        { id: 3, name: "Dev", image: "/devteam/hooto.png" },
        { id: 4, name: "Dev", image: "/devteam/leo.png" },
        { id: 5, name: "Dev", image: "/devteam/palm.jpg" },
        { id: 6, name: "Dev", image: "/devteam/mix.png" },
        { id: 7, name: "Backend/Full Stack", image: "/devteam/summer.png" }
      ]
    }
  },
  methods: {
    goBack() {
      this.$router ? this.$router.back() : window.history.back();
    }
  }
}
</script>


<style scoped>
.about-page {
  font-family: sans-serif;
  padding: 2rem;
  background-color: #f6f8fa;
}

.header {
  text-align: center;
  margin-bottom: 2rem;
  position: relative;
}

.header h1 {
  margin-bottom: 1rem;
}

.back-btn {
  position: absolute;
  left: 2rem;
  top: 50%;
  transform: translateY(-50%);
  background: #007bff;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 5px;
  transition: all 0.3s ease;
}

.back-btn:hover {
  background: #0056b3;
  transform: translateY(-50%) scale(1.05);
}

.team-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
}

.team-member {
  background: white;
  border-radius: 10px;
  padding: 1rem;
  width: 150px;
  text-align: center;
  box-shadow: 0 4px 10px rgba(0,0,0,0.15);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.team-member:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 15px rgba(0,0,0,0.25);
}

.team-member img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 0.5rem;
}

.team-member h3 {
  margin: 0.3rem 0 0;
  font-size: 1rem;
}

/* Responsive */
@media (max-width: 600px) {
  .team-member {
    width: 45%;
  }
}

@media (max-width: 400px) {
  .team-member {
    width: 90%;
  }

  .back-btn {
    left: 1rem;
    padding: 0.4rem 0.8rem;
    font-size: 0.9rem;
  }
}
</style>
