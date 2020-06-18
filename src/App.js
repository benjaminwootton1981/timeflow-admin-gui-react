import React, {useEffect, useState} from "react";
import axios from "axios";
import {useDispatch, useStore} from "react-redux";
import {API_URL} from "./config";
import {CONSTANTS} from "./store/constants";

const App = ({children}) => {
    const dispatch = useDispatch();

    useEffect(() => {
        axios
            .get(`${API_URL}me`)
            .then(response => {
                dispatch({type: CONSTANTS.GET_CURRENT_USER, payload: response.data})
            }).catch(e => {
            console.log(e)
        })
    }, [dispatch]);


    return children;
};

export default App
