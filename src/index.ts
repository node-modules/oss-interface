import type { Readable, Writable } from 'node:stream';
import type { IncomingHttpHeaders as HTTPIncomingHttpHeaders } from 'node:http';
import type { Except } from 'type-fest';

// https://github.com/node-modules/urllib/pull/471
export interface IncomingHttpHeaders extends Except<HTTPIncomingHttpHeaders, 'set-cookie'> {
  'set-cookie'?: string | string[];
}

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
  headers: IncomingHttpHeaders;
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
  // uid: number;
  // pid: number;
}

export interface ObjectCallback {
  /** After a file is uploaded successfully, the OSS sends a callback request to this URL. */
  url: string;
  /** The host header value for initiating callback requests. */
  host?: string;
  /**
   * The value of the request body when a callback is initiated
   * for example, key=$(key)&etag=$(etag)&my_var=$(x:my_var)
   */
  body: string;
  /**
   * The Content-Type of the callback requests initiated
   * It supports application/x-www-form-urlencoded and application/json, and the former is the default value
   */
  contentType?: string;
  customValue?: Record<string, any>;
  /** extra headers, detail see RFC 2616 */
  headers?: IncomingHttpHeaders;
}

export interface ModifyData {
  /** object last modified GMT string */
  lastModified: string;
  /** object etag contains ", e.g.: "5B3C1A2E053D763E1B002CC607C5A0FE" */
  etag: string;
}

export interface ListObjectsQuery {
  /** search object using prefix key */
  prefix?: string;
  /** search start from marker, including marker key */
  marker?: string;
  /** only search current dir, not including subdir */
  delimiter?: string; // delimiter search scope e.g.
  /** max objects, default is 100, limit to 1000 */
  'max-keys'?: string | number;
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

export interface PutObjectOptions extends RequestOptions {
  /** custom mime, will send with Content-Type entity header */
  mime?: string;
  /** user meta, will send with x-oss-meta- prefix string e.g.: { uid: 123, pid: 110 } */
  meta?: UserMeta;
  callback?: ObjectCallback;
  headers?: IncomingHttpHeaders;
}

export interface PutObjectResult {
  name: string;
  url: string;
  /** only exists with callback request */
  data?: object;
  res: NormalSuccessResponse;
}

export interface AppendObjectOptions extends PutObjectOptions {
  /** append position, default is '0' */
  position?: string | number;
}

export interface AppendObjectResult {
  name: string;
  /** the url of oss */
  url: string;
  res: NormalSuccessResponse;
  /** the next position */
  nextAppendPosition: string;
  /** only exists with callback request */
  data?: object;
}

export interface HeadObjectOptions extends RequestOptions {
  headers?: IncomingHttpHeaders;
  versionId?: string;
  /** additional signature parameters in url */
  subResource?: Record<string, string>;
  /**
   * @alias subResource
   * @deprecated
   */
  subres?: Record<string, string>;
}

export interface HeadObjectResult {
  /** response status, maybe 200 or 304 */
  status: number;
  meta: UserMeta;
  res: NormalSuccessResponse;
}

export interface GetObjectOptions extends RequestOptions {
  /**
   * The Content-Type of the callback requests initiatiated
   * It supports application/x-www-form-urlencoded and application/json, and the former is the default value
   */
  process?: string;
  versionId?: string;
  headers?: IncomingHttpHeaders;
  /** additional signature parameters in url */
  subResource?: Record<string, string>;
  /**
   * @alias subResource
   * @deprecated
   */
  subres?: Record<string, string>;
}

export interface GetObjectResult {
  /** file content buffer if file parameter is null or ignore */
  content?: any;
  res: NormalSuccessResponse;
}

export interface GetStreamOptions extends GetObjectOptions {}

export interface GetStreamResult {
  stream: Readable;
  res: NormalSuccessResponse;
}

export interface CopyObjectOptions extends RequestOptions {
  versionId?: string;
  meta?: UserMeta;
  headers?: IncomingHttpHeaders;
}

export interface CopyAndPutMetaResult {
  data: ModifyData | null;
  res: NormalSuccessResponse;
}

export interface DeleteObjectOptions extends RequestOptions {
  versionId?: string;
}

export interface DeleteObjectResult {
  res: NormalSuccessResponse;
  /** Compatible v1 delete object result fields */
  /** response status */
  status: number;
  /** response headers */
  headers: IncomingHttpHeaders;
  /** response size */
  size: number;
  /**  request total use time (ms) */
  rt: number;
}

export interface DeleteMultiOptions extends RequestOptions {
  /** quiet mode, if true, return empty deleted list */
  quiet?: boolean;
}

export interface DeletedObject {
  Key: string;
  VersionId?: string;
  DeleteMarker?: boolean;
  DeleteMarkerVersionId?: string;
}

export interface DeleteMultiResult {
  res: NormalSuccessResponse;
  /** deleted objects list */
  deleted: DeletedObject[];
}

export interface ObjectTaggingOptions extends RequestOptions {
  versionId?: string;
}

export interface GetObjectTaggingResult {
  /** response status */
  status: number;
  res: NormalSuccessResponse;
  /** object tags, key-value pairs */
  tag: Record<string, string>;
}

export interface PutObjectTaggingResult {
  /** response status */
  status: number;
  res: NormalSuccessResponse;
}

export interface DeleteObjectTaggingResult {
  /** response status */
  status: number;
  res: NormalSuccessResponse;
}

export interface InitMultipartUploadOptions extends RequestOptions {
  /** custom mime, will send with Content-Type entity header */
  mime?: string;
  /** user meta, will send with x-oss-meta- prefix string */
  meta?: UserMeta;
  headers?: IncomingHttpHeaders;
}

export interface InitMultipartUploadResult {
  res: NormalSuccessResponse;
  bucket: string;
  name: string;
  uploadId: string;
}

export interface PartInfo {
  /** part number */
  number: number;
  /** part etag */
  etag: string;
}

export interface CompleteMultipartUploadOptions extends RequestOptions {
  callback?: ObjectCallback;
  headers?: IncomingHttpHeaders;
  /** progress callback */
  progress?: (percent: number, checkpoint: any, res: NormalSuccessResponse) => void | Promise<void>;
}

export interface CompleteMultipartUploadResult {
  res: NormalSuccessResponse;
  bucket: string;
  name: string;
  etag: string;
  /** callback response data */
  data?: object;
}

export interface MultipartUploadOptions extends RequestOptions {
  /** part size, default is 1MB, minimum is 100KB */
  partSize?: number;
  /** custom mime */
  mime?: string;
  /** user meta */
  meta?: UserMeta;
  callback?: ObjectCallback;
  headers?: IncomingHttpHeaders;
  /** progress callback */
  progress?: (percent: number, checkpoint?: any, res?: NormalSuccessResponse) => void | Promise<void>;
  /** parallel upload parts, default is 5 */
  parallel?: number;
  /** checkpoint for resumable upload */
  checkpoint?: any;
}

export interface MultipartUploadResult {
  res: NormalSuccessResponse;
  bucket: string;
  name: string;
  etag: string;
  /** callback response data */
  data?: object;
}

export interface SourceData {
  /** source object name */
  sourceKey: string;
  /** source bucket name */
  sourceBucketName: string;
  /** data copy start byte offset */
  startOffset?: number;
  /** data copy end byte offset */
  endOffset?: number;
}

export interface MultipartUploadCopyOptions extends RequestOptions {
  /** part size for copy */
  partSize?: number;
  /** version id of source object */
  versionId?: string;
  /** custom headers for copy */
  copyheaders?: IncomingHttpHeaders;
  headers?: IncomingHttpHeaders;
  /** progress callback */
  progress?: (percent: number, checkpoint: any, res: NormalSuccessResponse) => void | Promise<void>;
  /** parallel copy parts, default is 5 */
  parallel?: number;
  /** checkpoint for resumable copy */
  checkpoint?: any;
}

export interface AbortMultipartUploadOptions extends RequestOptions {}

export interface AbortMultipartUploadResult {
  res: NormalSuccessResponse;
}

export interface ListUploadsQuery {
  /** search object using prefix key */
  prefix?: string;
  /** search start from marker, including marker key */
  'key-marker'?: string;
  /** uploadId marker */
  'upload-id-marker'?: string;
  /** max uploads, default is 1000 */
  'max-uploads'?: string | number;
  /** Specifies that the object names in the response are URL-encoded. */
  'encoding-type'?: 'url' | '';
}

export interface Upload {
  /** object name */
  name: string;
  /** upload id */
  uploadId: string;
  /** upload initiated time */
  initiated: string;
}

export interface ListUploadsResult {
  res: NormalSuccessResponse;
  /** upload list */
  uploads: Upload[];
  /** bucket name */
  bucket: string;
  /** next key marker for pagination */
  nextKeyMarker: string;
  /** next upload id marker for pagination */
  nextUploadIdMarker: string;
  /** whether the list is truncated */
  isTruncated: boolean;
}

export interface UploadPartCopySourceData {
  /** source object name */
  sourceKey: string;
  /** source bucket name */
  sourceBucketName: string;
}

export interface UploadPartCopyOptions extends RequestOptions {
  /** version id of source object */
  versionId?: string;
  headers?: IncomingHttpHeaders;
  mime?: string;
}

export interface UploadPartCopyResult {
  name: string;
  /** part etag */
  etag: string;
  res: NormalSuccessResponse;
}

export interface UploadPartOptions extends RequestOptions {
  headers?: IncomingHttpHeaders;
  mime?: string;
  /** disable MD5 check */
  disabledMD5?: boolean;
}

export interface UploadPartResult {
  name: string;
  /** part etag */
  etag: string;
  res: NormalSuccessResponse;
}

export type HTTPMethods = 'GET' | 'POST' | 'DELETE' | 'PUT';

export interface ResponseHeaderType {
  'content-type'?: string;
  'content-disposition'?: string;
  'cache-control'?: string;
}

export interface SignatureUrlOptions {
  /** after expires seconds, the url will become invalid, default is 1800 */
  expires?: number;
  /** the HTTP method, default is 'GET' */
  method?: HTTPMethods;
  /**  image process params, will send with x-oss-process e.g.: {process: 'image/resize,w_200'} */
  process?: string;
  /** traffic limit, range: 819200~838860800 */
  trafficLimit?: number;
  /** additional signature parameters in url */
  subResource?: Record<string, string>;
  /** set the response headers for download */
  response?: ResponseHeaderType;
  /** set the callback for the operation */
  callback?: ObjectCallback;
  /**
   * set the request content type
   * @deprecated please use `content-type` instead
   */
  'Content-Type'?: string;
  /**
   * set the request content type
   */
  'content-type'?: string;
  /**
   * @deprecated please use `content-md5` instead
   */
  'Content-MD5'?: string;
  /**
   * @deprecated please use `content-md5` instead
   */
  'Content-Md5'?: string;
  /** set the request content md5 */
  'content-md5'?: string;
  /** set other custom x-oss-{key} */
  [key: string]: any;
}

// Object Simple Interface
export interface IObjectSimple {
  /** Object base operations */
  /**
   * List objects in the bucket.
   */
  list(query?: ListObjectsQuery | null, options?: RequestOptions): Promise<ListObjectResult>;

  /**
   * Add an object to the bucket.
   */
  put(name: string, file: string | Buffer | Readable, options?: PutObjectOptions): Promise<PutObjectResult>;

  /**
   * Append content to an appendable object.
   */
  append(name: string, file: string | Buffer | Readable, options?: AppendObjectOptions): Promise<AppendObjectResult>;

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
  delete(name: string, options?: DeleteObjectOptions): Promise<DeleteObjectResult>;

  /**
   * Delete multiple objects from the bucket.
   */
  deleteMulti(names: string[], options?: DeleteMultiOptions): Promise<DeleteMultiResult>;
  deleteMulti(names: Array<{ key: string; versionId?: string }>, options?: DeleteMultiOptions): Promise<DeleteMultiResult>;

  /**
   * Copy an object from sourceName to name.
   */
  copy(name: string, sourceName: string, options?: CopyObjectOptions): Promise<CopyAndPutMetaResult>;
  copy(name: string, sourceName: string, sourceBucket: string, options?: CopyObjectOptions): Promise<CopyAndPutMetaResult>;

  /**
   * Get object tagging.
   */
  getObjectTagging(name: string, options?: ObjectTaggingOptions): Promise<GetObjectTaggingResult>;

  /**
   * Put object tagging.
   */
  putObjectTagging(name: string, tag: Record<string, string>, options?: ObjectTaggingOptions): Promise<PutObjectTaggingResult>;

  /**
   * Delete object tagging.
   */
  deleteObjectTagging(name: string, options?: ObjectTaggingOptions): Promise<DeleteObjectTaggingResult>;

  /**
   * Initiate a multipart upload transaction.
   */
  initMultipartUpload(name: string, options?: InitMultipartUploadOptions): Promise<InitMultipartUploadResult>;

  /**
   * Complete a multipart upload transaction.
   */
  completeMultipartUpload(name: string, uploadId: string, parts: PartInfo[], options?: CompleteMultipartUploadOptions): Promise<CompleteMultipartUploadResult>;

  /**
   * Upload a file to OSS using multipart uploads.
   */
  multipartUpload(name: string, file: string | Buffer | Readable, options?: MultipartUploadOptions): Promise<MultipartUploadResult>;

  /**
   * Multipart copy object from source bucket/object.
   */
  multipartUploadCopy(name: string, sourceData: SourceData, options?: MultipartUploadCopyOptions): Promise<CompleteMultipartUploadResult>;

  /**
   * Abort a multipart upload transaction.
   */
  abortMultipartUpload(name: string, uploadId: string, options?: AbortMultipartUploadOptions): Promise<AbortMultipartUploadResult>;

  /**
   * List the on-going multipart uploads.
   */
  listUploads(query?: ListUploadsQuery, options?: RequestOptions): Promise<ListUploadsResult>;

  /**
   * Upload a part copy in a multipart from the source bucket/object.
   */
  uploadPartCopy(name: string, uploadId: string, partNo: number, range: string, sourceData: UploadPartCopySourceData, options?: UploadPartCopyOptions): Promise<UploadPartCopyResult>;

  /**
   * Upload a part in a multipart upload transaction.
   */
  uploadPart(name: string, uploadId: string, partNo: number, file: string | Buffer | Readable, start: number, end: number, options?: UploadPartOptions): Promise<UploadPartResult>;

  /**
   * Signature a url for the object.
   * @param name
   * @param options
   */
  asyncSignatureUrl(name: string, options?: SignatureUrlOptions): Promise<string>;
}
