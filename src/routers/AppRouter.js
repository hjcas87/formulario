import { useDispatch, useSelector } from "react-redux";

import 'animate.css';   

// import { createInput } from "../actions/uiInputs";
// import { useForm } from "../hooks/useForm"

export const AppRouter = () => {

    // const dispatch = useDispatch()

    // const [ values, handleInputChange, createArray ] = useForm({
    //     cantidad: '',
    // });
    // const [ formValues, handleInputChanges ] = useForm({

    // });

    // const { amount = [] } = useSelector(state => state.form)

    // const { cantidad } = values;


    // const handleClick = (e) => {
    //     e.preventDefault();
    //     dispatch( createInput( cantidad ) )
    // }

    return (
        <div className="container">

            
            {/* <h1>AppRouter</h1>            
            <hr />
            
            <div className="mb-3">
                <input 
                    type="text" 
                    className="form-control" 
                    name="cantidad"
                    onChange={ createArray }
                />
            </div>

            {
                amount !== [] &&
                amount.map( ( song, i ) => {
                    return  <div 
                                key={ i }
                                className="mb-3 animate__animated animate__fadeInUp"
                            >
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    name={ song }
                                    
                                    onChange={ handleInputChanges }
                                />
                            </div>
                })

            }


            <button
                className="btn btn-primary"
                onClick={ handleClick }
            >
                OK
            </button> */}
            
        </div>
    )
}
