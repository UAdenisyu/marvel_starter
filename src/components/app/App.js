import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";

import {Component} from "react";
import decoration from '../../resources/img/vision.png';

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
                    <RandomChar/>
                    <div className="char__content">
                        <CharList selectChar={this.selectChar}/>
                        <CharInfo id={this.state.selectedCharId}/>
                    </div>
                    <img className="bg-decoration" src={decoration} alt="vision"/>
                </main>
            </div>
        )
    }
}

