import Image from 'next/image'

function ScoreBoard() {
  return (
    <div className="h-[8vh] bg-[#4A752C] flex justify-around items-center">
      <div className="flex items-center gap-x-2">
        <Image
          className="w-[6vh]"
          src="/images/apple.png"
          width={50}
          height={50}
          alt="apple"
        />
        <span className="text-3xl text-white font-semibold">0</span>
      </div>
      <div className="flex items-center gap-x-2">
        <Image
          className="w-[5vh]"
          src="/images/cup.png"
          width={50}
          height={50}
          alt="cup"
        />
        <span className="text-3xl text-white font-semibold">0</span>
      </div>
    </div>
  )
}

export default ScoreBoard
