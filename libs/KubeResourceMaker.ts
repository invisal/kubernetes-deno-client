import KubeResource from "./types/KubeResource.ts";

export default class KubeResourceMaker {
  static makeConfigMap(
    name: string,
    data: { [key: string]: string }
  ): KubeResource {
    return {
      apiVersion: "v1",
      kind: "ConfigMap",
      metadata: {
        name,
      },
      data: data,
    };
  }
}
