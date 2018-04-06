'use strict';
class Graph {
    constructor(fileName) {
        let fs = require('fs');
        try {
            this.data = fs.readFileSync(fileName, 'utf8');
        } catch (err) {
            err.message;
        }
    }

    parseFile() {
        this.data = this.data.split('\n');
        for (var i = 0; i < this.data.length; i++) {
            this.data[i] = this.data[i].replace(/\r/, '');
        }
    }

    inTwo(data, a, b) {
        for (let i = 0; i < data.length; i++) {
            if ((data[i][0] === b) && (data[i][1] === a)) {
                return false;
            } 
        }
        return true;
    }

    toTwo() {
        let result = [];
        for (let i = 1; i < this.data.length; i++) {
            let arr = this.data[i].split(' ');
            if (arr.length === 1) {
                result.push([arr[0]]);
            }
            for (let j = 1; j < arr.length; j++) {
                if (this.inTwo(result, arr[0], arr[j])) {
                    result.push([arr[0], arr[j]]);
                }
            }
        }
        this.arrToStr(result);
    }

    writeFile(data) {
        let fs = require('fs');
        fs.writeFileSync('output.txt', data, 'utf-8');

    }

    arrToStr(data) {
        let str = 'Two\r\n';
        for (let i = 0; i < data.length; i++) {
            for (let j = 0; j < data[i].length; j++) {
                str += data[i][j] + ' ';
            }
            str += '\r\n';
        }
        this.writeFile(str);
    }

    dictToStr(data) {
        let str = 'spis\r\n';
        for (let key in data) {
            str += key + ' ';
            for (let value of data[key]) {
                str += value + ' ';
            }
            str += '\r\n';
        }
        this.writeFile(str);
    }

    toSpis() {
        let graph = {};
        for (let i = 1; i < this.data.length; i++) {
            let arr = this.data[i].split(' ');
            if (arr[0] in graph) {
                graph[arr[0]].add(arr[1]);
            } else {
                graph[arr[0]] = new Set();
                if (arr[1] != undefined) {
                    graph[arr[0]].add(arr[1]);
                }
                
            }
        }
        this.dictToStr(graph);
    }

    main() {
        this.parseFile();
        if (this.data[0] === 'spis') {
            this.toTwo();
        } else if (this.data[0] === 'two') {
            this.toSpis();
        }
    }
}