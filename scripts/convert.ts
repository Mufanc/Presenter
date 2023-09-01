import PptxGenJS from 'pptxgenjs'
import parseArgs from 'minimist'
import { createInterface } from 'readline'

!(async () => {
    const pptx = new PptxGenJS()
    const argv = parseArgs(process.argv.splice(2))

    const input = createInterface({
        input: process.stdin,
    })

    input.on('line', async (line) => {
        const slide = pptx.addSlide()
        slide.addImage({ data: `image/png;base64,${line}`, x: 0, y: 0, w: '100%', h: '100%' })
    })

    input.on('close', async () => {
        await pptx.writeFile({ fileName: argv._[0] })
        process.exit()
    })
})()
