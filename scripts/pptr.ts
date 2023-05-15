import puppeteer from 'puppeteer-core'
import express from 'express'
import { PDFDocument } from "pdf-lib"
import { promises as fs } from 'fs'
import { SingleBar } from 'cli-progress'

const port = 10124

async function sleep(ms: number) {
    return new Promise(resolve => {
        setTimeout(resolve, ms)
    })
}

const app = express()
app.use(express.static('build/web-app'))

const server = app.listen(port, async () => {
    const args = process.argv.slice(2)
    if (!args.length) {
        console.error('missing argument: Chrome executable path')
        process.exit(1)
    }

    const browser = await puppeteer.launch({
        executablePath: args[0],
        defaultViewport: {
            width: 1920,
            height: 1080
        }
    })

    const page = (await browser.pages())[0]
    await page.goto(`http://localhost:${port}/`)

    // 等待页面加载完成
    const wait = 50
    const prepare = new SingleBar({
        clearOnComplete: true,
        hideCursor: true,
        format: 'Prepare [{bar}] {percentage}% | ETA: {eta}s'
    })
    prepare.start(wait, 0)
    for (let i = 0; i < wait; i++) {
        await sleep(100)
        prepare.increment()
    }
    prepare.stop()

    const document = await PDFDocument.create()
    const count = (await page.$$('.slides-overview > div > *')).length

    const progress = new SingleBar({
        clearOnComplete: true,
        hideCursor: true,
        format: 'Render [{bar}] {percentage}% | ETA: {eta}s | {value}/{total}'
    })

    progress.start(count, 0)
    for (let i = 1; i <= count; i++) {
        progress.increment()

        await page.evaluate(`location.hash = '#/${i}'`)
        await sleep(2000)  // 等待渲染

        const screen = await page.screenshot()

        const image = await document.embedPng(screen)
        const newPage = document.addPage([image.width, image.height])
        newPage.drawImage(image, { x: 0, y: 0, width: image.width, height: image.height })
    }

    progress.stop()

    await fs.writeFile('build/export-pptr.pdf', await document.save())

    await page.close()
    await browser.close()

    server.close()
})
