const gameObjects: GameObject[] = []

export class GameObject {
  timeDelta = 0
  hasCalledStart = false

  constructor() {
    gameObjects.push(this)
  }

  start(): void {}

  update(): void {}

  onDestroy(): void {}

  destroy(): void {
    this.onDestroy()

    for (let i = 0; i < gameObjects.length; i++) {
      const obj = gameObjects[i]
      if (obj === this) {
        gameObjects.splice(i, 1)
        break
      }
    }
  }
}

let lastTimestamp: number
const step = (timestamp: number) => {
  for (const obj of gameObjects) {
    if (!obj.hasCalledStart) {
      obj.start()
      obj.hasCalledStart = true
    } else {
      obj.timeDelta = timestamp - lastTimestamp
      obj.update()
    }
  }

  lastTimestamp = timestamp
  if (typeof window !== 'undefined') {
    window.requestAnimationFrame(step)
  }
}

if (typeof window !== 'undefined') {
  window.requestAnimationFrame(step)
}
