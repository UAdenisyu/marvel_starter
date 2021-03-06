import { Component } from 'react';
import PropTypes from 'prop-types';
import './charList.scss';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/errorMessage';


class CharList extends Component {

    state = {
        charList: [],
        loading: true,
        error: false,
        newItemLoading: false,
        offset: 210
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
            newItemLoading: true,
            offset: this.state.offset + 9 
        }); 
    }

    onCharListLoaded = (newCharList) => {
        this.setState({
            charList: [...this.state.charList, ...newCharList],
            newItemLoading: false,
            loading: false
        })
    }

    updateCharList = () => {
        this.onCharListLoading();
        this.marvelService
            .getAllCharacters(this.state.offset)
            .then(this.onCharListLoaded)
            .catch(this.onError)
    }

    itemRefs = [];

    setRef = (ref) => {
        this.itemRefs.push(ref);
    }

    itemSetFocus = (id) => {
        this.itemRefs.forEach(item => item.classList.remove("char__item_selected"));
        this.itemRefs[id].classList.add("char__item_selected");
    }

    renderItems = (charList) => {
        const items = charList.map((item, i) => {
            return (
                <li
                    className="char__item"
                    key={item.id}
                    ref={this.setRef}
                    
                    onClick={() => {
                        this.props.selectChar(item.id);
                        this.itemSetFocus(i);
                    }}>
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
        const { charList, loading, error, newItemLoading} = this.state;
        const errorMessage = error ? <ErrorMessage/> : null;
        const loadingMessage = newItemLoading ? <Spinner/> : null;

        const content = !(loading || error) ? this.renderItems(charList) : null;
        
        return (
            <div className="char__list">
                    {errorMessage}
                    {content}
                    {loadingMessage}
                <button 
                    className="button button__main button__long"
                    onClick={this.updateCharList}>
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

CharList.propTypes = {
    selectChar: PropTypes.func
}

export default CharList;