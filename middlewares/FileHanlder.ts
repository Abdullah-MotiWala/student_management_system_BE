import { NextFunction, Request, Response } from "express";
import { badRequest } from "../utils/responses";
import * as xlsx from "xlsx"
import multer from "multer";


const storage = multer.memoryStorage()
const upload = multer({ storage })

export const excelToJson = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const workbook = xlsx.read(req?.file?.buffer, { type: 'buffer' })
        const worksheet = workbook.Sheets[workbook.SheetNames[0]]

        const stream = xlsx.stream.to_json(worksheet, { header: 1 })
        const rows: any = []

        stream.on('data', (row: any) => rows.push(row))

        await new Promise((resolve, reject) => {
            stream.on('end', resolve);
            stream.on('error', reject)
        })
        if (!rows.length)
            return badRequest(res, "Empty excel sheet found")

        req.body = { ...req.body, sheetData: rows.slice(1) }

        next()
    } catch (err: any) {
        return badRequest(res, err.message)
    }
}

export const parseFile = upload.single('file')
