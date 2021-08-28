const puppeteer = require('puppeteer')
const { toMatchImageSnapshot } = require('jest-image-snapshot')

expect.extend({ toMatchImageSnapshot })

describe('Visual Regression testing', () => {
	let browser
	let page

	beforeAll(async function () {
		browser = await puppeteer.launch({ headless: true })
		page = await browser.newPage()
	})

	afterAll(async function () {
		await browser.close()
	})

	test('Full Page Snapshot', async function () {
		await page.goto('https://example.com')
		await page.waitForSelector('h1')
		const image = await page.screenshot()
		expect(image).toMatchImageSnapshot({
			failureThresholdType: 'pixel',
			failureThreshold: 500,
		})
	})
})
