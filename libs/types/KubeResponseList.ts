export interface KubeResponseList<K, R> {
  apiVersion: string;
  kind: K;
  items: R[];
}
