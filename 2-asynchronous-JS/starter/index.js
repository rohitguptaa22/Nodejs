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


const getDogPic = async () => {
    try {
        const data = await readFilePro(`${__dirname}/dog.txt`);
        console.log(`Breed: ${data}`);

        const res1Pro = await superagent.get(`https://dog.ceo/api/breeds/image/random`);

        const res2Pro = await superagent.get(`https://dog.ceo/api/breeds/image/random`);

        const res3Pro = await superagent.get(`https://dog.ceo/api/breeds/image/random`);
        // console.log(res.body.message);
        const all = await Promise.all([res1Pro, res2Pro, res3Pro]);
        const imgs = all.map(el => el.body.message);
        console.log(imgs);
        await writeFilePro('dog-img.txt', imgs.join('\n'));
        console.log("Random dog image save .txt file...");
    } catch (error) {
        console.log(err.message);
    }

}

getDogPic()


// readFilePro(`${__dirname}/dog.txt`).then(data => {
//     console.log(`Breed: ${data}`);
//     return superagent.get(`https://dog.ceo/api/breeds/image/random`);
// }).then(res => {
//     console.log(res.body.message);
//     return writeFilePro('dog-img.txt', res.body.message);
// }).then(() => {
//     console.log("Random dog image save .txt file...");
// }).catch(err => {
//     console.log(err.message);
// })





clearScreenDown