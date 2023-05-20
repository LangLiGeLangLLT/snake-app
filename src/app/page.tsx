import GameMap from '@/components/GameMap'
import PlayGround from '@/components/PlayGround'
import ScoreBoard from '@/components/ScoreBoard'

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden overflow-y-auto flex justify-center items-center bg-gray-100">
      <div className="w-[59.5vh] h-[60.5vh]">
        <ScoreBoard />
        <PlayGround>
          <GameMap />
        </PlayGround>
      </div>
    </main>
  )
}
