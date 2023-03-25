import { Web3Storage } from "web3.storage";
import fs from "fs";
import path from "path";
const WEB3_STORAGE_API_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDU5ODMzMDYwMjllNDQyNGM1MDg1NzUwNmM0MjY4MzhmOEUyMmUxMzIiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2Nzk3NTU2Mzc3NTAsIm5hbWUiOiJzdW1pdCJ9.hEzv-WkFKs6-nH0NoYKxACQFcOlg7mDNQqosVv2T2Nk"
export async function downloadFile(
  WEB3_STORAGE_API_KEY,
  cid,
  downloadLocation
) {
  const client = new Web3Storage({
    token: WEB3_STORAGE_API_KEY,
  });
  const res = await client.get(cid);
  const dirPath = downloadLocation;
  console.log(dirPath);
  fs.mkdirSync(dirPath, { recursive: true });
  const files = await res.files();
  for (const file of files) {
    const filePath = path.join(dirPath, file.name);
    const arr = filePath.split(path.sep);
    const content = await file.arrayBuffer();
    if (file.type === "directory") {
      fs.mkdirSync(filePath, { recursive: true });
    } else {
      arr.pop();
      const singlePath = arr.join(path.sep);
      fs.mkdirSync(singlePath, { recursive: true });
      fs.writeFileSync(filePath, Buffer.from(content));
      console.log(`Downloaded file saved to ${filePath}`);
    }
  }
}
