import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actionCreatorsCounter from '../../store/actions/creators/counter';
import * as actionCreatorsResult from '../../store/actions/creators/result';
import CounterControl from '../../components/CounterControl/CounterControl';
import CounterOutput from '../../components/CounterOutput/CounterOutput';

class Counter extends Component {
    state = {
        counter: 0
    }

    counterChangedHandler = ( action, value ) => {
        switch ( action ) {
            case 'inc':
                this.setState( ( prevState ) => { return { counter: prevState.counter + 1 } } )
                break;
            case 'dec':
                this.setState( ( prevState ) => { return { counter: prevState.counter - 1 } } )
                break;
            case 'add':
                this.setState( ( prevState ) => { return { counter: prevState.counter + value } } )
                break;
            case 'sub':
                this.setState( ( prevState ) => { return { counter: prevState.counter - value } } )
                break;
            default:
                return;
        }
    }

    render () {
        return (
            <div>
                <CounterOutput value={this.props.ctr} />
                <CounterControl label="Increment" clicked={this.props.onIncrementCounter} />
                <CounterControl label="Decrement" clicked={this.props.onDecrementCounter}  />
                <CounterControl label="Add 5" clicked={this.props.onAddCounter}  />
                <CounterControl label="Subtract 5" clicked={this.props.onSubtractCounter}  />
                <br />
                <button onClick={() => this.props.onStoreResult(this.props.ctr)}>Store Result</button>
                <ul>
                    {this.props.storedResults.map((result) => (
                        <li
                            key={result.id}
                            onClick={() => this.props.onDeleteResult(result.id)}>Delete {result.value}</li>
                    ))}
                </ul>
            </div>
        );
    }
}


const mapStateToProps = state => {
    return {
        ctr: state.ctr.counter,
        storedResults: state.res.results
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onIncrementCounter: () => dispatch(actionCreatorsCounter.increment()),
        onDecrementCounter: () => dispatch(actionCreatorsCounter.decrement()),
        onAddCounter: () => dispatch(actionCreatorsCounter.add(5)),
        onSubtractCounter: () => dispatch(actionCreatorsCounter.subtract(5)),
        onStoreResult: (result) => dispatch(actionCreatorsResult.storeResult(result)),
        onDeleteResult: (id) => dispatch(actionCreatorsResult.deleteResult(id))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);