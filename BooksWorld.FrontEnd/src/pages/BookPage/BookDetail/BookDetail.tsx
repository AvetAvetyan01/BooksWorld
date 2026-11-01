import "./bookDetail.scss"

export default function BookDetail({ name, value }: { name: string, value: string }) {
  return (
    <li className="detail">
      <p className="name">{name}</p>
      <p className="value">{value}</p>
    </li>
  )
}