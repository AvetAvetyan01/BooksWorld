import { useEffect, useRef, useState, type ChangeEvent } from "react"
import audio from "./alien-speech.mp3"
import "./audioPlayer.scss"

export function AudioPlayer({ audioSrc=audio } : { audioSrc?: string }){
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [volume, setVolume] = useState(1)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  const handlePlaying = () => {
    if (isPlaying) 
      {audioRef.current?.pause(); setIsPlaying(false)}
    else 
      {audioRef.current?.play();  setIsPlaying(true)}
  } 

  const durationFormat = (durationSeconds: number) => 
  {
    const hours   = Math.floor(durationSeconds / 6000)
    const minutes = Math.floor(durationSeconds / 60)
    const seconds = Math.floor(durationSeconds % 60)

    const formatedHours   = hours ? hours + ':' : '' 
    const formatedMinutes = `${minutes > 9 ? '' : 0}${minutes}`
    const formatedSeconds = `${seconds > 9 ? '' : 0}${seconds}`

    return `${formatedHours}${formatedMinutes}:${formatedSeconds}`
  }
  
  const handleVolumeChange = (e : ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) audioRef.current.volume = +e.target.value

    setVolume(+e.target.value)
  }

  const handleSeek = (e : ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) audioRef.current.currentTime = +e.target.value
    setCurrentTime(+e.target.value)
  }

  const backCurrentTime = () => {
    const forwardedTime = currentTime - 15 < 0 ? 0 : currentTime - 15
    
    if (audioRef.current) audioRef.current.currentTime = forwardedTime
    setCurrentTime(forwardedTime)
  }

  const skipCurrentTime = () => {
    const forwardedTime = currentTime + 15 >= duration ? duration : currentTime + 15

    if (audioRef.current) audioRef.current.currentTime = forwardedTime  
    setCurrentTime(forwardedTime)
  }

  useEffect(() => {
    const handleTimeUpdate = () => {
      setCurrentTime(audioRef.current?.currentTime as number)
      setDuration(audioRef.current?.duration as number)  
    }

    audioRef.current?.addEventListener("loadedmetadata", handleTimeUpdate)
    audioRef.current?.addEventListener("timeupdate", handleTimeUpdate)

    return () => {
      if (audioRef.current)
      {
        audioRef.current?.removeEventListener("loadedmetadata", handleTimeUpdate)
        // eslint-disable-next-line react-hooks/exhaustive-deps
        audioRef.current?.removeEventListener("timeupdate", handleTimeUpdate)
      } 
    }
  }, [])

  return (
    <div onClick={(p) => {p.preventDefault(); p.stopPropagation()}} className="audio-player">
      <audio ref={audioRef} src={audioSrc}></audio>
      
      <div className="range-section">
        <div className="times">
          <p className="time">{durationFormat(currentTime)}</p>
          <p className="time">{durationFormat(duration)}</p>
        </div>

        <input 
          type="range"
          min={0} 
          max={duration}
          value={currentTime}
          onChange={handleSeek}/>    
      </div>

      <div className="actions">
        <div className="time-actions">
          <button onClick={backCurrentTime}>
            <i className="fa-solid fa-rotate-right fa-flip-horizontal"></i>
            <p>15</p>
          </button>

          <button onClick={handlePlaying}>
            {isPlaying 
              ? <i className="fa-solid fa-pause"></i>
              : <i className="fa-solid fa-play"></i>} 
          </button>

          <button onClick={skipCurrentTime}>
            <p>15</p> 
            <i className="fa-solid fa-rotate-right"></i>
          </button>
        </div>

        <div className="volume-actions">
          <VolumeIcon volume={volume}/>

          <input 
            type="range" 
            min={0}
            max={1}
            step={0.01}
            value={volume} 
            onChange={handleVolumeChange}/>
        </div>        
      </div>
    </div>
  )
}


const VolumeIcon = ({ volume } : { volume: number }) => {
  if (volume > 0.4) 
    return <i className="fa-solid fa-volume-high"></i>
  else if (volume > 0)
    return <i className="fa-solid fa-volume-low"></i>
  else 
    return <i className="fa-solid fa-volume-xmark"></i>
}