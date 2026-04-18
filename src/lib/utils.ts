export function random(max: number) {
  return Math.floor(Math.random() * max);
}

export function shuffle(array: Array<unknown>) {
  let currentIndex = array.length;
  let randomIndex: number;

  // While there remain elements to shuffle.
  while (currentIndex !== 0) {
    // Pick a remaining element.
    randomIndex = random(currentIndex);
    currentIndex--;

    // And swap it with the current element.
    const temp = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temp;
  }
}

export function withinBounds(px: number, py: number, x: number, y: number, w: number, h: number) {
  return px > x && px < x + w && py > y && py < y + h;
}
