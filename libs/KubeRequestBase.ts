import KubeResource, { KubeResourceList } from "./types/KubeResource.ts";

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

  protected async handleGetListPattern(
    prefix: string,
    kind: string,
    namespace?: string
  ): Promise<KubeResourceList> {
    const url = namespace
      ? `${prefix}/namespaces/${namespace}/${kind}`
      : `${prefix}/${kind}`;

    return await this.request("GET", url);
  }

  protected async handleGetPattern(
    prefix: string,
    kind: string,
    namespace: string,
    name: string
  ): Promise<KubeResource> {
    const url = `${prefix}/namespaces/${namespace}/${kind}/${name}`;
    return await this.request("GET", url);
  }

  protected async handleDeletePattern(
    prefix: string,
    kind: string,
    namespace: string,
    name: string
  ): Promise<KubeResource> {
    const url = `${prefix}/namespaces/${namespace}/${kind}/${name}`;
    return await this.request("DELETE", url);
  }

  protected async handleCreatePattern(
    prefix: string,
    kind: string,
    namespace: string,
    resource: KubeResource
  ): Promise<KubeResource> {
    const url = `${prefix}/namespaces/${namespace}/${kind}`;
    return await this.request("POST", url, resource);
  }

  protected async handleUpdatePattern(
    prefix: string,
    kind: string,
    namespace: string,
    resource: KubeResource
  ): Promise<KubeResource> {
    const name = resource.metadata?.name;
    const url = `${prefix}/namespaces/${namespace}/${kind}/${name}`;
    return await this.request("PUT", url, resource);
  }
}
