interface PlayGroundProps {
  children: React.ReactNode
}

function PlayGround({ children }: PlayGroundProps) {
  return (
    <div className="bg-[#578A34] w-full h-full flex justify-center items-center">
      {children}
    </div>
  )
}

export default PlayGround
