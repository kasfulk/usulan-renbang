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

  const { field }: any = req.query
  const allowedFields: string[] = [
    'kecamatan',
    'kelurahan',
    'rt',
    'usulan',
    'pengampu',
    'status',
  ]
  if (!allowedFields.includes(field))
    res.status(403).send({
      messages: "Can't view another fields!",
    })
  const [rows] = await pool.query(
    `SELECT DISTINCT ${field} FROM usulan_renbang`
  )
  res.status(200).json(rows)
}

export default handler
