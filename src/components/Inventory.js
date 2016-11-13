/**
 * Created by alfiemx on 2016-10-29.
 */

import React from 'react'
import AddFishForm from './AddFishForm'
import base from '../base'


class Inventory extends React.Component {
    constructor(){
        super();

        this.state = {
            uid: null,
            owner: null
        };

        this.renderInventory = this.renderInventory.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.renderLogin = this.renderLogin.bind(this);
        this.authenticate = this.authenticate.bind(this);
        this.authHandler = this.authHandler.bind(this);
        this.logout = this.logout.bind(this);

    }

    componentDidMount(){
        base.onAuth((user) => {
            if( user ){
                this.authHandler(null, {user})
            }
        })
    }

    handleChange(ev, key){
        const fish = this.props.fishes[key];

        // Take a copy of that fish and update it with the new data
        const updatedFish = {
            ...fish,
            [ev.target.name]: ev.target.value
        };

        this.props.updateFish(key, updatedFish);
    }

    authenticate(provider){
        console.log( `Trying to login with ${provider}` );

        base.authWithOAuthPopup(provider, this.authHandler);
    }

    authHandler(err, authData){
        console.log( authData );

        if( err ){
            console.log( err );
            return;
        }

        // grab the store info
        const storeRef = base.database().ref(this.props.storeId);

        // query the firebase once for the store data
        storeRef.once('value', (snapshot) => {
            const data = snapshot.val() || {};

            // claim it is our own if there is no owner already
            if( !data.owner ){
                storeRef.set({
                    owner: authData.user.uid
                })
            }

            this.setState({
                uid: authData.user.uid,
                owner: data.owner || authData.user.uid
            })

        })
    }

    logout(){
        base.unauth();
        this.setState({ uid: null })
    }

    renderLogin(){
        return (
            <nav className="login">
                <h2>Inventory</h2>
                <p>Sign in to manage your store's inventory</p>
                <button className="github" onClick={() => this.authenticate('github')}>Log In with GitHub</button>
                <button className="facebook" onClick={() => this.authenticate('facebook')}>Log In with Facebook</button>
                <button className="twitter" onClick={() => this.authenticate('twitter')}>Log In with Twitter</button>
            </nav>
        )
    }

    renderInventory(key){

        const fish = this.props.fishes[key];

        return (
            <div className="fish-edit" key={key}>
                <input type="text"
                       name="name"
                       value={fish.name}
                       placeholder="Fish Name"
                       onChange={(ev) => this.handleChange(ev, key)}
                />
                <input type="text"
                       name="price"
                       value={fish.price}
                       placeholder="Fish Price"
                       onChange={(ev) => this.handleChange(ev, key)}
                />
                <select name="status"
                        value={fish.status}
                        placeholder="Fish Status"
                        onChange={(ev) => this.handleChange(ev, key)}
                >
                    <option value="available">Fresh!</option>
                    <option value="unavailable">Sold Out!</option>
                </select>
                <textarea name="desc"
                          value={fish.desc}
                          placeholder="Fish Desc"
                          onChange={(ev) => this.handleChange(ev, key)}
                >

                </textarea>
                <input type="text"
                       name="image"
                       value={fish.image}
                       placeholder="Fish Image"
                       onChange={(ev) => this.handleChange(ev, key)}
                />
                <button onClick={() => this.props.removeFish(key)}>Remove Fish</button>
            </div>
        )
    }

    render() {

        const logout = (<button onClick={this.logout}>Log Out</button>);

        // check if they are no logged in at all
        if( !this.state.uid ){
            return <div>{this.renderLogin()}</div>
        }

        // check if they are the owner of the current store
        if( this.state.uid !== this.state.owner ){
            return (
                <div>
                    <p>Sorry you aren't the owner of the store!</p>
                    {logout}
                </div>
            )
        }

        return (
            <div>
                <h2>Inventory</h2>
                {logout}
                {Object.keys(this.props.fishes).map(this.renderInventory)}
                <AddFishForm addFish={this.props.addFish} />
                <button onClick={this.props.loadSamples}>Load Sample Fishes</button>
            </div>
        )
    }
}

Inventory.propTypes = {
    fishes: React.PropTypes.object.isRequired,
    updateFish: React.PropTypes.func.isRequired,
    removeFish: React.PropTypes.func.isRequired,
    addFish: React.PropTypes.func.isRequired,
    loadSamples: React.PropTypes.func.isRequired,
    storeId: React.PropTypes.string.isRequired
};


export default Inventory
