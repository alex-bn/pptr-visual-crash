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
	// whole page snapshot and compare
	test('Full Page Snapshot', async function () {
		await page.goto('https://example.com')
		await page.waitForSelector('h1')
		const image = await page.screenshot()
		expect(image).toMatchImageSnapshot({
			failureThresholdType: 'pixel',
			failureThreshold: 500,
		})
	})

	// element snapshot and compare
	test('Single element Snapshot', async function () {
		await page.goto('https:www.example.com')
		const h1 = await page.waitForSelector('h1')
		const image = await h1.screenshot()
		expect(image).toMatchImageSnapshot({
			failureThresholdType: 'percent',
			failureThreshold: 0.01,
		})
	})

	// Mobile and tablet devices
	test('Mobile snapshot', async function () {
		await page.goto('https://example.com')
		await page.waitForSelector('h1')
		await page.emulate(puppeteer.devices['iPhone X'])
		const image = await page.screenshot()
		expect(image).toMatchImageSnapshot({
			failureThresholdType: 'percent',
			failureThreshold: 0.01,
		})
	})
	test('Tablet Snapshot', async function () {
		await page.goto('https://example.com')
		await page.waitForSelector('h1')
		await page.emulate(puppeteer.devices['iPad landscape'])
		const image = await page.screenshot()
		expect(image).toMatchImageSnapshot({
			failureThresholdType: 'percent',
			failureThreshold: 0.01,
		})
	})
})
