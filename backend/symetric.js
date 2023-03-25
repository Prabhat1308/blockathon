const ipfsClient = require("ipfs-http-client");
const { globSource } = ipfsClient;
const ipfsEndPoint = "http://localhost:5001";
const ipfs = ipfsClient(ipfsEndPoint);

const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

async function uploadFileEncrypted(file, ipfspath) {
  try {
    const buff = fs.readFileSync(file);
    const secret_key = (78478350502187103631278141307418).toString("hex");

    const iv = crypto.randomBytes(8).toSgtring("hex"); // 8 bytes -> 16 chars

    const ebuff = encryptAES(buff, secret_key, iv);

    const content = Buffer.concat([
      Buffer.from(iv, "utf8"),
      Buffer.from(ebuff, "utf8"),
    ]);

    await ipfs.files.write(ipfspath, content, { create: true, parents: true });

    console.log("ENCRYPTION --------");
    console.log("iv:", iv);
    console.log("contents:", buff.length, "encrypted:", ebuff.length);
    console.log(" ");
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function toArray(asyncIterator) {
  const arr = [];
  for await (const i of asyncIterator) {
    arr.push(i);
  }
  return arr;
}

async function downloadFileEncrypted(ipfspath) {
  try {
    let file_data = await ipfs.files.read(ipfspath);

    let edata = [];
    for await (const chunk of file_data) edata.push(chunk);
    edata = Buffer.concat(edata);

    const secret_key = decryptRSA(edata.slice(0, 684).toString("utf8"));
    const iv = edata.slice(684, 700).toString("utf8");
    const econtent = edata.slice(700).toString("utf8");
    const ebuf = Buffer.from(econtent, "hex");
    const content = decryptAES(ebuf, secret_key, iv);

    console.log(" ");
    console.log("DECRYPTION --------");
    console.log("iv:", iv);
    console.log("contents:", content.length, "encrypted:", econtent.length);
    console.log("downloaded:", edata.length);

    return content;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function getUploadedFiles(ipfspath = "/encrypted/") {
  let files = [];
  const arr = await toArray(ipfs.files.ls(ipfspath));
  for (let file of arr) {
    if (file.type === "directory") {
      const inner = await getUploadedFiles(ipfspath + file.name + "/");
      files = files.concat(inner);
    } else {
      files.push({
        path: ipfspath + file.name,
        size: file.size,
        cid: file.cid.toString(),
      });
    }
  }
  return files;
}

function encryptAES(buffer, secretKey, iv) {
  const cipher = crypto.createCipheriv("aes-256-ctr", secretKey, iv);
  const data = cipher.update(buffer);
  const encrypted = Buffer.concat([data, cipher.final()]);
  return encrypted.toString("hex");
}

function decryptAES(buffer, secretKey, iv) {
  const decipher = crypto.createDecipheriv("aes-256-ctr", secretKey, iv);
  const data = decipher.update(buffer);
  const decrpyted = Buffer.concat([data, decipher.final()]);
  return decrpyted;
}

async function _testing() {
    const file = 'package.json'  // file to upload
    const ipfspath = '/encrypted/data/' + file // ipfspath
    
    // upload to ipfs path
    await uploadFileEncrypted(file, ipfspath)
    
    // download from ipfs path
    const dl = await downloadFileEncrypted(ipfspath)
    
    // to buffer
    const buff = Buffer.from(dl, 'hex')
  
    // save buffer to file
    const outfile = ipfspath.replace(/\//g, '_');
    console.log('writing:', outfile)
    fs.writeFile(outfile, buff, function(err) {
      if (err) throw err;
    })
  }

  _testing();