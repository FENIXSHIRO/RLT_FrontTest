<template>
  <transition name="slide-right">
    <div class="modalPanel" v-if="visible">
      <div class="itemImageContainer"></div>
      <hr class="hrline">
      <div class="textBlock">
        <p>{{ itemName }}</p>
      </div>
      <hr class="hrline">
      <div class="buttonBlock">
        <button class="deleteButton">Удалить предмет</button>
      </div>
      <button class="close" @click="closeModal"></button>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

const { itemName, visible } = defineProps<{
  itemName: string;
  visible: boolean;
}>();

const emits = defineEmits(['close']);

const closeModal = () => {
  emits('close');
};
</script>

<style scoped>
.slide-right-enter-active, .slide-right-leave-active {
  transition: right 0.5s ease;
}

.slide-right-enter, .slide-right-leave-to /* .slide-right-leave-active in <2.1.8 */ {
  right: -100%;
}
</style>