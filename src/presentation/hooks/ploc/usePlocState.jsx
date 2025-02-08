// src/hooks/usePlocState.js
import { useEffect, useState } from 'react';

export function usePlocState(ploc) {
    const [state, setState] = useState(ploc.getState());

    useEffect(() => {
        const stateSubscription = (newState) => {
            setState(newState);
        };

        ploc.subscribe(stateSubscription);

        // Cleanup the subscription on unmount
        return () => {
            ploc.unsubscribe(stateSubscription);
        };
    }, [ploc]);

    return state;
}
