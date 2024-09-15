import React, {useEffect, useReducer} from 'react';
import EngineerCard from "./Card.jsx";
import './styles.scss'
import {loadEngineers} from "./loadEngineers";

/**
 * @typedef {Object} Engineer
 * @property {string} candidateName
 * @property {string} description
 * @property {string} topSkills
 * @property {string} hourRate
 * @property {string} percentage
 */

/**
 * @typedef {Object} EngineersState
 * @property {Engineer[][]} engineers
 * @property {number} currentIndex
 * @property {boolean} loading
 * @property {string|null} error
 */

/**
 * @typedef {Object} FetchStartAction
 * @property {'FETCH_START'} type
 */

/**
 * @typedef {Object} FetchSuccessAction
 * @property {'FETCH_SUCCESS'} type
 * @property {Engineer[][]} payload
 */

/**
 * @typedef {Object} FetchErrorAction
 * @property {'FETCH_ERROR'} type
 * @property {string} payload
 */

/**
 * @typedef {Object} NextAction
 * @property {'NEXT'} type
 */

/**
 * @typedef {Object} PrevAction
 * @property {'PREV'} type
 */

/**
 * @typedef {FetchStartAction | FetchSuccessAction | FetchErrorAction | NextAction | PrevAction} EngineersAction
 */

/** @type {EngineersState} */
const initialState = {
  engineers: [],
  currentIndex: 0,
  loading: false,
  error: null,
};

/**
 * @param {EngineersState} state
 * @param {EngineersAction} action
 * @returns {EngineersState}
 */
function engineersReducer(state , action) {
  switch (action.type) {
    case 'FETCH_START':
      return {...state, loading: true, error: null};
    case 'FETCH_SUCCESS':
      console.log(action);
      const currentResult = action.payload[state.currentIndex];
      console.log(currentResult);
      const candidates = currentResult.candidates;
      console.log(candidates);
      return {...state, loading: false, engineers: candidates };
    case 'FETCH_ERROR':
      return {...state, loading: false, error: action.payload};
    case 'NEXT':
      console.log('NEXT')
      return {...state, currentIndex: (state.currentIndex + 1) % state.engineers.length};
    case 'PREV':
      console.log('PREV')
      return {...state, currentIndex: (state.currentIndex - 1 + state.engineers.length) % state.engineers.length};
    default:
      return state;
  }
}

const EngineersList = () => {
  const [state, dispatch] = useReducer(engineersReducer, initialState);

  useEffect(() => {
    dispatch({type: 'FETCH_START'});
    try {
      const list = loadEngineers()
      dispatch({type: 'FETCH_SUCCESS', payload: list});
    } catch (error) {
      dispatch({type: 'FETCH_ERROR', payload: error instanceof Error ? error.message : 'An unknown error occurred'});
    }
  }, []);

  if (state.loading) {
    return <div>Loading...</div>;
  }

  if (state.error) {
    return <div>Error: {state.error}</div>;
  }

  const engineers = state.engineers || [];

  return (
    <section className="margin-32">
      <div className="engineer-cards">
        <div className="space-content">
          {engineers.map((engineer, index) => (
            <EngineerCard key={index}
                          {...engineer} />
          ))}
          <div className="navigation">
              <button onClick={() => dispatch({ type: 'PREV' })}>Previous</button>
              <button onClick={() => dispatch({ type: 'NEXT' })}>Next</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EngineersList
