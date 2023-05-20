interface PlayGroundProps {
  children: React.ReactNode
}

function PlayGround({ children }: PlayGroundProps) {
  return (
    <div className="bg-[#578A34] w-full h-full flex justify-center items-center rounded-b-xl shadow-lg">
      {children}
    </div>
  )
}

export default PlayGround
