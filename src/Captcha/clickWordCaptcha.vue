<template>
  <div class="click-word-captcha">
    <div v-if="loading" class="loading">Loading...</div>
    <div v-else class="captcha-container">
      <span
          v-for="(word, index) in words"
          :key="index"
          :data-index="index"
          @click="onWordClick(index)"
          :class="{ selected: selectedIndices.includes(index) }"
      >{{ word }}</span>
    </div>
    <button @click="submitCaptcha" :disabled="!isReadyToSubmit">Submit</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      loading: true,
      words: [],
      selectedIndices: [],
      captchaId: null,
      isReadyToSubmit: false,
    };
  },
  async created() {
    await this.generateCaptcha();
  },
  methods: {
    async generateCaptcha() {
      try {
        const response = await axios.post('http://localhost:9999/captcha/generate', { wordCount: 5 }); // 调整为实际后端地址
        this.words = response.data.words;
        this.captchaId = response.data.captchaId;
        this.loading = false;
      } catch (error) {
        console.error('Error generating captcha:', error);
        this.loading = false;
      }
    },
    onWordClick(index) {
      if (!this.selectedIndices.includes(index)) {
        this.selectedIndices.push(index);
      }
      this.isReadyToSubmit = this.selectedIndices.length === this.words.length;
    },
    async submitCaptcha() {
      const captcha = {
        captchaId: this.captchaId,
        selectedIndices: this.selectedIndices,
      };

      try {
        const response = await axios.post('http://localhost:8080/captcha/verify', captcha); // 调整为实际后端地址
        const result = response.data;
        alert(`Verification result: ${result.message}`);
        this.resetCaptcha();
      } catch (error) {
        console.error('Error verifying captcha:', error);
      }
    },
    resetCaptcha() {
      this.loading = true;
      this.selectedIndices = [];
      this.isReadyToSubmit = false;
      this.generateCaptcha();
    },
  },
};
</script>

<style scoped>
.click-word-captcha {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.captcha-container {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

span {
  cursor: pointer;
  padding: 7px 10px;
  border-radius: 4px;
  transition: background-color 0.2s ease-in-out;
}

span.selected {
  background-color: #ccc;
}
</style>
