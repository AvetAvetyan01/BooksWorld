import { Link } from "react-router";
import "./cookiesPopup.scss"

export function CookiesPopup(){
  return (
    <section className="cookies-popup">
      <img src={"/images/banners/cookie.png"} alt="cookies image" />
      {/* <img src={"https://wswdfyhwpkjxkccojqld.supabase.co/storage/v1/object/public/BW-public/images/banners/cookie.png"} alt="cookies image" /> */}

      <article className="content">
        <p className="title">We Use Cookies</p>
        <p className="text">This website uses cookies to enhance your browsing experience, analyze site traffic, and personalize content. By continuing to use our site, you agree to our use of cookies</p>
      </article>

      <article className="buttons">
        <button>Accept All</button>
        <button>Reject All</button>
        <Link to="policy">Policy</Link>
      </article>
    </section>
  )
}