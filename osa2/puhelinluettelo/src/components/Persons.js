const Persons = (props) => {
    return (
        <div>
            {props.personsToShow.map((person) => {
                return (
                    <div>
                        <p key={person.name}>{person.name} {person.number}</p>
                        <button onClick={() => props.remove(person.id, person.name)}>delete</button>
                    </div>
                )
            })}
        </div>
    )
}

export default Persons