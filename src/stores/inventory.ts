import { defineStore } from 'pinia';
import { reactive, watch } from 'vue';
import { Cell } from '../ts/types/Cell';
import { Item } from '../ts/types/Item';
import { Row } from '../ts/types/Row';

export const useInventoryStore = defineStore('inventory', () => {
  const grid = reactive<Row[]>(loadGrid());

  function loadGrid() {
    const savedGrid = localStorage.getItem('inventoryGrid');
    if (savedGrid) {
      return JSON.parse(savedGrid);
    }
    const initialGrid: Row[] = [];
    for (let i = 0; i < 5; i++) {
      const row: Row = {
        id: i,
        cells: []
      };
      for (let j = 0; j < 5; j++) {
        row.cells.push({ id: i * 5 + j });
      }
      initialGrid.push(row);
    }

    initialGrid[0].cells[0].item = { name: 'Item 1' };
    initialGrid[1].cells[1].item = { name: 'Item 2' };

    return initialGrid;
  }

  const updateCell = (cell: Cell, item?: Item) => {
    cell.item = item;
    saveGrid();
  };

  function saveGrid() {
    localStorage.setItem('inventoryGrid', JSON.stringify(grid));
  }

  watch(grid, saveGrid, { deep: true });

  return {
    grid,
    updateCell,
  };
});
