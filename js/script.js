const HASH_KEY = '3edf4b1082d4d8e50c393ef7436457f7'
const API_KEY = '617942cc74c7307b05d91666aaf8d30e'
const $search = document.querySelector('.searchHeroInput')
const $container = document.querySelector('.card-container')
const LIMIT = 8;
// limit=${LIMIT}&offset=${offset}${!searchString ? null : `&nameStartWith=${searchString}`}&orderBy=nodified&
const getReguest = (offset = 0 , searchString = '', cb) => {
    const baseUrl =`http://gateway.marvel.com/v1/public/characters?ts=1&apikey=${API_KEY}&hash=${HASH_KEY}`;
    fetch(baseUrl)
    .then(res => res.json())
    .then(r => {
        cb(r.data)
    })
    .catch(err => {
        console.error(err);
    })
}
const getSingleCharacter = (id,cb) => {
    const baseUrl = `http://gateway.marvel.com/v1/public/sharacters/${id}?ts=1&apikey=${API_KEY}&hash=${HASH_KEY}`
    fetch(baseUrl)
    .then(res = res.json())
    .then(r => {
        cb(r.data)
    })
    .catch(err =>{
        console.error(err);
    })
}
window.addEventListener('load' , () => {
    getReguest(
        0,
        '',
        res => {
            console.log(res);
            const temp = res.results.map(item => cardTemplate(item)).join('');
            $container.innerHTML = temp;
        })
});
function cardTemplate({ name, thumbnail, id}){
    return`
        <div class="card" onclick="singleCharacter('${id}')">
            <div class="card-header">
                <div class="card-img" style="background: url('${thumbnail.path}.${thumbnail.extension}')center/cover"></div>
            </div>
            <span class="effect-huinya"></span>
            <div class="card-body">
                <h3 class="character-name">${name}</h3>
                <p class="character-person"></p>
            </div>
        </div>
    `
}

$search.addEventListener('input' , e => {
    const val = e.target.value;
    if(!val){
        getReguest(
            0,
            '',
            res => {
                const temp = res.results.map(item => cardTemplate(item).join(''));
                $container.innerHTML = temp;
            }
        )
    }else{
        getReguest(
            0,
            val,
            res => {
                if(res.results.length === 0){
                    $container.innerHTML = `<h1>Ничего не найдено!</h1>`
                }else{
                    const temp = res.results.map(item => cardTemplate(item)).join('');
                    $container.innerHTML = temp;
                }
            }
        )
    }
})
function singleCharacter(id){
    getSingleCharacter(id, res => {
        console.log(res);
    })
};
// let img = `${thumbnail.path}.${thumbnail.extension}`