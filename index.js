const fs = require('fs')
const path = require('path')
const fsPromise = require('fs').promises

async function readFile(filename) {
    let isTrue = await getData(filename)

    return new Promise((resolve, reject) => {

        try {
            path.join(__dirname, filename + '.json')
            let filePath = path.join(__dirname, filename + '.json')


            if (!isTrue) {
                fs.writeFile(filePath, '[]', (err) => {
                    if (err) throw err
                })
                ombor(process.argv[2], process.argv[3], process.argv[4], process.argv[5], process.argv[6])
            }

            let response = fs.readFile(
                filePath, {
                    encoding: 'utf8'
                },
                (err, data) => {
                    if (err) throw err

                    console.log();

                    resolve(JSON.parse(data))
                });


        } catch (e) {
            console.log(e);
        }


    })
}

async function getData(fileName) {

    let filePath = path.join(__dirname, fileName + '.json')

    return new Promise((resolve, reject) => {
        fs.exists(filePath, (isTrue, err) => {
            try {
                resolve(isTrue)

            } catch (e) {
                if (reject) reject(err)
            }
        })
    })
}


async function ombor(fileName, command, product, count, cost) {
    let filePath = path.join(__dirname, fileName + '.json')
    let data = await readFile(fileName)
    let indexOfElem;
    let checkForExistence;


    data.forEach((elem, index) => {
        if (elem.name === product) {
            indexOfElem = index
            checkForExistence = true
        }
    })

    if (command === 'add') {
        console.log(data);


        if (checkForExistence) {
            data[indexOfElem].count = data[indexOfElem].count - 0 + parseInt(count)
            data[indexOfElem].cost = cost
        }else{
            data.push({
                name: product,
                count,
                cost
            })
        }

        fs.writeFile(filePath, JSON.stringify(data, null, 4), 'utf8', (err, data) => {
            if (err) throw err
            else {
            }
        })
        console.log(data);
    } else if (command === 'remove') {
        let newDatabase = []
        data.forEach((elem, index) => {
            if(index != indexOfElem){
                newDatabase.push(elem)
            }
        })
        data = newDatabase
        console.log(data);
        fs.writeFile(filePath, JSON.stringify(data, null, 4), 'utf8', (err, data) => {
            if (err) throw err
            else {
            }
        })
    } else if (command === 'calc') {
        let cosOfAll;
        data.forEach((elem)=> cosOfAll += parseInt(elem.count) * parseInt(elem.cost))
        console.log(cosOfAll);
    }
}

ombor(process.argv[2], process.argv[3], process.argv[4], process.argv[5], process.argv[6])