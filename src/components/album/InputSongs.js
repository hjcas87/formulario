import { useSelector } from "react-redux"
import { useForm } from "../../hooks/useForm"


export const InputSongs = ({ vol }) => {

    const { amount = [], amountObj = [] } = useSelector(state => state.ui)
    const [ values, handleInputChanges, reset ] = useForm(amount)
    console.log(values)
    console.log(amount)

    return (
        <>
            <input
                type="number"
                min="1"
                max="50"
                className="campo__field"
                id="numero_canciones"
                name={ vol }
                onChange={ handleInputChanges }
            />
        </>
    )
}
