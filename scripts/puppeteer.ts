import fs from 'fs/promises'
import path from 'path'
import { SingleBar } from 'cli-progress'
import express from 'express'
import playwright from 'playwright-core'
import puppeteer from 'puppeteer-core'
import { BUILD_DIR, PUPPETEER_PORT } from './constants'

async function delay(ms: number) {
    return new Promise((ok) => setTimeout(ok, ms))
}

const app = express()
app.use(express.static(path.join(BUILD_DIR, 'spa')))

const server = app.listen(PUPPETEER_PORT, async () => {
    const browser = await puppeteer.launch({
        executablePath: playwright.chromium.executablePath(),
        defaultViewport: {
            width: 1920,
            height: 1080,
        },
        headless: 'new',
    })

    const page = (await browser.pages())[0]
    await page.goto(`http://localhost:${PUPPETEER_PORT}/`)

    // 等待页面加载完成
    const wait = 50
    const prepare = new SingleBar({
        clearOnComplete: true,
        hideCursor: true,
        format: 'Prepare [{bar}] {percentage}% | ETA: {eta}s',
    })
    prepare.start(wait, 0)
    for (let i = 0; i < wait; i++) {
        await delay(100)
        prepare.increment()
    }
    prepare.stop()

    const count = (await page.$$('.slides-overview > div > *')).length

    const clicks = process.argv.slice(2)[0] === '--clicks'

    if (clicks) {
        const progress = new SingleBar({
            clearOnComplete: true,
            hideCursor: true,
            format: 'Render {url} | time: {duration_formatted}',
        })

        await fs.mkdir(path.join(BUILD_DIR, 'images'), { recursive: true })

        progress.start(0, 0)
        progress.update({ url: '' })

        let index = 0

        while (true) {
            await delay(1000)

            const url = page.url()
            const screenshot = await page.screenshot()

            await fs.writeFile(path.join(BUILD_DIR, 'images', `${index}`.padStart(2, '0')), screenshot)

            progress.update({ url })

            await page.keyboard.press('ArrowRight')

            if (page.url() === url) {
                break
            }

            index += 1
        }

        progress.stop()
    } else {
        const progress = new SingleBar({
            clearOnComplete: true,
            hideCursor: true,
            format: 'Render [{bar}] {percentage}% | ETA: {eta}s | {value}/{total}',
        })

        await fs.mkdir(path.join(BUILD_DIR, 'images'), { recursive: true })
        progress.start(count, 0)

        for (let i = 1; i <= count; i++) {
            progress.increment()

            // Todo: deal with clicks?
            await page.evaluate(`location.hash = '#/${i}'`)
            await delay(1000) // Todo: wait for events

            await fs.writeFile(path.join(BUILD_DIR, 'images', `${i}`.padStart(2, '0')), await page.screenshot())
        }

        progress.stop()
    }

    await page.close()
    await browser.close()

    server.close()
})
