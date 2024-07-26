<template>
  <div class="grid-container">
    <div v-for="row in grid" :key="row.id" class="grid-row">
      <div v-for="cell in row.cells" :key="cell.id" class="grid-cell">
        {{ cell.id }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';

interface Cell {
  id: number;
}

interface Row {
  id: number;
  cells: Cell[];
}

const grid = reactive<Row[]>([]);

for (let i = 0; i < 5; i++) {
  const row: Row = {
    id: i,
    cells: []
  };
  for (let j = 0; j < 5; j++) {
    row.cells.push({ id: i * 5 + j });
  }
  grid.push(row);
}
</script>

<style scoped>

</style>
