function getData(e) {
    let firstDate = document.getElementById('first-date').value;
    let secondDate = document.getElementById('second-date').value;
    let currency = document.getElementById('currency').value;
    let apiUrl = `http://api.coindesk.com/v1/bpi/historical/close.json?currency=${currency}&start=${firstDate}&end=${secondDate}`;

    axios
        .get(apiUrl)
        .then(response => {
            let datas = Object.keys(response.data.bpi);
            let valores = Object.values(response.data.bpi);

            let min = Math.min(...valores).toFixed(2);
            let max = Math.max(...valores).toFixed(2);

            document.getElementById('min').innerHTML = `Min: ${min}`;
            document.getElementById('max').innerHTML = `Máx: ${max}`;

            createChart(datas, valores);
        })
        .catch(err => {
            console.log(err)
        });
};

function createChart(datas, valores) {
    let ctx = document.getElementById('myChart').getContext('2d');
    let chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',

        // The data for our dataset
        data: {
            labels: datas,
            datasets: [{
                label: 'My First dataset',
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: valores,
            }],
        },

        // Configuration options go here
        options: {}
    });
};
