import { DivComponent } from "../../common/div-component";
import './header.css';

export class Header extends DivComponent{
    constructor(appState){
        super();
        this.appState = appState;
    }

    render(){
        this.el.classList.add('header');
        this.el.innerHTML = `
            <div>
                <img src="/static/logo.png" alt="Логотип"/>
            </div>
            <div class="menu">
                <a class="menu_item" href="#">
                    <img src="/static/searchContent.svg" alt="Поиск"/>
                    Поиск 
                </a>
                <a class="menu_item" href="#favorites">
                    <img src="/static/favorites.svg" alt="Избранное"/>
                    Сохраненное 
                    <div class="menu_counter">
                        ${this.appState.favorites.length}
                    </div>
                </a>
            </div>
        `;
        return this.el;
    }
}