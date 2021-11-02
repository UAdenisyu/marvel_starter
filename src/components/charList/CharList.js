import { Component } from 'react';
import './charList.scss';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/errorMessage';


class CharList extends Component {

    state = {
        charList: [],
        loading: true,
        error: false
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.updateCharList();
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        });
    }

    onCharListLoading = () => {
        this.setState({
            error: false,
            loading: true
        }); 
    }

    onCharListLoaded = (charList) => {
        this.setState({
            charList: charList,
            loading: false
        })
    }

    updateCharList = () => {
        this.onCharListLoading();
        this.marvelService
            .getAllCharacters()
            .then(this.onCharListLoaded)
            .catch(this.onError)
    }

    renderItems = (charList) => {
        const items = charList.map((item) =>{
            return (
                <li
                    className="char__item"
                    key={item.id}
                    onClick={() => this.props.selectChar(item.id)}>
                        <img src={item.thumbnail} alt={item.name}/>
                        <div className="char__name">{item.name}</div>
                </li>
            )
        } );
        return (
            <ul className="char__grid">
                {items}
            </ul>
        )
    }



    render() {
        const { charList, loading, error} = this.state;
        const errorMessage = error ? <ErrorMessage/> : null;
        const loadingMessage = loading ? <Spinner/> : null;

        const content = !(loading || error) ? this.renderItems(charList) : null;

        return (
            <div className="char__list">
                    {errorMessage}
                    {loadingMessage}
                    {content}
                <button 
                    className="button button__main button__long"
                    onClick={this.updateCharList}>
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

export default CharList;