import KubeResource, { KubeResourceList } from "./types/KubeResource.ts";
import KubeResourceBase from "./types/KubeResourceBase.ts";

export default class KubeRequestBase {
  protected serverUrl: string;
  protected client: Deno.HttpClient;

  constructor(
    serverUrl: string,
    serverCert: string,
    userKey: string,
    userCert: string
  ) {
    this.serverUrl = serverUrl;
    // deno-lint-ignore no-explicit-any
    this.client = (Deno as any).createHttpClient({
      caData: serverCert,
      caCerts: [serverCert],
      privateKey: userKey,
      certChain: userCert,
    });
  }

  async request<T = unknown>(
    method: "GET" | "POST" | "PUT" | "DELETE",
    path: string,
    body?: unknown
  ) {
    const r = await fetch(`${this.serverUrl}${path}`, {
      method: method,
      client: this.client,
      ...(body
        ? {
            body: JSON.stringify(body),
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        : {}),
    } as RequestInit);

    const json: T = await r.json();

    if (r.status !== 200) {
      // deno-lint-ignore no-explicit-any
      throw (json as any).message;
    }

    return json;
  }

  protected async handleGetListPattern<T = KubeResourceList>(
    prefix: string,
    kind: string,
    namespace?: string
  ): Promise<T> {
    const url = namespace
      ? `${prefix}/namespaces/${namespace}/${kind}`
      : `${prefix}/${kind}`;

    return await this.request("GET", url);
  }

  protected async handleGetPattern<T extends KubeResourceBase = KubeResource>(
    prefix: string,
    kind: string,
    namespace: string,
    name: string
  ): Promise<T> {
    const url = `${prefix}/namespaces/${namespace}/${kind}/${name}`;
    return await this.request("GET", url);
  }

  protected async handleDeletePattern<
    T extends KubeResourceBase = KubeResource
  >(prefix: string, kind: string, namespace: string, name: string): Promise<T> {
    const url = `${prefix}/namespaces/${namespace}/${kind}/${name}`;
    return await this.request("DELETE", url);
  }

  protected async handleCreatePattern<
    T extends KubeResourceBase = KubeResource
  >(prefix: string, kind: string, namespace: string, resource: T): Promise<T> {
    const url = `${prefix}/namespaces/${namespace}/${kind}`;
    return await this.request("POST", url, resource);
  }

  protected async handleUpdatePattern<
    T extends KubeResourceBase = KubeResource
  >(prefix: string, kind: string, namespace: string, resource: T): Promise<T> {
    const name = resource.metadata?.name;
    const url = `${prefix}/namespaces/${namespace}/${kind}/${name}`;
    return await this.request("PUT", url, resource);
  }
}
