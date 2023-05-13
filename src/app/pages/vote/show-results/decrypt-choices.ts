import {Buffer} from "buffer";
import * as CryptoJS from "crypto-js";

export class DecryptChoices {
  static RANDOM_IV_LENGTH = 8;

  constructor(private decryptionKeyBase64: string) {
  }

  decrypt(choices: string | undefined): string {
    if (choices == undefined) {
      console.warn(`Invalid encrypted choices: ${choices}`);
      return "";
    }

    const randomIvAndCipherBuffer = Buffer.from(choices, "base64");

    const randomIvBase64 = randomIvAndCipherBuffer.slice(0, DecryptChoices.RANDOM_IV_LENGTH).toString("base64");
    const cipherBase64 = randomIvAndCipherBuffer.slice(DecryptChoices.RANDOM_IV_LENGTH).toString("base64");

    const key = CryptoJS.enc.Base64.parse(this.decryptionKeyBase64);
    const iv = CryptoJS.enc.Base64.parse(randomIvBase64);

    return CryptoJS.AES.decrypt(cipherBase64, key, {
      iv: iv,
      mode: CryptoJS.mode.CTR,
      padding: CryptoJS.pad.NoPadding
    }).toString(CryptoJS.enc.Utf8);
  }
}
