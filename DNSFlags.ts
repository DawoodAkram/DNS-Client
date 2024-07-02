import bufferManipulator from "./buffer";

export class DNSFlags {
  left_bytes: number;
  right_bytes: number;

  constructor(b1: number, b2: number) {
    this.left_bytes = b1;
    this.right_bytes = b2;
  }
   
  static create(qr: number, b2: number): DNSFlags {
    const b1 = (qr << 7) & 0x80;
    return new DNSFlags(b1, b2);
  }

  get qr(): number {
    return (this.left_bytes >> 7) & 0x01;
  }

  get opCode(): number {
    return (this.left_bytes >> 3) & 0x0F;
  }

  get aa(): number {
    return (this.left_bytes >> 2) & 0x01;
  }

  get tc(): number {
    return (this.left_bytes >> 1) & 0x01;
  }

  get rd(): number {
    return this.left_bytes & 0x01;
  }

  get ra(): number {
    return (this.right_bytes >> 7) & 0x01;
  }

  get z(): number {
    return (this.right_bytes >> 4) & 0x07;
  }

  get rCode(): number {
    return this.right_bytes & 0x0F;
  }
}