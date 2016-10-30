/**
 * Created by alfiemx on 2016-10-29.
 */

import React from 'react'
import AddFishForm from './AddFishForm'


class Inventory extends React.Component {
    render() {
        return (
            <div>
                <p>Inventory</p>
                <AddFishForm addFish={this.props.addFish} />
            </div>
        )
    }
}

export default Inventory
