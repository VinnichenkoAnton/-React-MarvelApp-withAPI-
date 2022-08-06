import {Component} from 'react';

import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/errorMessage';

import './charList.scss';

class CharList extends Component {
    state = {
        charList: [],
        loading: true,
        error: false
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.allCharacters();
    }

    allCharacters = () => {
        this.marvelService
            .getAllCharacters()
            .then(this.onAllCharsLoaded)
            .catch(this.onError)  
    }

    onAllCharsLoaded = (charList) => {
        this.setState({
            charList: charList, 
            loading: false
        })
    }

    onCharLoading = () => {
        this.setState ({
            loading: true
        })
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }

    renderItems(arr){
        const items = arr.map((item) => {
            let imgStyle = {'objectFit' : 'cover'};
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit' : 'unset'};
            }

            return (
                <li key ={item.id}
                    onClick={()=>this.props.onCharSelected(item.id)}
                    className="char__item">
                    <img src={item.thumbnail} alt={item.name} style={imgStyle}/>
                    <div className="char__name">{item.name}</div>
                </li>
            )
        });

        return (
            <>
                <ul className="char__grid">
                    {items}
                </ul>
                <button className="button button__main button__long">
                <div className="inner">load more</div>
                </button>
            </>
            
        )
    }

    render () {
        const {charList, loading, error} = this.state; 
        const spinner = loading ? <Spinner/> : null;
        const errorMessage = error ? <ErrorMessage/> : null;
        const items = this.renderItems(charList);
        const content = !(loading || error) ? items : null;

        

        return (
            <div className="char__list">
                {errorMessage}
                {spinner}
                {content}
            </div>
        )
    }
}

export default CharList;