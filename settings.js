import fs from 'fs';

import deasync from 'deasync';

console.log('Import Settings');

class Settings {
    constructor() {
        this.settings = new Map();
    }

    async load() {
        const data = await fs.promises.readFile('data.json');
        const values = JSON.parse(data);
        for (const key in values) {
            this.settings.set(key, values[key]);
        }
    }

    get(key) {
        return this.settings.get(key);
    }
}

const settings = new Settings();

export default settings;

// Wait until the the settings have been loaded
let done = false;

function loadSettings() {
    console.log('Loading settings');
    return settings.load().then(() => {
        console.log('Loaded settings');
        done = true;
    });
}

loadSettings();

deasync.loopWhile(() => !done);
