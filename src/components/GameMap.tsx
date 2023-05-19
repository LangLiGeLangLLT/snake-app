'use client'

import { useEffect, useRef } from 'react'
import { CGameMap } from '@/core/CGameMap'

function GameMap() {
  const divRef = useRef<HTMLDivElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const context = canvasRef.current?.getContext('2d')
    if (!context || !divRef.current) return

    new CGameMap(context, divRef.current)
  }, [])

  return (
    <div
      ref={divRef}
      className="h-full w-full flex justify-center items-center"
    >
      <canvas ref={canvasRef} className="bg-[#AAD751] focus:outline-none" tabIndex={0}></canvas>
    </div>
  )
}

export default GameMap
