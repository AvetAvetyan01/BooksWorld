import "./contactsPage.scss"
import contactsList from "./contactsList.json"

export function ContactsPage(){

  return (
    <section className="contacts-page">
      <h3 className="title">Our Contacts</h3>
      
      <ul className="contacts-list">
        {contactsList.map(c => 
          <li key={c.content} className="contact">
            <i className={c.icon}></i>
            <p>{c.content}</p>
          </li>
        )}
      </ul>
    </section>
  )
}