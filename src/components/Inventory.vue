<template>
  <div class="grid-container">
    <div v-for="row in inventoryStore.grid" :key="row.id" class="grid-row">
      <div
        v-for="cell in row.cells"
        :key="cell.id"
        class="grid-cell"
        @dragover.prevent
        @drop="drop($event, cell)"
      >
        <div
          v-if="cell.item"
          :class="['grid-item',{ 'dragging': cell === draggedItem?.cell }]"
          draggable="true"
          @dragstart="dragStart($event, cell)"
          @dragend="dragend"
        >
          {{ cell.item.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useInventoryStore } from '../stores/inventory';
import { Cell } from '../ts/types/Cell';
import { Item } from '../ts/types/Item';

const inventoryStore = useInventoryStore();

let draggedItem: { cell: Cell; item: Item } | null = null;

const dragStart = (event: DragEvent, cell: Cell) => {
  if (cell.item) {
    draggedItem = { cell, item: cell.item };
    event.dataTransfer?.setData('text', '');
    (event.target as HTMLDivElement).classList.add('dragging');
  }
};

const dragend = (event: DragEvent) => {
  (event.target as HTMLDivElement).classList.remove('dragging');
};

const drop = (event: DragEvent, targetCell: Cell) => {
  if (targetCell.item) return;
  if (draggedItem && draggedItem.item) {
    inventoryStore.updateCell(targetCell, draggedItem.item);
    inventoryStore.updateCell(draggedItem.cell, undefined);
    draggedItem = null;
  }
};
</script>

<style scoped>

</style>
