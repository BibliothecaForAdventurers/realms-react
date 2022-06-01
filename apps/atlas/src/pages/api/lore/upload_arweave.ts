import Arweave from 'arweave';
import { JWKInterface } from 'arweave/node/lib/wallet';
import type { NextApiRequest, NextApiResponse } from 'next';
import secrets from '@/util/secrets';

const arweave = Arweave.init({
  host: 'arweave.net',
  port: 443,
  protocol: 'https',
});

export type UploadArweaveResponse = {
  arweaveId: string;
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const tx = await arweave.createTransaction(
      {
        data: JSON.stringify(req.body),
      },
      secrets.arweaveKey
    );

    await arweave.transactions.sign(tx, secrets.arweaveKey);

    const arweaveResponse = await arweave.transactions.post(tx);

    console.log(tx);
    console.log(arweaveResponse);

    res.send(
      JSON.stringify({
        arweaveId: tx.id,
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
};
