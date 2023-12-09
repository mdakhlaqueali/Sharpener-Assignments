
const Input = (props) => {
    return(
        <div>
            <label htmlFor={props.id}>{props.label}</label>
            <input type={props.type} name={props.name} id={props.id}/>
        </div>
    );
};
export default Input;