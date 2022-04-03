import KubeResource from "./types/KubeResource.ts";

export default class KubeRequest {
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
    return json;
  }

  async getDeployments(namespace?: string): Promise<KubeResource> {
    const url = namespace
      ? `/apis/apps/v1/namespaces/${namespace}/deployments`
      : "/apis/apps/v1/deployments";

    return await this.request("GET", url);
  }

  async createConfigMap(namespace: string, resource: KubeResource) {
    const url = `/api/v1/namespaces/${namespace}/configmaps`;
    return await this.request("POST", url, resource);
  }

  async updateConfigMap(namespace: string, resource: KubeResource) {
    const name = resource.metadata?.name;
    const url = `/api/v1/namespaces/${namespace}/configmaps/${name}`;
    return await this.request("PUT", url, resource);
  }
}
