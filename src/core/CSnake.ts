import { CCell } from './CCell'
import { CGameMap, Status } from './CGameMap'
import { CGameObject } from './CGameObject'

export enum Direction {
  none = -1,
  up = 0,
  right = 1,
  down = 2,
  left = 3,
}

export class CSnake extends CGameObject {
  ctx: CanvasRenderingContext2D
  gameMap: CGameMap
  cells: CCell[]
  color: string
  dirs: { x: number; y: number }[]
  direction: number
  eps: number
  speed: number

  constructor(ctx: CanvasRenderingContext2D, gameMap: CGameMap) {
    super()

    this.ctx = ctx
    this.gameMap = gameMap
    this.cells = []
    this.color = '#4876EC'
    this.dirs = [
      { x: 0, y: -1 },
      { x: 1, y: 0 },
      { x: 0, y: 1 },
      { x: -1, y: 0 },
    ]
    this.direction = Direction.right
    this.eps = 1e-1
    this.speed = 8
  }

  start(): void {
    this.cells.push(new CCell(4, 7))
    for (let i = 4; i >= 1; i--) {
      this.cells.push(new CCell(i, 7))
    }
  }

  getDirection(a: CCell, b: CCell): Direction {
    if (Math.abs(a.x - b.x) < this.eps && Math.abs(a.y - b.y) < this.eps) {
      return Direction.none
    }
    if (Math.abs(a.x - b.x) < this.eps) {
      if (b.y < a.y) return Direction.up
      return Direction.down
    }
    if (b.x > a.x) return Direction.right
    return Direction.left
  }

  checkDie(): boolean {
    const head = this.cells[0]
    if (head.i < 0 || head.i >= 17 || head.j < 0 || head.j >= 15) {
      return true
    }

    for (let i = 2; i < this.cells.length; i++) {
      if (head.i === this.cells[i].i && head.j === -this.cells[i].j) {
        return true
      }
    }

    return false
  }

  updateBody(): void {
    const k = this.cells.length - 1
    const d = this.getDirection(this.cells[k], this.cells[k - 1])
    if (d >= 0) {
      const distance = (this.speed * this.timeDelta) / 1000
      this.cells[k].x += this.dirs[d].x * distance
      this.cells[k].y += this.dirs[d].y * distance
      this.cells[0].x += this.dirs[this.direction].x * distance
      this.cells[0].y += this.dirs[this.direction].y * distance
    } else {
      const newCells = []
      const headi = this.cells[1].i + this.dirs[this.direction].x
      const headj = this.cells[1].j + this.dirs[this.direction].y
      newCells.push(new CCell(headi, headj))
      newCells.push(new CCell(headi, headj))
      for (let i = 1; i < k; i++) {
        newCells.push(this.cells[i])
      }
      this.cells = newCells

      const directions = this.gameMap.directions
      while (
        directions.length &&
        (directions[0] === this.direction ||
          directions[0] === (this.direction ^ 2))
      ) {
        directions.shift()
      }

      if (directions.length) {
        this.direction = directions[0]
        directions.shift()
      }

      if (this.checkDie()) {
        this.gameMap.lose()
      }
    }
  }

  update(): void {
    if (this.gameMap.status === Status.playing) {
      this.updateBody()
    }
    this.render()
  }

  render(): void {
    const L = this.gameMap.L
    this.ctx.fillStyle = this.color
    for (const cell of this.cells) {
      this.ctx.beginPath()
      this.ctx.arc(cell.x * L, cell.y * L, L / 2 * 0.8, 0, Math.PI * 2)
      this.ctx.fill()
    }

    for (let i = 1; i < this.cells.length; i++) {
      const a = this.cells[i - 1]
      const b = this.cells[i]
      if (Math.abs(a.x - b.x) < this.eps && Math.abs(a.y - b.y) < this.eps) {
        continue
      }
      if (Math.abs(a.x - b.x) < this.eps) {
        this.ctx.fillRect(
          (a.x - 0.5 + 0.1) * L,
          Math.min(a.y, b.y) * L,
          L * 0.8,
          Math.abs(a.y - b.y) * L
        )
      } else {
        this.ctx.fillRect(
          Math.min(a.x, b.x) * L,
          (a.y - 0.5 + 0.1) * L,
          Math.abs(a.x - b.x) * L,
          L * 0.8
        )
      }
    }
  }
}
