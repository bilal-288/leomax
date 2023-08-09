<template>
  <div>
     <button @click="toggleTable" class="toggle-button">{{ showTable ? 'Show Chart' : 'Show Table' }}</button>

     
    <table  v-if="showTable">
      <thead>
        <tr>
          <th>Year</th>
          <th>Avg Year Temp</th>
          <th>Month</th>
          <th>Avg Month Temp</th>
        </tr>
      </thead>
      <tbody>
        <template v-for="(weatherYear, yearIndex) in weatherData" :key="yearIndex">
          <tr v-for="(temp, month) in weatherYear.avgTemperature" :key="month">
            <template v-if="month === 'January'">
              <td rowspan="12">{{ weatherYear.year }}</td>
               <td rowspan="12">{{ weatherYear.avgYearTemp }}</td>
            </template>
            <td>{{ month }}</td>
            <td>{{ temp }}</td>
          </tr>
        </template>
      </tbody>
    </table>


    <div v-else>
      <ul id="chart">
          <li v-for="wd in weatherData" v-bind:key="wd.id">{{ wd.year }}</li>
        </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {

   data() {
    return {
      showTable: false, 
      weatherData: [], // This will be populated with data from the API
    };
  },
  methods: {
     toggleTable() {
      this.showTable = !this.showTable;
    },
    getMonthName(index) {
      const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ];
      return monthNames[index];
    },
  },
  mounted() {
    // Fetch data from the API using Axios
    axios.get('/api/weather')
      .then(response => {
        // Process the data to ensure all months are present in each year
        this.weatherData = response.data.data.map(weatherYear => {
          const avgTemperature = {};

          // Fill missing months with placeholders or defaults
          const allMonths = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
          ];

          allMonths.forEach(month => {
            avgTemperature[month] = weatherYear.avgTemperature[month] || '-';
          });

          return {
            ...weatherYear,
            avgTemperature,
          };
        });
      })
      .catch(error => {
        console.error('Error fetching weather data:', error);
      });
  },
};
</script>

<style>

.toggle-button {
  padding: 10px 20px;
  background-color: #3498db;
  color: white;
  border: none;
  cursor: pointer;
  margin-bottom: 10px;
}

.toggle-button:hover {
  background-color: #2980b9;
}

.table-container {
  overflow-x: auto;
  max-width: 100%;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
  font-family: Arial, sans-serif;
  border: 1px solid #ddd;
}

th, td {
  padding: 10px;
  text-align: left;
}

th {
  background-color: #f2f2f2;
}

tr:nth-child(even) {
  background-color: #f2f2f2;
}

tr:hover {
  background-color: #ddd;
}

@media screen and (max-width: 768px) {
  table {
    font-size: 12px; /* Reduce font size for smaller screens */
  }
}
</style>

