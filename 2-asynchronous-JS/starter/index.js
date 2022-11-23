const fs = require('fs');
const { clearScreenDown } = require('readline');
const superagent = require('superagent');

const readFilePro = file => {
    return new Promise((resolve, reject) => {
        fs.readFile(file, (err, data) => {
            if (err) reject('I Could not find the file')
            resolve(data);
        })
    })
}
const writeFilePro = (file, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(file, data, err => {
            if (err) reject('Could not write file');
            resolve('success');
        })
    })
}



readFilePro(`${__dirname}/dog.txt`).then(data => {
    console.log(`Breed: ${data}`);
    return superagent.get(`https://dog.ceo/api/breeds/image/random`);
}).then(res => {
    console.log(res.body.message);
    return writeFilePro('dog-img.txt', res.body.message);
}).then(() => {
    console.log("Random dog image save .txt file...");
}).catch(err => {
    console.log(err.message);
})

clearScreenDown