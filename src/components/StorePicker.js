/**
 * Created by alfiemx on 2016-10-29.
 */

import React from 'react'
import { getFunName } from '../helpers'

class StorePicker extends React.Component {
    constructor(){
        super();

        this.goToStore = this.goToStore.bind(this);
    }

    goToStore(ev){
        ev.preventDefault();
        // first grab the text from the box
        const storeId = this.storeInput.value;
        // second transition from / to /store/:storeId
        this.context.router.transitionTo(`/store/${storeId}`)
    }

    render(){
        return (
            <form className="store-selector" onSubmit={this.goToStore}>
                <input type="text"
                       placeholder="Store Name"
                       required="required"
                       defaultValue={getFunName()}
                       ref={(input) => {this.storeInput = input} }
                />

                <button type="submit">Visit Store -></button>
            </form>
        )
    }
}

StorePicker.contextTypes = {
    router: React.PropTypes.object
};

export default StorePicker