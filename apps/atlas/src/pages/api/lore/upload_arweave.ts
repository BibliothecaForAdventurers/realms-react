import Bundlr from '@bundlr-network/client';
import Arweave from 'arweave';
import { JWKInterface } from 'arweave/node/lib/wallet';
import type { NextApiRequest, NextApiResponse } from 'next';
import secrets from '@/util/secrets';

const bundlr = new Bundlr(
  'http://node1.bundlr.network',
  'arweave',
  secrets.arweaveKey
);

const arweave = Arweave.init({
  host: 'arweave.net',
  port: 443,
  protocol: 'https',
});

export type UploadArweaveResponse = {
  arweaveId: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const transaction = bundlr.createTransaction(JSON.stringify(req.body));

    await transaction.sign();
    const resp = await transaction.upload();

    console.log(resp.data);

    res.send(
      JSON.stringify({
        arweaveId: resp.data.id,
      })
    );
  } catch (error) {
    console.log(error);
    res.status(422).send(
      JSON.stringify({
        success: false,
        error: 'Something went wrong...',
      })
    );
    return;
  }
}
