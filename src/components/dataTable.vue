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
<ul id="users">
    <li v-for="wd in weatherData" v-bind:key="wd.id">{{ wd.year }}</li>
  </ul>
  <canvas ref="myChart" id="myChart"></canvas>
    </div>
  </div>
</template>

<script>
import Chart from 'chart.js/auto';
import axios from 'axios';

export default {
  components:{
     
  },
    data() {
        return {
            showTable: false,
            weatherData: [], // This will be populated with data from the API
            weatherYear:[],
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
        async getData(){
            await axios.get('/api/weather').then((response)=>{
             // console.log(response)
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
           
            }).catch(error => {
            console.error('Error fetching weather data:', error);
          });
        },
    },
    async mounted() {
     this.getData()
           
        const response = await axios.get('/api/weather');
        const dataa = response.data.data 
        
        const years = dataa.map(item => item.year);
      //  const avgTemperatures = dataa.map(item => item.avgYearTemp);
        const months = Object.keys(dataa[0].avgTemperature);

        const datasets = months.map(month => ({
          label: month,
          data: dataa.map(item => item.avgTemperature[month]),
          borderColor: 'grey', 
          borderWidth: 2,
          fill: false
        }));

  const ctx = document.getElementById('myChart')
 
 const myChart =  new Chart(ctx, {
    type: 'line', 
    data: {
      labels: years, 
      datasets
    },
    options: {
            scales: {
              x: {
                beginAtZero: false,
                title: {
                  display: true,
                  text: 'Year'
                }
              },
              y: {
                beginAtZero: false,
                title: {
                  display: true,
                  text: 'Average Temperature'
                }
              }
            }
          }
  });

  myChart;
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

