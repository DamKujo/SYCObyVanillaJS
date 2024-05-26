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
        const cardGrid = document.createElement('div');
        cardGrid.classList.add('card_grid');
        this.el.append(cardGrid);
        for (const card of this.parentState.list){
            cardGrid.append(new Card(this.appState, card).render());
        }
        return this.el;
    }
}