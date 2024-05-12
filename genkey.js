let array = []



for(let i = 0; i <= 20; i++){
    let random = (Math.random() * 36 | 0).toString(36);
    array.push(random)
}

let key = array.join('');


console.log(key)