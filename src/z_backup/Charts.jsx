// import {useEffect} from 'react';
import Chart from 'chart.js/auto';

function ChartAuto() {
  const data = [
    {id:1, height: 20, count: 10,width:20},
    {id:2, height: 20, count: 20,width:20},
    {id:3, height: 20, count: 15,width:20},
    {id:4, height: 20, count: 25,width:20},
    {id:5, height: 20, count: 22,width:20},
    {id:6, height: 20, count: 30,width:20},
    {id:7, height: 20, count: 28,width:20},
  ];
  // useEffect(() => {
  //   CartT();
  // }, []);

  const CartT = () =>{ 
    const c = Chart.getChart('myChart');
    if (c) {
      c.destroy();
    }
  new Chart('myChart', {
    type: 'line',
    data: 
    {
      labels: data.map(row => row.id),
      datasets: 
      [{
        label: 'data',
        data: data.map(row => row.count),
        parsing: {
          // yAxisKey: ['width','height'],
        },
      }]
    },
  });}
  CartT();
  return (
    <div className="App">
      <canvas id="myChart"></canvas>
    </div>
  );
}

export default ChartAuto;
