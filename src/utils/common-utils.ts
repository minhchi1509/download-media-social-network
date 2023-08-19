export const downloadMediaFile = (url: string) => {
  fetch(url)
    .then((response) => response.blob())
    .then((blob) => {
      const fileURL = URL.createObjectURL(blob);
      const downloadLink = document.createElement("a");
      downloadLink.href = fileURL;
      downloadLink.download = "minhchitest";
      downloadLink.click();
      URL.revokeObjectURL(fileURL);
    });
};
