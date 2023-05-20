'use client'

import { useCallback, useEffect, useMemo, useRef } from 'react'
import { CGameMap } from '@/core/CGameMap'
import { useStore } from '@/store'

let gameMap: CGameMap

function GameMap() {
  const divRef = useRef<HTMLDivElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const store = useStore()

  const restart = useCallback(() => {
    gameMap.restart()
  }, [])

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

      {store.restart && (
        <button
          onClick={restart}
          className="absolute pointer-events-auto rounded-md bg-indigo-600 p-[3vh] font-semibold leading-5 text-white hover:bg-indigo-500 text-[3vh]"
        >
          Restart
        </button>
      )}
    </div>
  )
}

export default GameMap
