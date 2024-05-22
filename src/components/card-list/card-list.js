import { DivComponent } from "../../common/div-component";
import { Card } from "../card/card";
import './card-list.css';

export class CardList extends DivComponent{
    constructor(parentState, appState){
        super();
        this.parentState = parentState;
        this.appState = appState;
    }

    render(){
        if(this.parentState.loaging){
            this.el.innerHTML = `
                <div class="card_list_loader">
                    <img src="/static/loading.gif"/>
                </div>
            `;
            return this.el;
        }
        this.el.classList.add('card_list');
        this.el.innerHTML = `
            <h1>
                Найдено ${this.parentState.totalNumber}
            </h1>
        `;
        for (const card of this.parentState.list){
            this.el.append(new Card(this.appState, card).render());
        }
        return this.el;
    }
}