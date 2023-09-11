import fs from 'fs/promises'
import path from 'path'
import express from 'express'
import playwright from 'playwright-core'
import puppeteer from 'puppeteer-core'
import { BUILD_DIR, PUPPETEER_PORT } from './constants'

const app = express()
app.use(express.static(path.join(BUILD_DIR, 'spa')))

const server = app.listen(PUPPETEER_PORT, async () => {
    const browser = await puppeteer.launch({
        executablePath: playwright.chromium.executablePath(),
        defaultViewport: {
            width: 1920,
            height: 1080,
        },
        headless: 'new', // true
    })

    const page = (await browser.pages())[0]
    await page.goto(`http://localhost:${PUPPETEER_PORT}/#/presenter/print`)
    await page.waitForSelector('#page-root')

    await fs.writeFile(
        path.join(BUILD_DIR, 'notes.pdf'),
        await page.pdf({
            format: 'A4',
            margin: { top: '1cm', left: '1cm', right: '1cm', bottom: '1cm' },
        }),
    )

    await page.close()
    await browser.close()

    server.close()
})
