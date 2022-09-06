import '../sass/styles.scss';

function requireAll(r) {
    r.keys().forEach(r);
}
  
requireAll(require.context('../assets/icons/', true, /\.svg$/));

fetch(`https://mitopeci.sirv.com/sprite.svg`).then(res => {
  return res.text();
}).then(data => {
  document.getElementById('svg-icons').innerHTML = data;
});