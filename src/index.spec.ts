import { describe, it, expect } from 'vitest'
import App from './server'
import supertest from 'supertest'


describe('test server module', () => {
    const app = new App().app

    it('it should be able to view homepage', async () => {
        const response = await supertest(app).get('/')
        expect(response.status).toBe(200)
        expect(response.headers["content-type"]).toBe('text/html; charset=utf-8')
        expect(response.text.includes("Sewa & Rental Mobil Terbaik di kawasan Semarang")).toBe(true)
    })

    it('it should be able to view cars page', async () => {
        const response = await supertest(app).get('/cars')
        expect(response.status).toBe(200)
        expect(response.headers["content-type"]).toBe('text/html; charset=utf-8')
        expect(response.text.includes("Tipe Driver")).toBe(true)
        expect(response.text.includes("Tanggal")).toBe(true)
        expect(response.text.includes("Waktu Jemput / Ambil")).toBe(true)
        expect(response.text.includes("Jumlah Penumpang")).toBe(true)
    })
})
