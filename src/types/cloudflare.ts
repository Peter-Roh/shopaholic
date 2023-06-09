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

export type cloudflareStream = {
  uid: string;
  rtmps: {
    url: string;
    streamKey: string;
  };
  created: string;
  modified: string;
  meta: {
    name: string;
  };
  recording: {
    mode: string;
    requireSignedURLs: boolean;
    allowedOrigins: number | null;
  };
};
