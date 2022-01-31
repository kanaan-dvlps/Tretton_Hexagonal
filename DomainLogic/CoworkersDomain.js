const cheerio = require('cheerio');
const bluebird = require('bluebird');
const CoworkersDAOPort = require('../Ports/CoworkersDAOPort');
const { CachePort } = require('../Ports/CachePort');
const { RetriveCachePort } = require('../Ports/RetriveCachPort');
const CoworkersDAOFilterationPort = require('../Ports/CoworkersDAOFiltarationPort');
const SingleCoworkerDAOPort = require('../Ports/SingleCoworkerDAOPort');
const GetCoworkersPort = require('../Ports/RetriveCoworkersPort');
const EditCoworkerProxyPort = require('../Ports/EditCoworkerProxyPort');

// * Scrapper function
async function Scrapper(html) {
  try {
        
    const $ = cheerio.load(html);
    const people = [];
    await bluebird.each($('.ninjas').children(), async (item) => {
      // 🇸🇪
      const contact = $(item).find('h1 > a').html();
      const splitedContact = contact?.split('<span>');


      const name = splitedContact[0].trim();
      const countryAndCity = splitedContact[1]?.replace('</span>', '').trim().split(' ');
      const country = countryAndCity[0];
      const city = countryAndCity[1];
      const src = $(item).find('.contact-info').siblings('a').children('img').attr('src');

      if (name && country && city && src) {
        people.push({
          id: people.length + 1,
          name,
          city,
          country,
          text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam`,
          imagePortraitUrl: src,
          imageFullUrl: src,
        });
      }
    });

    await PersistScrappedData(people);

    // return retrivedCache;
    return {
      response: 'Successfully scrapped data',
      code: 200
    };

  } catch (error) {

    return {
      error: error.message,
      status: 500
    };

  }
};

// * Persist to database and cache
async function PersistScrappedData(DATA) {
  try {

    const savedCoworkers = await CoworkersDAOPort(DATA);
    const retrivedCache = await RetriveCachePort('coworkers');

    if (retrivedCache === null) {
      const cashedData = await CachePort('coworkers', savedCoworkers);
      return savedCoworkers;
    };
    console.log('ok');
    return retrivedCache;

  } catch (error) {

    return {
      error: error.message,
      status: 500
    };

  }
}

// * Main function
async function GetCoworkers(filter, SKIP, LIMIT, data) {
  try {

    await Scrapper(data);
    if (filter) {
      console.log('this');
      const filteredData = await CoworkersDAOFilterationPort(filter, SKIP, LIMIT);
      return filteredData;

    } else {
      console.log('that');
      const retrivedCache = await RetriveCachePort('coworkers');
      return retrivedCache;

    }


  } catch (error) {

    return {
      error: error.message,
      status: 500
    };

  }
};

async function GetCoworker(id) {
  try {
    const coworkers = await GetCoworkersPort();

    if (coworkers) {
      const coworker = await SingleCoworkerDAOPort(id);
      return coworker;
    } else if (coworkers.length === 0) {

      return {
        error: `please first meet /coworkers route and then proceed with this route`,
        status: 404
      }

    }

    return {
      error: `Coworker not found`,
      status: 404
    };

  } catch (error) {

    return {
      error: error.message,
      status: 500
    };

  }
};

async function EditCoworker({ name, city, text, id }) {
  try {

    const coworker = await SingleCoworkerDAOPort(id);

    if (coworker) {

      const result = await EditCoworkerProxyPort({ name, city, text, id });
      return result;

    }

    return {
      error: `Coworker not found`,
      status: 404
    };

  } catch (error) {

    return {
      error: error.message,
      status: 500
    };

  }
}

module.exports = {
  PersistScrappedData,
  Scrapper,
  GetCoworkers,
  GetCoworker,
  EditCoworker,
};