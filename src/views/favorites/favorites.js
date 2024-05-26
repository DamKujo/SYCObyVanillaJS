import { AbstractView } from "../../common/view";
import onChange from 'on-change';
import { Header } from "../../components/header/header";
import { CardList } from "../../components/card-list/card-list";

export class FavoritesView extends AbstractView{
    constructor(appState){
        super();
        this.appState = appState;
        this.appState = onChange(this.appState, this.appStateHook.bind(this));
        this.setTitle('Смотреть позже');
    }

    destroy(){
        onChange.unsubscribe(this.appState);
        onChange.unsubscribe(this.state);
    }

    appStateHook(path){
        if(path === 'favorites'){
            this.render();
        }
    }

    render(){
        const favorites = document.createElement('div');
        favorites.innerHTML = `
            <h1>
                Буду смотреть
            </h1>
        `;
        favorites.append(new CardList({list: this.appState.favorites}, this.appState).render());
        this.app.innerHTML = '';
        this.app.append(favorites);
        this.renderHeader();
    }

    renderHeader(){
        const header = new Header(this.appState).render();
        this.app.prepend(header);
    }

}