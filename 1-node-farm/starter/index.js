const fs = require('fs');
const http = require('http')
const url = require('url')

const replaceTemplate = require('./modules/replaceTemplate')

////////////////////////////////
// FILES
// // Blocking, sync method.
// const textIn = fs.readFileSync('./txt/start.txt', 'utf-8')
// console.log(textIn);

// const textOut = ` This is what we know about the avocado: ${textIn}.\nCreated on ${Date.now()}`
// fs.writeFileSync('./txt/output.txt', textOut)
// console.log(textOut);

//NO BLOCKING ASYNCHRONOUS WAY:

// fs.readFile('./txt/starth.txt', 'utf-8', (err, data1) => {
//     if (err) {
//         console.log("ERROR");
//         return
//     }
//     fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
//         console.log(data2);
//         fs.readFile(`./txt/append.txt`, 'utf-8', (err, data3) => {
//             console.log(data3);
//             fs.writeFile('./txt/final.txt', `${data2}\n${data3}`, 'utf-8', err => {

//                 console.log("Your file has been written!!");
//             })
//         })
//     })
// })
// console.log('Will Read FIle..')


////////////////////////////////
// SERVER



const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');

// console.log("temp card", tempCard);
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObject = JSON.parse(data);




const server = http.createServer((req, res) => {

    const { query, pathname } = url.parse(req.url, true)
    // console.log("pathname", pathname);
    // const pathname = req.url;

    // Overview Page
    if (pathname === '/' || pathname === '/overview') {
        res.writeHead(200, {
            'Content-type': 'text/html'
        })

        const cardsHtml = dataObject.map(el => replaceTemplate(tempCard, el)).join('')
        // console.log(cardsHtml);
        const output = tempOverview.replace('{%PRODUCT_CARD%}', cardsHtml)
        res.end(output)
    }

    //Product page
    else if (pathname === '/product') {
        res.writeHead(200, {
            'Content-type': 'text/html'
        })

        const product = dataObject[query.id]
        const output = replaceTemplate(tempProduct, product)
        res.end(output)
    }

    // api page
    else if (pathname === '/api') {
        res.writeHead(200, {
            'Content-type': 'application/json'
        })
        res.end(data);
    }

    //Not found page
    else {
        res.writeHead(404, {
            'Content-type': 'text/html',
            'my-own-header': 'hello WOrld'
        })
        res.end('<h1>Page Not found</h1>')
    }

})

server.listen(8000, '127.0.0.1', () => {
    console.log('Listening to requests on port 8000!');
})
