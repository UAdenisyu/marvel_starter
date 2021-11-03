import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";

import {Component} from "react";
import decoration from '../../resources/img/vision.png';

import ErrorBoundary from '../errorBoundary/errorBoundary';

export default class App extends Component {

    state = {
        selectedCharId: null
    }

    selectChar = (id) => {
        this.setState({
            selectedCharId: id
        });
    }

    render() {
        return (
            <div className="app">
                <AppHeader/>
                <main>
                    <ErrorBoundary>
                        <RandomChar/>
                    </ErrorBoundary>
                    <div className="char__content">
                        <ErrorBoundary>
                            <CharList selectChar={this.selectChar}/>
                        </ErrorBoundary>
                        <ErrorBoundary>
                            <CharInfo id={this.state.selectedCharId}/>
                        </ErrorBoundary>
                    </div>
                    <img className="bg-decoration" src={decoration} alt="vision"/>
                </main>
            </div>
        )
    }
}

