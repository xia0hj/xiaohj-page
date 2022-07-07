//@ts-check

const fs = require('fs')
const ph = require('path')
const packFileName = `自己整理的前端笔记.md`
const mdPaths = [
  ph.resolve(__dirname, '../docs/notes/javascript/index.md'),
  ph.resolve(__dirname, '../docs/notes/vue/index.md'),
  ph.resolve(__dirname, '../docs/notes/css/index.md'),
  ph.resolve(__dirname, '../docs/notes/network/index.md'),
  // ph.resolve(__dirname, '../docs/notes/algorithm/index.md'),
  ph.resolve(__dirname, '../docs/notes/toolchain/index.md'),
  ph.resolve(__dirname, '../docs/notes/react/index.md'),
  ph.resolve(__dirname, '../docs/notes/backend/index.md'),
  ph.resolve(__dirname, '../docs/notes/career/index.md')
]

if(!fs.existsSync('dist')){
  fs.mkdirSync('dist')
}
process.chdir('./dist')
generateMdPack()

function generateMdPack(){
  const writer = fs.createWriteStream(packFileName, {flags: 'w'})
  mdPaths.forEach((md) => {
    const content = fs.readFileSync(md, 'utf8')
    writer.write('\n', 'utf8')
    writer.write(content, 'utf8')
    // writer.write('\n---\n', 'utf8')
    console.log(`成功写入文件 ${md}`)
  })
  writer.end()
  console.log(`成功生成 ${packFileName}`)
}
