/**
 * Created by alfiemx on 2016-10-30.
 */

import React from 'react'
import { formatPrice } from '../helpers'


class Fish extends React.Component {
    render(){

        const { details, fishKey } = this.props;

        const isAvailable = details.status === 'available';
        const buttonText = isAvailable ? 'Add To Order' : 'Sold Out';

        return (
            <li className="menu-fish">
                <img src={details.image} alt={details.name} />
                <h3 className="fish-name">
                    {details.name}
                    <span className="price">{formatPrice(details.price)}</span>
                </h3>
                <p>{details.desc}</p>
                <button onClick={() => this.props.addToOrder(fishKey)} disabled={!isAvailable}>{buttonText}</button>
            </li>
        )
    }
}

Fish.propTypes = {
    details: React.PropTypes.object.isRequired,
    fishKey: React.PropTypes.string.isRequired,
    addToOrder: React.PropTypes.func.isRequired
};

export default Fish