<template>
  <div class="container">
    <div class="inventory">
      <PanelPlaceholder />
      <Inventory />
    </div>
    <BottomPlaceholder />
  </div>
</template>

<script setup lang="ts">
import Inventory from './components/Inventory.vue'
import PanelPlaceholder from './components/PanelPlaceholder.vue'
import BottomPlaceholder from './components/BottomPlaceholder.vue'
</script>

<style scoped>
.container {
  margin: auto;
  width: 845px;
}
.inventory {
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 5vh;
  margin-bottom: 3vh;
}
</style>
