'use client'

import { useStore } from '@/store'
import Image from 'next/image'

function ScoreBoard() {
  const { score, record } = useStore()

  return (
    <div className="h-[8vh] bg-[#4A752C] flex justify-around items-center select-none rounded-t-xl">
      <div className="flex items-center gap-x-2">
        <Image
          className="w-[6vh]"
          src="/images/apple.png"
          width={50}
          height={50}
          alt="apple"
          priority
        />
        <span className="text-[3vh] text-white font-semibold">{score}</span>
      </div>
      <div className="flex items-center gap-x-2">
        <Image
          className="w-[5vh]"
          src="/images/cup.png"
          width={50}
          height={50}
          alt="cup"
          priority
        />
        <span className="text-[3vh] text-white font-semibold">{record}</span>
      </div>
    </div>
  )
}

export default ScoreBoard
