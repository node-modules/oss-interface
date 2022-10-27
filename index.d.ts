import { Readable, Writable } from 'stream';

export = OSSInterface;
export as namespace OSSInterface;

declare namespace OSSInterface {
  type StorageType = 'Standard' | 'IA' | 'Archive';

  interface RequestOptions {
    // the operation timeout
    timeout?: number | undefined;
  }

  interface OwnerType {
    id: string;
    displayName: string;
  }

  interface ObjectMeta {
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

  interface NormalSuccessResponse {
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
  interface UserMeta extends Record<string, string | number> {
    uid: number;
    pid: number;
  }

  interface ObjectCallback {
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

  interface ModifyData {
    /** object last modified GMT string */
    lastModified: string;
    /** object etag contains ", e.g.: "5B3C1A2E053D763E1B002CC607C5A0FE" */
    etag: string;
  }

  interface ListObjectsQuery {
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

  interface ListObjectResult {
    objects: ObjectMeta[];
    prefixes: string[];
    isTruncated: boolean;
    nextMarker: string;
    res: NormalSuccessResponse;
  }

  interface PutObjectOptions {
    /** the operation timeout */
    timeout?: number | undefined;
    /** custom mime, will send with Content-Type entity header */
    mime?: string | undefined;
    /** user meta, will send with x-oss-meta- prefix string e.g.: { uid: 123, pid: 110 } */
    meta?: UserMeta | undefined;
    callback?: ObjectCallback | undefined;
    headers?: object | undefined;
  }

  interface PutObjectResult {
    name: string;
    url: string;
    data: object;
    res: NormalSuccessResponse;
  }

  interface AppendObjectResult {
    name: string;
    /** the url of oss */
    url: string;
    res: NormalSuccessResponse;
    /** the next position */
    nextAppendPosition: string;
  }

  interface HeadObjectOptions {
    timeout?: number | undefined;
    headers?: object | undefined;
  }

  interface HeadObjectResult {
    /** response status, maybe 200 or 304 */
    status: number;
    meta: UserMeta;
    res: NormalSuccessResponse;
  }

  interface GetObjectOptions {
    timeout?: number | undefined;
    /** The Content-Type of the callback requests initiatiated, It supports application/x-www-form-urlencoded and application/json, and the former is the default value. */
    process?: string | undefined;
    headers?: object | undefined;
  }

  interface GetObjectResult {
    /** file content buffer if file parameter is null or ignore */
    content?: any;
    res: NormalSuccessResponse;
  }

  interface GetStreamOptions {
    timeout?: number | undefined;
    /** The Content-Type of the callback requests initiatiated, It supports application/x-www-form-urlencoded and application/json, and the former is the default value. */
    process?: string | undefined;
    headers?: object | undefined;
  }

  interface GetStreamResult {
    /** readable stream instance if response status is not 200, stream will be null. */
    stream?: Readable;
    res: NormalSuccessResponse;
  }

  interface CopyObjectOptions {
    timeout?: number | undefined;
    meta?: UserMeta | undefined;
    headers?: object | undefined;
  }

  interface CopyAndPutMetaResult {
    data: ModifyData;
    res: NormalSuccessResponse;
  }

  // Object Simple Interface
  interface IObjectSimple {
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
  }
}
