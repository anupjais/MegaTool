import React, { useState } from "react";
// import { QRCode } from "qrcode.react"; // Use named import
import { SketchPicker } from "react-color";

const QrCodeGenerator = () => {
  const [qrType, setQrType] = useState("URL");
  const [data, setData] = useState("");
  const [color, setColor] = useState("#000000"); // Default color: black

  // Handle changes in data input field
  const handleDataChange = (e) => {
    setData(e.target.value);
  };

  // Handle change in QR code type
  const handleTypeChange = (e) => {
    setQrType(e.target.value);
    setData(""); // Reset data when QR type changes
  };

  // Handle color change from the color picker
  const handleColorChange = (color) => {
    setColor(color.hex);
  };

  // Function to help format data based on QR Type
  const getFormattedData = () => {
    switch (qrType) {
      case "Email":
        return `mailto:${data}`; // Format email as mailto:
      case "SMS":
        return `sms:${data}`; // Format SMS as sms:
      case "vCard":
        return `BEGIN:VCARD\nVERSION:3.0\nFN:${data}\nEND:VCARD`; // Simple vCard example
      case "WiFi":
        // WiFi format: Wi-Fi network details
        return `WIFI:T:WPA;S:${data};P:;`; // Example WiFi network format
      default:
        return data; // For other types, return as is
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h2>QR Code Generator</h2>

      <label>
        Select QR Code Type:
        <select value={qrType} onChange={handleTypeChange}>
          <option value="URL">URL</option>
          <option value="vCard">vCard</option>
          <option value="Text">Text</option>
          <option value="Email">Email</option>
          <option value="SMS">SMS</option>
          <option value="WiFi">WiFi</option>
          <option value="Bitcoin">Bitcoin</option>
          <option value="Twitter">Twitter</option>
          <option value="Facebook">Facebook</option>
          <option value="PDF">PDF</option>
          <option value="MP3">MP3</option>
          <option value="AppStores">App Stores</option>
          <option value="Images">Images</option>
          <option value="2DBarcodes">2D Barcodes</option>
        </select>
      </label>

      <div style={{ marginTop: "10px" }}>
        <label>
          {qrType} Data:
          <input
            type="text"
            value={data}
            onChange={handleDataChange}
            placeholder={`Enter ${qrType} data`}
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </label>
      </div>

      <div style={{ marginTop: "20px" }}>
        <label>Select QR Code Color:</label>
        <SketchPicker color={color} onChangeComplete={handleColorChange} />
      </div>

      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <h3>Generated QR Code</h3>
        <QRCode
          value={getFormattedData()} // Use the formatted data for the QR code
          size={256}
          fgColor={color} // Set QR code color
          level="H" // Error correction level (H = highest)
        />
      </div>
    </div>
  );
};

export default QrCodeGenerator;
