import {NextApiRequest, NextApiResponse} from 'next'
import {fetchCircleSnapshot} from '../../api'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (!process.env.COORDINAPE_AUTH_TOKEN) {
    return res.status(500).json({
      message: 'Missing COORDINAPE_AUTH_TOKEN',
    })
  }

  try {
    const snapshot = await fetchCircleSnapshot()
    return res.status(200).json(snapshot)
  } catch (error) {
    console.error(error)
    return res.status(500).json(error)
  }
}
