import React from "react";
import { ConnectButton } from "web3uikit";
import  AddFolderButton  from "../Folder/AddFolderButton";

export default function Home() {
  return (
    <>
      <div>
        <ConnectButton moralisAuth={false} />
      </div>
      <div>
        <AddFolderButton />
      </div>
    </>
  );
}
