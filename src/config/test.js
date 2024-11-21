// plain redux

import { createStore } from "redux";

//reducer: counter reducer
function counterReducer(currentState={count:0}, action)
{
    //logic to change state:(store)
    if(action.type=='COUNTER_INCREASE'){
        return {count:currentState.count+1};
    }else if (action.type=='COUNTER_DECREASE') {
        return { count: currentState.count-1};
    }else if (action.type == 'COUNTER_INCREASE_BY_VALUE'){
        return { count: currentState.count + action.payload };
    }
    else {
        return currentState;
    }

}

//create store
//store ko chaye reducers
//hum bna lenge reducer
const store = createStore(counterReducer);

// data ko access kroge
store.subscribe(() => {
    console.log(store.getState());
});

//counter ko increase
store.dispatch({
    type: "COUNTER_INCREASE",
    payload: 10,
});