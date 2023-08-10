export default  chart = new Chart(ctx, {
    type: 'line',
    data: data,
    options: {
        plugins: {
            title: {
                display: true,
                text: 'Custom Chart Title'
            }
        }
    }
});
 