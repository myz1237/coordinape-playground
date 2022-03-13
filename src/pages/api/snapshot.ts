import {NextApiRequest, NextApiResponse} from 'next'
import {fetchCircleSnapshot} from '../../api'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const token = req.query.token as string

  if (!token) {
    return res.status(401).json({
      message: 'Missing token',
    })
  }

  try {
    const snapshot = await fetchCircleSnapshot(token)
    return res.status(200).json(snapshot)
  } catch (error) {
    console.error(error)
    return res.status((error as any)?.response?.status ?? 500).json(error)
  }
}
