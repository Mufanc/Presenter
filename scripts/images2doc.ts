import fs from 'fs/promises'
import path from 'path'
import { SingleBar } from 'cli-progress'
import parseArgs from 'minimist'
import { PDFDocument } from 'pdf-lib'
import PptxGenJS from 'pptxgenjs'
import { BUILD_DIR } from './constants'

async function images2doc(images: string[], width: number, height: number, basename: string) {
    const pdf = await PDFDocument.create()
    const pptx = new PptxGenJS()

    const progress = new SingleBar({
        clearOnComplete: true,
        hideCursor: true,
        format: 'Convert [{bar}] {percentage}% | ETA: {eta}s | {value}/{total}',
    })

    progress.start(images.length, 0)

    for (const filename of images) {
        const image = `image/png;base64,${(await fs.readFile(filename)).toString('base64')}`
        pdf.addPage([width, height]).drawImage(await pdf.embedPng(image), { x: 0, y: 0, width, height })
        pptx.addSlide().addImage({ data: image, x: 0, y: 0, w: '100%', h: '100%' })
        progress.increment()
    }

    progress.stop()

    await fs.writeFile(path.join(BUILD_DIR, `${basename}.pdf`), await pdf.save())
    await pptx.writeFile({ fileName: path.join(BUILD_DIR, `${basename}.pptx`) })
}

!(async () => {
    const args = parseArgs(process.argv.slice(2))
    const images = path.join(BUILD_DIR, 'images'),
        basename = args.o
    await images2doc(
        (await fs.readdir(images)).map((it) => path.join(images, it)),
        1920,
        1080,
        basename,
    )
    await fs.rm(images, { recursive: true, force: true })
})()
