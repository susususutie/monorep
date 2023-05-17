/**
 * 涉及到dom操作的公共函数
 */
interface Res {
  headers: { 'content-disposition'?: string; [key: string]: unknown };
  data: BlobPart;
}
export function downloadByLink<T extends Res>(res: T) {
  let fileName = `download-${Date.now()}`;
  const contentDisposition = res.headers['content-disposition'];
  if (contentDisposition) {
    fileName = window.decodeURI(contentDisposition.split('=')[1]);
  }

  const link = document.createElement('a');
  link.download = fileName;
  link.style.display = 'none';
  link.href = URL.createObjectURL(new Blob([res.data]));
  document.body.appendChild(link);
  link.click();
  URL.revokeObjectURL(link.href);
  document.body.removeChild(link);
}
