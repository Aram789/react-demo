import Name from "./Name";
import Age from "./Age";


function User(props){
    return(
        <div>
            <Name name={props.name}/>
            <Age age={props.age}/>
        </div>
    )
}

export default User;