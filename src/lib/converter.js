import converterMap from './converterMap'

export default class Converter {
    FDS = {}
    input = []
    fdsObject = {
        'FDS': {},
        'Einsatzdaten': {},
        'Einsatzort': {},
        'Alarmierung': [
            {}
        ],
        'LageMeldung': [
            {}
        ],
        'Fahrzeuge': [
            {}
        ]
    }

    /**
     * 
     * @param {string} fdsInput Input String containing FDS Data
     */
    constructor(fdsInput = "") {
        this.FDS = converterMap
        if (!Converter.validate(fdsInput)) {
            throw new Error("no fds input provided")
        }
        this.input = String(fdsInput.trim()).split('\n')

        this.convert()
    }

    /**
     * Check if Input is valid FDS Content
     * @param {string} input 
     * @returns {boolean}
     */
    static validate(input = "") {
        const i = input.split('\n')
        return (i && i.length !== 0 && i.includes('[FDS]'))
    }

    
    /**
     * Stringify generated JSON
     * @returns {string}
     */
    stringify() {
        return JSON.stringify(this.fdsObject, null, 1)
    }

    /**
     * Return parsed Data
     * @returns 
     */
    getObject() {
        return this.fdsObject
    }

    /**
     * Format Data and return a pretty String
     * @returns {string}
     */
    toString() {
        const obj = this.fdsObject
        let returnString = `# FDS\n${obj.FDS['Inhalt']} ${obj.FDS['Datum']} ${obj.FDS['Uhrzeit']}\n\n# Einsatzort\n`
        for (const [key, value] of Object.entries(obj.Einsatzort)) {
            returnString += (key + ' ').padEnd(25, '.') + " " + value + "\n"
        }
        returnString += `\n# Einsatzdaten\n`
        for (const [key, value] of Object.entries(obj.Einsatzdaten)) {
            if (key.includes('Datum')) continue
            returnString += (key + ' ').padEnd(25, '.') + " " + value + "\n"
        }
        returnString += `\n# Alarmierung\n`
        for (const [index, alarm] of obj.Alarmierung.entries()) {
            if (index === 0) continue
            returnString += `[${String(index).padStart(3, ' ')}] ${alarm['Datum']} ${alarm['Uhrzeit']} ${alarm['Bezeichnung']}\n`
        }
        returnString += `\n# Fahrzeuge\n`
        for (const [index, fzg] of obj.Fahrzeuge.entries()) {
            if (index === 0) continue
            returnString += `[${String(index).padStart(3, ' ')}] ${String(fzg['Funkrufname'])} [3: ${fzg['Zeit St 3'] || '-/-'}] [4: ${fzg['Zeit St 4'] || '-/-'}] [1: ${fzg['Zeit St 1'] || '-/-'}] [2: ${fzg['Zeit St 2'] || '-/-'}]}\n`
        }
        returnString += `\n# Lagemeldung\n`
        for (const [index, lage] of obj.LageMeldung.entries()) {
            if (index === 0) continue
            returnString += `[${String(index).padStart(3, ' ')}] ${lage['Datum']} ${lage['Uhrzeit']} [${lage['Absender']}] ${lage['Meldung']}\n`
        }

        return returnString
    }

    /**
     * Parse Input Data into JS Object
     * @returns 
     */
    convert() {
        let currSection = ""
        let sectionLine = 0

        for (const l of this.input) {
            if (!l) continue

            if (l[0] === '[') {
                // parse section title
                currSection = l.match(/^\[(.+)\]$/)[1]
                sectionLine = 0
            } else {
                // parse section content
                const [key, value] = l.trim().split('=')
                if (!this.FDS[currSection] || !value) continue

                if (currSection === 'FDS' || currSection === 'Einsatzdaten' || currSection === 'Einsatzort') {
                    this.fdsObject[currSection][this.FDS[currSection][key]] = value
                } else if (currSection === 'Alarmierung' || currSection === 'Fahrzeuge' || currSection === 'LageMeldung') {
                    const [nrMatch] = key.match(/(\d\d)$|(\d)$/)
                    if (sectionLine != Number(nrMatch)) {
                        sectionLine = Number(nrMatch)
                        this.fdsObject[currSection].push({})
                    }
                    this.fdsObject[currSection][sectionLine][this.FDS[currSection][key.replace(nrMatch, 'XX')]] = value.trim()
                }
            }
        }
        return this
    }



}





