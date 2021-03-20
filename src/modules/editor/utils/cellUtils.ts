import Level from '../../../models/Level';
import LevelLayout from '../../../models/LevelLayout';
import Vector from '../../game-runner/models/Vector';

/**
 * Compares two cells
 * @param cellA first cell
 * @param cellB second cell
 * @returns true if cells are the same, false otherwise
 */
export const compareCells = (cellA: Vector | undefined, cellB: Vector | undefined) => {
  if (cellA && cellB) return cellA.x === cellB.x && cellA.y === cellB.y;
  return false;
};

/**
 * Checks if cell is used in layout
 * @param layout Level layout
 * @param cell cell
 * @returns boolean if cell is used in layout
 */
export const searchInLayout = (layout: LevelLayout, cell: Vector | undefined) => {
  // Merge layout cells
  const fullLayout = [...layout.boxes, ...layout.targets, ...layout.walls, layout.start];

  // Check if cell is in layout
  for (let i = 0; i < fullLayout.length; i++) {
    if (compareCells(fullLayout[i], cell)) return true;
  }

  // This cell is not in layout
  return false;
};

export const moveElement = (
  layout: LevelLayout,
  elements: Vector[],
  prevCell: Vector,
  currentCell: Vector
) => {
  elements = elements.map(element => {
    if (
      element.x === prevCell.x &&
      element.y === prevCell.y &&
      !searchInLayout(layout, currentCell)
    ) {
      return currentCell;
    }
    return element;
  });

  return elements;
};

/**
 * Returns grid cell based on event position in px
 *
 * @param gridStart Vector of grid's left up corner
 * @param gridDim Vector of grid size
 * @param eventPos Vector of event position
 * @param cellSize Size of a cell
 */
export const getCellFromPosition = (
  gridStart: Vector,
  eventPos: Vector,
  gridDim: Vector,
  cellSize: number
): Vector | undefined => {
  // Check if event took place on grid
  if (
    eventPos.x < gridStart.x ||
    eventPos.y < gridStart.y ||
    cellSize * gridDim.x + gridStart.x < eventPos.x ||
    cellSize * gridDim.y + gridStart.y < eventPos.y
  ) {
    return undefined;
  }

  // Get distance from left and top of a grid
  const offsetX = eventPos.x - gridStart.x;
  const offsetY = eventPos.y - gridStart.y;

  // Calculate grid x and y position
  const cellX = Math.floor(offsetX / cellSize);
  const cellY = Math.floor(offsetY / cellSize);

  // Return vector
  return {
    x: cellX,
    y: cellY,
  };
};
