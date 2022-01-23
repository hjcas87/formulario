


export const InputsRadioFields = ({
    name,
    id,
    value,
    onChange,
    onClick,
    checked,

}) => {
    return (
        <div className="form-check d-flex">
            <label htmlFor={ id } className="form-check-label">
                <input 
                    type="radio"
                    className="form-check-input mr-1"
                    name={ name }
                    id={ id }
                    value={ value }
                    onChange={ onChange }
                    onClick={ onClick }
                    checked={ checked }
                />
                Necesito un código de barras.
            </label>
        </div>
    )
}
