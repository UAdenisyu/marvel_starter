import { Component } from 'react';
import './charInfo.scss';
import MarvelService from '../../services/MarvelService';
import Skeleton from '../skeleton/Skeleton';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/errorMessage';

export default class CharInfo extends Component {

    state = {
        char: null,
        loading: false,
        error: false,
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.updateCharInfo();
        
    }

    componentDidUpdate(prevProps){
        if (this.props.id !== prevProps.id) {
            this.updateCharInfo();
        }
    }

    onCharLoading = () => {
        this.setState({
            error: false,
            loading: true
        }); 
    }

    onCharLoaded = (char) => {
        this.setState({char, loading: false});
        // console.log(this.state.char.comics);
    }

    updateCharInfo = () => {
        const {id} = this.props;
        if (!id) {
            return;
        }
        this.onCharLoading();
        this.marvelService
            .getCharacter(id, false)
            .then(this.onCharLoaded)
            .catch(this.onError);
    }

    
    render(){

        const { char, error, loading} = this.state;
        const errorMessage = error ? <ErrorMessage/> : null;
        const loadingMessage = loading ? <Spinner/> : null;

        const content = !(loading || error) ? (char ? <View char={char}/> : <Skeleton/>) : null;
        
        return (
            <div className="char__info">
                {errorMessage}
                {loadingMessage}
                {content}
            </div>
        )
    }
}



const View = ({char}) => {
    const { name, description, thumbnail, homepage, wiki } = char;
    let { comics } = char;

    let comicsList = "This character wasn't in any comics";

    if (comics.length > 0){
        if (comics.length > 10){
            comics=comics.slice(0, 10);
        }
        comicsList = comics.map(item =>{
            return (
                <li className="char__comics-item" key={item}>
                    {item}
                </li>
            );
        });
    }


    return (
        <>
            <div className="char__basics">
                    <img src={thumbnail} alt="abyss"/>
                    <div>
                        <div className="char__info-name">{name}</div>
                        <div className="char__btns">
                            <a href={homepage} className="button button__main">
                                <div className="inner">Homepage</div>
                            </a>
                            <a href={wiki} className="button button__secondary">
                                <div className="inner">Wiki</div>
                            </a>
                        </div>
                    </div>
            </div>
                    <div className="char__descr">
                        {description}
                    </div>
                    <div className="char__comics">Comics:</div>
                    <ul className="char__comics-list">
                        {comicsList}
                    </ul>
        </>
    )
}