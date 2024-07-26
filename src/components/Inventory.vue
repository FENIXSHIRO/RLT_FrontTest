<template>
  <div class="grid-container">
    <div v-for="row in grid" :key="row.id" class="grid-row">
      <div
        v-for="cell in row.cells"
        :key="cell.id"
        class="grid-cell"
        @dragover.prevent
        @drop="drop($event, cell)"
      >
        <div
          v-if="cell.item"
          class="grid-item"
          draggable="true"
          @dragstart="dragStart($event, cell)"
        >
          {{ cell.item.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';

type Item = {
  name: string;
}

type Cell = {
  id: number;
  item?: Item;
}

type Row = {
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

grid[0].cells[0].item = { name: 'Item 1' };
grid[1].cells[1].item = { name: 'Item 2' };

let draggedItem: { cell: Cell; item: Item } | null = null;

const dragStart = (event: DragEvent, cell: Cell) => {
  if (cell.item) {
    draggedItem = { cell, item: cell.item };
    event.dataTransfer?.setData('text', '');
  }
};

const drop = (event: DragEvent, targetCell: Cell) => {
  if (targetCell.item) return
  if (draggedItem && draggedItem.item) {
    targetCell.item = draggedItem.item;
    draggedItem.cell.item = undefined;
    draggedItem = null;
  }
};
</script>

<style scoped>

</style>
