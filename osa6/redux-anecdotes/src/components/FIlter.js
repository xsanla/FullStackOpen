import { setFilter } from "../reducers/filterReducer"
import { useDispatch } from "react-redux"
const Filter = () => {
    const dispatch = useDispatch()
    const handleChange = (event) => {
        event.preventDefault()
        const filterValue = event.target.value
        dispatch(setFilter(filterValue))
    }
    const style = {
        marginBottom: 10
    }

    return (
        <div style={style}>
            filter <input onChange={handleChange} />
        </div>
    )
}

export default Filter
