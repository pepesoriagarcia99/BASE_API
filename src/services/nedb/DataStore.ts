import Datastore from 'nedb';

import { promisify } from '../../utils/promise';

import configuration from '../../configuration';
const { path, autoload } = configuration.nedb;

class DataStore {

    #store: Datastore;

    #insert: Function;

    #count: Function;

    #find: Function;

    #findOne: Function;

    #update: Function;

    #remove: Function;

    #ensureIndex: Function;

    /**
     * Create a new Datastore instance
     * @param Target Target class
     */
    constructor(Target: any) {
        const filename = `${path}/${Target.name.toLowerCase()}.db`;
        this.#store = new Datastore({ filename, autoload });

        this.#store.loadDatabase(() => {
            console.log(`Database ${filename} loaded`);
        });

        this.#insert = promisify(this.#store.insert, this.#store);
        this.#count = promisify(this.#store.count, this.#store);
        this.#find = promisify(this.#store.find, this.#store);
        this.#findOne = promisify(this.#store.findOne, this.#store, Target);
        this.#update = promisify(this.#store.update, this.#store);
        this.#remove = promisify(this.#store.remove, this.#store);
        this.#ensureIndex = promisify(this.#store.ensureIndex, this.#store);
    }

    findById(id: string) {
        return this.#findOne({ _id: id })
    }

    get insert() {
        return this.#insert;
    }

    get count() {
        return this.#count;
    }

    get find() {
        return this.#find;
    }

    get findOne() {
        return this.#findOne;
    }

    get update() {
        return this.#update;
    }

    get remove() {
        return this.#remove;
    }

    get ensureIndex() {
        return this.#ensureIndex;
    }
}

export default DataStore;
