import { createHash, randomBytes, createCipheriv, createDecipheriv } from 'crypto';
import { Buffer } from 'buffer';

export const encrypt = (content, password) => {
  const algorithm = 'aes-256-ctr';
  const key = createHash('sha256').update(password).digest();
  const iv = randomBytes(16);
  
  const cipher = createCipheriv(algorithm, key, iv);
  const cipherText = Buffer.concat([cipher.update(content), cipher.final()]);
  
  const result = {
    iv: iv.toString('hex'),
    cipherText: cipherText.toString('hex')
  };
  
  const base64Result = Buffer.from(JSON.stringify(result)).toString('base64');
 
  return base64Result;
};

export const decrypt = (cipherText, password) => {
  const algorithm = 'aes-256-ctr';
  const key = createHash('sha256').update(password).digest();
  
  const cipher = JSON.parse(Buffer.from(cipherText, 'base64').toString('utf-8'));
  const ivBuffer = Buffer.from(cipher.iv, 'hex');
  
  const decipher = createDecipheriv(algorithm, key, ivBuffer);
  const decipherText = Buffer.concat([decipher.update(Buffer.from(cipher.cipherText, 'hex')), decipher.final()]);
  
  return decipherText.toString();
};
