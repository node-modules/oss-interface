import { Writable, Readable } from 'node:stream';
import { expectType } from 'tsd';
import {
  GetObjectOptions,
  IObjectSimple,
  ListObjectsQuery,
  RequestOptions,
  ListObjectResult,
  PutObjectOptions,
  PutObjectResult,
  AppendObjectOptions,
  AppendObjectResult,
  HeadObjectOptions,
  HeadObjectResult,
  GetObjectResult,
  GetStreamOptions,
  GetStreamResult,
  CopyObjectOptions,
  CopyAndPutMetaResult,
  SignatureUrlOptions,
  DeleteObjectOptions,
  DeleteObjectResult,
  DeleteMultiOptions,
  DeleteMultiResult,
  ObjectTaggingOptions,
  GetObjectTaggingResult,
  PutObjectTaggingResult,
  DeleteObjectTaggingResult,
  InitMultipartUploadOptions,
  InitMultipartUploadResult,
  CompleteMultipartUploadOptions,
  CompleteMultipartUploadResult,
  MultipartUploadOptions,
  MultipartUploadResult,
  MultipartUploadCopyOptions,
  AbortMultipartUploadOptions,
  AbortMultipartUploadResult,
  ListUploadsQuery,
  ListUploadsResult,
  UploadPartCopySourceData,
  UploadPartCopyOptions,
  UploadPartCopyResult,
  UploadPartOptions,
  UploadPartResult,
  PartInfo,
  SourceData,
  IncomingHttpHeaders,
} from './src/index.js';

const getObjectOptions = {} as GetObjectOptions;
expectType<string | undefined>(getObjectOptions.process);

class SimpleClient implements IObjectSimple {
  async list(query?: ListObjectsQuery | null, options?: RequestOptions): Promise<ListObjectResult> {
    console.log(query, options);
    return {} as any;
  }
  async put(name: string, file: string | Buffer | Readable, options?: PutObjectOptions): Promise<PutObjectResult> {
    console.log(name, file, options);
    return {} as any;
  }
  async append(name: string, file: string | Buffer | Readable, options?: AppendObjectOptions): Promise<AppendObjectResult> {
    console.log(name, file, options);
    return {} as any;
  }
  async head(name: string, options?: HeadObjectOptions): Promise<HeadObjectResult> {
    console.log(name, options);
    return {
      status: 200,
      res: {
        status: 200,
        headers: {} as IncomingHttpHeaders,
        size: 0,
        rt: 0,
      },
      meta: {},
    };
  }

  async get(name: string, options?: GetObjectOptions): Promise<GetObjectResult>;
  async get(name: string, file: string | Writable, options?: GetObjectOptions): Promise<GetObjectResult>;
  async get(name: string, file?: string | Writable | GetObjectOptions, options?: GetObjectOptions): Promise<GetObjectResult> {
    console.log(name, file, options);
    return {} as any;
  }
  async getStream(name?: string, options?: GetStreamOptions): Promise<GetStreamResult> {
    console.log(name, options);
    return {} as any;
  }
  async delete(name: string, options?: RequestOptions | DeleteObjectOptions): Promise<DeleteObjectResult> {
    console.log(name, options);
    return {} as any;
  }

  async deleteMulti(names: string[], options?: DeleteMultiOptions): Promise<DeleteMultiResult>;
  async deleteMulti(names: Array<{ key: string; versionId?: string }>, options?: DeleteMultiOptions): Promise<DeleteMultiResult>;
  async deleteMulti(names: string[] | Array<{ key: string; versionId?: string }>, options?: DeleteMultiOptions): Promise<DeleteMultiResult> {
    console.log(names, options);
    return {} as any;
  }

  async copy(name: string, sourceName: string, options?: CopyObjectOptions): Promise<CopyAndPutMetaResult>;
  async copy(name: string, sourceName: string, sourceBucket: string, options?: CopyObjectOptions): Promise<CopyAndPutMetaResult>;
  async copy(name: string, sourceName: string, sourceBucket?: string | CopyObjectOptions, options?: CopyObjectOptions): Promise<CopyAndPutMetaResult> {
    console.log(name, sourceName, sourceBucket, options);
    return {} as any;
  }

  async getObjectTagging(name: string, options?: ObjectTaggingOptions): Promise<GetObjectTaggingResult> {
    console.log(name, options);
    return {} as any;
  }

  async putObjectTagging(name: string, tag: Record<string, string>, options?: ObjectTaggingOptions): Promise<PutObjectTaggingResult> {
    console.log(name, tag, options);
    return {} as any;
  }

  async deleteObjectTagging(name: string, options?: ObjectTaggingOptions): Promise<DeleteObjectTaggingResult> {
    console.log(name, options);
    return {} as any;
  }

  async initMultipartUpload(name: string, options?: InitMultipartUploadOptions): Promise<InitMultipartUploadResult> {
    console.log(name, options);
    return {} as any;
  }

  async completeMultipartUpload(name: string, uploadId: string, parts: PartInfo[], options?: CompleteMultipartUploadOptions): Promise<CompleteMultipartUploadResult> {
    console.log(name, uploadId, parts, options);
    return {} as any;
  }

  async multipartUpload(name: string, file: string | Buffer | Readable, options?: MultipartUploadOptions): Promise<MultipartUploadResult> {
    console.log(name, file, options);
    return {} as any;
  }

  async multipartUploadCopy(name: string, sourceData: SourceData, options?: MultipartUploadCopyOptions): Promise<CompleteMultipartUploadResult> {
    console.log(name, sourceData, options);
    return {} as any;
  }

  async abortMultipartUpload(name: string, uploadId: string, options?: AbortMultipartUploadOptions): Promise<AbortMultipartUploadResult> {
    console.log(name, uploadId, options);
    return {} as any;
  }

  async listUploads(query?: ListUploadsQuery, options?: RequestOptions): Promise<ListUploadsResult> {
    console.log(query, options);
    return {} as any;
  }

  async uploadPartCopy(name: string, uploadId: string, partNo: number, range: string, sourceData: UploadPartCopySourceData, options?: UploadPartCopyOptions): Promise<UploadPartCopyResult> {
    console.log(name, uploadId, partNo, range, sourceData, options);
    return {} as any;
  }

  async uploadPart(name: string, uploadId: string, partNo: number, file: any, start: number, end: number, options?: UploadPartOptions): Promise<UploadPartResult> {
    console.log(name, uploadId, partNo, file, start, end, options);
    return {} as any;
  }

  async asyncSignatureUrl(name: string, options?: SignatureUrlOptions): Promise<string> {
    console.log(name, options);
    return '';
  }
}

const simpleClient = new SimpleClient();
expectType<Promise<GetObjectResult>>(simpleClient.get('foo'));

const result = await simpleClient.getStream('foo');
expectType<Readable>(result.stream);
expectType<number>(result.res.status);
expectType<string | undefined>(result.res.headers.etag);
expectType<string | string[] | undefined>(result.res.headers['set-cookie']);

let listResult = await simpleClient.list({ prefix: 'foo' });
expectType<number>(listResult.objects.length);
listResult = await simpleClient.list();
expectType<number>(listResult.objects.length);
listResult = await simpleClient.list({});
expectType<number>(listResult.objects.length);
listResult = await simpleClient.list(null);
expectType<number>(listResult.objects.length);

const deleteResult = await simpleClient.delete('foo', { versionId: 'foo' });
expectType<number>(deleteResult.status);
expectType<number>(deleteResult.res.status);

expectType<string>(await simpleClient.asyncSignatureUrl('foo', {
  'x-oss-foo': 'bar',
  "Content-MD5": 'md5',
  'content-md5': 'md5',
  'content-type': 'text/plain',
  'Content-Type': 'text/plain',
  'x-oss-meta-foo': 'bar',
  'x-oss-server-side-encryption': 'AES256',
  'x-oss-server-side-encryption-key-id': 'foo',
  'x-oss-server-side-encryption-customer-algorithm': 'AES256',
  'x-oss-server-side-encryption-customer-key': 'foo',
  'x-oss-server-side-encryption-customer-key-md5': 'foo',
  callback: {
    url: 'http://foo.bar',
    body: 'foo',
  },
}));

// Test deleteMulti with string array
const deleteMultiResult1 = await simpleClient.deleteMulti(['foo', 'bar']);
expectType<number>(deleteMultiResult1.res.status);
expectType<number>(deleteMultiResult1.deleted.length);

// Test deleteMulti with string array and options
const deleteMultiResult2 = await simpleClient.deleteMulti(['foo', 'bar'], { quiet: true });
expectType<number>(deleteMultiResult2.res.status);
expectType<number>(deleteMultiResult2.deleted.length);

// Test deleteMulti with object array (versioned objects)
const deleteMultiResult3 = await simpleClient.deleteMulti([
  { key: 'foo', versionId: 'v1' },
  { key: 'bar' },
]);
expectType<number>(deleteMultiResult3.res.status);
expectType<number>(deleteMultiResult3.deleted.length);

// Test deleteMulti with object array and options
const deleteMultiResult4 = await simpleClient.deleteMulti([
  { key: 'foo', versionId: 'v1' },
  { key: 'bar', versionId: 'v2' },
], { quiet: false, timeout: 30000 });
expectType<number>(deleteMultiResult4.res.status);
expectType<number>(deleteMultiResult4.deleted.length);

// Test getObjectTagging
const getTaggingResult1 = await simpleClient.getObjectTagging('foo');
expectType<number>(getTaggingResult1.status);
expectType<number>(getTaggingResult1.res.status);
expectType<Record<string, string>>(getTaggingResult1.tag);

// Test getObjectTagging with options
const getTaggingResult2 = await simpleClient.getObjectTagging('foo', { versionId: 'v1', timeout: 30000 });
expectType<number>(getTaggingResult2.status);
expectType<Record<string, string>>(getTaggingResult2.tag);

// Test putObjectTagging
const putTaggingResult1 = await simpleClient.putObjectTagging('foo', { env: 'prod', team: 'backend' });
expectType<number>(putTaggingResult1.status);
expectType<number>(putTaggingResult1.res.status);

// Test putObjectTagging with options
const putTaggingResult2 = await simpleClient.putObjectTagging('foo', { env: 'dev' }, { versionId: 'v1', timeout: 30000 });
expectType<number>(putTaggingResult2.status);
expectType<number>(putTaggingResult2.res.status);

// Test deleteObjectTagging
const deleteTaggingResult1 = await simpleClient.deleteObjectTagging('foo');
expectType<number>(deleteTaggingResult1.status);
expectType<number>(deleteTaggingResult1.res.status);

// Test deleteObjectTagging with options
const deleteTaggingResult2 = await simpleClient.deleteObjectTagging('foo', { versionId: 'v1', timeout: 30000 });
expectType<number>(deleteTaggingResult2.status);
expectType<number>(deleteTaggingResult2.res.status);

// Test initMultipartUpload
const initResult1 = await simpleClient.initMultipartUpload('foo');
expectType<string>(initResult1.uploadId);
expectType<string>(initResult1.bucket);
expectType<string>(initResult1.name);
expectType<number>(initResult1.res.status);

// Test initMultipartUpload with options
const initResult2 = await simpleClient.initMultipartUpload('foo', {
  mime: 'text/plain',
  meta: { uid: '123' },
  timeout: 30000
});
expectType<string>(initResult2.uploadId);

// Test completeMultipartUpload
const parts: PartInfo[] = [
  { number: 1, etag: 'etag1' },
  { number: 2, etag: 'etag2' }
];
const completeResult1 = await simpleClient.completeMultipartUpload('foo', 'uploadId123', parts);
expectType<string>(completeResult1.etag);
expectType<string>(completeResult1.bucket);
expectType<string>(completeResult1.name);
expectType<number>(completeResult1.res.status);

// Test completeMultipartUpload with callback
const completeResult2 = await simpleClient.completeMultipartUpload('foo', 'uploadId123', parts, {
  callback: {
    url: 'http://example.com/callback',
    body: 'key=$(key)&etag=$(etag)'
  }
});
expectType<object | undefined>(completeResult2.data);

// Test multipartUpload with string file path
const uploadResult1 = await simpleClient.multipartUpload('foo', '/path/to/file.txt');
expectType<string>(uploadResult1.etag);
expectType<string>(uploadResult1.bucket);
expectType<string>(uploadResult1.name);
expectType<number>(uploadResult1.res.status);

// Test multipartUpload with Buffer
const uploadResult2 = await simpleClient.multipartUpload('foo', Buffer.from('hello'), {
  partSize: 1024 * 1024,
  parallel: 3,
  timeout: 60000
});
expectType<string>(uploadResult2.etag);

// Test multipartUpload with Readable stream
const stream = new Readable();
const uploadResult3 = await simpleClient.multipartUpload('foo', stream, {
  mime: 'application/octet-stream',
  meta: { custom: 'value' }
});
expectType<object | undefined>(uploadResult3.data);

// Test multipartUploadCopy
const sourceData: SourceData = {
  sourceKey: 'source.txt',
  sourceBucketName: 'source-bucket',
  startOffset: 0,
  endOffset: 1024000
};
const copyResult1 = await simpleClient.multipartUploadCopy('target.txt', sourceData);
expectType<string>(copyResult1.etag);
expectType<string>(copyResult1.bucket);
expectType<number>(copyResult1.res.status);

// Test multipartUploadCopy with options
const copyResult2 = await simpleClient.multipartUploadCopy('target.txt', sourceData, {
  partSize: 1024 * 1024,
  versionId: 'v123',
  parallel: 5
});
expectType<string>(copyResult2.name);

// Test abortMultipartUpload
const abortResult1 = await simpleClient.abortMultipartUpload('foo', 'uploadId123');
expectType<number>(abortResult1.res.status);

// Test abortMultipartUpload with options
const abortResult2 = await simpleClient.abortMultipartUpload('foo', 'uploadId123', { timeout: 30000 });
expectType<number>(abortResult2.res.status);

// Test listUploads without parameters
const listUploadsResult1 = await simpleClient.listUploads();
expectType<number>(listUploadsResult1.uploads.length);
expectType<string>(listUploadsResult1.bucket);
expectType<string>(listUploadsResult1.nextKeyMarker);
expectType<string>(listUploadsResult1.nextUploadIdMarker);
expectType<boolean>(listUploadsResult1.isTruncated);
expectType<number>(listUploadsResult1.res.status);

// Test listUploads with query
const listUploadsResult2 = await simpleClient.listUploads({
  prefix: 'uploads/',
  'max-uploads': 100
});
expectType<number>(listUploadsResult2.uploads.length);

// Test listUploads with full query parameters
const listUploadsResult3 = await simpleClient.listUploads({
  prefix: 'uploads/',
  'key-marker': 'marker1',
  'upload-id-marker': 'upload123',
  'max-uploads': '50',
  'encoding-type': 'url'
});
expectType<string>(listUploadsResult3.uploads[0]?.name);
expectType<string>(listUploadsResult3.uploads[0]?.uploadId);
expectType<string>(listUploadsResult3.uploads[0]?.initiated);

// Test listUploads with query and options
const listUploadsResult4 = await simpleClient.listUploads(
  { prefix: 'test/' },
  { timeout: 30000 }
);
expectType<boolean>(listUploadsResult4.isTruncated);

// Test append with string file path
const appendResult1 = await simpleClient.append('foo.log', '/path/to/data.txt');
expectType<string>(appendResult1.name);
expectType<string>(appendResult1.url);
expectType<string>(appendResult1.nextAppendPosition);
expectType<number>(appendResult1.res.status);

// Test append with position
const appendResult2 = await simpleClient.append('foo.log', Buffer.from('hello'), {
  position: '1024'
});
expectType<string>(appendResult2.nextAppendPosition);

// Test append with number position
const appendResult3 = await simpleClient.append('foo.log', Buffer.from('world'), {
  position: 2048
});
expectType<string>(appendResult3.nextAppendPosition);

// Test append with Readable stream
const appendStream = new Readable();
const appendResult4 = await simpleClient.append('foo.log', appendStream, {
  position: '0',
  mime: 'text/plain',
  meta: { custom: 'value' }
});
expectType<string>(appendResult4.name);
expectType<string>(appendResult4.url);

// Test append with callback
const appendResult5 = await simpleClient.append('foo.log', Buffer.from('data'), {
  position: 0,
  callback: {
    url: 'http://example.com/callback',
    body: 'key=$(key)&etag=$(etag)'
  }
});
expectType<object | undefined>(appendResult5.data);
expectType<string>(appendResult5.nextAppendPosition);

// Test uploadPartCopy basic usage
const partCopySourceData: UploadPartCopySourceData = {
  sourceKey: 'source-object.txt',
  sourceBucketName: 'source-bucket'
};
const uploadPartCopyResult1 = await simpleClient.uploadPartCopy(
  'target.txt',
  'uploadId123',
  1,
  '0-102400',
  partCopySourceData
);
expectType<string>(uploadPartCopyResult1.name);
expectType<string>(uploadPartCopyResult1.etag);
expectType<number>(uploadPartCopyResult1.res.status);

// Test uploadPartCopy with versionId
const uploadPartCopyResult2 = await simpleClient.uploadPartCopy(
  'target.txt',
  'uploadId123',
  2,
  '102401-204800',
  partCopySourceData,
  { versionId: 'v123' }
);
expectType<string>(uploadPartCopyResult2.etag);

// Test uploadPartCopy with full options
const uploadPartCopyResult3 = await simpleClient.uploadPartCopy(
  'target.txt',
  'uploadId456',
  3,
  '204801-307200',
  {
    sourceKey: 'large-file.bin',
    sourceBucketName: 'other-bucket'
  },
  {
    versionId: 'v456',
    timeout: 60000,
    headers: {
      'x-oss-server-side-encryption': 'AES256'
    }
  }
);
expectType<string>(uploadPartCopyResult3.name);
expectType<string>(uploadPartCopyResult3.etag);
expectType<number>(uploadPartCopyResult3.res.status);

// Test uploadPartCopy without range (empty string)
const uploadPartCopyResult4 = await simpleClient.uploadPartCopy(
  'target.txt',
  'uploadId789',
  4,
  '',
  partCopySourceData
);
expectType<string>(uploadPartCopyResult4.etag);

// Test uploadPart basic usage
const uploadPartResult1 = await simpleClient.uploadPart(
  'large-file.bin',
  'uploadId123',
  1,
  '/path/to/file.bin',
  0,
  1048576
);
expectType<string>(uploadPartResult1.name);
expectType<string>(uploadPartResult1.etag);
expectType<number>(uploadPartResult1.res.status);

// Test uploadPart with options
const uploadPartResult2 = await simpleClient.uploadPart(
  'large-file.bin',
  'uploadId123',
  2,
  '/path/to/file.bin',
  1048576,
  2097152,
  {
    timeout: 60000,
    disabledMD5: false
  }
);
expectType<string>(uploadPartResult2.etag);

// Test uploadPart with File object (browser environment)
const fileObject = new File(['content'], 'test.txt');
const uploadPartResult3 = await simpleClient.uploadPart(
  'upload.txt',
  'uploadId456',
  3,
  fileObject,
  0,
  100000,
  {
    headers: {
      'x-oss-server-side-encryption': 'AES256'
    },
    mime: 'text/plain'
  }
);
expectType<string>(uploadPartResult3.name);
expectType<string>(uploadPartResult3.etag);
expectType<number>(uploadPartResult3.res.status);

// Test uploadPart with different byte ranges
const uploadPartResult4 = await simpleClient.uploadPart(
  'video.mp4',
  'uploadId789',
  5,
  '/path/to/video.mp4',
  5242880,
  10485760
);
expectType<string>(uploadPartResult4.etag);
