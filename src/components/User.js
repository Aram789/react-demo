import Name from "./Name";
import Age from "./Age";


function User(props){
    return(
        <div>
            <a href={props.href}>{props.href}</a>
            <Name name={props.name} href={props.href}/>
            <Age age={props.age}/>
        </div>
    )
}

export default User;