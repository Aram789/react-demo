import React, {Component} from "react";
import Name from "./Name";
import Age from "./Age";
import Price from "./Price";

class Product extends Component {
    render() {
        const {name, age, price} = this.props
        return(
            <>
                <Name name={name}/>
                <Age age={age} />
                <Price price={price}/>
            </>
        )
    }
}
export default Product