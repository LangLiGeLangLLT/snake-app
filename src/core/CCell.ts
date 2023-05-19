export class CCell {
  i: number
  j: number
  x: number
  y: number

  constructor(i: number, j: number) {
    this.i = i
    this.j = j

    this.x = i + 0.5
    this.y = j + 0.5
  }
}
