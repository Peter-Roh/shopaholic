export type cloudflareUpload = {
  errors: string[];
  messages: string[];
  result: {
    filename: string;
    id: string;
    requireSignedURLs: boolean;
    uploaded: string;
    variants: string[];
  };
  success: boolean;
};
