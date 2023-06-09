import { Actions, State } from '@/store'
import { CGameObject } from './CGameObject'
import { CSnake, Direction } from './CSnake'

export enum Status {
  waiting,
  playing,
  win,
  lose,
}

export class CGameMap extends CGameObject {
  ctx: CanvasRenderingContext2D
  parent: HTMLElement
  L: number
  snake: CSnake
  directions: Direction[]
  status: Status
  store: State & Actions

  constructor(
    ctx: CanvasRenderingContext2D,
    parent: HTMLElement,
    store: State & Actions
  ) {
    super()

    this.ctx = ctx
    this.parent = parent
    this.L = 0
    this.snake = new CSnake(this.ctx, this)
    this.directions = []
    this.status = Status.waiting
    this.store = store
  }

  start(): void {
    this.ctx.canvas.focus()

    this.ctx.canvas.addEventListener('keydown', (e) => {
      if (e.key === 'w' || e.key === 'ArrowUp') {
        e.preventDefault()
        this.directions.push(Direction.up)
      } else if (e.key === 'd' || e.key === 'ArrowRight') {
        e.preventDefault()
        this.directions.push(Direction.right)
      } else if (e.key === 's' || e.key === 'ArrowDown') {
        e.preventDefault()
        this.directions.push(Direction.down)
      } else if (e.key === 'a' || e.key === 'ArrowLeft') {
        e.preventDefault()
        this.directions.push(Direction.left)
      }

      let k = this.directions.length
      if (k > 1 && this.directions[k - 1] === this.directions[k - 2]) {
        this.directions.pop()
      }

      while (this.directions.length > 2) {
        this.directions.shift()
      }

      if (
        this.status === Status.waiting &&
        this.directions.length &&
        this.directions[0] !== Direction.left
      ) {
        this.status = Status.playing
        this.snake.direction = this.directions[0]
      }
    })
  }

  updateSize(): void {
    this.L = Math.min(
      this.parent.clientWidth / 17,
      this.parent.clientHeight / 15
    )
    this.ctx.canvas.width = this.L * 17
    this.ctx.canvas.height = this.L * 15
  }

  win(): void {
    this.snake.color = 'white'
    this.status = Status.win
    this.store.updateRestart(true)
  }

  lose(): void {
    this.snake.color = 'white'
    this.status = Status.lose
    this.store.updateRestart(true)
  }

  restart(): void {
    this.store.updateScore(0)
    this.status = Status.waiting
    this.snake.destroy()
    this.snake = new CSnake(this.ctx, this)
    this.store.updateRestart(false)
    this.ctx.canvas.focus()
    this.directions = []
  }

  update(): void {
    this.updateSize()
    this.render()
  }

  render(): void {
    let colorEven = '#AAD751'
    let colorOdd = '#A2D149'

    for (let i = 0; i < 17; i++) {
      for (let j = 0; j < 15; j++) {
        if ((i + j) % 2 === 0) {
          this.ctx.fillStyle = colorEven
        } else {
          this.ctx.fillStyle = colorOdd
        }
        this.ctx.fillRect(i * this.L, j * this.L, this.L, this.L)
      }
    }
  }
}
