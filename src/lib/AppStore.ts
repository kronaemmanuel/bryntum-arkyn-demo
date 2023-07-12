import { AjaxStoreConfig, AjaxStore, TaskStore } from '@bryntum/gantt';

type AppStoreConfig = AjaxStoreConfig | {
    eventStore : TaskStore
}

export default class AppStore extends AjaxStore {
    eventStore : TaskStore;
    constructor(config?: Partial<AppStoreConfig>) {
        super(config as AjaxStoreConfig);
    }
}
