import React, {Component} from "react";

class Price extends Component {
    constructor(props) {
        super(props);
        this.state = {
            price: props.price,
        }
    }

    checkText = () => {
        let {price} = this.state;
        let realPrice = parseFloat(price)

        price = price.includes('$') ? realPrice*500 + '֏' : realPrice/500 + '$'

        this.setState({
            price:price
        })

    }

    render() {

        return (
            <>
                {this.state.price}
                <button onClick={this.checkText}>Change the currency</button>
            </>
        )
    }
}

export default Price