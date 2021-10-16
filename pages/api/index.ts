import pool from '../../services/db'
import { NextApiRequest, NextApiResponse } from 'next'

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  if (req.method != 'GET')
    res.status(404).send({
      messages: 'Method Not Found!',
    })
  const [rows] = await pool.query('SELECT * FROM usulan_renbang_master')
  res.status(200).json(rows)
}

export default handler
