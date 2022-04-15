import KubeDeploymentStrategy from "./KubeDeploymentStrategy.ts";
import KubeLabelSelector from "./KubeLabelSelector.ts";
import KubePodTemplateSpec from "./KubePodTemplateSpec.ts";

// https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.19/#deploymentspec-v1-apps
export default interface DeploymentSepc {
  minReadySeconds: number;
  paused: boolean;
  progressDeadlineSeconds: number;
  replicas: number;
  revisionHistoryLimit: number;

  selector: KubeLabelSelector;
  strategy: KubeDeploymentStrategy;
  template: KubePodTemplateSpec;
}
