import fs from 'fs';

async function readPacketFromFile(filePath: string): Promise<Buffer> {
    return fs.readFileSync(filePath);
}

export default readPacketFromFile