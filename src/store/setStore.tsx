import {makeAutoObservable, observable, action} from 'mobx'
import { enableStaticRendering } from "mobx-react-lite"

enableStaticRendering(typeof window === "undefined")

export class SetStore {
    autoRefresh:boolean = true
    forceRefresh:boolean = false
    forceReverce:boolean = false

    constructor() {
        makeAutoObservable(this, {
            autoRefresh: observable,
            forceRefresh: observable,
            setAutoRefresh: action,
            setForceRefresh: action,
        })        
    }
    
    setAutoRefresh(mode: boolean) {
        this.autoRefresh = mode
    }
    setForceRefresh(mode: boolean) {
        this.forceRefresh = mode
    }
    setForceReverce(mode: boolean) {
        this.forceReverce = mode
    }
}

export const setStore = new SetStore()