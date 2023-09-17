import { Writable, Readable } from 'node:stream';
import { IncomingHttpHeaders } from 'node:http';
import { expectType } from 'tsd';
import {
  GetObjectOptions,
  IObjectSimple,
  ListObjectsQuery,
  RequestOptions,
  ListObjectResult,
  PutObjectOptions,
  PutObjectResult,
  NormalSuccessResponse,
  HeadObjectOptions,
  HeadObjectResult,
  GetObjectResult,
  GetStreamOptions,
  GetStreamResult,
  CopyObjectOptions,
  CopyAndPutMetaResult, SignatureUrlOptions,
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
  async delete(name: string, options?: RequestOptions): Promise<NormalSuccessResponse> {
    console.log(name, options);
    return {} as any;
  }

  async copy(name: string, sourceName: string, options?: CopyObjectOptions): Promise<CopyAndPutMetaResult>;
  async copy(name: string, sourceName: string, sourceBucket: string, options?: CopyObjectOptions): Promise<CopyAndPutMetaResult>;
  async copy(name: string, sourceName: string, sourceBucket?: string | CopyObjectOptions, options?: CopyObjectOptions): Promise<CopyAndPutMetaResult> {
    console.log(name, sourceName, sourceBucket, options);
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
