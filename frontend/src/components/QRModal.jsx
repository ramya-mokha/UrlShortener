import React from "react";
import { QRCodeCanvas } from "qrcode.react";

const QRModal = ({ shortUrl, onClose }) => {
  return (
    <div className="bg-zinc-900 rounded-xl p-2 mt-2">

   
    <div>
      <QRCodeCanvas value={shortUrl} size={140} className=""/>
    </div>
     </div>
  );
};

export default QRModal;
