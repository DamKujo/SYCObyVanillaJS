import { AbstractView } from "../../common/view";
import onChange from 'on-change';
import { Header } from "../../components/header/header";
import { Search } from "../../components/searsh/search";
import { CardList } from "../../components/card-list/card-list";

export class MainView extends AbstractView{
    state = {
        list: [],
        totalNumber: 0,
        loading: false,
        searchQuery: undefined,
        offset: 0
    };

    options = {
        method: 'GET',
        headers: {accept: 'application/json', 'X-API-KEY': 'KW6GGWZ-8YYMSTG-MYGJYDQ-X6K1MM9'}
    };

    constructor(appState){
        super();
        this.appState = appState;
        this.appState = onChange(this.appState, this.appStateHook.bind(this));
        this.state = onChange(this.state, this.stateHook.bind(this));
        this.setTitle('Поиск контента');
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
    async stateHook(path){
        if(path === 'searchQuery'){
            this.state.loading = true;
            const data = await this.loadList(this.state.searchQuery, this.options);
            this.state.loading = false;
            this.state.totalNumber = data.total;
            this.state.list = data.docs;
        }
        if(path === 'list' || path === 'loading'){
            this.render();
        }
    }

    async loadList(query, option){
        let arr = [...query];
        for(let i = 0; i < arr.length; i++){
            if(arr[i] === ' '){
                arr[i] = '%20'
            }
        }
        let params = arr.join('');
        const res = await fetch(`https://api.kinopoisk.dev/v1.4/movie/search?page=1&limit=250&query=${params}`, option)
        return res.json();
    }


    render(){
        const main = document.createElement('div');
        main.append(new Search(this.state).render());
        main.append(new CardList(this.state, this.appState).render());
        this.app.innerHTML = '';
        this.app.append(main);
        this.renderHeader();
    }

    renderHeader(){
        const header = new Header(this.appState).render();
        this.app.prepend(header);
    }
}