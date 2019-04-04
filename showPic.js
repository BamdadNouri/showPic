#!/usr/bin/env node
const program = require('commander')
const charm = require('charm')(process.stdout)
const x256 = require('x256')
const PNG = require('pngjs').PNG
const fs = require('fs')


program
    .command('sp <file>')
    .description('To show pictures in terminal with .png/.jpg/.jpeg format.')
    .action((fileName) => {

        fs.createReadStream(fileName)
        .on('error', () => {charm.foreground('red').write(`There's no file with `).foreground(135).write(`${fileName}`).foreground('red').write(` name/path! \n`).display('reset') })
        .pipe(new PNG())
        .on('parsed', function() {
    
        var dx = this.width / 100,
            dy = 2 * dx
    
        for(var y=0; y< this.height; y += dy){
            for(var x=0; x< this.width; x += dx){
                var i = (Math.floor(y) * this.width + Math.floor(x)) * 4
    
                var ix = x256(this.data[i], this.data[i+1], this.data[i+2])
                charm.background(ix).write(' ')
    
            }
            charm.display('reset').write('\n')
        }
        charm.display('reset').end()
    
        })
    })


//•

    program.parse(process.argv)
