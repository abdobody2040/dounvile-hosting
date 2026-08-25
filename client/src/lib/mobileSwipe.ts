export const EDGE_OPEN_DISTANCE = 52;
export const DRAWER_CLOSE_DISTANCE = 72;

export function isEdgeOpenSwipe(deltaX: number, deltaY: number) {
  return deltaX <= -EDGE_OPEN_DISTANCE && Math.abs(deltaX) > Math.abs(deltaY) * 1.2;
}

export function shouldCloseDrawerBySwipe(offsetX: number, velocityX: number) {
  return offsetX >= DRAWER_CLOSE_DISTANCE || (offsetX > 18 && velocityX > 520);
}

export function resolveDrawerOpenState(currentlyOpen: boolean, horizontalDistance: number, verticalDistance: number, velocityX = 0) {
  if (!currentlyOpen) return isEdgeOpenSwipe(horizontalDistance, verticalDistance);
  return !shouldCloseDrawerBySwipe(horizontalDistance, velocityX);
}
