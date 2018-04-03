require('./main.css');

var component = require('./component');
document.body.appendChild(component());

console.log('测试一下调试')
console.log(process.env.NODE_ENV);
$('body').on('click', function () {
    console.log('click');
})