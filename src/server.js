// src/server.js
import { createServer, Model } from "miragejs"



export function makeServer({ environment = "development" } = {}) {

  let weatherData = [
    {
      id: 1,
      year: '2023',
      avgYearTemp: 11.1,
      avgTemperature: {
        January: -1,
        February: 0,
        March: 5,
        April: 12,
        May: 17,
        June: 20,
        July: 23,
        August: 22,
        September: 18,
        October: 12,
        November: 7,
        December: 2,
      },
    },
    {
      id: 2,
      year: '2022',
      avgYearTemp: 10.5,
      avgTemperature: {
        January: -2,
        February: 1,
        March: 4,
        April: 13,
        May: 16,
        June: 19,
        July: 22,
        August: 21,
        September: 17,
        October: 11,
        November: 6,
        December: 3,
      },
    },
    {
      id: 3,
      year: '2021',
      avgYearTemp: 11.2,
      avgTemperature: {
        January: -1,
        February: 0,
        March: 6,
        April: 12,
        May: 18,
        June: 21,
        July: 24,
        August: 23,
        September: 19,
        October: 13,
        November: 8,
        December: 3,
      },
    },
  ];  
  let server = createServer({
    environment,

    models: {
      user: Model,
    },

    // seeds(server) {
    //   server.create("user", { name: "Bob"  })
    //   server.create("user", { name: "Alice" })
    // },

    routes() {
      this.namespace = "api"

      this.get('/weather', () => {
        return {
          data: weatherData,
        };
      });
    },
  })

  return server
}