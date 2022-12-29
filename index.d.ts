import { Readable, Writable } from 'stream';

export type StorageType = 'Standard' | 'IA' | 'Archive';

export interface RequestOptions {
  // the operation timeout
  timeout?: number | undefined;
}

export interface OwnerType {
  id: string;
  displayName: string;
}

export interface ObjectMeta {
  /** object name on oss */
  name: string;
  /** object url */
  url: string;
  /** object last modified GMT date, e.g.: 2015-02-19T08:39:44.000Z */
  lastModified: string;
  /** object etag contains ", e.g.: "5B3C1A2E053D763E1B002CC607C5A0FE" */
  etag: string;
  /** object type, e.g.: Normal */
  type: string;
  /** object size, e.g.: 344606 */
  size: number;
  storageClass: StorageType;
  owner?: OwnerType;
}

export interface NormalSuccessResponse {
  /** response status */
  status: number;
  /** response headers */
  /** todo the object in detail */
  headers: object;
  /** response size */
  size: number;
  /**  request total use time (ms) */
  rt: number;
}

/**
 * @see x-oss-meta-* in https://help.aliyun.com/document_detail/31978.html for Aliyun user
 * @see x-oss-meta-* in https://www.alibabacloud.com/help/en/doc-detail/31978.html for AlibabaCloud user
 */
export interface UserMeta extends Record<string, string | number> {
  uid: number;
  pid: number;
}

export interface ObjectCallback {
  /** After a file is uploaded successfully, the OSS sends a callback request to this URL. */
  url: string;
  /** The host header value for initiating callback requests. */
  host?: string | undefined;
  /** The value of the request body when a callback is initiated, for example, key=$(key)&etag=$(etag)&my_var=$(x:my_var). */
  body: string;
  /** The Content-Type of the callback requests initiatiated, It supports application/x-www-form-urlencoded and application/json, and the former is the default value. */
  contentType?: string | undefined;
  customValue?: object | undefined;
  /** extra headers, detail see RFC 2616 */
  headers?: object | undefined;
}

export interface ModifyData {
  /** object last modified GMT string */
  lastModified: string;
  /** object etag contains ", e.g.: "5B3C1A2E053D763E1B002CC607C5A0FE" */
  etag: string;
}

export interface ListObjectsQuery {
  /** search object using prefix key */
  prefix?: string | undefined;
  /** search start from marker, including marker key */
  marker?: string | undefined;
  /** only search current dir, not including subdir */
  delimiter?: string | undefined; // delimiter search scope e.g.
  /** max objects, default is 100, limit to 1000 */
  'max-keys': string | number;
  /** Specifies that the object names in the response are URL-encoded. */
  'encoding-type'?: 'url' | '';
}

export interface ListObjectResult {
  objects: ObjectMeta[];
  prefixes: string[];
  isTruncated: boolean;
  nextMarker: string;
  res: NormalSuccessResponse;
}

export interface PutObjectOptions {
  /** the operation timeout */
  timeout?: number | undefined;
  /** custom mime, will send with Content-Type entity header */
  mime?: string | undefined;
  /** user meta, will send with x-oss-meta- prefix string e.g.: { uid: 123, pid: 110 } */
  meta?: UserMeta | undefined;
  callback?: ObjectCallback | undefined;
  headers?: object | undefined;
}

export interface PutObjectResult {
  name: string;
  url: string;
  data: object;
  res: NormalSuccessResponse;
}

export interface AppendObjectResult {
  name: string;
  /** the url of oss */
  url: string;
  res: NormalSuccessResponse;
  /** the next position */
  nextAppendPosition: string;
}

export interface HeadObjectOptions {
  timeout?: number | undefined;
  headers?: object | undefined;
}

export interface HeadObjectResult {
  /** response status, maybe 200 or 304 */
  status: number;
  meta: UserMeta;
  res: NormalSuccessResponse;
}

export interface GetObjectOptions {
  timeout?: number | undefined;
  /** The Content-Type of the callback requests initiatiated, It supports application/x-www-form-urlencoded and application/json, and the former is the default value. */
  process?: string | undefined;
  headers?: object | undefined;
}

export interface GetObjectResult {
  /** file content buffer if file parameter is null or ignore */
  content?: any;
  res: NormalSuccessResponse;
}

export interface GetStreamOptions {
  timeout?: number | undefined;
  /** The Content-Type of the callback requests initiatiated, It supports application/x-www-form-urlencoded and application/json, and the former is the default value. */
  process?: string | undefined;
  headers?: object | undefined;
}

export interface GetStreamResult {
  stream: Readable;
  res: NormalSuccessResponse;
}

export interface CopyObjectOptions {
  timeout?: number | undefined;
  meta?: UserMeta | undefined;
  headers?: object | undefined;
}

export interface CopyAndPutMetaResult {
  data: ModifyData;
  res: NormalSuccessResponse;
}

export type HTTPMethods = 'GET' | 'POST' | 'DELETE' | 'PUT';

export interface ResponseHeaderType {
  'content-type'?: string | undefined;
  'content-disposition'?: string | undefined;
  'cache-control'?: string | undefined;
}

export interface SignatureUrlOptions {
  /** after expires seconds, the url will become invalid, default is 1800 */
  expires?: number | undefined;
  /** the HTTP method, default is 'GET' */
  method?: HTTPMethods | undefined;
  /** set the request content type */
  'Content-Type'?: string | undefined;
  /**  image process params, will send with x-oss-process e.g.: {process: 'image/resize,w_200'} */
  process?: string | undefined;
  /** traffic limit, range: 819200~838860800 */
  trafficLimit?: number | undefined;
  /** additional signature parameters in url */
  subResource?: object | undefined;
  /** set the response headers for download */
  response?: ResponseHeaderType | undefined;
  /** set the callback for the operation */
  callback?: ObjectCallback | undefined;
}

// Object Simple Interface
export interface IObjectSimple {
  /** Object base operations */
  /**
   * List objects in the bucket.
   */
  list(query: ListObjectsQuery | null, options: RequestOptions): Promise<ListObjectResult>;

  /**
   * Add an object to the bucket.
   */
  put(name: string, file: string | Buffer | Readable, options?: PutObjectOptions): Promise<PutObjectResult>;

  /**
   * Head an object and get the meta info.
   */
  head(name: string, options?: HeadObjectOptions): Promise<HeadObjectResult>;

  /**
   * Get an object from the bucket.
   */
  get(name: string, options?: GetObjectOptions): Promise<GetObjectResult>;
  get(name: string, file: string | Writable, options?: GetObjectOptions): Promise<GetObjectResult>;

  /**
   * Get an object read stream.
   */
  getStream(name?: string, options?: GetStreamOptions): Promise<GetStreamResult>;

  /**
   * Delete an object from the bucket.
   */
  delete(name: string, options?: RequestOptions): Promise<NormalSuccessResponse>;

  /**
   * Copy an object from sourceName to name.
   */
  copy(name: string, sourceName: string, options?: CopyObjectOptions): Promise<CopyAndPutMetaResult>;
  copy(name: string, sourceName: string, sourceBucket: string, options?: CopyObjectOptions): Promise<CopyAndPutMetaResult>;

  /**
   * Signature a url for the object.
   * @param name
   * @param options
   */
  asyncSignatureUrl(name: string, options?: SignatureUrlOptions): Promise<string>;
}
