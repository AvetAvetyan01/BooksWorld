// import { Format } from "../../enums/Format"
// import { Language } from "../../enums/Language"

export default function FlagIcons({ flags } : { flags?: string }) {
  if ([null, undefined, 0, "None", ""].includes(flags)) return;

  const splitedFlags = flags?.split(", ")

  const flagIconCodes = {
    "Paper": ["fa-solid", "fa-book-open"],
    "Audio": ["fa-solid", "fa-headphones"],
    "Electronic": ["fa-regular", "fa-file-lines"]
  } as Record<string, string[]>

  const flagImageUrls = {
    "Armenian": "/images/flags/armenia.png",
    "English": "/images/flags/uk.png",
    "Russian": "/images/flags/russia.png",
    "Frence": "/images/flags/france.png",
    "German": "/images/flags/germany.png",
    "Italian": "/images/flags/italy.png",
  } as Record<string, string>

  return (
    <>
      {splitedFlags?.map((flag, index) => {
        if (flagIconCodes[flag])
          return <li key={index} className="flag-icon">
            <i className={flagIconCodes[flag].join(" ")} title={flag}></i></li>

        if (flagImageUrls[flag])
          return <li key={index} className="flag-image">
            <img src={flagImageUrls[flag]} title={flag} alt="flag image" /></li>
      })}
    </>
  )
}