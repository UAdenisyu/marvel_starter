import { Component } from 'react';
import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/errorMessage';




class RandomChar extends Component {

    state = {
        char: {},
        loading: true,
        error: false,
        _getResourseMaxattempts: 4
    }



    marvelService = new MarvelService();

    componentDidMount() {
        this.updateRandomCharacter();
    }

    onError = () => {
        if (this.state._getResourseMaxattempts !== 0){
            this.setState({
                _getResourseMaxattempts: this.state._getResourseMaxattempts - 1
            });
            this.updateRandomCharacter()//при ошибке с сервера посылаем запрос повторно
        }
        else{
            this.setState({
                error: true,
                loading: false
            });
        }
    }


    onCharLoading = () => {
        this.setState({
            error: false,
            loading: true
        });
    }

    onCharLoaded = (char) => {
        this.setState({
            char,
            loading: false,
            _getResourseMaxattempts: 4
        });
    }

    updateRandomCharacter = () => {
        this.onCharLoading();
        this.marvelService
            .getCharacter()
            .then(this.onCharLoaded)
            .catch(this.onError);
    }

    render() {
        const { char, loading, error} = this.state;
        const errorMessage = error ? <ErrorMessage/> : null;
        const loadingMessage = loading ? <Spinner/> : null;

        const content = !(loading || error) ? <View char={char}/> : null;
        
        return (
            <div className="randomchar">
                {errorMessage}
                {loadingMessage}
                {content}
                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br/>
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button 
                        className="button button__main"
                        onClick={this.updateRandomCharacter}
                    >
                        <div className="inner">try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
                </div>
            </div>
        )
    }
}

const View = ({char}) => {
    const {name, description, thumbnail, homepage, wiki} = char;
    return (
        <div className="randomchar__block">
            <img src={thumbnail} alt="Random character" className="randomchar__img"/>
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">
                    {description}
                </p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    );
}

export default RandomChar;