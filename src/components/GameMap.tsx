'use client'

import { useEffect, useRef } from 'react'
import { GameMap as CGameMap } from '@/core/GameMap'

function GameMap() {
  const divRef = useRef<HTMLDivElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    if (!canvasRef.current?.getContext('2d') || !divRef.current) return

    new CGameMap(canvasRef.current.getContext('2d')!, divRef.current)
  }, [])

  return (
    <div
      ref={divRef}
      className="h-full w-full flex justify-center items-center"
    >
      <canvas ref={canvasRef} className="bg-[#AAD751]"></canvas>
    </div>
  )
}

export default GameMap
