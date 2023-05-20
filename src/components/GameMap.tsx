'use client'

import { useEffect, useMemo, useRef } from 'react'
import { CGameMap } from '@/core/CGameMap'
import { useStore } from '@/store'

let gameMap: CGameMap

function GameMap() {
  const divRef = useRef<HTMLDivElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const store = useStore()

  useEffect(() => {
    const context = canvasRef.current?.getContext('2d')
    if (!context || !divRef.current) return

    if (!gameMap) {
      gameMap = new CGameMap(context, divRef.current, store)
    }
    gameMap.store = store
  }, [store])

  return (
    <div
      ref={divRef}
      className="h-full w-full flex justify-center items-center"
    >
      <canvas
        ref={canvasRef}
        className="bg-[#AAD751] focus:outline-none"
        tabIndex={0}
      ></canvas>
    </div>
  )
}

export default GameMap
