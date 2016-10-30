/**
 * Created by alfiemx on 2016-10-29.
 */

import React from 'react'
import Header from './Header'
import Order from './Order'
import Inventory from './Inventory'
import Fish from './Fish'
import sampleFishes from '../sample-fishes'
import base from '../base'


class App extends React.Component {
    constructor(){
        super();

        this.state = {
            fishes: {},
            order: {}
        };

        this.addFish = this.addFish.bind(this);
        this.loadSamples = this.loadSamples.bind(this);
        this.addToOrder = this.addToOrder.bind(this);
    }

    componentWillMount(){
        this.ref = base.syncState(
            `${this.props.params.storeId}/fishes`, {
                context: this,
                state: 'fishes'
            }
        );
    }

    componentWillUnmount(){
        base.removeBinding(this.ref);
    }

    addFish(fish){
        const fishes = {...this.state.fishes};
        const timestamp = Date.now();
        fishes[`fish-${timestamp}`] = fish;
        this.setState({fishes:fishes});
    }

    loadSamples(){
        this.setState({
            fishes: sampleFishes
        })
    }

    addToOrder(key){
        // Take a copy of state
        const order = {...this.state.order};

        // Update or add the new number of fish ordered
        order[key] = order[key] + 1 || 1;

        //Update state
        this.setState({order:order});
    }

    render(){
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="Fresh Seafood Market" />
                    <ul className="list-of-fishes">
                        {Object.keys(this.state.fishes)
                            .map(key =>
                                <Fish key={key}
                                      fishKey={key}
                                      details={this.state.fishes[key]}
                                      addToOrder={this.addToOrder}
                                />
                            )}
                    </ul>
                </div>
                <Order fishes={this.state.fishes} order={this.state.order} />
                <Inventory addFish={this.addFish} loadSamples={this.loadSamples} />
            </div>
        )
    }
}

export default App
