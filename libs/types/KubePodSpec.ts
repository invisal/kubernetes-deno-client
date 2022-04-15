import KubeContainer from "./KubeContainer.ts";

// https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.19/#podspec-v1-core
export default interface KubePodSepc {
  activeDeadlineSeconds: number;
  automountServiceAccountToken: boolean;
  containers: KubeContainer;

  // Todo: Affinity
}
