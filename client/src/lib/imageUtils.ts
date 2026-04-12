/**
 * Convert a File object to base64 string
 */
export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      resolve(result);
    };
    reader.onerror = (error) => {
      reject(error);
    };
  });
};

/**
 * Convert multiple files to base64 strings
 */
export const filesToBase64 = async (files: FileList): Promise<string[]> => {
  const promises = Array.from(files).map((file) => fileToBase64(file));
  return Promise.all(promises);
};

/**
 * Validate if file is a valid image
 */
export const isValidImageFile = (file: File): boolean => {
  const validImageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
  return validImageTypes.includes(file.type);
};

/**
 * Validate image file size (default: 5MB)
 */
export const isValidImageSize = (file: File, maxSizeMB: number = 5): boolean => {
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  return file.size <= maxSizeBytes;
};
