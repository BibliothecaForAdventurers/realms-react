import crypto from 'crypto';
import fs from 'fs';

export type TSecrets = {
  arweaveKey: any;
};

const decipher = crypto.createDecipheriv(
  'aes-256-cbc',
  process.env.SECRETS_ENCRYPTION_KEY as string,
  process.env.SECRETS_ENCRYPTION_IV as string
);

const file = fs.readFileSync('secrets.json.enc');

let decrypted = decipher.update(file.toString(), 'base64', 'utf8');
decrypted += decipher.final('utf8');

const json = JSON.parse(decrypted);

export default json as TSecrets;
