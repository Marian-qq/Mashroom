import { action, makeObservable, observable } from "mobx"

class Store {
    totalEarnedCoins = 0;
    totalEnergy = 15;

    constructor() {
        makeObservable(this, {
            totalEarnedCoins: observable,
            setTotalEarnedCoins: action,
            totalEnergy: observable,
            decreaseTotalEnergy: action,
            increaseTotalEnergy: action,
        })
    }


    setTotalEarnedCoins = () => {
        this.totalEarnedCoins += 1
    };
    decreaseTotalEnergy = () => {
        this.totalEnergy -= 1
    }
    increaseTotalEnergy = () => {
        this.totalEnergy += 1
    }

}

export const store = new Store();