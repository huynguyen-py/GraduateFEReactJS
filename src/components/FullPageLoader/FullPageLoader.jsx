import React, { Component } from 'react';
import LoaderGif from "../../assets/images/loading.gif"
import './FullPageLoader.scss'
class FullPageLoader extends Component {
    state = {}


    render() {

        return (
            <div className="loader-container">
                <div className="loader">
                    <img src={LoaderGif} alt="" style={{ height: '300px', width: '300px' }} />
                </div>
            </div>
        );
    }
}


export default FullPageLoader;