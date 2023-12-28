/**
 * Description: This index.ts file is responsible to start server.
 * Version: 1.0.0
 * Author: Synsoft Global
 * Author URI: https://www.synsoftglobal.com/
 *
 */

import express, { Request, Response } from 'express'
import next from 'next'
import bodyParser from 'body-parser'
import route from './routes/routes'
import dotenv from 'dotenv'
import path from 'path'
import { initTranslations } from './service/locales.service'
import connectDB from './mongodb'

const envFilePath = path.join(__dirname, '../', '.env')

dotenv.config({ path: envFilePath })

const dev = process.env.NEXT_APP_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const port = process.env.PORT || 3000
initTranslations('message');
(async () => {
  try {
    await app.prepare()
    const server = express()
    server.use(bodyParser.json({ limit: '10mb' }))
    server.use('/api', route)
    server.use('/uploads', express.static(path.join(__dirname, './uploads')));
    server.all('*', (req: Request, res: Response) => {
      return handle(req, res)
    })
    server.listen(port, (err?: any) => {
      connectDB()
      if (err) throw err
      console.log(`> Ready on localhost:${port} - env ${process.env.NODE_ENV}`,process.env.NEXT_APP_ENV)
    })
  } catch (e) {
    console.error(e)
    process.exit(1)
  }
})()
