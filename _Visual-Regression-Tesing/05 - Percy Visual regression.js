const puppeteer = require('puppeteer')
const percySnapshot = require('@percy/puppeteer')

describe('Percy Visual Tess', () => {
	let browser
	let page

	beforeAll(async function () {
		browser = await puppeteer.launch({
			headless: true,
			// slowMo: 10,
			// devtools: false,
		})
		page = await browser.newPage()
	})

	afterAll(async function () {
		await browser.close()
	})

	test('Full Page Percy Snapshot', async () => {
		await page.goto('http://www.example.com')
		// await page.evaluate(() => {
		// 	;(document.querySelectorAll('h1') || []).forEach((el) => el.remove())
		// })
		await page.waitForTimeout(1000)
		await percySnapshot(page, 'Example page')
	})
})
