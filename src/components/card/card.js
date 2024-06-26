import { DivComponent } from "../../common/div-component";
import './card.css';

export class Card extends DivComponent{
    constructor(appState, cardState){
        super();
        this.cardState = cardState;
        this.appState = appState;
    }

    _addToFavorites(){
        this.appState.favorites.push(this.cardState);
    }

    _deleteFromFavorites(){
        this.appState.favorites = this.appState.favorites.filter(
            b => b.id !== this.cardState.id
        );
    }

    render(){
        this.el.classList.add('card');
        const existInFavorites = this.appState.favorites.find(
            b => b.id == this.cardState.id
        );
        this.el.innerHTML = `
                <div class="card_image">
                    <img src="${this.cardState.poster.url}" alt="Постер"/>
                </div>
                <div class="card_info">
                    <div class="card_rating ${this.cardState.rating.imdb > '7' ? "good" : this.cardState.rating.imdb > '5' ? "ok" : "bad"}">
                        ${this.cardState.rating ? this.cardState.rating.imdb : 'No rating'}
                    </div>
                    <div class="card_type">
                        ${this.cardState.type ? this.cardState.type : ' '}
                    </div>
                    <div class="card_name">
                        ${this.cardState.name}
                    </div>
                    <div class="card_year">
                        ${this.cardState.year}
                    </div>
                    <div class="card_footer">
                        <button class="button_add ${existInFavorites ? 'button_active' : ''}">
                            ${existInFavorites 
                                ? '<img src="/static/favorites.svg">'
                                : '<img src="/static/favorite-white.svg" />'}
                        </button>
                    </div>
                </div>
        `;
        if(existInFavorites){
            this.el
            .querySelector('button')
            .addEventListener('click', this._deleteFromFavorites.bind(this))
        } else{
            this.el
            .querySelector('button')
            .addEventListener('click', this._addToFavorites.bind(this))
        }
        return this.el;
    }
}