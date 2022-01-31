const { MongoClient } = require('mongodb');
// const  { HandleRetrivingCache } = require('./Adapters/Outbound/CacheRetrivingProxy');
const axios = require('axios');
const FetchCoworkersAdapter = require('./Adapters/Inbound/FetchCoworkersAdapter');


jest.mock("axios");
jest.setTimeout(15000);

describe("Domain logic unit test", () => {
  it("Should call the scrapper fn", async () => {
    const HTML = {
      data: `
      <div class="ninjas" data-bind="css: { 'grid': isActiveFilter(filters.grid) }">
        <div class="ninja-summary" data-aos="flip-up" data-aos-offset="-20">
          <div class="contact-info">
            <h1><a href="meet/agron-kabashi">Agron Kabashi<span>🇸🇪 Lund</span></a></h1>
            <nav class="ninja-nav"> <a href="/meet/agron-kabashi" class="btn-secondary btn-small"><span>Get to know me</span></a> </nav>
          </div> <a href="/meet/agron-kabashi" data-bind="click: isActiveFilter(filters.grid) ? selectNinja : null">
          <img class="portrait" src="https://i.1337co.de/profile/agron-kabashi-medium" alt="Agron Kabashi"> </a>
        </div>
        <div class="ninja-summary" data-aos="flip-up" data-aos-offset="-20">
          <div class="contact-info">
            <h1><a href="meet/ahmad-mirzaei">Ahmad Mirzaei<span>🇸🇪 Lund</span></a></h1>
            <nav class="ninja-nav"> <a href="/meet/ahmad-mirzaei" class="btn-secondary btn-small"><span>Get to know me</span></a> </nav>
          </div> <a href="/meet/ahmad-mirzaei" data-bind="click: isActiveFilter(filters.grid) ? selectNinja : null">
          <img class="portrait" src="https://i.1337co.de/profile/ahmad-mirzaei-medium" alt="Ahmad Mirzaei"> </a>
        </div>
      </div>`
    };

    axios.mockResolvedValueOnce(HTML);
    await FetchCoworkersAdapter();
    const FetchCoworkersPort = jest.fn().mockReturnValueOnce(HTML.data);
    const Scrapper = jest.fn().mockReturnValueOnce(HTML.data);

    expect(FetchCoworkersPort).toHaveBeenCalledWith(FetchCoworkersPort(HTML.data));
    expect(FetchCoworkersPort).toHaveBeenCalledTimes(1);
    expect(Scrapper).toHaveBeenCalledWith(Scrapper(HTML.data));
  });

});

describe("Should send the scrapped data to Data Persistance fn", () => {
  let connection;
  let db;
  beforeAll(async () => {
    connection = await MongoClient.connect(global.__MONGO_URI__, {
      useNewUrlParser: true,
    });
    db = await connection.db(global.__MONGO_DB_NAME__);
  });

  afterAll(async () => {
    await connection.close();
    // await db.close();
  });
  it("should insert many in db", async () => {
    const arrayOfObjects = [{
      _id: 'some_id',
      id: "6",
      name: "Alexander Danson",
      country: "🇸🇪",
      city: "Stockholm",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
      imagePortraitUrl: "https://i.1337co.de/profile/alexander-danson-medium",
      imageFullUrl: "https://i.1337co.de/profile/alexander-danson-medium",
    },
    {
      _id: 'some',
      id: "7",
      name: "Kanaan Bahmani",
      country: "🇸🇪",
      city: "Stockholm",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
      imagePortraitUrl: "https://i.1337co.de/profile/kanaan-bahmani-medium",
      imageFullUrl: "https://i.1337co.de/profile/kanaan-bahmani-medium",
    }];


    const users = db.collection('coworkers');

    const mockUser = arrayOfObjects;
    await users.insertMany(mockUser);

    const insertedUser = await users.findOne({ name: "Kanaan Bahmani" });
    expect(insertedUser).toEqual({
      "_id": "some",
      "id": "7",
      "name": "Kanaan Bahmani",
      "country": "🇸🇪",
      "city": "Stockholm",
      "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
      "imagePortraitUrl": "https://i.1337co.de/profile/kanaan-bahmani-medium",
      "imageFullUrl": "https://i.1337co.de/profile/kanaan-bahmani-medium",
    });
  });
})
