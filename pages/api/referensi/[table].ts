import pool from '../../../services/db'
import { NextApiRequest, NextApiResponse } from 'next'

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  if (req.method != 'GET')
    res.status(404).send({
      messages: 'Method Not Found!',
    })

  const { table }: any = req.query
  const allowedTables: string[] = [
    'kecamatan',
    'kelurahan',
    'rt',
    'usulan',
    'pengampu',
    'status',
  ]
  if (!allowedTables.includes(table))
    res.status(403).send({
      messages: "Can't view another tables!",
    })
  const [rows]: any[] = await pool.query(
    `SELECT DISTINCT id,${table} as field FROM referensi_${table}`
  )
  const data = {}
  for (const row of rows) {
    data[row.id] = row.field
  }
  console.log(data)
  res.status(200).json(data)
}

export default handler
