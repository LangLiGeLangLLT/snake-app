import { GameObject } from './GameObject'

export class GameMap extends GameObject {
  ctx: CanvasRenderingContext2D
  parent: HTMLElement
  L = 0

  constructor(ctx: CanvasRenderingContext2D, parent: HTMLElement) {
    super()

    this.ctx = ctx
    this.parent = parent
  }

  start(): void {}

  updateSize(): void {
    this.L = Math.min(
      this.parent.clientWidth / 17,
      this.parent.clientHeight / 15
    )
    this.ctx.canvas.width = this.L * 17
    this.ctx.canvas.height = this.L * 15
  }

  update(): void {
    this.updateSize()
  }
}
