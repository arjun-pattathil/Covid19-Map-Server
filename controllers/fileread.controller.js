const request = require('request')
    , csv = require('csvtojson');
/**
 * 
 * @param {object} req 
 * @param {object} res 
 * @author Arjun
 */
const getCountries = (req, res) => {
    try {
        const csvFilePath = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/UID_ISO_FIPS_LookUp_Table.csv'
        csv()
            .fromStream(request.get(csvFilePath))
            .then((json) => {
                let countries = [];
                json.forEach(element => {
                    if (!countries.includes(element.Country_Region))
                        countries.push(element.Country_Region)
                });
                countries.sort();
                res.status(200).json({
                    data: countries
                })
            });
    } catch (error) {
        res.status(500).json({
            data: [],
            err: error
        })
    }

}
/**
 * 
 * @param {object} req 
 * @param {object} res 
 * @author Arjun
 */
const deathCases = (req, res) => {
    try {
        let date = req.body.date
            , country = req.body.country;
        const csvFilePath = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_global.csv'
        csv()
            .fromStream(request.get(csvFilePath))
            .then((result) => {
                var regex = new RegExp('([0-9]{1,2}[/][0-9]{1,2}[/][0-9]{1,2})')
                let countryData = {};
                if (country != "All") {
                    result.forEach(element => {
                        if (country != 0 && country == element['Country/Region']) {
                            for (let key in element) {
                                if (regex.test(key)) {
                                    if (countryData.hasOwnProperty(key))
                                        countryData[key] += +element[key]
                                    else
                                        countryData[key] = +element[key]
                                }
                                if (key == date)
                                    break;
                            }

                        }
                    });
                }
                else {
                    result.forEach(element => {
                        for (let key in element) {
                            if (regex.test(key)) {
                                if (countryData.hasOwnProperty(key))
                                    countryData[key] += +element[key]
                                else
                                    countryData[key] = +element[key]
                            }
                            if (key == date)
                                break;
                        }
                    });
                }
                res.status(200).json({
                    data: countryData
                });
            });
    } catch (error) {
        res.status(500).json({
            data: [],
            err: error
        })
    }

}

/**
 * 
 * @param {object} req 
 * @param {object} res 
 * @author Arjun
 */
const confirmedCases = (req, res) => {
    try {
        let date = req.body.date
            , country = req.body.country;
        const csvFilePath = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv'
        csv()
            .fromStream(request.get(csvFilePath))
            .then((result) => {
                var regex = new RegExp('([0-9]{1,2}[/][0-9]{1,2}[/][0-9]{1,2})')
                let countryData = {};
                if (country != "All") {
                    result.forEach(element => {
                        if (country != 0 && country == element['Country/Region']) {

                            for (let key in element) {
                                if (regex.test(key)) {
                                    if (countryData.hasOwnProperty(key))
                                        countryData[key] += +element[key]
                                    else
                                        countryData[key] = +element[key]
                                }
                                if (key == date)
                                    break;
                            }

                        }
                    });
                }
                else {
                    result.forEach(element => {
                        for (let key in element) {
                            if (regex.test(key)) {
                                if (countryData.hasOwnProperty(key))
                                    countryData[key] += +element[key]
                                else
                                    countryData[key] = +element[key]
                            }
                            if (key == date)
                                break;
                        }
                    });
                }
                res.status(200).json({
                    data: countryData
                });
            });
    } catch (error) {
        res.status(500).json({
            data: [],
            err: error
        })
    }

}



module.exports = {
    getCountries,
    deathCases,
    confirmedCases
}