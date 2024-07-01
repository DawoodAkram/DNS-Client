async function encodeDnsQuery(domain, queryType):Promise<Buffer>{
    const buffer = Buffer.alloc(512);

    // Transaction ID
    buffer.writeUInt16BE(Math.floor(Math.random()*65535)); 

    // Flags
    buffer.writeUInt16BE(0x0120, 2);

    // Questions
    buffer.writeUInt16BE(1, 4);

    // Answer RRs, Authority RRs, Additional RRs
    buffer.writeUInt16BE(0, 6);
    buffer.writeUInt16BE(0, 8);
    buffer.writeUInt16BE(0, 10);

    // Write domain name
    let offset = 12;
    if (domain.startsWith("www.")) {
        domain = domain.slice(4); // Remove "www."
    }

    domain.split('.').forEach(part => {
        buffer.writeUInt8(part.length, offset++);
        buffer.write(part, offset);
        offset += part.length;
    });
    buffer.writeUInt8(0, offset++); // Terminate with zero length

    // Query type
    let qType:number;
    if (queryType.toLowerCase() === 'ipv4') {
        qType = 1; // A record
    } else if (queryType.toLowerCase() === 'ipv6') {
        qType = 28; // AAAA record
    } else if (queryType.toLowerCase() === 'cname') {
        qType = 5; // CNAME record
        
    }else if(queryType.toLowerCase() === 'ns'){
        qType=2;
    } else {
        throw new Error('Unsupported query type');
    }
    buffer.writeUInt16BE(qType, offset);
    offset += 2;

    // Class
    buffer.writeUInt16BE(1, offset); // IN (Internet)
    offset += 2;

    return buffer.slice(0, offset);
}

export default encodeDnsQuery