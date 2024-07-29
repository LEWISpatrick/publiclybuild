import { Squircle } from 'lucide-react'

export const Logo = () => {
  return (
    <div className="flex items-center gap-2 group">
     
        <img
        src='./publiclybuild.png'
        width='50'
        height='50'
        className='rounded-xl'
        ></img>
      <span className="text-xl group-hover:translate-x-0.5 transition-all duration-300">
        PubliclyBuild
      </span>
    </div>
  )
}
